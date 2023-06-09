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
/* Coco
        Refining NPC: 
	* Chaos scroll SYNTHETIZER (rofl)
        * 
        * @author RonanLana (ronancpl)
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
        cm.sendOk("喔，好的...等你想要做这笔生意的时候再回来找我们谈吧。");
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("你好，我们是#b#p" + cm.getNpc() + "##k。");
            cm.dispose();
            return;
        }
        
        var selStr = "你好啊，旅行者！过来，再靠近点...我们要和你#b做一笔大生意#k。如果你有兴趣了解一下的话，就听我们说下去...";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "我们刚刚学到了合成强大的#b#t2049100##k的方法！当然，制作起来并不简单...不过别担心！只要凑齐材料交给我们，再支付 #b1,200,000金币#k 作为我们的服务费就能 #b得到它#k。你有没有兴趣？";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2049100, 7777777);
        var matSet = new Array(new Array(4031203,4001356,4000136,4000082,4001126,4080100,4000021,4003005));
        var matQtySet = new Array(new Array(100,60,40,80,10,8,200,120));
        var costSet = new Array(1200000, 7777777);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "想要制作#t" + item + "#，对吗？那么，你想制作多少？";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "想要制作";
        if (qty == 1)
            prompt += "一件 #t" + item + "#?";
        else
            prompt += qty + "件 #t" + item + "#?";
                        
        prompt += " 那么，请确认你准备好了相应材料，并且背包里有充足的空间。#b";
                
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
            cm.sendOk("别这样，我们不是免费来帮忙的！我们也需要金币，带够金币来找我们，我们才会为你合成。");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("在和我们做生意之前，你还没有检查过你的背包是不是有空位，对吧？");
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
                cm.sendOk("没有原材料的话，我们也没法开始制作。去搜集所有的材料再来找我们吧！");
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
                cm.sendOk("哇...真不敢相信，居然成功了！我还想如果失败了怎么办呢...咳嗯。成功是很自然的事情，我们的所有工序都很高效！给，和你做生意很愉快。");
            }
        }
        cm.dispose();
    }
}