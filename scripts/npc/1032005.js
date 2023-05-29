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
	VIP Cab - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
    1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("嗨，这里是星级出租车为您服务，我可以快速载你到#b蚂蚁广场#k。\n只需要#r10,000#k金币就行，需要服务吗？");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("这片森林也有很多玩的地方。如果你觉得有必要去蚂蚁广场，记得带足金币，选择我们的服务吧！");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "我们有对新手90%的打折 所以你只需要花 #b1,000 金币#k 是否要去了呢??" : "是否要花费 #b10,000 金币#k前往蚂蚁广场?");
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost)
            cm.sendNext("看起来你的钱袋有些瘪，无法享受我们高级的星级服务。再去赚点钱吧。")
        else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}