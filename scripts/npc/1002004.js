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
	VIP Cab - Victoria Road : Lith Harbor (104000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("你好！本出租车仅供VIP客人乘坐。不同于搭载客人往来与城镇间的普通出租车，我们会提供更好的服务，与VIP档次相符的服务。虽然有些昂贵，但...只要10,000金币，我们就可以安全地将您送到 \r\n蚂蚁洞广场#k。");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    }else if(mode == 0) {
    } else if (mode == 0) {
        cm.sendOk("这个城镇也有很多可以游览的去处。如果您有前往蚂蚁洞广场的想法，请联系我们。");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "我们对新人提供 1折 的特别优惠。蚂蚁洞广场位于金银岛幽深的地下洞穴中，有间24小时便利店在那里常年开张。想要支付 #b1,000 金币#k 前往那里吗？" : "新手之外的职业将适用正常费用。蚂蚁洞广场位于金银岛幽深的地下洞穴中，有间24小时便利店在那里常年开张。想要支付 #b1,000 金币#k 前往那里吗？");//这里不能动了，拉取到的脚本还是有报错，按原版比较好
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost)
            cm.sendNext("看起来您没有足够的金币。这样的话，我们无法为您提供服务。")
        else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}
