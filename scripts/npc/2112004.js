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
 * @npc: Romeo
 * @map: Magatia - Zenumist - Hidden Room (261000011)
 * @func: Magatia PQ (Zenumist)
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
                    
                if(cm.getMapId() != 261000011) {
                        if(status == 0) {
                                cm.sendYesNo("Ϊ����������Ҷ�����Ǳ������Ŭ�����벻Ҫ�����Ų������������޷�������ȥ����Ļ�黹���Ҷ���������...���ԣ����������˳���");
                        } else if(status == 1) {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_Z");
                                if(em == null) {
                                        cm.sendOk("��������������(�����)�����˴���");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�����������ŷ������Ҷ>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n���İ�������Ҷ������ˣ���Ȼ���ǿ�������Э��ĳ�Ա�������޷���Ϊ�ⳡ�޴�����ִ���������������Թۡ���������ͬ���ǰ��Ҿȳ����ɣ��������ǣ������ˣ����������#b�ӳ�#k�����ҶԻ���#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
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
                                        cm.sendOk("#e#b<�����������ŷ������Ҷ>#k#n\r\n����ǰ��һλ������̩��ѧ����Ϊ���о��н������뿨�����ص����������⵽������Ϊ�����������Ľ���̺��Ų���Ԥ���������������ǰ䲼�˷����ֹͬʱѧϰ���ߡ�Ȼ������̩�������������ͬʱ�����������������о�����˱������ˡ�\r\n��̩���ڽ��и���°���ҵ������˺���һ��Ŀ��ͻ����ҡ���Ϊ������������ǵ���Ƭ������Э��ļ̳��ˡ����Ҳ������£����Ǳ��벻ϧһ�д��۰���Ӫ�Ȼ�����\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}