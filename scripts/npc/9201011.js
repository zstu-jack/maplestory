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
                        cm.sendYesNo("���~�������Ѿ�Ϊ���ǵİ��黶����.��ô������ʱ��ȷ������������~,#����Ը��ʹ˽�Ϊ������#k?");
                        state = 1;
                    } else if (wstg == 1) {
                        cm.sendOk("�~�ȵ�,��.����������Ϊ���ǵİ��黶��,����,�����ǵ�ȼ���������!");
                        cm.dispose();
                    } else {
                        cm.sendOk("Yo~~~~~~!���������ؽ�����,ȥ����#b#p9201009##k��һ�������̰�,���������ǰ���ٰ����ɶԵĵط�.Ϊ���ǵİ���ɱ���!");
                        cm.dispose();
                    }
                } else {
                    var wstg = eim.getIntProperty("weddingStage");
                    if (wstg == 1) {
                        if (eim.gridCheck(cm.getPlayer()) != -1) {
                            cm.sendOk("����,�����ǵ�ȼ���������!!");
                            cm.dispose();
                        } else {
                            if (eim.getIntProperty("guestBlessings") == 1) {
                                cm.sendYesNo("���Ŵ�ҵ���,������װ�!");
                                state = 0;
                            } else {
                                cm.sendOk("����������һ��.��ô�����һ���ɶ԰�~���ֵ��ɶԼ�����ʼ!");
                                cm.dispose();
                            }
                        }
                    } else if (wstg == 3) {
                        cm.sendOk("����!������˵İ��������ʱ�˿̵�����һ����ҫĿ!������֮��������ʮ��,ֱ�������ľ�ͷ.������׼��#r�μӽ���ɶ�#k,�װ���������~��������»��ȥ����һ����!");
                        cm.dispose();
                    } else {
                        cm.sendOk("��ʱ����...�������ǵĶ���,�ɴ��۾�!���Ǿ�Ҫ������!");
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
    
                    cm.sendOk("��������,�ҵ�����!�������׳��İ��Ѿ����ҵİ������ں�,��Ϊ��һ�ݸ���İ�,��ݰ��������������ڳ������˵�����,��ȼ����!�غ�~");
                    cm.dispose();
                } else {            // couple wants to complete the wedding
                    var wstg = eim.getIntProperty("weddingStage");
    
                    if (wstg == 2) {
                        var pid = cm.getPlayer().getPartnerId();
                        if (pid <= 0) {
                            cm.sendOk("��~��?��ô����,���ǲ���Ū����ʲô����?�ҵ���,������ʲô��?");
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
                                            cm.sendOk("���Ѿ�������,������ȴ���İ�������.");
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
    
                                            cm.getMap().dropMessage(6, "Τ��:��ʱ�˿�,������ף������,ףԸ���ǵİ����쳤�ؾ�.�����ڳ�����������֤,���ǵ����Խ��᲻����,���ǵ��Ľ���Զ����һ��.��������,��һ����!");
                                            eim.schedule("showMarriedMsg", 2 * 1000);
                                        }
                                    } else {
                                        eim.setIntProperty("confirmedVows", player.getId());
                                        cm.getMap().dropMessage(6, "��������: " + player.getName() + " ȷ�������ǵİ�������!�õ�,����������ֻ��һ��֮ң��!");
                                    }
    
                                    break;
    
                                case -1:
                                    cm.sendOk("����֮�е�һ�˺����ǰѶ���ʱ�����Ľ�ָ���ǽ�ָ��Ū����.��ô���?");
                                    break;
    
                                case -2:
                                    cm.sendOk("����֮�е�һ�˺����ǰѶ���ʱ�����Ľ�ָ���ǽ�ָ��Ū����.��ô���?");
                                    break;
    
                                case -3:
                                    cm.sendOk("�ð�,��������û����ڴ����ŵ�#r#t4000313##k,�����Ķ�����?�ú����Ұ�,����~");
                                    break;
    
                                case -4:
                                    cm.sendOk("��,��Ĵ��ȷʵҲ�ܺÿ�,�������ϴ��������Լ���׳ɵ�����,���ҶԻ�ǰ���ȴ��������.");
                                    break;
    
                                case 1:
                                    cm.sendOk("��ճ�һ��װ��������Ż��,������?");
                                    break;
    
                                case 2:
                                    cm.sendOk("��ճ�һ��װ��������Ż��,������?");
                                    break;
    
                                case 3:
                                    cm.sendOk("�ð�,��������û����ڴ����ŵ�#r#t4000313##k,�����Ķ�����?�ú����Ұ�,����~û�����ɽ��в�����һ�׶���.");
                                    break;
    
                                case 4:
                                    cm.sendOk("��,��Ĵ��ȷʵҲ�ܺÿ�,�������ϴ��������Լ���׳ɵ�����,���ҶԻ�ǰ���ȴ��������.");
                                    break;
                            }
    
                            cm.dispose();
                        } else {
                            cm.sendOk("��,��İ��º��񲢲������ﰡ...����,���˫������һ��ȱϯ�Ļ�,���ǲ��Ὺʼ��һ�׶ε�.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("�غ�!����������һ��#b�Ϸ�����#k��,��������赺ϰ�,��ϲ����!");
                        cm.dispose();
                    }
                }
            }
        }
    }