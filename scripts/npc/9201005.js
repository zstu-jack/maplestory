/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Assistant Nicole
	Marriage NPC
 */

    var status;
    var wid;
    var isMarrying;
    
    var cathedralWedding = true;
    var weddingEventName = "WeddingCathedral";
    var weddingEntryTicketCommon = 5251000;
    var weddingEntryTicketPremium = 5251003;
    var weddingSendTicket = 4031395;
    var weddingGuestTicket = 4031407;
    var weddingAltarMapid = 680000210;
    var weddingIndoors;
    
    function isWeddingIndoors(mapid) {
        return mapid >= 680000100 && mapid <= 680000500;
    }
    
    function hasSuitForWedding(player) {
        var baseid = (player.getGender() == 0) ? 1050131 : 1051150;
    
        for (var i = 0; i < 4; i++) {
            if (player.haveItemWithId(baseid + i, true)) {
                return true;
            }
        }
    
        return false;
    }
    
    function getMarriageInstance(weddingId) {
        var em = cm.getEventManager(weddingEventName);
    
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
            var eim = iterator.next();
    
            if (eim.getIntProperty("weddingId") == weddingId) {
                return eim;
            }
        }
    
        return null;
    }
    
    function hasWeddingRing(player) {
        var rings = [1112806, 1112803, 1112807, 1112809];
        for (var i = 0; i < rings.length; i++) {
            if (player.haveItemWithId(rings[i], true)) {
                return true;
            }
        }
    
        return false;
    }
    
    function start() {
        weddingIndoors = isWeddingIndoors(cm.getMapId());
        status = -1;
    
        action(1, 0, 0);
    }
    
    function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else {
            if (mode == 0 && type > 0) {
                cm.dispose();
                return;
            }
            if (mode == 1)
                status++;
            else
                status--;
    
            if (!weddingIndoors) {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }
    
                if (status == 0) {
                    var text = "欢迎来到#b教堂#k!我有什么能帮您的?";
                    var choice = ["我该如何筹备婚礼?", "我订婚了,想要筹备婚礼.", "我是宾客,想要参加婚礼."];
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
    
                    if (cm.haveItem(5251100)) {
                        text += "\r\n#L" + x + "##b制作额外的请柬#l";
                    }
    
                    cm.sendSimple(text);
                } else if (status == 1) {
                    switch (selection) {
                        case 0:
                            cm.sendOk("首先,需要与某人#b订婚#k.然后去找#p9201000#制作订婚戒指.订婚结束后,购买一张#b#t" + weddingEntryTicketCommon + "##k.\r\n将你的订婚戒指与婚礼门票一同交给我.我就会为你预订房间,并交给你#r15张 婚礼请柬#k.你可以将这些请柬分发给宾客们,每张请柬可供1位宾客入场.");
                            cm.dispose();
                            break;
    
                        case 1:
                            if (hasEngagement) {
                                var wserv = cm.getClient().getWorldServer();
                                var cserv = cm.getClient().getChannelServer();
                                var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());
    
                                if (weddingId > 0) {
                                    if (cserv.isWeddingReserved(weddingId)) {    // registration check
                                        var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);
                                        cm.sendOk("婚礼将于#r" + placeTime + "#k开始.穿好礼服,可别迟到了!");
                                    } else {
                                        var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                        if (partner == null) {
                                            cm.sendOk("你的伴侣似乎并不在线...请两人一同前来登记!");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                            cm.sendOk("你或者你的伴侣已经拥有一枚结婚戒指了.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.getMap().equals(partner.getMap())) {
                                            cm.sendOk("请让你的伴侣一同前来登记.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                            cm.sendOk("你或者你的伴侣的其他栏没有足够空间.无法获得请柬.登记前请在背包里留出足够多的空位.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                            cm.sendOk("抱歉...根据婚礼村结婚流程,你们双方无法订婚,具体事宜请向#b#p9201014##k咨询.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        var hasCommon = cm.haveItem(weddingEntryTicketCommon);
                                        var hasPremium = cm.haveItem(weddingEntryTicketPremium);
    
                                        if (hasCommon || hasPremium) {
                                            var weddingType = (hasPremium ? true : false);
    
                                            var player = cm.getPlayer();
                                            var resStatus = cserv.pushWeddingReservation(weddingId, cathedralWedding, weddingType, player.getId(), player.getPartnerId());
                                            if (resStatus > 0) {
                                                cm.gainItem((weddingType) ? weddingEntryTicketPremium : weddingEntryTicketCommon, -1);
    
                                                cm.gainItem(weddingSendTicket, 15);
                                                partner.getAbstractPlayerInteraction().gainItem(weddingSendTicket, 15);
                                                // var expirationTime = cserv.getRelativeWeddingTicketExpireTime(resStatus);
                                                // cm.gainItem(weddingSendTicket, 15, false, true, expirationTime);
                                                // partner.getAbstractPlayerInteraction().gainItem(weddingSendTicket, 15, false, true, expirationTime);
    
                                                var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);
    
                                                var wedType = weddingType ? "高级" : "普通";
                                                cm.sendOk("两位新人都获得了15张请柬,请将它们分发给宾客们. #b双击请柬#k将它们送给想要邀请的人.请于#r婚礼开始前#k发出请柬.您的#b" + wedType + "婚礼#k 将于#r" + placeTime + "#k举行.请穿好礼服,按时入场!");
    
                                                player.dropMessage(6, "婚礼助手:两位新人都获得了15张请柬, 请于婚礼开始前发出请柬.您的" + wedType + "婚礼将于" + placeTime + "举行.请穿好礼服,按时入场!");
                                                partner.dropMessage(6, "婚礼助手:两位新人都获得了15张请柬, 请于婚礼开始前发出请柬.您的" + wedType + "婚礼将于" + placeTime + "举行.请穿好礼服,按时入场!");
    
                                                if (!hasSuitForWedding(player)) {
                                                    player.dropMessage(5, "婚礼助手:出席婚礼前,请新人购买一件礼服.礼服可以在婚礼村最左边的结婚用品店购买.");
                                                }
    
                                                if (!hasSuitForWedding(partner)) {
                                                    partner.dropMessage(5, "婚礼助手:出席婚礼前,请新人购买一件礼服.礼服可以在婚礼村最左边的结婚用品店购买.");
                                                }
                                            } else {
                                                cm.sendOk("您的婚礼预约刚刚提交,请稍后再试.");
                                            }
                                        } else {
                                            cm.sendOk("提交婚礼预约前,请确认您的#b#t" + weddingEntryTicketCommon + "##k已从商城保管箱内取出.");
                                        }
                                    }
                                } else {
                                    cm.sendOk("婚礼预约发生错误,请稍后再试.");
                                }
    
                                cm.dispose();
                            } else {
                                cm.sendOk("您没有订婚戒指.");
                                cm.dispose();
                            }
                            break;
    
                        case 2:
                            if (cm.haveItem(weddingGuestTicket)) {
                                var cserv = cm.getClient().getChannelServer();
    
                                wid = cserv.getOngoingWedding(cathedralWedding);
                                if (wid > 0) {
                                    if (cserv.isOngoingWeddingGuest(cathedralWedding, cm.getPlayer().getId())) {
                                        var eim = getMarriageInstance(wid);
                                        if (eim != null) {
                                            cm.sendOk("希望您在婚礼上留下一个愉悦的回忆.婚礼期间请保管好您的黄金枫叶,以保证婚礼流程正常运行.");
                                        } else {
                                            cm.sendOk("请稍候,新人正在入场.");
                                            cm.dispose();
                                        }
                                    } else {
                                        cm.sendOk("抱歉,您没有邀请函.");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("现在没有婚礼预订.");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("您没有#b#t" + weddingGuestTicket + "##k.");
                                cm.dispose();
                            }
                            break;
    
                        default:
                            var wserv = cm.getClient().getWorldServer();
                            var cserv = cm.getClient().getChannelServer();
                            var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());
    
                            var resStatus = cserv.getWeddingReservationStatus(weddingId, cathedralWedding);
                            if (resStatus > 0) {
                                if (cm.canHold(weddingSendTicket, 3)) {
                                    cm.gainItem(5251100, -1);
                                    cm.gainItem(weddingSendTicket, 3);
                                    // var expirationTime = cserv.getRelativeWeddingTicketExpireTime(resStatus);
                                    // cm.gainItem(weddingSendTicket, 3, false, true, expirationTime);
                                } else {
                                    cm.sendOk("请空出至少一格其他栏以获取请柬.");
                                }
                            } else {
                                cm.sendOk("您目前尚未预订场地,无法制作请柬.");
                            }
    
                            cm.dispose();
                    }
                } else if (status == 2) {   // registering guest
                    var eim = getMarriageInstance(wid);
    
                    if (eim != null) {
                        cm.gainItem(weddingGuestTicket, -1);
                        eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                    } else {
                        cm.sendOk("您被邀请参加的婚礼目前尚未开始.");
                    }
    
                    cm.dispose();
                }
            } else {
                if (status == 0) {
                    var eim = cm.getEventInstance();
                    if (eim == null) {
                        cm.warp(680000000, 0);
                        cm.dispose();
                        return;
                    }
    
                    isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));
    
                    if (eim.getIntProperty("weddingStage") == 0) {
                        if (!isMarrying) {
                            cm.sendOk("欢迎来到#b#m" + cm.getMapId() + "##k.请新郎新娘与宾客们在此地稍作等候.\r\n\r\n婚礼仪式开始时,新人可以入场登上圣坛,届时请宾客们进入#b宾客区#k依次就座.");
                        } else {
                            cm.sendOk("欢迎来到#b#m" + cm.getMapId() + "##k.欢迎各位早早等候在此,或者还在路上的宾客.婚礼仪式开始时,新人可以入场登上圣坛,");
                        }
    
                        cm.dispose();
                    } else {
                        cm.sendYesNo("#b新郎与新娘#k已经前往礼堂了,您想要现在入场吗?");
                    }
                } else if (status == 1) {
                    cm.warp(weddingAltarMapid, "sp");
                    cm.dispose();
                }
            }
        }
    }