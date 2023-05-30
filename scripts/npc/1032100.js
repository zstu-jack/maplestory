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
            cm.sendNext("����" + item + "�ɲ�����. ����������������.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getLevel() >= 40) {
                cm.sendNext("�ǰ�...���������е�������ʿ�����ǣ�������Ӧ�������೤�ڽӴ�......��������ǿ�������Ӧ�ÿ������⣿���������˲��ϣ��ҿ���Ϊ������ħ����Ʒ��");
            } else {
                cm.sendOk("�ҿ�������ϡ��������Ʒ��������������İ�����ṩ�������");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendSimple("����Ҫ��ʲô#b\r\n#L0#��ʯ#l\r\n#L1#��ʯ#l\r\n#L2#����ë#l");
        } else if (status == 2) {
            selected = selection;
            if (selection == 0) {
                item = "#v4011007##r#z4011007#";
                cm.sendYesNo("���ԣ�����Ҫ��" + item + "? \r\n��ô����Ҫ�Ĳ�����: #b1��#v4011000##z4011000##k, #b1��#v4011001##z4011001##k, #b1��#v4011002##z4011002##k, #b1��#v4011003##z4011003##k, #b1��#v4011004##z4011004##k, #b1��#v4011005##z4011005##k, #b1��#v4011006##z4011006##k. Ȼ���� 10,000 ���");
            } else if (selection == 1) {
                item = "#v4021009##r#z4021009#";
                cm.sendYesNo("���ԣ�����Ҫ��" + item + "? \r\n��ô����Ҫ�Ĳ�����: #b1��#v4021000##z4021000##k, #b1��#v4021001##z4021001##k, #b1��#v4021002##z4021002##k, #b1��#v4021003##z4021003##k, #b1��#v4021004##z4021004##k, #b1��#v4021005##z4021005##k, #b1��#v4021006##z4021006##k, #b1��#v4021007##z4021007##k, #b1��#v4021008##z4021008##k. Ȼ���� 15,000 ���");
            } else if (selection == 2) {
                item = "#v4031042##r#z4031042#";
                cm.sendYesNo("���ԣ�����Ҫ��" + item + "? \r\n��ô����Ҫ�Ĳ�����: #b1��#v4001006##z4001006##k, #b1��#v4021008##z4021008##k, #b1��#v4021009##z4021009##k. Ȼ���� 30,000 ���");
            }
        } else if (status == 3) {
            if (selected == 0) {
                if (cm.haveItem(4011000) && cm.haveItem(4011001) && cm.haveItem(4011002) && cm.haveItem(4011003) && cm.haveItem(4011004) && cm.haveItem(4011005) && cm.haveItem(4011006) && cm.getMeso() >= 10000) {
                    cm.gainMeso(-10000);
                    for(var i = 4011000; i<4011007; i++) {
                        cm.gainItem(i,-1);
                    }
                    cm.gainItem(4011007, 1);
                    cm.sendNext("���ˣ�������� " + item + "�����ܲ���ɣ���Ϊʹ�������ʵĲ��ϡ��������ʲô��Ҫ��æ�ģ���ʱ�����ҡ�");
                } else {
                    cm.sendNext("��ȷ�������˽��ô������һ�£���û�д���#v4011000##z4011000#��#v4011001##z4011001#��#v4011002##z4011002#��#v4011003##z4011003#��#v4011004##z4011004#��#v4011005##z4011005#��#v4011006##z4011006#��һ����");
                }
            } else if (selected == 1) {
                if (cm.haveItem(4021000) && cm.haveItem(4021001) && cm.haveItem(4021002) && cm.haveItem(4021003) && cm.haveItem(4021004) && cm.haveItem(4021005) && cm.haveItem(4021006) && cm.haveItem(4021007) && cm.haveItem(4021008) && cm.getMeso() >= 15000) {
                    cm.gainMeso(-15000);
                    for(var j = 4021000; j<4021009; j++) {
                        cm.gainItem(j,-1);
                    }
                    cm.gainItem(4021009, 1);
                    cm.sendNext("���ˣ�������� " + item + "�����ܲ���ɣ���Ϊʹ�������ʵĲ��ϡ��������ʲô��Ҫ��æ�ģ���ʱ�����ҡ�");
                } else {
                    cm.sendNext("��ȷ�������˽��ô������һ�£���û�д���#v4021000##z4021000#��#v4021001##z4021001#��#v4021002##z4021002#��#v4021003##z4021003#��#v4021004##z4021004#��#v4021005##z4021005#��#v4021006##z4021006#��#v4021007##z4021007#��#v4021008##z4021008#��һ����");
                }
            } else if (selected == 2) {
                if (cm.haveItem(4001006) && cm.haveItem(4011007) && cm.haveItem(4021008) && cm.getMeso() >= 30000) {
                    cm.gainMeso(-30000);
                    for(var k = 4001006; k<4021009; k+=10001) {
                        cm.gainItem(k,-1);
                    }
                    cm.gainItem(4031042, 1);
                    cm.sendNext("���ˣ�������� " + item + "�����ܲ���ɣ���Ϊʹ�������ʵĲ��ϡ��������ʲô��Ҫ��æ�ģ���ʱ�����ҡ�");
                } else {
                    cm.sendNext("��ȷ�������˽��ô������һ�£���û�д���#v4001006##z4001006#��#v4011007##z4011007#��#v4021008##z4021008#��һ����");
                }
            }
            cm.dispose();
        }
    }
}