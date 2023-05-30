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
	Hotel Receptionist - Sleepywood Hotel(105040400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.3 - More Cleanup by Moogra - 12/17/09
        1.2 - Cleanup and Statement fix by Moogra
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var regcost = 499;
var vipcost = 999;
var iwantreg = 0;

function start() {
    cm.sendNext("��ӭ��������֮���ùݡ�������Զ����Ϊ���ṩ��õķ��������ƣ�����ԣ���������Ϣһ����Σ�");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 1))
        cm.dispose();
    else {
        if (mode == 0 && status == 2) {
            cm.sendNext("���������ַ�����ѡ������Ҫ�ķ���");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1) {
            cm.sendSimple("�����ṩ���ַ��䣬������ѡ.\r\n#b#L0#��ͨɣ�÷� (" + regcost + " ��� )#l\r\n#L1#�߼�ɣ�÷� (" + vipcost + " ��� )#l");
            iwantreg = 1;
        } else if (status == 2) {
            if (selection == 0)
                cm.sendYesNo("��ѡ������ͨɣ�÷�������HP��MP��ظ��úܿ죬��Ҳ���������湺����Ʒ����ȷ��Ҫ������");
            else if (selection == 1) {
                cm.sendYesNo("��ѡ���˸߼�ɣ�÷�������HP��MP���һ��ɣ���һظ��ø��죬Ҳ�����������ҵ��������Ʒ����ȷ��Ҫ������");
		iwantreg = 0;
            }
        } else if (status == 3) {
            if (iwantreg == 1) {
                if (cm.getMeso() >= regcost) {
                    cm.warp(105040401);
                    cm.gainMeso(-regcost);
                } else
                    cm.sendNext("�ܱ�Ǹ�����������ƺ�û���㹻�Ľ�ҡ�������Ҫ�� " + regcost + " ��Ҳ���ʹ����ͨɣ�÷�.");
            } else {
                if (cm.getMeso() >= vipcost) {
                    cm.warp(105040402);
                    cm.gainMeso(-vipcost);
                } else
                    cm.sendNext("�ܱ�Ǹ�����������ƺ�û���㹻�Ľ�ҡ�������Ҫ�� " + vipcost + " ��Ҳ���ʹ�ø߼�ɣ�÷�.");
            }
            cm.dispose();
        }
    }
}