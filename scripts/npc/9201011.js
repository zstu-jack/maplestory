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
/* Pelvis Bebop
	Marriage NPC
 */

    importPackage(Packages.constants);
    importPackage(Packages.net.server.channel.handlers);
    importPackage(Packages.tools);
    importPackage(Packages.tools.packets);
    
    var status;
    var state;
    var eim;
    var weddingEventName = "WeddingChapel";
    var cathedralWedding = false;
    var weddingIndoors;
    var weddingBlessingExp = ServerConstants.WEDDING_BLESS_EXP;
    
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
        if (!player.haveItem(4000313)) return -3;
        if (!partner.haveItem(4000313)) return 3;
    
        if (!isSuitedForWedding(player, true)) return -4;
        if (!isSuitedForWedding(partner, true)) return 4;
    
        var hasEngagement = false;
        for (var x = 4031357; x <= 4031364; x++) {
            if (player.haveItem(x)) {
                hasEngagement = true;
                break;
            }
        }
        if (!hasEngagement) return -1;
    
        hasEngagement = false;
        for (var x = 4031357; x <= 4031364; x++) {
            if (partner.haveItem(x)) {
                hasEngagement = true;
                break;
            }
        }
        if (!hasEngagement) return -2;
    
        if (!player.canHold(1112803)) return 1;
        if (!partner.canHold(1112803)) return 2;
    
        return 0;
    }
    
    function giveCoupleBlessings(eim, player, partner) {
        var blessCount = eim.gridSize();
    
        player.gainExp(blessCount * weddingBlessingExp);
        partner.gainExp(blessCount * weddingBlessingExp);
    }
    
    function start() {
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
                        cm.sendYesNo("喔喔喔~宾客们已经为你们的爱情欢呼了.那么现在是时候确认你们心意了~,#你们愿意就此结为夫妻吗#k?");
                        state = 1;
                    } else if (wstg == 1) {
                        cm.sendOk("喔~等等,别急.宾客们正在为你们的爱情欢呼,来吧,让我们点燃这儿的气氛!");
                        cm.dispose();
                    } else {
                        cm.sendOk("Yo~~~~~~!婚礼完美地结束了,去问问#b#p9201009##k下一步的流程吧,他会带你们前往举办结婚派对的地方.为你们的爱情干杯吧!");
                        cm.dispose();
                    }
                } else {
                    var wstg = eim.getIntProperty("weddingStage");
                    if (wstg == 1) {
                        if (eim.gridCheck(cm.getPlayer()) != -1) {
                            cm.sendOk("来吧,让我们点燃这儿的气氛!!");
                            cm.dispose();
                        } else {
                            if (eim.getIntProperty("guestBlessings") == 1) {
                                cm.sendYesNo("当着大家的面,大声表白吧!");
                                state = 0;
                            } else {
                                cm.sendOk("今天巨星齐聚一堂.那么大家来一场派对吧~欢乐的派对即将开始!");
                                cm.dispose();
                            }
                        }
                    } else if (wstg == 3) {
                        cm.sendOk("喔喔喔喔!这对新人的爱情正如此时此刻的他们一般光彩耀目!并在这之后绵延数十年,直到生命的尽头.请做好准备#r参加结婚派对#k,亲爱的朋友们~随着这对新婚夫妇去大闹一场吧!");
                        cm.dispose();
                    } else {
                        cm.sendOk("是时候了...竖起你们的耳朵,瞪大眼睛!他们就要接吻了!");
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
    
                    cm.sendOk("就是这样,我的朋友!现在你献出的爱已经与大家的爱意相融合,成为了一份更大的爱,这份爱将会融入我们在场所有人的心中,永燃不灭!呜呼~");
                    cm.dispose();
                } else {            // couple wants to complete the wedding
                    var wstg = eim.getIntProperty("weddingStage");
    
                    if (wstg == 2) {
                        var pid = cm.getPlayer().getPartnerId();
                        if (pid <= 0) {
                            cm.sendOk("嗯~嗯?怎么回事,你是不是弄坏了什么东西?我的天,发生了什么事?");
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
                                            cm.sendOk("你已经起誓了,现在请等待你的伴侣起誓.");
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
    
                                            cm.getMap().dropMessage(6, "韦恩:此时此刻,让我们祝福新人,祝愿他们的爱情天长地久.正如在场所有人所见证,你们的誓言将坚不可破,你们的心将永远连在一起.就是这样,亲一个吧!");
                                            eim.schedule("showMarriedMsg", 2 * 1000);
                                        }
                                    } else {
                                        eim.setIntProperty("confirmedVows", player.getId());
                                        cm.getMap().dropMessage(6, "婚礼助手: " + player.getName() + " 确认了他们的爱情誓言!好的,距离婚礼完成只有一步之遥了!");
                                    }
    
                                    break;
    
                                case -1:
                                    cm.sendOk("你们之中的一人好像是把订婚时交换的戒指或是戒指盒弄丢了.怎么搞的?");
                                    break;
    
                                case -2:
                                    cm.sendOk("你们之中的一人好像是把订婚时交换的戒指或是戒指盒弄丢了.怎么搞的?");
                                    break;
    
                                case -3:
                                    cm.sendOk("好吧,看起来你没有入口处发放的#r#t4000313##k,掉在哪儿了呢?好好找找吧,宝贝~");
                                    break;
    
                                case -4:
                                    cm.sendOk("啊,你的打扮确实也很好看,但婚礼上穿着礼服是约定俗成的事情,与我对话前请先穿上礼服吧.");
                                    break;
    
                                case 1:
                                    cm.sendOk("请空出一个装备栏来存放婚戒,可以吗?");
                                    break;
    
                                case 2:
                                    cm.sendOk("请空出一个装备栏来存放婚戒,可以吗?");
                                    break;
    
                                case 3:
                                    cm.sendOk("好吧,看起来你没有入口处发放的#r#t4000313##k,掉在哪儿了呢?好好找找吧,宝贝~没有它可进行不了下一阶段了.");
                                    break;
    
                                case 4:
                                    cm.sendOk("啊,你的打扮确实也很好看,但婚礼上穿着礼服是约定俗成的事情,与我对话前请先穿上礼服吧.");
                                    break;
                            }
    
                            cm.dispose();
                        } else {
                            cm.sendOk("呃,你的伴侣好像并不在这里啊...不行,如果双方中有一方缺席的话,我是不会开始下一阶段的.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("呜呼!你们现在是一对#b合法夫妻#k了,真是珠联璧合啊,恭喜你们!");
                        cm.dispose();
                    }
                }
            }
        }
    }