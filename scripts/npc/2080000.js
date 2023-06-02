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
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

var cd_item = 4001078;
var cd_mats = new Array(4011001,4011002,4001079);
var cd_matQty = new Array(1,1,1);
var cd_cost = 25000;

function start() {
    cm.getPlayer().setCS(true);
    var selStr = "不要低估一条龙的力量。如果你喜欢的话，我可以把它的力量灌注到你的武器中。不过，得是足够强大的武器才能承受这种力量...#b"
    var options = new Array("辅助剂是什么？","制作战士武器","制作弓箭手武器","制作法师武器","制作飞侠武器",
    "使用辅助剂制作战士武器","使用辅助剂制作弓箭手武器","使用辅助剂制作法师武器","使用辅助剂制作飞侠武器");
        
    if(cm.isQuestStarted(7301) || cm.isQuestStarted(7303)) options.push("制作 #t4001078#");
    
    for (var i = 0; i < options.length; i++){
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 1) {
        selectedType = selection;
        if (selectedType > 5 && selectedType < 11) {
            stimulator = true;
            selectedType -= 5;
        }
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("辅助剂是一种用来在特定物品制作过程中添加的特殊药剂。它所能提供的属性与掉落来源相仿。不过有可能不发生变化，也有可能使产物品质变低。另外，有10%的概率令物品消失，所以请慎重选择使用。")
            cm.dispose();
        } else if (selectedType == 1){ //warrior weapon
            var selStr = "很好，你准备让哪一把战士武器灌注龙的力量呢？#b";
            var weapon = new Array ("狂龙闪电剑#k - 等级.110 单手剑#b","狂龙怒斩#k - 等级.110 单手斧#b","狂龙地锤#k - 等级.110 单手钝器#b","飞龙巨剑#k - 等级.110 双手剑#b","炼狱魔龙斧#k - 等级.110 双手斧#b","金龙轰天锤#k - 等级.110 双手钝器#b",
                "盘龙七冲枪#k - 等级.110 Spear#b","血龙神斧#k - 等级.110 矛#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 2){ //bowman weapon
            var selStr = "很好，你准备让哪一把弓箭手武器灌注龙的力量呢？#b";
            var weapon = new Array ("金龙振翅弓#k - 等级.110 弓#b","黄金飞龙弩#k - 等级.110 Crossbow#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 3){ //magician weapon
            var selStr = "很好，你准备让哪一把法师武器灌注龙的力量呢？#b";
            var weapon = new Array ("佘太君龙杖#k - 等级.108 短杖#b","黑精灵王杖#k - 等级.110 长杖#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 4){ //thief weapon
            var selStr = "很好，你准备让哪一把飞侠武器灌注龙的力量呢？#b";
            var weapon = new Array ("蝉翼龙牙破#k - 等级.110 短刀（力）#b","半月龙鳞裂#k - 等级.110 短刀（运）#b","寒木升龙拳#k - 等级.110 拳套#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 5){ //pirate weapon
            var selStr = "很好，你准备让哪一把海盗武器灌注龙的力量呢？#b";
            var weapon = new Array ("撕裂者#k - 等级.110 Knuckle#b","枭龙#k - 等级.110 Gun#b");
            for (var i = 0; i < weapon.length; i++){
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
	}
        else if (selectedType == 11){ //cornian's dagger
            var selStr = "喔，你准备潜入那群蜥蜴之中救出摩伊拉吗？我会尽我所能地帮助你。拿来一套材料，我会帮你做一柄足够以假乱真的 #t4001078#。";
            cm.sendNext(selStr);
	}
    } else if (status == 2) {
        selectedItem = selection;
        
        if (selectedType == 1){ //warrior weapon
            var itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
            var matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
                new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
            var matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
            var costSet = new Array(120000,120000,120000,120000,120000,120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2){ //bowman weapon
            var itemSet = new Array(1452044,1462039);
            var matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
            var matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3){ //magician weapon
            var itemSet = new Array(1372032,1382036);
            var matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
            var matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4){ //thief weapon
            var itemSet = new Array(1332049,1332050,1472051);
            var matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
            var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
            var costSet = new Array(120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 5){ //pirate weapon
            var itemSet = new Array(1482013,1492013);
            var matSet = new Array(new Array(1482012,4000244,4000245,4005000,4005002),new Array(1492012,4000244,4000245,4005000,4005002));
            var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 11){ //cornian's dagger
            item = cd_item;
            mats = cd_mats;
            matQty = cd_matQty;
            cost = cd_cost;
        }
        
        var prompt = "你想要制作 #t" + item + "# 吗？这样的话，你需要备齐材料。另外，请保证有足够的包裹空间。#b";
        if(stimulator){
            stimID = getStimID(item);
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        }
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " 金币";
        cm.sendYesNo(prompt);
    } else if (status == 3) {
        var complete = true;
        
        if(!cm.canHold(item, 1)) {
            cm.sendOk("请检查你的物品栏是否有足够空间。");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost) {
            cm.sendOk("全神木村再也找不到第二家收费比我更公道的了，如果你付不起这样的价格，就走吧。");
            cm.dispose();
            return;
        } else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID)) {
                complete = false;
            }
        }
        if (!complete)
            cm.sendOk("没有用对应的材料来制作的话，龙魂让你的武器变得不稳定。带齐所有材料再来找我吧。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else
                cm.gainItem(mats, -matQty);
            cm.gainMeso(-cost);
            if (stimulator) { //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("制作完成。请你善待这把武器，不要被龙魂的怒火反噬自身。");
                } else {
                    cm.sendOk("运气不太好，龙魂和你的武器发生了剧烈的冲突...对于你的损失，我非常抱歉。");
                }
            }
            else {//just give basic item
                cm.gainItem(item, 1);
                cm.sendOk("制作完成。请你善待这把武器，不要被龙魂的怒火反噬自身。");
            }
        }
        cm.dispose();
    }
}

function getStimID(equipID){
    var cat = Math.floor(equipID / 10000);
    switch (cat){
        case 130: //1h sword
            return 4130002;
        case 131: //1h axe
            return 4130003;
        case 132: //1h bw
            return 4130004;
        case 140: //2h sword
            return 4130005;
        case 141: //2h axe
            return 4130006;
        case 142: //2h bw
            return 4130007;
        case 143: //spear
            return 4130008;
        case 144: //polearm
            return 4130009;
        case 137: //wand
            return 4130010;
        case 138: //staff
            return 4130011;
        case 145: //bow
            return 4130012;
        case 146: //xbow
            return 4130013;
        case 148: //knuckle
            return 4130016;
        case 149: //pistol
            return 4130017;
        case 133: //dagger
            return 4130014;
        case 147: //claw
            return 4130015;
    }
    return 4130002;
}