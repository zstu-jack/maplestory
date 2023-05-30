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

/*
    NPC ID: 1052013 
    NPC NAME: Computer
    @author Ronan
*/

var status;
var pqArea;
 
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
                
                if(cm.getMapId() != 193000000) {
                        var eim = cm.getEventInstance();
                    
                        if(status == 0) {
                                if(!eim.isEventCleared()) {
                                        var couponsNeeded = eim.getIntProperty("couponsNeeded");
                                    
                                        if(cm.isEventLeader()) {
                                                if(cm.haveItem(4001007, couponsNeeded)) {
                                                        cm.sendNext("�����ռ������㹻���ͨ��֤���ɵ�Ư����");
                                                        cm.gainItem(4001007, couponsNeeded);
                                                        eim.clearPQ();

                                                        cm.dispose();
                                                        return;
                                                } else {
                                                        cm.sendYesNo("������Ҫ�ռ� #r" + couponsNeeded + "#k ��ͨ��֤����ɱ��ؿ����õ��㹻����������������˵��...����������#b�����뿪#k��? ��ע�⣬��������뿪�Ļ���#r��Ķ����ԱҲ��һ���˳���ͼ#k��");
                                                }
                                        } else {
                                                cm.sendYesNo("������Ҫ�ռ� #r" + couponsNeeded + "#k ��ͨ��֤����ɱ��ؿ�������Ķӳ�������˵��...����������#b�����뿪#k��? ��ע�⣬��������뿪�Ļ������齫#r�޷�������������ͨ���˹ؿ�#k��");
                                        }
                                } else {
                                        if(!eim.giveEventReward(cm.getPlayer())) {
                                                cm.sendOk("��ȷ�����������㹻�Ŀռ��Ի�ý�����");
                                                cm.dispose();
                                        } else {
                                                cm.warp(193000000);
                                                cm.dispose();
                                        }
                                }
                        } else if(status == 1) {
                                cm.warp(193000000);
                                cm.dispose();
                        }
                } else {
                        var levels = ["#m190000000#", "#m191000000#", "#m192000000#", "#m195000000#", "#m196000000#", "#m197000000#"];
                        if (status == 0) {
                                var sendStr = "����·�ɶ�������˶��ֶ����Ĺ����������ɣ��ܹ���Ϊ��#p1052014#����ȡ��������Ƥ�����볡������ѡ������Ҫ���������:\r\n\r\n#b";
                                for(var i = 0; i < 6; i++) {
                                    sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
                                }

                                cm.sendSimple(sendStr);
                        } else if (status == 1) {
                                pqArea = selection + 1;
                            
                                em = cm.getEventManager("CafePQ_" + pqArea);
                                if(em == null) {
                                        cm.sendOk("������������� " + pqArea + " �����˴���");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        status = 1;
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<������񣺱���· - " + levels[selection] + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n #p1052014# �����з�ʽ���ڲ�ͬ������������һ�ٱ�ȯ���У����ǻ���#r��Ƥ#k, ���ǿ���ͨ����ɱ���·����������á���Ҫ����˴�ð�գ���ҪѰ�Ҷ���ִ��������񡣽���������������ǵ� #b�ӳ�#k ���ҶԻ���#b\r\n#L0#����ִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "ֹͣ" : "��ʼ") + " ���������\r\n#L2#�����˽����ϸ�ڡ�");
                        } else if (status == 2) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("������ɶ�����ٳ�����ս��");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("ֻ�жӳ����Կ�������������öӳ������ҶԻ���");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("��Ƶ���Ѿ��ж������ڽ������������ȴ���������������л�������Ƶ����");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�����޷���ʼ����������.��Ϊ�����������,������ӳ�Ա�д��ڲ������ʸ�ĳ�Ա,�ֻ�����������ӳ�Աû�н���˵�ͼ.���ȱ����ӳ�Ա,�볢��ʹ�������������.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("�����Ŷ�����״̬Ϊ: #b" + (psState ? "����" : "�ر�") + "#k. ������ĵ�ʱ��͸���˵��");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<������񣺱���·��>#k#n\r\n�����ͼ�󣬶�Ա�ǽ���Դ�����Ӧ�ȼ��Ĺ�������������ռ������е�ͨ��֤�����ҡ���ؿ���Ӧ�أ�ÿλ��Ա�������յ�һö��Ƥ�����Զ��ۻ���������ʹ��#b��ͬ����Ƥ���Ƕ�ö��ͬ����Ƥ#k���������õĽ�����");
                                        cm.dispose();
                                }
                        }
                }
        }
}