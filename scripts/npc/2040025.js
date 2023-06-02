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
/*  Author:         Xterminator
	NPC Name: 		Second Eos Rock
	Map(s): 		Ludibrium : Eos Tower 71st Floor (221022900)
	Description: 	Brings you to 100th Floor or 71st Floor
*/
var status = 0;
var map = 221024400;

function start() {
    if (cm.haveItem(4001020))
        cm.sendSimple("可以使用 #b魔法石觉醒卷轴（玩具塔）#k 来激活 #b第二个玩具塔石#k。你想要传送到哪块玩具塔石？#b\r\n#L0#第一个玩具塔石 (100层)#l\r\n#L1#第三个玩具塔石 (41层)#l");
    else {
        cm.sendOk("这块魔法石可以将你传送到 #b第一个或第三个玩具塔石#k，但必须要用魔法石觉醒卷轴来激活。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0)
                cm.sendYesNo("可以使用 #b魔法石觉醒卷轴（玩具塔）#k 来激活 #b第二个玩具塔石#k。你想要传送到 #b第一个玩具塔石# 所在的100层吗？");
            else {
                cm.sendYesNo("可以使用 #b魔法石觉醒卷轴（玩具塔）#k 来激活 #b第二个玩具塔石#k。你想要传送到 #b第三个玩具塔石#k 所在的41层吗？");
                map = 221021700;
            }
        } else if (status == 2) {
            cm.gainItem(4001020, -1);
            cm.warp(map, 3);
            cm.dispose();
        }
    }
}