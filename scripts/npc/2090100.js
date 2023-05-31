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

/* Grandpa Luo
	Mu Lung VIP Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30150, 30240, 30370, 30420, 30640, 30710, 30750, 30810);
var fhair_v = Array(31140, 31160, 31180, 31300, 31460, 31470, 31660, 31910);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("欢迎来到武陵美发馆。如果你有 #b#t5150025##k 或是 #b#t5151020##k，就请来我这边坐下吧。选择你想要使用的服务。\r\n#L1#更改发型：#i5150025##t5150025##l\r\n#L2#更改发色：#i5151020##t5151020##l");
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendStyle("我可以将你的头发修剪成全新的造型，让你看起来更帅气美丽。只需要一张#b#t5150025##k。怎么样？我会仔细处理的，请你放心。选一个你喜欢的发型吧。", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()
                    /10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("我可以将你的头发染成全新的颜色，让你看起来更帅气美丽。只需要一张#b#t5151020##k。怎么样？我会仔细处理的，请你放心。选一个你喜欢的发色吧。", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420006)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
                } else if (cm.haveItem(5150025)){
                    cm.gainItem(5150025, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
                } else {
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151020)){
                    cm.gainItem(5151020, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
                } else {
                    cm.sendOk("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150025, 1);
                    cm.sendOk("谢谢惠顾。");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151020, 1);
                    cm.sendOk("谢谢惠顾。");
                } else {
                    cm.sendOk("你没有足够的金币来购买会员卡。");
                }
            }
        }
    }
}
