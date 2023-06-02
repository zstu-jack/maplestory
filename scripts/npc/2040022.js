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
/* Rydole
	Ludibrium : Toy Factory <Aparatus Room> (220020600)
	
	Refining NPC: 
	* Level 30-50 weapons - Stimulator allowed
*/
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var stimulator = false;
var stimID;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "啊，被你找到了！我一生中大部分的时光都花在为像你这样的冒险家制作武器上。你有什么想要做的吗？#b"
        var options = new Array("辅助剂是什么？","制作战士武器","制作弓箭手武器","制作法师武器","制作飞侠武器",
        "使用辅助剂制作战士武器","使用辅助剂制作弓箭手武器","使用辅助剂制作法师武器","使用辅助剂制作飞侠武器");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        var selStr;
        var weapon;
        if (selectedType > 4)
        {
            stimulator = true;
            selectedType -= 4;
        }
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("辅助剂是一种用来在特定物品制作过程中添加的特殊药剂。它所能提供的属性与掉落来源相仿。不过有可能不发生变化，也有可能使产物品质变低。另外，有10%的概率令物品消失，所以请慎重选择使用。")
            cm.dispose();
        }
        else if (selectedType == 1){ //warrior weapon
            selStr = "你想要制作哪种战士武器？#b";
            weapon = new Array ("战剑#k - 等级.30 单手剑#b","弯刀#k - 等级.35 单手剑#b","黄沙之剑#k - 等级.40 单手剑#b","树灵之剑#k - 等级.50 单手剑#b","赤斧#k - 等级.30 单手斧#b","大斧#k - 等级.35 单手斧#b","青光斧#k - 等级.40 单手斧#b","树灵之斧#k - 等级.50 单手斧#b",
                "大战斗锤#k - 等级.30 单手钝器#b","骑士锤#k - 等级.35 单手钝器#b","重锤#k - 等级.40 单手钝器#b","旋风锤#k - 等级.50 单手钝器#b","大刀#k - 等级.30 双手剑#b","高原之剑#k - 等级.35 双手剑#b","半月巨刀#k - 等级.40 双手剑#b","虎剑#k - 等级.50 双手剑#b",
                "重型巨斧#k - 等级.30 双手斧#b","绿蛇刀#k - 等级.35 双手斧#b","格斗斧#k - 等级.40 双手斧#b","太阳之斧#k - 等级.50 双手斧#b","锂矿锤#k - 等级.30 双手钝器#b","大锤#k - 等级.35 双手钝器#b","巨人锤#k - 等级.40 双手钝器#b","黄金锤#k - 等级.50 双手钝器#b",
                "三支枪#k - 等级.30 Spear#b","刺枪#k - 等级.35 Spear#b","双天戟#k - 等级.40 Spear#b","长八蛇矛#k - 等级.50 Spear#b","锂矿戟#k - 等级.30 矛#b","斧戟#k - 等级.35 矛#b","月牙戟#k - 等级.40 矛#b","九龙刀#k - 等级.50 矛#b");
        }
        else if (selectedType == 2){ //bowman weapon
            selStr = "你想要制作哪种弓箭手武器？#b";
            weapon = new Array ("雷电n#k - 等级.30 弓#b","火焰之弓#k - 等级.35 弓#b","暴风弓#k - 等级.40 弓#b","天弓#k - 等级.50 弓#b","鹰弩#k - 弩 等级.32#b","双弦弩#k - 弩 等级.38#b","白银弩#k - 弩 等级.42#b","炎弩#k - 弩 等级.50#b");
        }
        else if (selectedType == 3){ //magician weapon
            selStr = "你想要制作哪种法师武器？#b";
            weapon = new Array ("锂矿短杖#k - 等级.28 短杖#b","法师短杖#k - 等级.33 短杖#b","妖精短杖#k - 等级.38 短杖#b","大魔法师短杖#k - 等级.48 短杖#b","法师长杖#k - 等级.25 长杖#b","精灵长杖#k - 等级.45 长杖#b","白龙之杖#k - 等级.55 长杖#b");
        }
        else if (selectedType == 4){ //thief weapon; claws vary depending if stimulator is being used
            selStr = "你想要制作哪种飞侠武器？#b";
            if (!stimulator)
                weapon = new Array ("水晶刃#k - 等级.30 短刀（运）#b","偃月刃#k - 等级.30 短刀（力）#b","暗影刃#k - 等级.35 短刀（运）#b","刺客短刀#k - 等级.40 短刀（力）#b","华戟#k - 等级.50 短刀（力）#b","破碎刃#k - 等级.50 短刀（运）#b",
                    "钢铁斗拳#k - 等级.30 拳套#b","青铜守护拳套#k - 等级.35 拳套#b","钢铁护腕#k - 等级.40 拳套#b","钢铁手甲#k - 等级.50 拳套#b");
            else
                weapon = new Array ("水晶刃#k - 等级.30 短刀（运）#b","偃月刃#k - 等级.30 短刀（力）#b","暗影刃#k - 等级.35 短刀（运）#b","刺客短刀#k - 等级.40 短刀（力）#b","华戟#k - 等级.50 短刀（力）#b","破碎刃#k - 等级.50 短刀（运）#b",
                    "锂矿斗拳#k - 等级.30 拳套#b","朱矿斗拳#k - 等级.30 拳套#b","银守护拳套#k - 等级.35 拳套#b","黑守护拳套#k - 等级.35 拳套#b","赤红护腕#k - 等级.40 拳套#b","朱矿护腕#k - 等级.40 拳套#b",
                    "黑护腕#k - 等级.40 拳套#b","赤红手甲#k - 等级.50 拳套#b","蓝宝手甲#k - 等级.50 拳套#b","黑手甲#k - 等级.50 拳套#b");
        }
		
        if (selectedType != 0)
        {
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 1){ //warrior weapon
            var itemSet = new Array(1302008,1302004,1302009,1302010,1312005,1312006,1312007,1312008,1322014,1322015,1322016,1322017,1402002,1402006,1402007,1402003,1412006,1412004,1412005,1412003,1422001,1422008,1422007,1422005,1432002,1432003,1432005,1432004,1442001,1442003,1442009,1442005);
            var matSet = new Array(new Array(4131000,4011001,4011004,4003000),new Array(4131000,4011006,4011001,4021006,4003000),new Array(4131000,4011006,4011001,4021000,4003000),new Array(4131000,4005000,4021008,4011006,4021003,4003000),
                new Array(4131001,4011001,4021000,4003000),new Array(4131001,4011001,4021000,4011004,4003000),new Array(4131001,4021005,4011001,4021001,4003000),new Array(4131001,4005000,4021008,4011004,4011001,4003000),
                new Array(4131002,4011001,4011000,4003000),new Array(4131002,4011001,4011000,4011003,4003000),new Array(4131002,4011003,4011001,4011004,4003000),new Array(4131002,4005000,4021008,4011006,4011001,4003000),
                new Array(4131003,4011001,4021000,4021004,4003000),new Array(4131003,4011006,4011001,4021004,4003000),new Array(4131003,4021003,4011000,4011001,4003000),new Array(4131003,4005000,4021007,4011006,4011001,4003000),
                new Array(4131004,4021005,4011001,4003001,4003000),new Array(4131004,4011004,4011000,4021003,4003000),new Array(4131004,4011006,4011004,4011001,4003000),new Array(4131004,4005000,4021007,4011006,4021006,4003000),
                new Array(4131005,4011001,4011004,4003000),new Array(4131005,4011001,4011000,4003001,4003000),new Array(4131005,4011001,4011004,4011006,4003000),new Array(4131005,4005000,4021008,4021006,4011006,4003000),
                new Array(4131006,4011000,4011004,4003000),new Array(4131006,4011001,4011002,4021000,4003000),new Array(4131006,4011004,4011001,4011000,4003000),new Array(4131006,4005000,4021008,4011000,4021000,4003000),
                new Array(4131007,4011000,4011002,4003000),new Array(4131007,4011001,4011002,4003000),new Array(4131007,4011006,4011002,4011001,4003000),new Array(4131007,4005000,4021007,4011001,4011002,4003000));
            var matQtySet = new Array(new Array(1,2,2,30),new Array(1,1,5,3,35),new Array(1,3,5,5,40),new Array(1,1,2,4,10,50),
                new Array(1,2,2,30),new Array(1,5,5,3,35),new Array(1,7,5,5,40),new Array(1,1,2,8,10,50),
                new Array(1,2,2,30),new Array(1,5,5,3,35),new Array(1,7,5,5,40),new Array(1,1,2,4,10,50),
                new Array(1,2,1,2,35),new Array(1,1,5,5,40),new Array(1,7,5,5,45),new Array(1,1,2,4,10,55),
                new Array(1,2,2,5,35),new Array(1,5,5,3,40),new Array(1,3,5,5,45),new Array(1,1,2,5,7,55),
                new Array(1,2,3,35),new Array(1,5,5,10,40),new Array(1,5,5,3,45),new Array(1,1,2,7,5,55),
                new Array(1,2,3,40),new Array(1,5,5,3,45),new Array(1,3,5,5,50),new Array(1,1,2,7,5,60),
                new Array(1,2,3,40),new Array(1,5,5,40),new Array(1,3,5,5,50),new Array(1,1,2,7,5,60));
            var costSet = new Array(18000,35000,70000,200000,18000,35000,70000,200000,18000,35000,70000,200000,20000,37000,72000,220000,20000,37000,72000,220000,20000,37000,72000,220000,22000,39000,74000,240000,22000,39000,74000,240000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //bowman weapon
            var itemSet = new Array(1452005,1452006,1452007,1452008,1462004,1462005,1462006,1462007);
            var matSet = new Array(new Array(4131010,4011001,4011006,4021003,4021006,4003000),new Array(4131010,4011004,4021000,4021004,4003000),new Array(4131010,4021008,4011001,4011006,4003000,4000112),new Array(4131010,4005002,4021008,4011001,4021005,4003000),
                new Array(4131011,4011001,4011005,4021006,4003001,4003000),new Array(4131011,4021008,4011001,4011006,4021006,4003000),new Array(4131011,4021008,4011004,4003001,4003000),new Array(4131011,4021008,4011006,4021006,4003001,4003000));
            var matQtySet = new Array(new Array(1,5,5,3,3,30),new Array(1,7,6,3,35),new Array(1,1,10,3,40,100),new Array(1,1,2,10,6,50),new Array(1,5,5,3,50,15),new Array(1,1,8,4,2,30),new Array(1,2,6,30,30),new Array(1,2,5,3,40,40));
            var costSet = new Array(15000,20000,40000,100000,15000,25000,41000,100000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //magician weapon
            var itemSet = new Array(1372003,1372001,1372000,1372007,1382002,1382001,1382006);
            var matSet = new Array(new Array(4131008,4011002,4021002,4003000),new Array(4131008,4021006,4011002,4011001,4003000),new Array(4131008,4021006,4021005,4021007,4003003,4003000),new Array(4131008,4011006,4021003,4021007,4021002,4003000),
                new Array(4131009,4021006,4021001,4011001,4003000),new Array(4131009,4011001,4021006,4021001,4021005,4003000),new Array(4131009,4005001,4021008,4011006,4011004,4003000));
            var matQtySet = new Array(new Array(1,3,1,10),new Array(1,5,3,1,15),new Array(1,5,5,1,1,20),new Array(1,4,3,2,1,30),new Array(1,2,1,1,15),new Array(1,8,5,5,5,30),new Array(1,2,2,5,10,40));
            var costSet = new Array(15000,30000,60000,100000,10000,80000,200000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //thief weapon; claws vary depending if stimulator is being used
            if (!stimulator){
                var itemSet = new Array(1332012,1332009,1332014,1332011,1332016,1332003,1472008,1472011,1472014,1472018);
                var matSet = new Array(new Array(4131012,4011002,4011001,4003000),new Array(4131012,4021005,4011001,4003000),new Array(4131012,4021005,4011001,4011002,4003000),new Array(4131012,4011001,4011006,4021006,4003000),new Array(4131012,4005003,4021008,4011004,4011001,4003000),new Array(4131012,4005003,4021007,4011006,4011001,4003000),
                    new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000030,4003000));
                var matQtySet = new Array(new Array(1,2,3,30),new Array(1,2,3,30),new Array(1,1,5,3,35),new Array(1,7,3,6,40),new Array(1,1,2,7,10,50),new Array(1,1,2,5,10,50),new Array(1,3,2,50,20),new Array(1,4,2,80,25),new Array(1,3,2,100,30),new Array(1,4,2,40,35));
                var costSet = new Array(20000,20000,33000,73000,230000,230000,15000,30000,40000,50000);
            }
            else{
                var itemSet = new Array(1332012,1332009,1332014,1332011,1332016,1332003,1472009,1472010,1472012,1472013,1472015,1472016,1472017,1472019,1472020,1472021);
                var matSet = new Array(new Array(4131012,4011002,4011001,4003000),new Array(4131012,4021005,4011001,4003000),new Array(4131012,4021005,4011001,4011002,4003000),new Array(4131012,4011001,4011006,4021006,4003000),new Array(4131012,4005003,4021008,4011004,4011001,4003000),new Array(4131012,4005003,4021007,4011006,4011001,4003000),
                    new Array(4131013,1472008,4011002),new Array(4131013,1472008,4011003),new Array(4131013,1472011,4011004),new Array(4131013,1472011,4021008),new Array(4131013,1472014,4021000),new Array(4131013,1472014,4011003),new Array(4131013,1472014,4021008),new Array(4131013,1472018,4021000),new Array(4131013,1472018,4021005),
                    new Array(4131013,1472018,4005003,4021008));
                var matQtySet = new Array(new Array(1,2,3,30),new Array(1,2,3,30),new Array(1,1,5,3,35),new Array(1,7,3,6,40),new Array(1,1,2,7,10,50),new Array(1,1,2,5,10,50),new Array(1,1,3),new Array(1,1,3),new Array(1,1,4),new Array(1,1,1),new Array(1,1,5),new Array(1,1,5),new Array(1,1,2),new Array(1,1,6),new Array(1,1,6),new Array(1,1,1,3));
                var costSet = new Array(20000,20000,33000,73000,230000,230000,10000,15000,20000,25000,30000,30000,35000,40000,40000,50000);
            }
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "你想要制作 #t" + item + "# 吗？这样的话，你需要备齐材料。另外，请保证有足够的包裹空间。#b";

        if(stimulator){
            stimID = mats[0] - 998; //stim ID for a weapon = manual ID for weapon - 998
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        }

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
                {
                    if (matQty[i] * selection == 1) {
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {
                        if (!cm.haveItem(mats[i],matQty[i] * selection)) complete=false;
                    }
                }
            }
            else {
                if (!cm.haveItem(mats,matQty * selection)) complete=false;
            }
        }
			
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID))
            {
                complete = false;
            }
        }
			
        if (!complete)
            cm.sendOk("很抱歉，每一样材料都是制作所必须的。请备齐材料再来。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
					
            cm.gainMeso(-cost);
            if (stimulator){ //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0)
                {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("做好了！你觉得怎么样，称得上是杰作吧？");
                }
                else
                {
                    cm.sendOk("...啊！不小心走神了...呃，对不起，这些东西没法复原了。");
                }
            }
            else //just give basic item
            {
                cm.gainItem(item, 1);
                cm.sendOk("做好了！你觉得怎么样，称得上是杰作吧？");
            }
        }
        cm.dispose();
    }
}