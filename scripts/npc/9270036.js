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
/*     Eric
        Singapore VIP Hair/Color Changer
        @Author AAron, Cody (FlowsionMS) Forums

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var mhair_v = Array(30000, 30020, 30110, 30120, 30270, 30290, 30310, 30670, 30840);
var fhair_v = Array(31010, 31050, 31110, 31120, 31240, 31250, 31280, 31670, 31810);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("我是埃里克，欢迎来到光速美发沙龙！你或许拥有#b#t5150033##k 或 #b#t5151028##k中的一种吗？那样的话，我就可以为你提供服务。\r\n#L1#更改发型：#i5150033##t5150033##l\r\n#L2#更改发色：#i5151028##t5151028##l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (selection == 1) {
            beauty = 1;
            hairnew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mhair_v.length; i++)
                    pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
            else
                for(var i = 0; i < fhair_v.length; i++)
                    pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
            cm.sendStyle("我可以将你的头发修剪成全新的造型，让你看起来更帅气美丽。只需要一张#b#t5150033##k。怎么样？我会仔细处理的，请你放心。选一个你喜欢的发型吧。", hairnew);
        } else if (selection == 2) {
            beauty = 2;
            haircolor = Array();
            var current = parseInt(cm.getPlayer().getHair()/10)*10;
            for(var i = 0; i < 8; i++)
                pushIfItemExists(haircolor, current + i);
            cm.sendStyle("我可以将你的头发修剪成全新的造型，让你看起来更帅气美丽。只需要一张#b#t5151028##k。怎么样？我会仔细处理的，请你放心。选一个你喜欢的发色吧。", haircolor);
        } else if (status == 2) {
            if (beauty == 1){
                if (cm.haveItem(5150033)){
                    cm.gainItem(5150033, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
                } else
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
            }
            if (beauty == 2){
                if (cm.haveItem(5151028)){
                    cm.gainItem(5151028, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
                } else
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
            }
            cm.dispose();
        }
    }
}
