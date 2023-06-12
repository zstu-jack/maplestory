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

status = -1;
var sel, sel2;

function start() {
    cm.sendOk("Hello, the Maple 7th Day Market is currently unavailable.");
    cm.dispose();
    return;
    
    cm.sendSimple("Hello, the Maple 7th Day Market opens today.#b\r\n#L0#Move to Maple 7th Day Market map\r\n#L1#Listen for an explanation about the Maple 7th Day Market");
}

function action(mode, type, selection) {
    status++;
    if (status == 6 && mode == 1) {
        sel2 = undefined;
        status = 0;
    }
    if (mode != 1) {
        if (mode == 0 && type == 0)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == undefined)
            sel = selection;
        if (selection == 0) {
            cm.sendNext("好的，我们将会把你送往冒险岛周末集市。");
        } else
            cm.sendSimple("关于冒险岛周末集市，有什么想要了解的吗？#b\r\n#L0#冒险岛周末集市在哪里举行？\r\n#L1#冒险岛周末集市里有什么活动？\r\n#L2#我没有问题要问了。");
    } else if(status == 1) {
        if (sel == 0) {
        	cm.getPlayer().saveLocation("EVENT");
            cm.warp(680100000 + parseInt(Math.random() * 3));
            cm.dispose();
        } else if (selection == 0) {
            cm.sendNext("冒险岛周末集市只在星期日开放。如果你在任何一个城镇找到了我，就可以进入集市。射手村，新叶城，玩具城...我有可能出现在任何城镇里！");
            status -= 2;
        } else if (selection == 1)
            cm.sendSimple("你可以在冒险岛周末集市找到其它地方难得一见的稀有商品。#b\r\n#L0#购买特殊道具\r\n#L1#帮助养鸡场主人");
        else {
            cm.sendNext("您没有其它问题了吗？好的。如果以后对集市感兴趣的话，请记得来找我。");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel2 == undefined)
            sel2 = selection;
        if (sel2 == 0)
            cm.sendNext("你可以在冒险岛周末集市买到不同种类的商品。价格会随时变化，所以最好趁便宜的时候下手。");
        else
            cm.sendNext("除了中介商人之外，你还可以在冒险岛周末集市里见到农场主的懒女儿。帮烦斯乐孵化鸡蛋，让它们长大成鸡！");
    } else if (status == 3) {
        if (sel2 == 0)
            cm.sendNextPrev("在集市里买到的东西可以卖给中介商人阿得拉。他不会买一周前的旧货，所以记得要周六之前在他那里出手。");
        else
            cm.sendNextPrev("因为在鸡蛋这件事情上她不相信任何人，所以需要支付保证金才能从她那里获得用来孵化的鸡蛋。");
    } else if (status == 4) {
        if (sel2 == 0)
            cm.sendNextPrev("阿得拉会经常调整他的回收价格，所以要在能获得最大利润的节点卖出货物。价格会在每个整点进行调整，记得按时查看。");
        else
            cm.sendNextPrev("如果你成功地把鸡蛋孵化养大成鸡，并且把它带给烦斯乐，烦斯乐会给你奖励的。她或许真的很懒，但并不是不懂感恩。");
    } else if (status == 5) {
        if (sel2 == 0)
            cm.sendNextPrev("考验你商业头脑的时候到了，在冒险岛周末集市与中介商人之间低买高卖吧。");
        else
            cm.sendNextPrev("你可以点击鸡蛋来检查它的成长情况。一定要认真地养大它，这样你获得的经验也会变得更多。");
    }
}