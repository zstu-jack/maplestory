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
 * @npc: Amos
 * @map: Entrance of Amorian Challenge (670010100)
 * @func: Amoria PQ
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
                        em = cm.getEventManager("AmoriaPQ");
                        if(em == null) {
                                cm.sendOk("The Amoria �������������һ������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<������񣺻�������ս>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nIf you're brave enough to attempt the Amorian Challenge, join with others like you and let your #bparty leader#k talk to me. If a party filled with whole married couples register to the challenge, better prizes awaits there.#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
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
                                cm.sendOk("#e#b<������񣺻�������ս>#k#n\r\nI am Amos, hoster of the well-round famed Amorian Challenge. The instance consist of many team puzzles, where cooperation is the fundamental key for progress. Team up with other players to attempt for the bonus stage, where many goodies can be obtained at the end of the instance. If an all-couple party is formed, they can get even better prizes on the extra bonus stage.");
                                cm.dispose();
                        }
                }
        }
}
