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
	Jeff - El Nath : El Nath : Ice Valley II (211040200)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;

function start() {
    if(cm.haveItem(4031450, 1)) {
        cm.warp(921100100, 1);
        cm.dispose();
        return;
    }
    
    cm.sendNext("����������Ҫ������Ƭ�����������ᷢ���Լ�������Σ�յĹ�����Χ���š����Լ���������Լ��Ѿ��㹻ǿ���ˣ�Ҳ����ٿ���һ�¡��ܾ�֮ǰ�����ǵĴ������м�����������˽������棬��Ҫ������в�Ŵ��ӵĴ��ڡ�Ȼ��û��һ���˴��������...");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status == 1 && mode == 0 && cm.getLevel() > 49) {
            cm.sendNext("������ĵȼ��㹻�ߣ��������滹����Щ��ǿ���������������⣬�������ҡ��Ͼ������������ҵ�ְ��");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.getLevel() > 49)
                cm.sendYesNo("��������Ҫ��ȥ����Ȱ�㻹�Ǹı����⡣��������ֵĻ�...��ֻ������ǿ���ܹ����������ȥ�������ڡ���Ϊ����Ĳ��뿴�����������ˡ����ҿ���...��...���㿴�����ǳ�ǿ�󡣺ðɣ�����Ҫ����������");
             else 
                cm.sendPrev("��������Ҫ��ȥ����Ȱ�㻹�Ǹı����⡣��������ֵĻ�...��ֻ������ǿ���ܹ����������ȥ�������ڡ���Ϊ����Ĳ��뿴�����������ˡ����ҿ���...��...�㻹û�е���50�����Ҳ������������ڣ������ɡ�");
        } else if (status == 2) {
            if (cm.getLevel() >= 50) 
                cm.warp(211040300, 5);
            cm.dispose();
        }
    }
}