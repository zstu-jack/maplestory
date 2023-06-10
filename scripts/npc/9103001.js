/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103001 - Rolly
*	Map =  Ludibrium - <Ludibrium>
*	NPC MapId = 220000000
*	Function = Start LMPQ
*
*/

var status = 0;

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
                        em = cm.getEventManager("LudiMazePQ");
                        if(em == null) {
                                cm.sendOk("��߳��Թ��������������һ������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<���������߳��Թ�>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n��������߳��Թ�����ڣ�ף������ÿ��ģ�\r\n#b#L0#������߳��Թ�#l\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#��߳��Թ���ʲô��");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("����ɶ�����ٳ���̽���Թ���");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("���ȷ��Ҫ�����������������Ķӳ����ҶԻ���");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��Ƶ���Ѿ��ж�������ִ�����������ȴ���������������л�������Ƶ����");
                                                }
                                        }
                                        else {
                                                cm.sendOk("��Ҫ���3�˻����ϵ���Ӳ���̽�����Թ���");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<���������߳��Թ�>#k#n\r\n����Թ�����3�������ϳ�Ա��ɵĶ��鿪�ţ����в����ߵĵȼ���Ҫ����51~70��֮�䡣�����Ҫ��15�������߳��Թ�����ҿ���ʹ��ÿ���������ĵĴ��͵�ǰ���������䣬����ϣ�����Դ��ҵ����ڡ�С����ż���ڳ��ڴ����㣬ֻҪ�����Ի��Ϳ��԰�ȫ�뿪��̽��;�п�������������Ӳ��������еĹ���ͻ�����Ʊ���������ڴ�ʱ��ȫ�ӽ����ݻ�õ���Ʊ������þ��齱��������ӳ��ύ��30�Ż����ϵ���Ʊ��ȫ�ӽ����ö��⽱���������15����֮��û�гɹ��߳��Թ�������̽��������õ��κξ��齱����������Թ����˳���Ϸ������ҽ��Զ����ͳ��Թ��������������;�˳���ֻҪ�����Ա����������3�ˣ������ԱҲ���Լ������������޷����Թ���Ľ���״��ʱ�������ƿ����Ǳ��ⷢ�����⡣�����һ���������ǻ۵Ŀ��顣ף����ˡ�");
                                cm.dispose();
                        }
                }
        }
}