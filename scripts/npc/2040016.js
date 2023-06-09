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

/* Pi
	Ludibrium Village (220000300)
	
	Refining NPC: 
	* Minerals
	* Jewels
	* Moon/Star Rocks
	* Crystals (minus Dark)
	* Processed Wood/Screws
	* Arrows/Bronze Arrows/Steel Arrows
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

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
        var selStr = "嗯？你是...哦，你听说过我高超的锻造技术了？那样的话，我很乐意为你冶炼一些母矿...只要支付手续费就好。#b"
        var options = new Array("冶炼矿石母矿","冶炼宝石母矿","冶炼稀有宝石","冶炼水晶母矿","制作材料","制作箭支");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //mineral refine
            var selStr = "你想要冶炼哪种矿石母矿？#b";
            var minerals = new Array ("青铜母矿","钢铁母矿","锂矿石母矿","朱矿石母矿","银的母矿","紫矿石母矿","黄金母矿");
            for (var i = 0; i < minerals.length; i++){
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //jewel refine
            var selStr = "你想要冶炼哪种宝石母矿？#b";
            var jewels = new Array ("石榴石母矿","紫水晶母矿","海蓝石母矿","祖母绿母矿","蛋白石母矿","蓝宝石母矿","黄晶母矿","钻石母矿","黑水晶母矿");
            for (var i = 0; i < jewels.length; i++){
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //rock refine
            var selStr = "你想要冶炼哪种稀有宝石？#b";
            var items = new Array ("月石","星石");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //crystal refine
            var selStr = "水晶母矿？我可太喜欢冶炼它们了！#b";
            var crystals = new Array ("力量水晶母矿","智慧水晶母矿","敏捷水晶母矿","幸运水晶母矿");
            for (var i = 0; i < crystals.length; i++){
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4){ //material refine
            var selStr = "你想要制作哪种材料？#b";
            var materials = new Array ("使用树枝制作加工过的木材","使用木块制作加工过的木材","制作螺丝钉 (每组15个)");
            for (var i = 0; i < materials.length; i++){
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 5){ //arrow refine
            var selStr = "你想要制作哪种箭支？#b";
            var arrows = new Array ("弓矢","弩矢","青铜弓矢","青铜弩矢","钢铁弓矢","刚毅而弩矢");
            for (var i = 0; i < arrows.length; i++){
                selStr += "\r\n#L" + i + "# " + arrows[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        if (equip)
            status++;
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 0){ //mineral refine
            var itemSet = new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006);
            var matSet = new Array(4010000,4010001,4010002,4010003,4010004,4010005,4010006);
            var matQtySet = new Array(10,10,10,10,10,10,10);
            var costSet = new Array(270,270,270,450,450,450,720);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //jewel refine
            var itemSet = new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008);
            var matSet = new Array(4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008);
            var matQtySet = new Array(10,10,10,10,10,10,10,10,10);
            var costSet = new Array (450,450,450,450,450,450,450,900,2700);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //rock refine
            var itemSet = new Array(4011007,4021009);
            var matSet = new Array(new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006), new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008));
            var matQtySet = new Array(new Array(1,1,1,1,1,1,1),new Array(1,1,1,1,1,1,1,1,1));
            var costSet = new Array(9000,13500);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //crystal refine
            var itemSet = new Array (4005000,4005001,4005002,4005003);
            var matSet = new Array(4004000,4004001,4004002,4004003);
            var matQtySet = new Array (10,10,10,10);
            var costSet = new Array (4500,4500,4500,4500);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //material refine
            var itemSet = new Array (4003001,4003001,4003000);
            var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
            var matQtySet = new Array (10,5,new Array (1,1));
            var costSet = new Array (0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
	        
        var prompt = "想要制作#t" + item + "#，对吗？那么，你想制作多少？";
		
        cm.sendGetNumber(prompt,1,1,100)
    }
    else if (status == 3 && mode == 1) {
        if (equip)
        {
            selectedItem = selection;
            qty = 1;
        }
        else
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

        // thanks kvmba for noticing arrow selection crashing players
        if (selectedType == 5){ //arrow refine
            var itemSet = new Array(2060000,2061000,2060001,2061001,2060002,2061002);
            var matSet = new Array(new Array (4003001,4003004),new Array (4003001,4003004),new Array (4011000,4003001,4003004),new Array (4011000,4003001,4003004),
                new Array (4011001,4003001,4003005),new Array (4011001,4003001,4003005));
            var matQtySet = new Array (new Array (1,1),new Array (1,1),new Array (1,3,10),new Array (1,3,10),new Array (1,5,15),new Array (1,5,15));
            var costSet = new Array (0,0,0,0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "你想制作 ";
        if (qty == 1)
            prompt += "一件 #t" + item + "#?";
        else
            prompt += qty + "件 #t" + item + "#?";
			
        prompt += " 那么，请确认你准备好了相应材料，并且背包里有充足的空间。#b";
		
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost * qty + " 金币";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 4 && mode == 1) {
        var complete = true;
        var recvItem = item, recvQty;
        
        if (item >= 2060000 && item <= 2060002) //bow arrows
            recvQty = 1000 - (item - 2060000) * 100;
        else if (item >= 2061000 && item <= 2061002) //xbow arrows
            recvQty = 1000 - (item - 2061000) * 100;
        else if (item == 4003000)//screws
            recvQty = 15 * qty;
        else
            recvQty = qty;
        
        if(!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("");
        }
        else if (cm.getMeso() < cost * qty)
        {
            cm.sendOk("金币不足的话，我无法为你制作。");
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] * qty == 1)	{
                        if (!cm.haveItem(mats[i] * qty))
                        {
                            complete = false;
                        }
                    }
                    else {
                        if (!cm.haveItem(mats[i],matQty[i] * qty)) complete=false;
                    }
                }
            }
            else {
                if (!cm.haveItem(mats, matQty * qty)) complete=false;
            }
            
            if (!complete)
                cm.sendOk("等等，没有足够的材料是无法开始制作的。这些材料你拿回去。");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                }
                else
                    cm.gainItem(mats, -matQty * qty);

                if (cost > 0)
                    cm.gainMeso(-cost * qty);

                cm.gainItem(recvItem, recvQty);
                cm.sendOk("都做好了，如果还有其他需要，再来找我就好。");
            }
        }
	
        cm.dispose();
    }
}