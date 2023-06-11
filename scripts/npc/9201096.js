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
/* Jack - Refining NPC
	@author ronancpl (Ronan)
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
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("好，下回见。");
        cm.dispose();
        return;
    }

    if (status == 0) {
        var selStr = "你知道绯红要塞的远征浪潮此时此刻正在火热进行中吗？这可是一个提升自己的好机会，冒险家在那里能迅速变得强大起来。";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "我觉得善用一些强力的药剂也许会让这个过程变得更轻松。因此我想要着手制作#b#t2022284##k，看看能不能帮上什么忙。所以说真的，我正在寻找#r大量#k的必备材料：#r#t4032010##k、#r#t4032011##k,、#r#t4032012##k以及一些资金。当然，都是用于制作药剂的。有没有兴趣帮我一把，把这项生意做起来?";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2022284, 7777777);
        var matSet = new Array(new Array(4032010, 4032011, 4032012));
        var matQtySet = new Array(new Array(60, 60, 45));
        var costSet = new Array(75000, 7777777);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "好，我会帮你制作 #t" + item + "#。那么，你想制作多少？";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "所以你想要我制作 ";
        if (qty == 1)
            prompt += "一件 #t" + item + "#?";
        else
            prompt += qty + "件 #t" + item + "#?";
                        
        prompt += " 那么，我就需要一些特定的材料才能制作出你需要的道具。不过在这之前，先看看你的背包里有没有足够的空位吧。#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " 金币";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("我说过这不是免费服务吧？");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("你的背包里没有足够的空间？去整理一下。");
        }
        else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * qty == 1) {
                        complete = cm.haveItem(mats[i]);
                    } else {
                        complete = cm.haveItem(mats[i], matQty[i] * qty);
                    }
                }
            } else {
                complete = cm.haveItem(mats, matQty * qty);
            }
            
            if (!complete)
                cm.sendOk("你的包裹里没有足够的材料，好好找找看吧。");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendOk("就是这个！谢谢你的帮助。");
            }
        }
        cm.dispose();
    }
}