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
                    cm.sendOk("PQ������һ����������ϵGM�����ͼ.#b#l");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<Party Quest: Primrose Hill>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nI'm Tory. Inside here is a beautiful hill where the primrose blooms. There's a tiger that lives in the hill, Growlie, and he seems to be looking for something to eat. Would you like to head over to the hill of primrose and join forces with your party members to help Growlie out?#b\r\n#L0#I want to participate in the party quest.\r\n#L1#I would like to " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "disable" : "enable") + " Party Search.\r\n#L2#I would like to hear more details.\r\n#L3#I would like to redeem an instance hat.");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("����ط������ص����¹⻷�����ţ�һ���˲��������롣");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("������볢�ԣ������ #b��Ӷӳ�#k ����˵��.#b#l");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("��һ���ѽ��� #r��������#k ������볢����һ��Ƶ�������ߵȴ���ǰ���������.#b#");
                            }
                        }
                        else {
                            cm.sendOk("�㻹���ܿ�ʼ����Ŷ���������ŶӲ��ڵ�ǰ��ͼ��Χ�ڣ�������Ķ�Աû���ʸ���롣����������⣬���ԡ��Ŷ���������");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("�����Ŷ�����״̬Ϊ: #b" + (psState ? "����" : "����") + "#k. ������ĵ�ʱ��͸���˵��");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<Party ����: ӣ��ɽ>#k#n\r\n�ӵ�ͼ�ײ��Ļ������ռ����������ӣ��������Ƿ����Ϸ���ƽ̨�ϡ����������ӵ���ɫ����ƥ������������볢���ҵ���ȷ����ϡ������е����Ӷ������֣��ڶ����ֵ����񼴽���ʼ�������û���֣�ͬʱ���᲻��������⡣�ռ����㹻����⣬�����·�NPC��������������ˡ�");
                    cm.dispose();
                } else {
                    cm.sendYesNo("����������#b20��#b#t4001158##k�������ر��ñ��?");
                }
            } else {
                if (cm.hasItem(4001158, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001158, -20);
                        cm.gainItem(1002798, 20);
                        cm.sendNext("�����ɹ�");
                    }
                } else {
                    cm.sendNext("��û���㹻�� #t4001158# ���һ�ʧ�ܡ�");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("�����������ˣ�������һ���������ڷ��������������Ȥ����鿴#b����#k�Ի�ȡ��Ϣ��������Ҫֱ�����ִ���?");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("���������Ŀռ䲻���ˡ���ý���ǰ�������±����ɡ�");
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
                    cm.sendOk("���������Ŀռ䲻���ˡ���ý���ǰ�������±����ɡ�");
                }
                cm.dispose();
            }
        }
    }
}