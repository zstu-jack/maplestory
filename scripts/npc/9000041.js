/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

var options = ["装备","消耗","设置","其他"];
var name;
var status;
var selectedType = 0;

function start() {
    status = -1;
    action(1, 0, 0); 
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("勋章排名系统目前不可用......");
            cm.dispose();
            return;
        }
        
        var selStr = "你好，我是#b枫叶募捐箱#k！你可以把背包里任何不需要的道具出售给我。#r警告#b：请把要出售的道具放在选择的物品格#r之后#b。#k任何被放入的物品都将被永久卖出，无法还原。";
        for (var i = 0; i < options.length; i++)
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        cm.sendSimple(selStr);
    }

    else if (status == 1) {
	selectedType = selection;
        cm.sendGetText("要从背包中#r" + options[selectedType] + "#k栏的哪个道具开始交易？");
    }

    else if (status == 2) {
        name = cm.getText();
	var res = cm.getPlayer().sellAllItemsFromName(selectedType + 1, name);

        if(res > -1) cm.sendOk("交易完成！你从中获得了#r" + cm.numberWithCommas(res) + " 金币#k。");
	else cm.sendOk("你的背包的#b" + options[selectedType] + "#k栏里没有#b'" + name + "'#k！");

        cm.dispose();
    }
}