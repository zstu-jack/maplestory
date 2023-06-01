/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Dr. Lenu
	Henesys Random/VIP Eye Color Change.
*/
var status = 0;
var beauty = 0;
var regprice = 1000000;
var vipprice = 1000000;
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
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0)
            cm.sendSimple("你好啊。我是勒努博士，射手村整形医院的美瞳专家。只要拥有 #b#t5152010##k 或 #b#t5152013##的话，你就能在这里享受最高级的服务，拥有梦寐以求的闪亮双眸。。 眼睛是心灵的窗户，不是吗？大家都会首先注意到你的眼睛，而我们的特长就是让它们变得美丽。你想选择哪种服务？\r\n#L1#改变瞳色：#i5152010##t5152010##l\r\n#L2#改变瞳色：#i5152013##t5152013##l\r\n#L3#一次性隐形眼镜：#i5152103# (任意颜色)#l");
        else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                if (cm.getPlayer().getGender() == 0)
                    var current = cm.getPlayer().getFace()% 100 + 20000;
                if (cm.getPlayer().getGender() == 1)
                    var current = cm.getPlayer().getFace()% 100 + 21000;
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 200, current +400, current + 600, current + 700]);
                cm.sendYesNo("如果使用普通会员卡，你的瞳色将会#r随机#k改变。确定要使用 #b#t5152010##k 来改变你的瞳色吗？");
            } else if (selection == 2) {
                beauty = 2;
                if (cm.getPlayer().getGender() == 0)
                    var current = cm.getPlayer().getFace()% 100 + 20000;
                if (cm.getPlayer().getGender() == 1)
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 200, current +400, current + 600, current + 700]);
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
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5152010) == true){
                    cm.gainItem(5152010, -1);
                    cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                    cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                } else
                    cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
            } else if (beauty == 2){
                if (cm.haveItem(5152013) == true){
                    cm.gainItem(5152013, -1);
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
            } else if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= regprice) {
                    cm.gainMeso(-regprice);
                    cm.gainItem(5152010, 1);
                    cm.sendOk("谢谢惠顾。");
                } else if (selection == 1 && cm.getMeso() >= vipprice) {
                    cm.gainMeso(-vipprice);
                    cm.gainItem(5152013, 1);
                    cm.sendOk("谢谢惠顾。");
                } else
                    cm.sendOk("你没有足够的金币来购买会员卡。");
            }
        }
    }
}
