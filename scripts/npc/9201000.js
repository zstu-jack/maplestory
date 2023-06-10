/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

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
/* Moony
	Amoria (680000000)
	Engagement ring NPC.
 */

var status;
var state;

var item;
var mats;
var matQty;
var cost;

var options;

function hasEngagementBox(player) {
    for(var i = 2240000; i <= 2240003; i++) {
        if(player.haveItem(i)) {
            return true;
        }
    }
    
    return false;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            options = ["我想制作订婚戒指。", "我想销毁我的戒指盒。"];
            cm.sendSimple("我是#p9201000#，是位#b婚戒匠人#k。有什么能帮助您的？\r\n\r\n#b" + generateSelectionMenu(options));
        } else if(status == 1) {
            if(selection == 0) {
                if(!cm.isQuestCompleted(100400)) {
                    if(!cm.isQuestStarted(100400)) {
                        state = 0;
                        cm.sendNext("想制作订婚戒指吗？那么你需要先从#b#p9201003##k那里获得#r祝福#k，我才会为你制作。");
                    } else {
                        cm.sendOk("要先从#b#p9201003##k那里获得祝福，我才会为你制作订婚戒指。他们应该就在家里等你，去#r射手训练场#k附近找他们吧。");
                        cm.dispose();
                    }
                } else {
                    if(hasEngagementBox(cm.getPlayer())) {
                        cm.sendOk("抱歉，你已经有订婚戒指盒了。每人只能持有一只订婚戒指盒。");
                        cm.dispose();
                        return;
                    }
                    if(cm.getPlayer().getGender() != 0) {
                        cm.sendOk("抱歉，订婚戒指盒仅供男方求婚时使用。");
                        cm.dispose();
                        return;
                    }

                    state = 1;
                    options = ["月岩", "星岩", "金心相印", "夙世银缘"];
                    var selStr = "所以,你想定制什么样子的订婚戒指呢？\r\n\r\n#b" + generateSelectionMenu(options);
                    cm.sendSimple(selStr);
                }
            } else {
                if(hasEngagementBox(cm.getPlayer())) {
                    for(var i = 2240000; i <= 2240003; i++) {
                        cm.removeAll(i);
                    }
                    
                    cm.sendOk("你的订婚戒指盒已经被成功销毁。");
                } else {
                    cm.sendOk("你没有可供销毁的订婚戒指盒。");
                }
                
                cm.dispose();
            }
        } else if(status == 2) {
            if(state == 0) {
                cm.sendOk("他们住在哪里~嗯~这就要从很久之前开始说起了。你知道的，我们是老朋友了，他们的订婚戒指也是我制作的。他们住在#r射手训练场#k附近，我相信具体的位置你很容易就能找到。");
                cm.startQuest(100400);
                cm.dispose();
            } else {
                var itemSet = new Array(2240000,2240001,2240002,2240003);
                var matSet = new Array(new Array(4011007,4021007),new Array(4021009,4021007),new Array(4011006,4021007),new Array(4011004,4021007));
                var matQtySet = new Array(new Array(1,1),new Array(1,1),new Array(1,1),new Array(1,1));
                var costSet = new Array (30000,20000,10000,5000);

                item = itemSet[selection];
                mats = matSet[selection];
                matQty = matQtySet[selection];
                cost = costSet[selection];

                var prompt = "那么我会为你制作#b#t" + item + "##k,你确定是这个款式,没错吧？";
                prompt += " 那么，请确认你准备好了相应材料，并且背包里有充足的空间。#b";

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
        } else if(status == 3) {
            var complete = true;
            var recvItem = item, recvQty = 1, qty = 1;

            if(!cm.canHold(recvItem, recvQty)) {
                cm.sendOk("请检查你的物品栏是否有足够空间。");
                cm.dispose();
                return;
            }
            else if (cm.getMeso() < cost * qty)
            {
                cm.sendOk("抱歉，这可不是免费服务。请备好足够的金币用于制作订婚戒指。");
                cm.dispose();
                return;
            }
            else
            {
                if (mats instanceof Array) {
                    for(var i = 0; complete && i < mats.length; i++)
                        if (!cm.haveItem(mats[i], matQty[i] * qty))
                            complete = false;
                }
                else if (!cm.haveItem(mats, matQty * qty))
                    complete = false;
            }

            if (!complete)
                cm.sendOk("嗯，你还没准备好制作订婚戒指的材料吧？先找齐材料交给我，好吗？");
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
                cm.sendOk("制作结束，一枚新制成的订婚戒指。祝你求婚成功。");
            }
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
    }
    return menu;
}