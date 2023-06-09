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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
*/

var status = 0;
var state;
var em = null;

function start() {
	status = -1;
        state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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

                if (status == 0) {
                        if(state == 1) {
                                cm.sendYesNo("����Ҫ�뿪������");
                        }
                        else {
                                em = cm.getEventManager("KerningPQ");
                                if(em == null) {
                                        cm.sendOk("���������������������һ������");
                                        cm.dispose();
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                            
                                cm.sendSimple("#e#b<������񣺵�һ��ͬ��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nHow about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it without great teamwork. If you want to try it, please tell the #bleader of your party#k to talk to me.#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
                        }
                } else if (status == 1) {
                        if(state == 1) {
                                cm.warp(103000000);
                                cm.dispose();
                        }
                        else {
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
                                                        cm.sendOk("Ŀǰ�޷�ִ���������ԭ��������������������Ҫ������д��ڲ������ʸ�ĳ�Ա����ӳ�Աû�н��뱾��ͼ֮һ�����ȱ����ӳ�Ա���볢������������ܡ�");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<�������1st Accompaniment>#k#n\r\nYour party must pass through many obstacles and puzzles while traversing the sub-objectives of this Party Quest. Coordinate with your team in order to further advance and defeat the final boss and collect the dropped item in order to access the rewards and bonus stage.");
                                        cm.dispose();
                                }
                        }
                }
        }
}