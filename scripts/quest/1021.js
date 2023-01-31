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
/* Author: Xterminator
 * Edited by XxOsirisxX

	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0)
            qm.sendNext("�����" + (qm.getPlayer().getGender() == 0 ? "С���" : "С���") + "�����޽ܣ�һ�����Խ̿ɰ���ð�ռ��Ǻܶ�������Ϣ���ˡ�");
        else if (status == 1)
            qm.sendNextPrev("��������˭����������Щ�ģ�\r\n�����Լ���������������ֻ�Ƕ�������Щ������ð�ռ��Ѻ�һЩ��");
        else if (status == 2)
            qm.sendAcceptDecline("���ԣ���������һЩ��Ȥ������ɣ�һ���������");
        else if (status == 3) {
            if (qm.getPlayer().getHp() >= 50) {
                qm.getPlayer().updateHp(25);
            }
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            qm.forceStartQuest();
            qm.sendNext("���ŵ�����������Ѫ�������0����ô��������鷳�ˡ����ڣ��һ����һ�� #r�޽ܵ�ƻ��#k��������ʹ������Ȼ����ͻ�ָ�����������Ʒ���棬Ȼ��˫��ʹ�á��٣���һ�����Ӽ򵥴���Ʒ����ķ������Ǿ��ǰ��� #bI#k ����");
        } else if (status == 4) {
            qm.sendPrev("��ʹ�����Ҹ��������ƻ������ͻῴ��Ѫ�����ڻָ��������Ѫ���ָ���100%���ٺ��ҶԻ�~");
        } else if (status == 5) {
            qm.showInfo("UI/tutorial.img/28");
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (qm.c.getPlayer().getHp() < 50) {
                qm.sendNext("�٣����Ѫ����û����ȫ�ָ�����ȷ�����Ѿ�ʹ�����Ҹ�������е�ƻ����");
                qm.dispose();
            } else {
                qm.sendNext("ʹ����Ʒ����˵ļ򵥣��԰ɣ���������� #b��ݼ�#k �����½ǵĿ��������������ǲ��ǵ�һ����˵��\r\n�������һ�����֣���Ӧ�ò�֪�����ǣ�Ѫ��ͨ��������ʱ��������Զ��ָ����õģ���Ȼ������һЩʱ�䣬������������Ǳ���ѧ���һЩ֪ʶ��");
            }
        } else if (status == 1) {
            qm.sendNextPrev("�ðɣ�������ѧ���˺ܶ࣬�ҽ�����һ�������������ð�յ��������еıر���Ʒ������лл�Ұɣ���ס�����ڽ��������ʹ�ã�");
        } else if (status == 2) {
            qm.sendPrev("�ðɣ���������ܽ����ȫ���ˡ���֪������ѹ�������ʱ��˵�ټ��ˡ����أ�ף����ˣ��ҵ����ѣ�\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 ����");
        } else if (status == 3) {
            if (qm.isQuestCompleted(1021)) {
                qm.dropMessage(1, "δ֪�Ĵ���");
            } else if (qm.canHold(2010000) && qm.canHold(2010009)) {
                qm.gainExp(10);
                qm.gainItem(2010000, 3);
                qm.gainItem(2010009, 3);
                qm.forceCompleteQuest();
            } else
                qm.dropMessage(1, "��ı�������");
            qm.dispose();
        }
    }
}