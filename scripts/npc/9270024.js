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
/* 	Kelvin
	SingaPore VIP Face changer
	@Author AAron (aaroncsn), Cody

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var mface_v = Array(20005, 20012, 20013, 20020, 20021, 20026);
var fface_v = Array(21006, 21009, 21011, 21012, 21021, 21025);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
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
        if (status == 0) {
            cm.sendSimple("让我瞧瞧...如果有一张#b#t5152038##k的话，我可以让你的脸焕然一新。选择你想要的效果吧。..\r\n\#L2#我想变得更漂亮！ (使用 #i5152038# #t5152038#)#l");
        } else if (status == 1) {
            if (!cm.haveItem(5152038)) {
                cm.sendOk("很抱歉，如果没有整容会员卡的话，我无法为你服务。");
                cm.dispose();
                return;
            }
            
            facenew = Array();
            if (cm.getPlayer().getGender() == 0) {
                for(var i = 0; i < mface_v.length; i++)
                    pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
            }
            if (cm.getPlayer().getGender() == 1) {
                for(var i = 0; i < fface_v.length; i++) {
                    pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
                }
            }
            cm.sendStyle("让我瞧瞧...如果有一张#b#t5152038##k的话，我可以让你的脸焕然一新。选择你想要的效果吧。..", facenew);
        }
        else if (status == 2){
            cm.gainItem(5152038, -1);
            cm.setFace(facenew[selection]);
            cm.sendOk("好了，让朋友们赞叹你的新脸型吧！");
            
            cm.dispose();
        }
    }
}
