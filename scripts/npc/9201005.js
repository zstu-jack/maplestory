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
                    var text = "��ӭ����#b����#k!����ʲô�ܰ�����?";
                    var choice = ["�Ҹ���γﱸ����?", "�Ҷ�����,��Ҫ�ﱸ����.", "���Ǳ���,��Ҫ�μӻ���."];
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
    
                    if (cm.haveItem(5251100)) {
                        text += "\r\n#L" + x + "##b������������#l";
                    }
    
                    cm.sendSimple(text);
                } else if (status == 1) {
                    switch (selection) {
                        case 0:
                            cm.sendOk("����,��Ҫ��ĳ��#b����#k.Ȼ��ȥ��#p9201000#���������ָ.���������,����һ��#b#t" + weddingEntryTicketCommon + "##k.\r\n����Ķ����ָ�������Ʊһͬ������.�Ҿͻ�Ϊ��Ԥ������,��������#r15�� �������#k.����Խ���Щ���ַ���������,ÿ�����ɹ�1λ�����볡.");
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
                                        cm.sendOk("������#r" + placeTime + "#k��ʼ.�������,�ɱ�ٵ���!");
                                    } else {
                                        var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                        if (partner == null) {
                                            cm.sendOk("��İ����ƺ���������...������һͬǰ���Ǽ�!");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                            cm.sendOk("�������İ����Ѿ�ӵ��һö����ָ��.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.getMap().equals(partner.getMap())) {
                                            cm.sendOk("������İ���һͬǰ���Ǽ�.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                            cm.sendOk("�������İ��µ�������û���㹻�ռ�.�޷�������.�Ǽ�ǰ���ڱ����������㹻��Ŀ�λ.");
                                            cm.dispose();
                                            return;
                                        }
    
                                        if (!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                            cm.sendOk("��Ǹ...���ݻ����������,����˫���޷�����,������������#b#p9201014##k��ѯ.");
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
    
                                                var wedType = weddingType ? "�߼�" : "��ͨ";
                                                cm.sendOk("��λ���˶������15�����,�뽫���Ƿַ���������. #b˫�����#k�������͸���Ҫ�������.����#r����ʼǰ#k�������.����#b" + wedType + "����#k ����#r" + placeTime + "#k����.�봩�����,��ʱ�볡!");
    
                                                player.dropMessage(6, "��������:��λ���˶������15�����, ���ڻ���ʼǰ�������.����" + wedType + "������" + placeTime + "����.�봩�����,��ʱ�볡!");
                                                partner.dropMessage(6, "��������:��λ���˶������15�����, ���ڻ���ʼǰ�������.����" + wedType + "������" + placeTime + "����.�봩�����,��ʱ�볡!");
    
                                                if (!hasSuitForWedding(player)) {
                                                    player.dropMessage(5, "��������:��ϯ����ǰ,�����˹���һ�����.��������ڻ��������ߵĽ����Ʒ�깺��.");
                                                }
    
                                                if (!hasSuitForWedding(partner)) {
                                                    partner.dropMessage(5, "��������:��ϯ����ǰ,�����˹���һ�����.��������ڻ��������ߵĽ����Ʒ�깺��.");
                                                }
                                            } else {
                                                cm.sendOk("���Ļ���ԤԼ�ո��ύ,���Ժ�����.");
                                            }
                                        } else {
                                            cm.sendOk("�ύ����ԤԼǰ,��ȷ������#b#t" + weddingEntryTicketCommon + "##k�Ѵ��̳Ǳ�������ȡ��.");
                                        }
                                    }
                                } else {
                                    cm.sendOk("����ԤԼ��������,���Ժ�����.");
                                }
    
                                cm.dispose();
                            } else {
                                cm.sendOk("��û�ж����ָ.");
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
                                            cm.sendOk("ϣ�����ڻ���������һ�����õĻ���.�����ڼ��뱣�ܺ����Ļƽ��Ҷ,�Ա�֤����������������.");
                                        } else {
                                            cm.sendOk("���Ժ�,���������볡.");
                                            cm.dispose();
                                        }
                                    } else {
                                        cm.sendOk("��Ǹ,��û�����뺯.");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("����û�л���Ԥ��.");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("��û��#b#t" + weddingGuestTicket + "##k.");
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
                                    cm.sendOk("��ճ�����һ���������Ի�ȡ���.");
                                }
                            } else {
                                cm.sendOk("��Ŀǰ��δԤ������,�޷��������.");
                            }
    
                            cm.dispose();
                    }
                } else if (status == 2) {   // registering guest
                    var eim = getMarriageInstance(wid);
    
                    if (eim != null) {
                        cm.gainItem(weddingGuestTicket, -1);
                        eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                    } else {
                        cm.sendOk("��������μӵĻ���Ŀǰ��δ��ʼ.");
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
                            cm.sendOk("��ӭ����#b#m" + cm.getMapId() + "##k.������������������ڴ˵������Ⱥ�.\r\n\r\n������ʽ��ʼʱ,���˿����볡����ʥ̳,��ʱ������ǽ���#b������#k���ξ���.");
                        } else {
                            cm.sendOk("��ӭ����#b#m" + cm.getMapId() + "##k.��ӭ��λ����Ⱥ��ڴ�,���߻���·�ϵı���.������ʽ��ʼʱ,���˿����볡����ʥ̳,");
                        }
    
                        cm.dispose();
                    } else {
                        cm.sendYesNo("#b����������#k�Ѿ�ǰ��������,����Ҫ�����볡��?");
                    }
                } else if (status == 1) {
                    cm.warp(weddingAltarMapid, "sp");
                    cm.dispose();
                }
            }
        }
    }