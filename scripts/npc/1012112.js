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
/**
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
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

        if (cm.getMapId() == 100000200) {
            if (status == 0) {
                em = cm.getEventManager("HenesysPQ");
                if (em == null) {
                    cm.sendOk("����������˴�������ϵGM���ṩ��ͼ.#b#l");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<�������: ӭ�»�ɽ��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�ˣ����Ǵ��������ȥӭ�»�ɽ��̽����������ɽ��Ұ����ӭ�»���������ɽ����һֻ�����˶����ϻ������ƺ���Ѱ��Щ�Եġ����Ƿ�Ը�����Ķ�Աһ����ɽ������Ѱ������Ե�����أ�#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#�����˽����ϸ��\r\n#L3#����Ҫ�һ�#t1002798#");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("���ﱻ���µ��������������֣��κ��˶��޷����Դ��롣");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("�����ִ���������������Ķӳ������ҶԻ���");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
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
                } else if (selection == 2) {
                    cm.sendOk("#e#b<�������: ����ӭ�»�ɽ��>#k#n\r\n�ڽ���ɽ�����ᷢ�ֵ�ͼ�·������˻��䣬����Դ��������ϻ��ӭ�»����ӣ������������������������ܵ�ƽ̨�ϣ��ͻ᳤��ӭ�»�������Ҫ�ҵ���ȷ����ֲƽ̨�ſ�����ӭ�»�ʢ��Ŷ�������е����Ӷ��ɹ����ֺ�����ĵڶ��׶ξͿ�ʼ�ˣ���������±�Ϊ���£����á���������֣������͵�Ϊ�������˶�������⣬����ʱ�������Ķ�Ա��Ҫһ�𱣻�����������Χ����Ľ�������������˳��������⡣һ���������������˶��󱥿ڸ������������������̸���Ϳ�����������ˡ����ˣ���˵һ�䣬�������Զ��ռ�Щ��⣬�һ��ڽ�����ͼ����һЩ����Ľ���Ŷ�����͡�");
                    cm.dispose();
                } else {
                    cm.sendYesNo("����������#b20��#b#t4001158##k���һ�#b#t1002798##k?");
                }
            } else {
                if (cm.hasItem(4001158, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001158, -20);
                        cm.gainItem(1002798, 1);//cm.gainItem(1002798, 20);�޸���ԭ�ű����׵ĵط�
                        cm.sendNext("�һ��ɹ�");
                    }
                } else {
                    cm.sendNext("��û���㹻�� #t4001158# ���һ�ʧ�ܡ�");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("лл����˶��İ�������������˶��ĸ�л���һ�������������Ҳ��һЩ�������㡣��������Ȥ�Ļ������Ժ���ߵ� #b�����#k ���ġ�");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("������ı���װ�����Ƿ��п�λ��");
                }
                cm.dispose();
            }
        } else if (cm.getMapId() == 910010400) {
            if (status == 0) {
                cm.sendYesNo("����Ҫ�����ִ���");
            } else if (status == 1) {
                if (cm.getEventInstance() == null) {
                    cm.warp(100000200);
                } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("������ı���װ�����Ƿ��п�λ��");
                }
                cm.dispose();
            }
        }
    }
}
