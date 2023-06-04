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
	Irene - Ticketing Usher
-- By ---------------------------------------------------------------------------------------------
	Whoever written this script
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Whoever written this script
	2.0 - Second Version by Jayd
---------------------------------------------------------------------------------------------------
**/

status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("��ã����������¼������˻����İ��ա��ҿ��԰������������ǰ���¼��¡�����ǰ���¼�����\r\n#b#L0#���빺��ǰ���¼��µĻ�Ʊ��\r\n#b#L1#�������ǻ�ƺ��");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("�����Ʊ��Ҫ����5,000��ң�ȷ��������");
		}else if(selection == 1){
			cm.sendYesNo("ϣ�����ڽ���ǻ�ƺ���볡�󣬻�Ʊ���ᱻ���ա���л��ѡ���¼��¹��ʺ��ա�");
		}
		oldSelection = selection;
	}else if(status == 1){
		if(oldSelection == 0){
			if (cm.getPlayer().getMeso() > 4999 && !cm.getPlayer().haveItem(4031731)) {
                                if(cm.canHold(4031731, 1)) {
                                        cm.gainMeso(-5000);
                                        cm.gainItem(4031731);
                                        cm.sendOk("��л��ѡ���¼��¹��ʺ��գ�ף����;˳����");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendOk("������������������Ʊǰ��Ԥ���ո�");
                                        cm.dispose();
                                }
			} else {
				cm.sendOk("��û���㹻�Ľ�ң����ѹ�����һ�Ż�Ʊ��");
				cm.dispose();
			}
		}else if(oldSelection == 1){
			if(cm.itemQuantity(4031731) > 0){
				var em = cm.getEventManager("AirPlane");
				if(em.getProperty("entry") == "true"){
					cm.warp(540010100);
					cm.gainItem(4031731, -1);
				}else{
					cm.sendOk("��Ǹ�����κ����Ѿ���ɣ����Ժ�");
				}
			}else{
				cm.sendOk("��Ҫ���� #b#t4031731##k ���ɵǻ���");
			}
		}
		cm.dispose();
	}
}