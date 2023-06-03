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
/* Spiruna
Orbis : Old Man's House (200050001)

Refining NPC:
 * Dark Crystal - Half Price compared to Vogen, but must complete quest
 */

var status = 0;

function start() {
    if (cm.isQuestCompleted(3034))
        cm.sendYesNo("你帮过我很大的忙...如果你有黑暗水晶母矿，我可以为你冶炼它们，每枚水晶只收 #b500,000 金币#k作为手续费。");
    else {
        cm.sendOk("走开些，我正在试着冥想。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 1)
        cm.sendGetNumber("好的，你想要制作多少？", 1, 1, 100);
    else if (status == 2) {
        var complete = true;
        
        if (cm.getMeso() < 500000 * selection){
            cm.sendOk("金币不足的话，我无法为你制作。");
            cm.dispose();
            return;
        } else if (!cm.haveItem(4004004, 10 * selection)) {
            complete = false;
        } else if(!cm.canHold(4005004, selection)) {
            cm.sendOk("背包空间不足，请腾出足够的格子。");
            cm.dispose();
            return;
        }
        if (!complete)
            cm.sendOk("冶炼对应的母矿才能获得特定的水晶。没有特例...");
        else {
            cm.gainItem(4004004, -10 * selection);
            cm.gainMeso(-500000 * selection);
            cm.gainItem(4005004, selection);
            cm.sendOk("请善用它们。");
        }
        cm.dispose();
    }
}