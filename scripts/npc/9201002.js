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
/* High Priest John
 Marriage NPC
 */

importPackage(Packages.config);
importPackage(Packages.net.server.channel.handlers);
importPackage(Packages.tools);
importPackage(Packages.tools.packets);

var status;
var state;
var eim;
var weddingEventName = "WeddingCathedral";
var cathedralWedding = true;
var weddingIndoors;
var weddingBlessingExp = YamlConfig.config.server.WEDDING_BLESS_EXP;

function isWeddingIndoors(mapid) {
    return mapid >= 680000100 && mapid <= 680000500;
}

function getMarriageInstance(player) {
    var em = cm.getEventManager(weddingEventName);

    for (var iterator = em.getInstances().iterator(); iterator.hasNext(); ) {
        var eim = iterator.next();
        if (eim.isEventLeader(player)) {
            return eim;
        }
    }

    return null;
}

function detectPlayerItemid(player) {
    for (var x = 4031357; x <= 4031364; x++) {
        if (player.haveItem(x)) {
            return x;
        }
    }

    return -1;
}

function getRingId(boxItemId) {
    return boxItemId == 4031357 ? 1112803 : (boxItemId == 4031359 ? 1112806 : (boxItemId == 4031361 ? 1112807 : (boxItemId == 4031363 ? 1112809 : -1)));
}

function isSuitedForWedding(player, equipped) {
    var baseid = (player.getGender() == 0) ? 1050131 : 1051150;

    if (equipped) {
        for (var i = 0; i < 4; i++) {
            if (player.haveItemEquipped(baseid + i)) {
                return true;
            }
        }
    } else {
        for (var i = 0; i < 4; i++) {
            if (player.haveItemWithId(baseid + i, true)) {
                return true;
            }
        }
    }

    return false;
}

function getWeddingPreparationStatus(player, partner) {
    if (!player.haveItem(4000313))
        return -3;
    if (!partner.haveItem(4000313))
        return 3;

    if (!isSuitedForWedding(player, true))
        return -4;
    if (!isSuitedForWedding(partner, true))
        return 4;

    var hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (player.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if (!hasEngagement)
        return -1;

    hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (partner.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if (!hasEngagement)
        return -2;

    if (!player.canHold(1112803))
        return 1;
    if (!partner.canHold(1112803))
        return 2;

    return 0;
}

function giveCoupleBlessings(eim, player, partner) {
    var blessCount = eim.gridSize();

    player.gainExp(blessCount * weddingBlessingExp);
    partner.gainExp(blessCount * weddingBlessingExp);
}

function start() {
    weddingIndoors = isWeddingIndoors(cm.getMapId());
    if (weddingIndoors)
        eim = cm.getEventInstance();

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
            if (status == 0) {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }

                if (hasEngagement) {
                    var text = "你好啊。我有什么能帮你的？";
                    var choice = new Array("我们想要结婚。");
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
                    cm.sendSimple(text);
                } else {
                    cm.sendOk("今天两颗悸动的心因爱情的祝福在此结合。");
                    cm.dispose();
                }
            } else if (status == 1) {
                var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                var cserv = cm.getClient().getChannelServer();

                if (cserv.isWeddingReserved(wid)) {
                    if (wid == cserv.getOngoingWedding(cathedralWedding)) {
                        var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                        if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                            if (!cm.canHold(4000313)) {
                                cm.sendOk("请空出一格其他栏以获取#b#t4000313##k。");
                                cm.dispose();
                                return;
                            } else if (!partner.canHold(4000313)) {
                                cm.sendOk("请告知您的伴侣空出一格其他栏以获取#b#t4000313##k。");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(cm.getPlayer(), false)) {
                                cm.sendOk("请购买#r结婚礼服#k！出席婚礼时需穿着正装。");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(partner, false)) {
                                cm.sendOk("请告知您的伴侣购买#r结婚礼服#k！出席婚礼时需穿着正装。");
                                cm.dispose();
                                return;
                            }

                            cm.sendOk("很好，这样准备工作就完成了。今天是个美好的日子，正适合你们两位成婚。那么，我们开始婚礼吧。");
                        } else {
                            cm.sendOk("呃，你的伴侣好像在别的地方...请通知对方在仪式开始之前赶到这里。");
                            cm.dispose();
                        }
                    } else {
                        var placeTime = cserv.getWeddingReservationTimeLeft(wid);

                        cm.sendOk("不要急。你的婚礼定于#r" + placeTime + "#k举办。记得穿好礼服，按时出席。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("抱歉，这个频道暂时没有您的婚礼预订。");
                    cm.dispose();
                }
            } else if (status == 2) {
                var cserv = cm.getClient().getChannelServer();
                var wtype = cserv.getOngoingWeddingType(cathedralWedding);

                var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                    if (cserv.acceptOngoingWedding(cathedralWedding)) {
                        var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                        if (wid > 0) {
                            var em = cm.getEventManager(weddingEventName);
                            if (em.startInstance(cm.getPlayer())) {
                                eim = getMarriageInstance(cm.getPlayer());
                                if (eim != null) {
                                    eim.setIntProperty("weddingId", wid);
                                    eim.setIntProperty("groomId", cm.getPlayer().getId());
                                    eim.setIntProperty("brideId", cm.getPlayer().getPartnerId());
                                    eim.setIntProperty("isPremium", wtype ? 1 : 0);

                                    eim.registerPlayer(partner);
                                } else {
                                    cm.sendOk("定位婚礼事件时发生了预料之外的错误，请稍后重试。");
                                }

                                cm.dispose();
                            } else {
                                cm.sendOk("定位婚礼事件时发生了预料之外的错误，请稍后重试。");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("定位婚礼事件时发生了预料之外的错误，请稍后重试。");
                            cm.dispose();
                        }
                    } else {    // partner already decided to start
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("呃,你的伴侣好像在别的地方...请通知对方在仪式开始之前赶到这里。");
                    cm.dispose();
                }
            }
        } else {
            if (status == 0) {
                if (eim == null) {
                    cm.warp(680000000, 0);
                    cm.dispose();
                    return;
                }

                var playerId = cm.getPlayer().getId();
                if (playerId == eim.getIntProperty("groomId") || playerId == eim.getIntProperty("brideId")) {
                    var wstg = eim.getIntProperty("weddingStage");

                    if (wstg == 2) {
                        cm.sendYesNo("好了，宾客们已经把他们的所有祝福都献给了你们。时间到了，你们想要#r成为夫妻#k吗？");
                        state = 1;
                    } else if (wstg == 1) {
                        cm.sendOk("你们相互许下结婚誓言时，宾客们也为你们的爱情送上了祝福。这会是你们铭记终生的幸福时光，请享受这一刻吧。");
                        cm.dispose();
                    } else {
                        cm.sendOk("祝贺你们成婚!仪式已经结束了，你们现在可以请#b#p9201007##k引领你们和宾客前往后场派对。为你们的爱情干杯！");
                        cm.dispose();
                    }
                } else {
                    var wstg = eim.getIntProperty("weddingStage");
                    if (wstg == 1) {
                        if (eim.gridCheck(cm.getPlayer()) != -1) {
                            cm.sendOk("让我们大家把祝福送给这对彼此深爱的情侣吧！");
                            cm.dispose();
                        } else {
                            if (eim.getIntProperty("guestBlessings") == 1) {
                                cm.sendYesNo("你要祝福这对情侣吗？");
                                state = 0;
                            } else {
                                cm.sendOk("今天我们相聚在这里，见证这对新人的结合！");
                                cm.dispose();
                            }
                        }
                    } else if (wstg == 3) {
                        cm.sendOk("两位可爱的新人现在已经步入婚姻的殿堂。今天真是热闹啊。请#r准备参加后场派对#k，它即将在不久后开始。请跟随这对新人入场。");
                        cm.dispose();
                    } else {
                        cm.sendOk("请安静，宾客们已经献上了他们的祝福。现在这对新人即将复述他们的誓言，让我们侧耳倾听吧。");
                        cm.dispose();
                    }
                }
            } else if (status == 1) {
                if (state == 0) {    // give player blessings
                    eim.gridInsert(cm.getPlayer(), 1);

                    if (ServerConstants.WEDDING_BLESSER_SHOWFX) {
                        var target = cm.getPlayer();
                        target.announce(MaplePacketCreator.showSpecialEffect(9));
                        target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                    } else {
                        var target = eim.getPlayerById(eim.getIntProperty("groomId"));
                        target.announce(MaplePacketCreator.showSpecialEffect(9));
                        target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);

                        target = eim.getPlayerById(eim.getIntProperty("brideId"));
                        target.announce(MaplePacketCreator.showSpecialEffect(9));
                        target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                    }

                    cm.sendOk("你的祝福已经传达给了这对新人，让他们的爱情愈加甜美。");
                    cm.dispose();
                } else {            // couple wants to complete the wedding
                    var wstg = eim.getIntProperty("weddingStage");

                    if (wstg == 2) {
                        var pid = cm.getPlayer().getPartnerId();
                        if (pid <= 0) {
                            cm.sendOk("你们似乎突然改变了主意，取消了订婚。就在这圣坛之前...刚刚你们之间的那份幸福都去哪儿了？");
                            cm.dispose();
                            return;
                        }

                        var player = cm.getPlayer();
                        var partner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId());
                        if (partner != null) {
                            state = getWeddingPreparationStatus(player, partner);

                            switch (state) {
                                case 0:
                                    var pid = eim.getIntProperty("confirmedVows");
                                    if (pid != -1) {
                                        if (pid == player.getId()) {
                                            cm.sendOk("你已经起誓了，现在请等待你的伴侣起誓。");
                                        } else {
                                            eim.setIntProperty("weddingStage", 3);
                                            var cmPartner = partner.getAbstractPlayerInteraction();

                                            var playerItemId = detectPlayerItemid(player);
                                            var partnerItemId = (playerItemId % 2 == 1) ? playerItemId + 1 : playerItemId - 1;

                                            var marriageRingId = getRingId((playerItemId % 2 == 1) ? playerItemId : partnerItemId);

                                            cm.gainItem(playerItemId, -1);
                                            cmPartner.gainItem(partnerItemId, -1);

                                            RingActionHandler.giveMarriageRings(player, partner, marriageRingId);
                                            player.setMarriageItemId(marriageRingId);
                                            partner.setMarriageItemId(marriageRingId);

                                            //var marriageId = eim.getIntProperty("weddingId");
                                            //player.announce(Wedding.OnMarriageResult(marriageId, player, true));
                                            //partner.announce(Wedding.OnMarriageResult(marriageId, player, true));

                                            giveCoupleBlessings(eim, player, partner);

                                            cm.getMap().dropMessage(6, "勒贝尔托4世：以伟大的枫之意志的名义，我宣布你们二人结为夫妻。新郎，你可以亲吻新娘了！");
                                            eim.schedule("showMarriedMsg", 2 * 1000);
                                        }
                                    } else {
                                        eim.setIntProperty("confirmedVows", player.getId());
                                        cm.getMap().dropMessage(6, "婚礼助手：" + player.getName() + " 确认了他们的爱情誓言！好的，距离婚礼完成只有一步之遥了！");
                                    }

                                    break;

                                case -1:
                                    cm.sendOk("你们之中的一人好像是把订婚时交换的戒指或是戒指盒弄丢了。抱歉，那是完成婚礼时的必需品。");
                                    break;

                                case -2:
                                    cm.sendOk("你们之中的一人好像是把订婚时交换的戒指或是戒指盒弄丢了。抱歉，那是完成婚礼时的必需品。");
                                    break;

                                case -3:
                                    cm.sendOk("看起来你没有携带入口处发放的#r#t4000313##k，请找到它后与我交谈，没有#r#t4000313##k的话，婚礼无法正常进行下去。");
                                    break;

                                case -4:
                                    cm.sendOk("很抱歉要提醒您一下，婚礼期间请务必穿着礼服，请#r穿着正装#k出席婚礼。");
                                    break;

                                case 1:
                                    cm.sendOk("请空出一格装备栏用于存放婚戒。");
                                    break;

                                case 2:
                                    cm.sendOk("请告知你的伴侣空出一格装备栏用于存放婚戒。");
                                    break;

                                case 3:
                                    cm.sendOk("看起来你的伴侣没有携带入口处发放的#r#t4000313##k，请找到它后与我交谈，没有#r#t4000313##k的话，婚礼无法正常进行下去。");
                                    break;

                                case 4:
                                    cm.sendOk("看起来您的伴侣没有穿着正装出席婚礼...很抱歉要提醒您一下，婚礼期间请务必穿着礼服。");
                                    break;
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("呃,你的伴侣好像并不在这里啊...不行，如果双方中有一方缺席的话，婚礼是无法继续下去的。");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("你们现在是一对#b夫妻#k了，真是珠联璧合啊，恭喜你们！");
                        cm.dispose();
                    }
                }
            }
        }
    }
}