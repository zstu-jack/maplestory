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

status = -1;
var sel;
var pickup = -1;

function start() {
    cm.sendSimple("我是阿得拉,一位交易稀有商品的中介商人，你有什么想要交易的？#b\r\n#L0#我想要出售道具。\r\n#L1#我想了解现在的市场价格。\r\n#L2中介商人是什么？");
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 0){
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 0 && status == 2){
            cm.sendNext("现在不想出售吗？那你可以晚些时候再来，不过要记得特殊商品只在当周内可以出售。");
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 2)
            status -= 2;
    }
    if(status == 0){
        if(sel == undefined)
            sel = selection;
        if (selection == 0){
            var text = "让我们瞧瞧你带来了什么...#b";
            for(var i = 0; i < 5; i++)
                text += "\r\n#L" + i + "##t" + (3994090 + i) + "#";
            cm.sendSimple(text);
        }else if (selection == 1){
            var text = "";
            for(var i = 0; i < 5; i++)
                text += "目前 #t" + (i + 3994090) + "# 的市场价格 #r尚未确定#k。\r\n";
            cm.sendNext(text);
            cm.dispose();
        }else
            cm.sendNext("我在冒险岛周末集市上买进货物，去其它城镇出售。纪念品、香料、鲨鱼标本或其它商品都可以在我这里交易...但我不收烦斯乐的鸡蛋和金鸡蛋。");
    }else if(status == 1){
        if(sel == 0){
            if(cm.haveItem(3994090 + selection)){
                pickup = 3994090 + selection;
                cm.sendYesNo("目前的市场价格是180金币。你想要现在出售吗？"); //Make a price changer by hour.
            }else{
                cm.sendNext("如果你没有什么要交易的，就别浪费我的时间了...我很忙的。");
                cm.dispose();
            }
        }else
            cm.sendNextPrev("冒险岛周末集市在在周末歇业。如果你需要交易，请在星期一到星期五这段时间来找我...");
    }else if(status == 2){
        if(sel == 0)
            cm.sendGetNumber("你想出售多少？", 0, 0, 200);
        else{
            cm.sendPrev("哇。市场价格正在变化。我可不吃这种亏，还得做生意呢。稍后再来，我这里的价格每个小时都会变更。");
        }
    }else if(status == 3){
        if(sel == 0)
            if(selection != 1)
                cm.sendNext("交易未完成，请检查一下。");
            else{
                cm.sendNext("交易完成，下次见。");
                cm.gainMeso(180);
                cm.gainItem(pickup, -1);
            }
        cm.dispose();
    }
}