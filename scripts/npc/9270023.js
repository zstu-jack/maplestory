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
/* 	Noel
	Singapore Random Face Changer
	@Author AAron (aaroncsn), Cody
	Side note by aaron [If there is something wrong PM me on fMS]

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var mface_r = Array(20002, 20005, 20006, 20013, 20017, 20021, 20024);
var fface_r = Array(21002, 21003, 21014, 21016, 21017, 21021, 21027);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("如果使用一般会员卡，你的脸型会随机改变为全新的样子。如果你还是愿意使用#b#t5152037##k的话，我也是可以为你提供服务的。但请注意，我的整容效果是随机的。\r\n\#L2#好的 (使用 #i5152037# #t5152037#)#l");
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
            if (!cm.haveItem(5152037)) {
                cm.sendOk("很抱歉，如果没有整容会员卡的话，我无法为你服务。");
                cm.dispose();
                return;
            }
            
            facenew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mface_r.length; i++) 
                    pushIfItemExists(facenew, mface_r[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
            if (cm.getPlayer().getGender() == 1)
                for(var i = 0; i < fface_r.length; i++) 
                    pushIfItemExists(facenew, fface_r[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
            cm.sendYesNo("如果使用普通会员卡，你的脸型将会#r随机#k改变。确定要使用 #b#t5152037##k?");
        } else if (status == 2){
            cm.gainItem(5152037 , -1);
            cm.setFace(facenew[Math.floor(Math.random() * facenew.length)]);
            cm.sendOk("好了，让朋友们赞叹你的新脸型吧！");
            
            cm.dispose();
        }
    }
}
