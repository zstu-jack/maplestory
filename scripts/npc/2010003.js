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

/* Neve
	Orbis: Orbis Park (200000200)
	
	Refining NPC: 
	* Gloves, level 70-80 all classes
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "你好，我是天空之城首屈一指的手套匠人。需要我帮你制作手套吗？#b"
        var options = new Array("制作/升级战士手套","制作/升级弓箭手手套","制作/升级法师手套","制作/升级飞侠手套");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //warrior glove
            var selStr = "你想要制作哪种战士手套？#b";
            var gloves = new Array ("青铜暗影手套#k - 战士 等级.70#b","锂矿暗影手套#k - 战士 等级.70#b","黑暗影手套#k - 战士 等级.70#b",
                "马尔斯蓝拳套#k - 战士 等级.80#b","马尔斯绿拳套#k - 战士 等级.80#b","马尔斯红拳套#k - 战士 等级.80#b","马尔斯黑拳套#k - 战士 等级.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //bowman glove
            var selStr = "你想要制作哪种弓箭手手套？#b";
            var gloves = new Array ("蓝神眼手套#k - 弓箭手 等级.70#b","黄金神眼手套#k - 弓箭手 等级.70#b","黑神眼手套#k - 弓箭手 等级.70#b",
                "红天使手套#k - 弓箭手 等级.80#b","蓝天使手套#k - 弓箭手 等级.80#b","绿天使手套#k - 弓箭手 等级.80#b","黑天使手套#k - 弓箭手 等级.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //mage glove
            var selStr = "你想要制作哪种法师手套？#b";
            var gloves = new Array ("褐战魂手套#k - 法师 等级.70#b","蓝战魂手套#k - 法师 等级.70#b","黑战魂手套#k - 法师 等级.70#b",
                "魔力绿手套#k - 法师 等级.80#b","魔力蓝手套#k - 法师 等级.80#b","魔力黑手套#k - 法师 等级.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //thief glove
            var selStr = "你想要制作哪种飞侠手套？#b";
            var gloves = new Array ("青铜名誉手套#k - 飞侠 等级.70#b","银名誉手套#k - 飞侠 等级.70#b","黄金名誉手套#k - 飞侠 等级.70#b",
                "德古拉蓝手套#k - 飞侠 等级.80#b","德古拉紫手套#k - 飞侠 等级.80#b","德古拉红手套#k - 飞侠 等级.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0){ //warrior glove
            var itemSet = new Array(1082103,1082104,1082105,1082114,1082115,1082116,1082117,1082118);
            var matSet = new Array(new Array(4005000,4011000,4011006,4000030,4003000),new Array(1082103,4011002,4021006),new Array(1082103,4021006,4021008),new Array(4005000,4005002,4021005,4000030,4003000),new Array(1082114,4005000,4005002,4021003),new Array(1082114,4005002,4021000),new Array(1082114,4005000,4005002,4021008));
            var matQtySet = new Array(new Array(2,8,3,70,55),new Array(1,6,4),new Array(1,8,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,3,8),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //bowman glove
            var itemSet = new Array(1082106,1082107,1082108,1082109,1082110,1082111,1082112);
            var matSet = new Array(new Array(4005002,4021005,4011004,4000030,4003000),new Array(1082106,4021006,4011006),new Array(1082106,4021007,4021008),new Array(4005002,4005000,4021000,4000030,4003000),new Array(1082109,4005002,4005000,4021005),new Array(1082109,4005002,4005000,4021003),new Array(1082109,4005002,4005000,4021008));
            var matQtySet = new Array(new Array(2,8,3,70,55),new Array(1,5,3),new Array(1,2,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,1,1,7),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //mage glove
            var itemSet = new Array(1082098,1082099,1082100,1082121,1082122,1082123);
            var matSet = new Array(new Array(4005001,4011000,4011004,4000030,4003000),new Array(1082098,4021002,4021007),new Array(1082098,4021008,4011006),new Array(4005001,4005003,4021003,4000030,4003000),new Array(1082121,4005001,4005003,4021005),new Array(1082121,4005001,4005003,4021008));
            var matQtySet = new Array(new Array(2,6,6,70,55),new Array(1,6,2),new Array(1,3,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //thief glove
            var itemSet = new Array (1082095,1082096,1082097,1082118,1082119,1082120);
            var matSet = new Array(new Array(4005003,4011000,4011003,4000030,4003000),new Array(1082095,4011004,4021007),new Array(1082095,4021007,4011006),new Array(4005003,4005002,4011002,4000030,4003000),new Array(1082118,4005003,4005002,4021001),new Array(1082118,4005003,4005002,4021000));
            var matQtySet = new Array(new Array(2,6,6,70,55),new Array(1,6,2),new Array(1,3,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,2,1,8));
            var costSet = new Array(90000,90000,100000,100000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "你想要制作 #t" + item + "# 吗？这样的话，你需要备齐材料。另外，请保证有足够的包裹空间。#b";

        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " 金币";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 3 && mode == 1) {
        var complete = true;
		
        if(!cm.canHold(item, 1)) {
            cm.sendOk("请检查你的物品栏是否有足够空间。");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost)
        {
            cm.sendOk("金币不足的话，我无法为你制作。");
            cm.dispose();
            return;
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }
			
        if (!complete)
            cm.sendOk("如果想要一副合适的手套，就不能使用其它材料替代。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
					
            cm.gainMeso(-cost);
            cm.gainItem(item, 1);
            cm.sendOk("完成了。如果你还需要其它的东西，再来找我就好。");
        }
        cm.dispose();
    }
}