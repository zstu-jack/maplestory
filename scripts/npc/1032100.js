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
-- Odin JavaScript --------------------------------------------------------------------------------
	Arwen the Fairy - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var item;
var selected;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status == 2 && mode == 0) {
            cm.sendNext("����" + item + "�ɲ�����. ����׼���ò��ϰɡ�");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getLevel() >= 40) {
                cm.sendNext("�ǰ�...������Ů�����ʦ����Ů��Ӧ��ͬһ����ҳ�ʱ��ĽӴ�......�������õ����ҵ����ϣ��һ�����һ������ĵ��ߡ�");
            } else {
                cm.sendOk("�ҿ�������ϡ���ҹ�����Ʒ�����ǣ��Ҳ����͸�İ���ˡ�");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendSimple("����Ҫ��ʲô#b\\r\\n#L0#��ʯ#l\\r\\n#L1#��ʯ#l\\r\\n#L2#����ë#l");
        } else if (status == 2) {
            selected = selection;
            if (selection == 0) {
                item = "��ʯ";
                cm.sendYesNo("����Ҫ��" + item + "? ��ô����Ҫ�Ĳ�����: #b#t4011000##k, #b#t4011001##k,\r\n#b#t4011002##k, #b#t4011003##k, #b#t4011004##k, #b#t4011005##k, �� #b#t4011006##k. Ȼ���� 10,000 ���");
            } else if (selection == 1) {
                item = "��ʯ";
                cm.sendYesNo("����Ҫ��" + item + "? ��ô����Ҫ�Ĳ�����: #b#t4021000##k, #b#t4021001##k, #b#t4021002##k, #b#t4021003##k, #b#t4021004##k, #b#t4021005##k, #b#t4021006##k, #b#t4021007##k �� #b#t4021008##k. Ȼ���� 15,000 ���");
            } else if (selection == 2) {
                item = "����ë";
                cm.sendYesNo("����Ҫ��" + item + "? ��ô����Ҫ�Ĳ�����: #b1 #t4001006##k, #b1 #t4001007##k �� #b1 #t4001008##k. Ȼ���� 30,000 ���");
            }
        } else if (status == 3) {
            if (selected == 0) {
                if (cm.haveItem(4011000) && cm.haveItem(4011001) && cm.haveItem(4011002) && cm.haveItem(4011003) && cm.haveItem(4011004) && cm.haveItem(4011005) && cm.haveItem(4011006) && cm.getMeso() >= 10000) {
                    cm.gainMeso(-10000);
                    for(var i = 4011000; i<4011007; i++) {
                        cm.gainItem(i,-1);
                    }
                    cm.gainItem(4011007, 1);
                    cm.sendNext("��, �ú���� " + item + "�� �ҿ������˷ǳ��߼��Ĳ��ϰ������õġ����л�Ұɡ�");
                } else {
                    cm.sendNext("�������Ǯ�����ǲ��Ǳ��ˣ�Ǯ�����������ǣ�\r\n#r#t4011000##k\r\n#r#t4011001##k \r\n#r#t4011002##k \r\n#r#t4021003##k \r\n#r#t4011003##k \r\n#r#t4011005##k \r\n#r#t4011006##k\r\n���е�ĳһ�����ϲ�����");
                }
            } else if (selected == 1) {
                if (cm.haveItem(4021000) && cm.haveItem(4021001) && cm.haveItem(4021002) && cm.haveItem(4021003) && cm.haveItem(4021004) && cm.haveItem(4021005) && cm.haveItem(4021006) && cm.haveItem(4021007) && cm.haveItem(4021008) && cm.getMeso() >= 15000) {
                    cm.gainMeso(-15000);
                    for(var j = 4021000; j<4021009; j++) {
                        cm.gainItem(j,-1);
                    }
                    cm.gainItem(4021009, 1);
                    cm.sendNext("��, �ú���� " + item + "�� �ҿ������˷ǳ��߼��Ĳ��ϰ������õġ����л�Ұɡ�");
                } else {
                    cm.sendNext("�������Ǯ�����ǲ��Ǳ��ˣ���������ϸ����²����Ƿ��롣");
                }
            } else if (selected == 2) {
                if (cm.haveItem(4001006) && cm.haveItem(4011007) && cm.haveItem(4021008) && cm.getMeso() >= 30000) {
                    cm.gainMeso(-30000);
                    for(var k = 4001006; k<4021009; k+=10001) {
                        cm.gainItem(k,-1);
                    }
                    cm.gainItem(4031042, 1);
                    cm.sendNext("�������ˣ��ú� " + item + "���л�Ұɡ�");
                } else {
                    cm.sendNext("�������Ǯ�����ǲ��Ǳ��ˣ���������ϸ����²����Ƿ��롣");
                }
            }
            cm.dispose();
        }
    }
}