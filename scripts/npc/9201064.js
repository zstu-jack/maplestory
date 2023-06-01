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
/* Mani
        NLC VIP Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30250, 30490, 30730, 30870, 30880, 33100);
var fhair_v = Array(31320, 31450, 31560, 31730, 31830);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("我是这间美发沙龙的老板玛尼。如果你拥有 #b#t5150031##k 或 #b#t5151026##k，就请到美发椅这边坐下。选择你想要使用的服务。\r\n#L1#更改发型：#i5150031##t5150031##l\r\n#L2#更改发色：#i5151026##t5151026##l");
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
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair_v.length; i++)
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair_v.length; i++)
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("我会让你的发型看起来大不相同，美得不同以往。你也想多做一些改变，对吗？只需要付出一张#b#t5150031##k，剩下的事情放心交给我。选一个你喜欢的发型吧。", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    pushIfItemExists(haircolor, current + i);
                cm.sendStyle("我可以将你的头发染成全新的颜色，让你看起来更帅气美丽。只需要一张#b#t5151026##k。怎么样？我会仔细处理的，请你放心。选一个你喜欢的发色吧。", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420001)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
                } else if (cm.haveItem(5150031)){
                    cm.gainItem(5150031, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
                } else
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
            }
            if (beauty == 2){
                if (cm.haveItem(5151026) == true){
                    cm.gainItem(5151026, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
                } else
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150031, 1);
                    cm.sendOk("谢谢惠顾。");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151026, 1);
                    cm.sendOk("谢谢惠顾。");
                } else
                    cm.sendOk("你没有足够的金币来购买会员卡。");
            }
        }
    }
}