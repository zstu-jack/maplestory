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
/* 	Sixx
	Singa REG/VIP Eye Color Changer
*/

var status = 0;
var beauty = 0;
var colors = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
    cm.sendSimple("你好，我是希克斯，中心商务区大眼睛眼镜店的老板。如果你拥有 #b#t5152039##k 或者 #b#t5152040##k的话，只需要把它交给我，剩下的事情就不必操心，期待你一直渴望拥有的美丽双眸就好！每个人都会首先注意到对方的眼睛，而我们则会帮助你找到最合适的美瞳。来，挑选你喜欢的那一款吧。\r\n#L1#改变瞳色：#i5152039##t5152039##l\r\n#L2#改变瞳色：#i5152040##t5152040##l\r\n#L3#一次性隐形眼镜：#i5152107# (任意颜色)#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                var current = cm.getPlayer().getFace()% 100 + 20000 + cm.getPlayer().getGender() * 1000;
                cm.sendYesNo("如果使用普通会员卡，你的瞳色将会#r随机#k改变。确定要使用 #b#t5152039##k 来改变你的瞳色吗？");
            } else if (selection == 2) {
                beauty = 2;
                var current = cm.getPlayer().getFace()% 100 + 20000 + cm.getPlayer().getGender() * 1000;
                pushIfItemsExists(colors, [current + 200, current + 300, current +400, current + 700]);
                cm.sendStyle("使用这里的特制医疗器械，可以预览术后效果。你喜欢哪种瞳色？选择一款你喜欢的风格吧。", colors);
            } else if (selection == 3) {
                beauty = 3;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 21000;
                }
                
                colors = Array();
                for (var i = 0; i < 8; i++) {
                    if (cm.haveItem(5152100 + i)) {
                        pushIfItemExists(colors, current + 100 * i);
                    }
                }
                
                if (colors.length == 0) {
                    cm.sendOk("你没有可供使用的一次性隐形眼镜。");
                    cm.dispose();
                    return;
                }
                
                cm.sendStyle("你喜欢哪种瞳色？选择一款你喜欢的风格吧。", colors);
            }
        }
        else if (status == 2) {
            if (beauty == 1){
                if (cm.haveItem(5152039)){
                    cm.gainItem(5152039, -1);
                    cm.setFace(Math.floor(Math.random() * 8) * 100 + current);
                    cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                } else
                    cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
            } else if (beauty == 2){
                if (cm.haveItem(5152040)){
                    cm.gainItem(5152040, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                } else 
                    cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
            } else if (beauty == 3){
                var color = (colors[selection] / 100) % 100 | 0;
                
                if (cm.haveItem(5152100 + color)){
                    cm.gainItem(5152100 + color, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                } else {
                    cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
                }
            }
            cm.dispose();
        }
    }
}
