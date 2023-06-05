/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/**
 * @author: Ronan
 * @npc: Mark of the Squad
 * @map: Cave of Life - Cave Entrance (240050000)
 * @func: Horntail PQ
*/

var status = 0;
var price = 100000;
var em = null;
var hasPass;

function isRecruitingMap(mapid) {
        return mapid == 240050000;
}

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if(isRecruitingMap(cm.getMapId())) {
                        if (status == 0) {
                                em = cm.getEventManager("HorntailPQ");
                                if(em == null) {
                                        cm.sendOk("The Horntail �������������һ������");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<������񣺰���������������>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n����ͨ�򰵺������ĳ�Ѩ�������Ҫ��������������������ǰ�����������н��ܿ��顣#b\r\n#L0#�����ǽ�����������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("�������״̬ʱ������ִ���������");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("�����ִ���������������Ķӳ������ҶԻ���");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("��Ƶ���Ѿ��ж�������ִ�����������ȴ���������������л�������Ƶ����");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("��Ķ�Ա���в�������붴Ѩ�����ĳ�Ա�����Ƕ����������㡣������������������ҽ�̸��");
                                                }

                                                cm.dispose();
                                        }
                                } else if(selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<������񣺰���������������>#k#n\r\n��Ϊ����������Ѩ�Ŀ����ߣ��һ�������Щ#b�м�ֵ#k��������������ڡ������Ƕ�����Щ�˶��ԣ������ͨ��Ҳ�������Թ�����������Ϳ��顣����Щ #r������սBOSS�Ķ���#k ���п��ִܵ����ǵ�������ǰ���������#r��Ϊͬ��#k�����Ƕ����������Ҳ����ã��");
                                        cm.dispose();
                                }
                        }
                } else {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("ֻ�жӳ����ܿ����밵����������̱�������");//���npc�����־�������
                        } else if(cm.getMapId() == 240050100) {
                                if(cm.haveItem(4001087) && cm.haveItem(4001088) && cm.haveItem(4001089) && cm.haveItem(4001090) && cm.haveItem(4001091)) {
                                        cm.gainItem(4001087, -1);
                                        cm.gainItem(4001088, -1);
                                        cm.gainItem(4001089, -1);
                                        cm.gainItem(4001090, -1);
                                        cm.gainItem(4001091, -1);
                                        
                                        cm.getEventInstance().warpEventTeam(240050200);
                                } else {
                                        cm.sendOk("��δ��ȡ���������ȫ��ˮ��Կ�ס�");
                                }
                        } else if(cm.getMapId() == 240050300) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("�����Ƿ��ѻ�ȡȫ��6�Ѻ�ɫԿ�׺�1����ɫԿ�ס�");
                                }
                        } else if(cm.getMapId() == 240050310) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("�����Ƿ��ѻ�ȡȫ��6�Ѻ�ɫԿ�׺�1����ɫԿ�ס�");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}