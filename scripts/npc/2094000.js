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
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
*/

var status = 0;
var em = null;

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
                
                if (status == 0) {
                        em = cm.getEventManager("PiratePQ");
                        if(em == null) {
                                cm.sendOk("�������������������һ������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<������񣺺�����>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�������ҵĶ��ӱ����Ҵ�������µ� #r�Ϻ���#k ����ˡ������ǰ����...������ټ������һ֧������������������� #b�ӳ�#k �����ҶԻ��������Լ�������ӡ�#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
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
                                                cm.sendOk("Ŀǰ�޷�ִ���������ԭ��������������������Ҫ������д��ڲ������ʸ�ĳ�Ա����ӳ�Աû�н��뱾��ͼ֮һ�����ȱ����ӳ�Ա���볢������������ܡ�");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<������񣺺�����>#k#n\r\n�������������У����ǵ��������𲽴�Խ���Ҵ�����·�����еĺ�����ͽ���ִ� #r�Ϻ���#k ���ڵĵط�ʱ��֮ǰ�׶ο����ı���Խ�࣬�Ϻ���չ�ֳ���ʵ��Ҳ��Խǿ������Ҫ���־��衣����˵���ı��䣬�������Ϊȫ���ṩ�ܶ���⽱�����ǳ�ֵ��һ�ԡ�ף���Ǻ��ˡ�");
                                cm.dispose();
                        }
                }
        }
}