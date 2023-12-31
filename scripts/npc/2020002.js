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

/* Gordon
	El Nath: El Nath Market (211000100)

	Refining NPC:
	* Shoes, level 60-80 all classes
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
        var selStr = "你好，冰峰雪域的冬天冷得要命，你肯定需要一双温暖的鞋子来抵御寒冷。#b"
        var options = new Array("制作战士鞋子","制作弓箭手鞋子","制作法师鞋子","制作飞侠鞋子");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        var selStr;
        var shoes;
        if (selectedType == 0){ //warrior shoes
            selStr = "你想要制作哪种战士鞋子？#b";
            var shoes = new Array ("蓝十字鞋#k - 战士 等级.60#b","紫十字鞋#k - 战士 等级.60#b","红十字鞋#k - 战士 等级.60#b",
                "蓝飞魂鞋#k - 战士 等级.70#b","紫飞魂鞋#k - 战士 等级.70#b","黑飞魂鞋#k - 战士 等级.70#b",
                "红宝石靴#k - 战士 等级.80#b","蓝宝石靴#k - 战士 等级.80#b","黄宝石靴#k - 战士 等级.80#b");
        }
        else if (selectedType == 1){ //bowman shoes
            selStr = "你想要制作哪种弓箭手鞋子？#b";
            var shoes = new Array ("紫花精鞋#k - 弓箭手 等级.60#b","蓝花精鞋#k - 弓箭手 等级.60#b","绿花精鞋#k - 弓箭手 等级.60#b",
                "蓝箭魂鞋#k - 弓箭手 等级.70#b","黄箭魂鞋#k - 弓箭手 等级.70#b","绿箭魂鞋#k - 弓箭手 等级.70#b","黑箭魂鞋#k - 弓箭手 等级.70#b",
                "蓝飞翼鞋#k - 弓箭手 等级.80#b","红飞翼鞋#k - 弓箭手 等级.80#b","绿飞翼鞋#k - 弓箭手 等级.80#b","黑飞翼鞋#k - 弓箭手 等级.80#b");
        }
        else if (selectedType == 2){ //mage shoes
            selStr = "你想要制作哪种法师鞋子？#b";
            var shoes = new Array ("粉红天使靴#k - 法师 等级.60#b","绿天使靴#k - 法师 等级.60#b","黄天使靴#k - 法师 等级.60#b","蓝天使靴#k - 法师 等级.60#b",
                "蓝水晶凉鞋#k - 法师 等级.70#b","红水晶凉鞋#k - 法师 等级.70#b","褐水晶凉鞋#k - 法师 等级.70#b","金水晶凉鞋#k - 法师 等级.70#b",
                "绿密林之鞋#k - 法师 等级.80#b","紫密林之鞋#k - 法师 等级.80#b","黑密林之鞋#k - 法师 等级.80#b");
        }
        else if (selectedType == 3){ //thief shoes
            selStr = "你想要制作哪种飞侠鞋子？#b";
            var shoes = new Array ("红无痕之鞋#k - 飞侠 等级.60#b","金无痕之鞋#k - 飞侠 等级.60#b","黑无痕之鞋#k - 飞侠 等级.60#b",
                "紫龙皮鞋#k - 飞侠 等级.70#b","蓝龙皮鞋#k - 飞侠 等级.70#b","红龙皮鞋#k - 飞侠 等级.70#b",
                "绿飞影鞋#k - 飞侠 等级.80#b","红飞影鞋#k - 飞侠 等级.80#b","黑飞影鞋#k - 飞侠 等级.80#b");
        }
        for (var i = 0; i < shoes.length; i++){
            selStr += "\r\n#L" + i + "# " + shoes[i] + "#l";
        }
        cm.sendSimple(selStr);
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0){ //warrior shoes
            var itemSet = new Array(1072147,1072148,1072149,1072154,1072155,1072156,1072210,1072211,1072212);
            var matSet = new Array(new Array(4021008,4011007,4021005,4000030,4003000),new Array(4021008,4011007,4011005,4000030,4003000),new Array(4021008,4011007,4021000,4000030,4003000),
                new Array(4005000,4005002,4011002,4000048,4003000),new Array(4005000,4005002,4011005,4000048,4003000),new Array(4005000,4005002,4021008,4000048,4003000),
                new Array(4005000,4005002,4021000,4000030,4003000),new Array(4005000,4005002,4021002,4000030,4003000),new Array(4005000,4005002,4021008,4000030,4003000));
            var matQtySet = new Array(new Array(1,1,8,80,55),new Array(1,1,8,80,55),new Array(1,1,8,80,55),new Array(1,3,5,100,55),new Array(2,2,5,100,55),new Array(3,1,1,100,55),
                new Array(2,3,7,90,65),new Array(3,2,7,90,65),new Array(4,1,2,90,65));
            var costSet = new Array(60000,60000,60000,70000,70000,70000,80000,80000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //bowman shoes
            var itemSet = new Array(1072144,1072145,1072146,1072164,1072165,1072166,1072167,1072182,1072183,1072184,1072185);
            var matSet = new Array(new Array(4011006,4021000,4021007,4000030,4003000),new Array(4011006,4021005,4021007,4000030,4003000),new Array(4011006,4021003,4021007,4000030,4003000),
                new Array(4005002,4005000,4021005,4000055,4003000),new Array(4005002,4005000,4021004,4000055,4003000),new Array(4005002,4005000,4021003,4000055,4003000),new Array(4005002,4005000,4021008,4000055,4003000),
                new Array(4005002,4005000,4021002,4000030,4003000),new Array(4005002,4005000,4021000,4000030,4003000),new Array(4005002,4005000,4021003,4000030,4003000),new Array(4005002,4021008,4000030,4003000));
            var matQtySet = new Array(new Array(5,8,1,75,50),new Array(5,8,1,75,50),new Array(5,8,1,75,50),new Array(1,3,5,100,55),new Array(2,2,5,100,55),new Array(2,2,5,100,55),new Array(3,1,1,100,55),
                new Array(2,3,7,90,60),new Array(3,2,7,90,60),new Array(4,1,7,90,60),new Array(5,2,90,60));
            var costSet = new Array(60000,60000,60000,70000,70000,70000,70000,80000,80000,80000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //mage shoes
            var itemSet = new Array(1072136,1072137,1072138,1072139,1072157,1072158,1072159,1072160,1072177,1072178,1072179);
            var matSet = new Array(new Array(4021009,4011006,4011005,4000030,4003000),new Array(4021009,4011006,4021003,4000030,4003000),new Array(4021009,4011006,4011003,4000030,4003000),new Array(4021009,4011006,4021002,4000030,4003000),
                new Array(4005001,4005003,4021002,4000051,4003000),new Array(4005001,4005003,4021000,4000051,4003000),new Array(4005001,4005003,4011003,4000051,4003000),new Array(4005001,4005003,4011006,4000051,4003000),
                new Array(4005001,4005003,4021003,4000030,4003000),new Array(4005001,4005003,4021001,4000030,4003000),new Array(4005001,4005003,4021008,4000030,4003000));
            var matQtySet = new Array(new Array(1,4,5,70,50),new Array(1,4,5,70,50),new Array(1,4,5,70,50),new Array(1,4,5,70,50),
                new Array(1,3,5,100,55),new Array(2,2,5,100,55),new Array(2,2,5,100,55),new Array(3,1,3,100,55),
                new Array(2,3,7,85,60),new Array(3,2,7,85,60),new Array(4,1,2,85,60));
            var costSet = new Array(60000,60000,60000,60000,70000,70000,70000,70000,80000,80000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //thief shoes
            var itemSet = new Array (1072150,1072151,1072152,1072161,1072162,1072163,1072172,1072173,1072174);
            var matSet = new Array(new Array(4021007,4011007,4021000,4000030,4003000),new Array(4021007,4011007,4011006,4000030,4003000),new Array(4021007,4011007,4021008,4000030,4003000),
                new Array(4005003,4005000,4021001,4000051,4003000),new Array(4005003,4005002,4021005,4000051,4003000),new Array(4005002,4005003,4021000,4000051,4003000),
                new Array(4005000,4005003,4021003,4000030,4003000),new Array(4005002,4005003,4021000,4000030,4003000),new Array(4005003,4005002,4021008,4000030,4003000));
            var matQtySet = new Array(new Array(1,1,8,75,50),new Array(1,1,5,75,50),new Array(1,1,1,75,50),
                new Array(1,3,5,100,55),new Array(1,3,5,100,55),new Array(1,3,5,100,55),
                new Array(3,2,7,90,60),new Array(3,2,7,90,60),new Array(3,2,7,90,60));
            var costSet = new Array(60000,60000,60000,70000,70000,70000,80000,80000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        var prompt = "你想要制作 #t" + item + "# 吗？这样的话，你需要备齐材料。另外，请保证有足够的包裹空间。#b";
        if (mats instanceof Array)
            for(var i = 0; i < mats.length; i++)
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
        else
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
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
        else if (cm.getMeso() < cost) {
            cm.sendOk("金币不足的话，我无法为你制作。");
            cm.dispose();
            return;
        }
        else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }
        if (!complete)
            cm.sendOk("我只做质量上乘的东西，材料不对数是没法制作的。");
        else {
            if (mats instanceof Array)
                for (var i = 0; i < mats.length; i++)
                    cm.gainItem(mats[i], -matQty [i]);
            else
                cm.gainItem(mats, -matQty );
            cm.gainMeso(-cost);
            cm.gainItem(item, 1);
            cm.sendOk("做好了，它还微微发热呢。");
        }
        cm.dispose();
    }
}