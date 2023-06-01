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
/* Bomack
	NLC Random Eye Color Change.
*/
var status = 0;
var price = 1000000;
var colors = Array();

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
            cm.sendSimple("你好啊~！我是波马克。如果你有 #b#t5152035##k 的话，我可以试着为你改变瞳色。需要吗？\r\n#L2#改变瞳色：#i5152035##t5152035##l");
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
                cm.sendYesNo("如果使用普通会员卡，你的瞳色将会#r随机#k改变。确定要使用 #b#t5152035##k 来改变你的瞳色吗？");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152035) == true){
                cm.gainItem(5152035, -1);
                cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
            } else {
                cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
            }
        }
    }
}
