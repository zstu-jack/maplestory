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
 * Gachapon Script - Henesys, currently with Ellinia items
 * @author Moogra
 * @NPC : Gachapon - Henesys
 * @NPC ID : 9100101
 * TODO: FINISH REAL TEXT, use sendSimpleNext for text selection
*/

var status = 0;
var remoteGachapon = false;
var ticketId = 5220000;

function start() {
	if(remoteGachapon)
		ticketId = 5451000;
		
    if (cm.haveItem(ticketId)) {
        cm.sendYesNo("�����ʹ�ÿ��ְٱ��䡣Ҫʹ�ÿ��ְٱ�ȯ��");
    } else {
        cm.sendSimple("��ӭʹ�� " + cm.getPlayer().getMap().getMapName() + " ���ְٱ��䡣��ѡ������Ҫ�ķ���\r\n\r\n#L0#���ְٱ�����ʲô��#l\r\n#L1#Ӧ����λ�ÿ��ְٱ�ȯ��#l");
    }
}

function action(mode, type, selection){
	if(mode == -1) {
		cm.dispose();
	} else if (mode == 1 && cm.haveItem(ticketId)) {
		if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
			cm.gainItem(ticketId, -1);
			cm.doGachapon();
		} else {
			cm.sendOk("�������#rװ��������������������#k��#r������#k����������һ����λ��");
		}
		cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendNext("���ְٱ������и���ϡ�еľ��ᡢװ�������ӡ��Լ��������ص��ߡ�ÿʹ��һ��#b���ְٱ�ȯ#k���Ϳ��Դ��������ȡһ����Ʒ��");
            } else if (selection == 1) {
                cm.sendNext("���ְٱ�ȯ���Դ�#r�ֽ��̳�#k�й��򣬻���NX�������Ҷ����ɶһ�������������·��ĺ�ɫ�̳ǰ�ť������#r�ֽ��̳�#k�󼴿ɹ���");
            } else if (status == 2) {
                cm.sendNext("ʹ��" + cm.getPlayer().getMap().getMapName() + "���ְٱ���ʱ�����п��ܻ��" + cm.getPlayer().getMap().getMapName() + "������ص��ߡ�");
                cm.dispose();
            } else {
				
			}
        } else {
			cm.dispose();
		}
    }
}