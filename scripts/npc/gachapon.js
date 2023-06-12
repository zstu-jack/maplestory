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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var ticketId = 5220000;
var mapName = ["���ִ�", "ħ������", "��ʿ����", "��������", "����֮��", "�Ŵ�����", "���ã��У�", "���ã�Ů��", "��߳�", "��Ҷ��", "����ѩ��", "ŵ����˹"];
var curMapName = "";

function start() {
    status = -1;
	curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9100109 ? 9 : 11];
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
			if (cm.haveItem(ticketId)) {
				cm.sendYesNo("�����ʹ��" + curMapName + "���ְٱ��䡣Ҫʹ�ÿ��ְٱ�ȯ��");
			} else {
				cm.sendSimple("��ӭʹ��" + curMapName + " ���ְٱ��䡣��ѡ������Ҫ�ķ���\r\n\r\n#L0#���ְٱ�����ʲô��#l\r\n#L1#�ҿ��Դ������򵽿��ְٱ�ȯ�أ�#l");
			}
		} else if(status == 1 && cm.haveItem(ticketId)) {
			if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
				cm.gainItem(ticketId, -1);
				cm.doGachapon();
			} else {
				cm.sendOk("����#rװ����������������������������#k����������һ���λ��");
			}
			cm.dispose();
		} else if(status == 1) {
			if (selection == 0) {
                cm.sendNext("���ְٱ������и���ϡ�еľ��ᡢװ�������ӡ��Լ��������ص��ߡ�ÿʹ��һ��#b���ְٱ�ȯ#k���Ϳ��Դ��������ȡһ����Ʒ��");
            } else {
                cm.sendNext("���ְٱ�ȯ���Դ�#r�ֽ��̳�#k�й��򣬻���NX�������Ҷ����ɶһ�������������·��ĺ�ɫ�̳ǰ�ť������#r�ֽ��̳�#k�󼴿ɹ���");
            }
		} else if(status == 2) {
			cm.sendNextPrev("ʹ��" + curMapName + "���ְٱ���ʱ�����Ի�ø��ָ����ĵ��ߡ������п��ܻ��" + curMapName + "������ص��ߺ;��ᡣ");
		} else {
			cm.dispose();
		}
    }
}