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
/* V. Isage
	NLC VIP Eye Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_v = Array(20000, 20001, 20003, 20004, 20005, 20006, 20008, 20012, 20031);
var fface_v = Array(21001, 21002, 21003, 21004, 21005, 21006, 21008, 21012, 21016);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("你好，欢迎来到新叶城整形医院。想要让你的脸焕然一新吗？只要一张 #b#t5152034##k ，你就可以享受高质量的美容服务，拥有梦寐以求的容貌。\r\n#L2#改变脸型：#i5152034##t5152034##l");
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mface_v.length; i++)
                        pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace()% 100));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fface_v.length; i++)
                        pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                cm.sendStyle("让我瞧瞧...如果有一张#b#t5152034##k的话，我可以让你的脸焕然一新。选择你想要的效果吧。", facenew);
            }
        }
        else if (status == 2){
            if (cm.haveItem(5152034)){
                cm.gainItem(5152034, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("好了，让朋友们赞叹你的新脸型吧！");
            } else {
                cm.sendOk("很抱歉，如果没有整容会员卡的话，我无法为你服务。");
            }
            
            cm.dispose();
        }
    }
}
