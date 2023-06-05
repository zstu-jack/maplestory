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
var temp;
var cost;

var status = 0;

function start() {
    cm.sendSimple("...我能帮你做点什么？\r\n#L0##b购买魔法种子#k#l\r\n#L1##为神木村的发展捐赠材料#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("再好好想想。下定决心后就告诉我。");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("你看起来像是外乡人。有什么需要帮忙的吗？#L0##b我想购买一些#t4031346#。#k#l");
        } else {
            cm.sendNext("为了神木村的发展...");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4031346##k是一种珍贵的道具。我不能这样随随便便地把它交给你。帮我一点小忙再说，怎么样？我会把 #b#t4031346##k 以每个 #b30,000金币#k 的价格卖给你。如果你愿意交易的话，想要多少个呢？",0,0,99);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("I can't sell you 0.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30000;
            cm.sendYesNo("购买 #b"+temp+" 个#t4031346##k 需要花费 #b"+cost+" 金币#k。确定要购买吗？");
        }
    } else if(status == 4) {
        if(cm.getMeso() < cost || !cm.canHold(4031346)) {
            cm.sendOk("请检查是否有足够的金币购买种子。另外，也要检查其他栏空间是否有足够的空间来完成购买。");
        } else {
            cm.sendOk("欢迎下次光临。");
            cm.gainItem(4031346, temp);
            cm.gainMeso(-cost);
        }
        cm.dispose();
    }
}