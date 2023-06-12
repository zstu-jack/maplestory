/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Kerny - Pilot
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
	2.0 - Second Version by Jayd
---------------------------------------------------------------------------------------------------
**/
var k2s;
var airport;
var s2k;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	}
	if(mode == 1) {
		status++;
	}
	if(mode == 0) {
		if (cm.getMapId() == 540010101) {
			cm.sendOk("���Ե�Ƭ�̣����Ǽ����ִ��¼��£���л�����ĵȴ���");
			cm.dispose();
			return;
		} else {
			cm.sendOk("���Ե�Ƭ�̣����Ǽ����ִ�������У���л�����ĵȴ���");
			cm.dispose();
			return;
		}
	}
	if(status == 0) {
		if (cm.getMapId() == 540010001) {
			cm.sendYesNo("T�ɻ�������ɣ�ȷ��Ҫ�뿪�𣿼�Ʊ���Ʊ�޷������˿�");
			airport = 1;
		} else if (cm.getMapId() == 540010002) {
			cm.sendOk("���Ǽ����ִ�������У�������λ�����ã��ȴ����䡣");
                        cm.dispose();
			s2k = 1;
		} else if (cm.getMapId() == 540010101) {
			cm.sendOk("���Ǽ����ִ��¼��£�������λ�����ã��ȴ����䡣");
                        cm.dispose();
			k2s = 1;
		}
	} else if(status == 1) {
		if (k2s == 1) {
			cm.warp(103000000);
			cm.sendOk("�ڴ������ٻᡣ");
			cm.dispose();
		} else if (airport == 1) {
			cm.warp(540010000);
			cm.sendOk("�ڴ������ٻᡣ");
			cm.dispose();
		} else if (s2k == 1) {
			cm.warp(540010000);
			cm.sendOk("�ڴ������ٻᡣ");
			cm.dispose();
		}
	}
}