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
/*      Author: Xterminator, Moogra
	NPC Name: 		Fourth Eos Rock
	Map(s): 		Ludibrium : Eos Tower 1st Floor (221020000)
	Description: 		Brings you to 41st Floor
*/

function start() {
    if (cm.haveItem(4001020))
        cm.sendYesNo("可以使用 #b魔法石觉醒卷轴（玩具塔）#k 来激活 #b第四个玩具塔石#k。你想要传送到 #b第三个玩具塔石#k 所在的41层吗？");
    else {
        cm.sendOk("这块魔法石可以将你传送到 #b第三个玩具塔石#k，但必须要用魔法石觉醒卷轴（玩具塔）来激活。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else {
        cm.gainItem(4001020, -1);
        cm.warp(221021700, 3);
    }
    cm.dispose();
}