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
/* Delli
	Looking for Delli 3 (925010200)
	Hypnotize skill quest NPC.
 */

var status;
 
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
                        if (cm.getMapId() != 925010400) {
                                em = cm.getEventManager("DelliBattle");
                                if(em == null) {
                                        cm.sendOk("The Delli Battle has encountered an error.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�������Save Delli>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nAh, #r#p1095000##k sent you here? Is she worried about me? ... I'm terribly sorry to hear that, but I can't really go back just yet, some monsters are under the Black Mage's influence, and it's up to me to liberate them! ... It seems you're not going to accept that either, huh? Would you like to collaborate with party members to help me? If so, please have your #bparty leader#k talk to me.#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
                        } else {
                                cm.sendYesNo("The mission succeeded, thanks for escorting me! I can lead you to #b#m120000104##k, are you ready?");
                        }
                } else if (status == 1) {
                        if (cm.getMapId() != 925010400) {
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
                                        cm.sendOk("#e#b<�������Save Delli>#k#n\r\n A ambush is under way! I must stand on the field for around 6 minutes to complete the liberation, please protect me during that time so that my mission is completed.");
                                        cm.dispose();
                                }
                        } else {
                                cm.warp(120000104);
                                cm.dispose();
                        }
                }
        }
}