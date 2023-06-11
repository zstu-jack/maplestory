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

/* Claudia
	Amoria Quest Hair Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var mhair_q = Array(30270, 30240, 30020, 30000, 30132, 30192, 30032, 30112, 30162);
var fhair_q = Array(31150, 31250, 31310, 31050, 31050, 31030, 31070, 31091, 31001);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    if (cm.isQuestCompleted(8860) && !cm.haveItem(4031528)) {
        cm.sendNext("我已经为你做过一次发型作为报酬了,如果你想要再次更换发型,需要从现金商店里购买一张#i4031528#.");
        cm.dispose();
    } else
        cm.sendYesNo("准备好做一个很棒的新发型了吗?我觉得你已经准备好了!我的剪刀也已经跃跃欲试了!");
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        if (type == 7) {
            cm.sendNext("好的,我等你一会儿.");
        }
        
        cm.dispose();
    }
    status++;
    if (status == 1) {
        hairnew = Array();
        if (cm.getPlayer().getGender() == 0)
            for(var i = 0; i < mhair_q.length; i++)
                pushIfItemExists(hairnew, mhair_q[i]);
        else
            for(var j = 0; j < fhair_q.length; j++)
                pushIfItemExists(hairnew, fhair_q[j]);
        cm.sendNext("Here we go!");
    } else {
        if (cm.haveItem(4031528)) {
            cm.gainItem(4031528, -1);
            cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
            cm.sendNextPrev("以我的眼光而言,还不错!我就知道我看过的那些书会派上用场的...");
            cm.dispose();
        } else {
            cm.sendNext("嗯...你确定你有我们店里的会员卡吗?如果没有的话可不能做发型哦.");
            cm.dispose();
        }
    }
}
