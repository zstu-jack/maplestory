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
/* J.J.
	NLC VIP Eye Color Change.
*/
var status = 0;
var beauty = 0;
var price = 1000000;
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
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("你好呀，我是J.J.！这家新叶城的美瞳店铺就是我开的。如果你有 #b#t5152036##k，我就能帮你选一款最适合你的美瞳！\r\n#L2#改变瞳色：#i5152036##t5152036##l\r\n#L3#一次性隐形眼镜：#i5152107# (任意颜色)#l");
        } else if (status == 1) {
            if (selection == 2) {
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace() % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                }
                colors = Array();
                pushIfItemsExists(colors, [current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700]);
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
        } else if (status == 2){
            cm.dispose();
            if (beauty == 0) {
                if (cm.haveItem(5152036) == true){
                    cm.gainItem(5152036, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                } else {
                    cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
                }
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
        }
    }
}
