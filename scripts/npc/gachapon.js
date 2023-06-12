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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var ticketId = 5220000;
var mapName = ["射手村", "魔法密林", "勇士部落", "废弃都市", "林中之城", "古代神社", "澡堂（男）", "澡堂（女）", "玩具城", "新叶城", "冰峰雪域", "诺特勒斯"];
var curMapName = "";

function start() {
    status = -1;
	curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9100109 ? 9 : 11];
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
			if (cm.haveItem(ticketId)) {
				cm.sendYesNo("你可以使用" + curMapName + "快乐百宝箱。要使用快乐百宝券吗？");
			} else {
				cm.sendSimple("欢迎使用" + curMapName + " 快乐百宝箱。请选择你需要的服务。\r\n\r\n#L0#快乐百宝箱是什么？#l\r\n#L1#我可以从哪里买到快乐百宝券呢？#l");
			}
		} else if(status == 1 && cm.haveItem(ticketId)) {
			if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
				cm.gainItem(ticketId, -1);
				cm.doGachapon();
			} else {
				cm.sendOk("请在#r装备栏、消耗栏、设置栏、其它栏#k各留出至少一格空位。");
			}
			cm.dispose();
		} else if(status == 1) {
			if (selection == 0) {
                cm.sendNext("快乐百宝箱里有各种稀有的卷轴、装备、椅子、以及其它神秘道具。每使用一张#b快乐百宝券#k，就可以从中随机抽取一样物品。");
            } else {
                cm.sendNext("快乐百宝券可以从#r现金商城#k中购买，花费NX点数或枫叶点均可兑换。点击窗口右下方的红色商城按钮，进入#r现金商城#k后即可购买。");
            }
		} else if(status == 2) {
			cm.sendNextPrev("使用" + curMapName + "快乐百宝箱时，可以获得各种各样的道具。但更有可能获得" + curMapName + "地区相关道具和卷轴。");
		} else {
			cm.dispose();
		}
    }
}