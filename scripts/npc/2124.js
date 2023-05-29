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
	Author : Ronan Lana
*/

function end(mode, type, selection) {

    if (!qm.haveItem(4031619, 1)) {
        qm.sendOk("请把寄存在#b#p2012019##k那里的箱子,还有里面所收藏的东西带回来给我...");
    }
    else {
        qm.gainItem(4031619, -1);
        qm.sendOk("啊,你带回来了#p2012019#的箱子!谢谢你.");
        qm.forceCompleteQuest();
    }

    qm.dispose();
}