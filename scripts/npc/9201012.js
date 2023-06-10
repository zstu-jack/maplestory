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
/* Wayne
	Marriage NPC
 */

    var status;
    var state;
    var eim;
    var weddingEventName = "WeddingChapel";
    var cathedralWedding = false;
    
    
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
    
    function getMarriageInstance(player) {
        var em = cm.getEventManager(weddingEventName);
    
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
            var eim = iterator.next();
            if (eim.isEventLeader(player)) {
                return eim;
            }
        }
    
        return null;
    }
    
    function start() {
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
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }
    
                if (hasEngagement) {
                    var text = "���,�Ȳ�������Ҫ��δ���޶����������������?";
                    var choice = new Array("���Ǿ������.");
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
                    cm.sendSimple(text);
                } else {
                    cm.sendOk("��ô,��λ���ڻ������л�����?û��,һ�ᵽ���,��������뵽�ľ��ǻ����,��������.���ǵĽ��û�Ϊð�ռ����ṩð�յ���������õĻ������,�������������.");
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
                                cm.sendOk("��ճ�һ���������Ի�ȡ#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!partner.canHold(4000313)) {
                                cm.sendOk("��������İ��¿ճ�һ���������Ի�ȡ#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(cm.getPlayer(), false)) {
                                cm.sendOk("�빺��ʱ�е�#�������r#k,������!��ʱ���ù��������~");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(partner, false)) {
                                cm.sendOk("��������İ��¹���ʱ�е�#�������r#k,������!��ʱ���ù��������~");
                                cm.dispose();
                                return;
                            }
    
                            cm.sendOk("�ܺ�!һ��������Լ���ͣ��,������������,����!�����,�����ǰ����ո�����!!!");
                        } else {
                            cm.sendOk("��...��İ��º����ڱ�ĵط�.������Ҫ���˹�ͬ��ϯ,�����̫������.");
                            cm.dispose();
                        }
                    } else {
                        var placeTime = cserv.getWeddingReservationTimeLeft(wid);
    
                        cm.sendOk("Yo!��Ļ�����#r" + placeTime + "#k,����������·�,��ٵ���,֪����?");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�Բ���,����û�������Ƶ����ǰԤԼ.");
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
                                    cm.sendOk("����ﱸ������δ֪�Ĵ���,���Ժ�����.");
                                }
    
                                cm.dispose();
                            } else {
                                cm.sendOk("����ﱸ������δ֪�Ĵ���,���Ժ�����.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("����ﱸ������δ֪�Ĵ���,���Ժ�����.");
                            cm.dispose();
                        }
                    } else {    // partner already decided to start
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("��...��İ��º����ڱ�ĵط�.������Ҫ���˹�ͬ��ϯ,�����̫������.");
                    cm.dispose();
                }
            }
        }
    }