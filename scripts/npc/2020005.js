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
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown & Information & xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var cost = new Array(300,400,5000,5000);
var msg = new Array("有神圣力的水，可以恢复封印和诅咒状态","万能的解毒剂，可以恢复所有异常状态","有魔法能力的神秘石头，用于高级技能","有召回能力的神秘石头，用于高级技能");
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        cm.sendNext("如果你肯帮我，作为回报，我会卖给你一些好东西。");
        cm.dispose();
        return;
    }
    if(mode == 0 && status == 2) {
        cm.sendNext("我知道了，这些货物让你眼花缭乱。别着急，慢慢挑。我只对你出售这些道具，价格童叟无欺。");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }
    
    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++){
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (售价: "+cost[i]+" 金币)#k#l";
        }
        cm.sendSimple("感谢你安全地解封了 #b#t4031056##k。当然，我也因此耗费了过去近800年里积蓄的一半力量... 但现在，我死而无憾。喔，对了...你是不是在搜罗稀有物品？为了感谢你的付出，我会卖给你一些魔法物品，但只对你出售。挑选你想要的货物吧！"+selStr);
    }
    else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("你想要购买 #b#t"+item[selected]+"##k ？它是 "+msg[selected]+"。这可不是随便能买到的东西，不过我会给你一个公道的价格。每一件 #b"+cost[selected]+" 金币#k。你要买多少？", 0, 1, 100);
    }
    else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("如果你没有购买意愿的话，我不会硬要向你推销它们。");
            cm.dispose();
        }
        cm.sendYesNo("确定想要购买 #r"+amount+" 个#t"+item[selected]+" ##k 吗？每个 #t"+item[selected]+"# 需要 "+cost[selected]+" 金币, 总价 #r"+totalcost+" 金币#k。");
    } else if(status == 3) {
        if(cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("你确定带够了金币吗？或许应该查看一下你的其他栏是否有足够的空间。这些东西的总价是 #r"+totalcost+"#k 金币，请再确认一下交易无法完成的原因。");
            cm.dispose();
        }
        cm.sendNext("感谢惠顾。如果旅行途中又需要它们了，就回到这里来。我虽然年纪大了，制作魔法物品还是轻而易举的。");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}