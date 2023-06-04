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
	Mue - Leafre Ticketing Booth(240000100)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
    1.2 - Cleanup by Moogra
	1.1 - Price like GMS [sadiq]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
var cost = 30000;

function start() {
    cm.sendYesNo("��ã��Ҹ�����ۿ������֮�ǵĴ�Ʊ��ǰ�����֮�ǵĺ���������ÿ10���ӳ���һ�࣬ÿ����Ҫ#b"+cost+"���#k��ȷ��Ҫ����#b#t4031045##k��");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        else {
            cm.sendNext("�������ﻹ��Щ����Ҫ�����԰ɣ�");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("��ȷ���Լ�ӵ��#b"+cost+"���#k������������������㱳�����������Ƿ�������");
            cm.dispose();
        }
    }
}
