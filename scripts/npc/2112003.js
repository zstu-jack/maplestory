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
 * @npc: Juliet
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
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
                    
                if(cm.getMapId() != 261000021) {
                        if(status == 0) {
                                cm.sendYesNo("We must keep fighting to save Romeo, please keep your pace. If you are not feeling so well to continue, your companions and I will understand... So, are you going to retreat?");
                        } else if(status == 1) {
                                cm.warp(926110700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_A");
                                if(em == null) {
                                        cm.sendOk("The Magatia PQ (Alcadno) has encountered an error.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�������Romeo and Juliet>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nMy beloved Romeo has been kidnapped! Although he is Zenumist's, I can't stand by and just see him suffer just because of this foolish clash. I need you and your colleagues help to save him! Please, help us!! Please have your #bparty leader#k talk to me.#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
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
                                        cm.sendOk("#e#b<�������Romeo and Juliet>#k#n\r\nNot long ago, a scientist named Yulete has been banished from this town because of his researches of combined alchemies of Alcadno's and Zenumist's. Because of the immensurable amount of power coming from this combination, it is forbidden by law to study both. Yet, he ignored this law and got hands in both researches. As a result, he has been exiled.\r\nHe is now retaliating, already took my beloved one and his next target is me, as we are big pictures of Magatia, successors of both societies. But I'm not afraid. We must recover him at all costs!\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}