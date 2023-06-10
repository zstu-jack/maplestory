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
/**
	Pila Present
-- By ---------------------------------------------------------------------------------------------
	get31720 (RaGEZONE)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
        4.0 - Fourth Version by Drago (MapleStorySA)
---------------------------------------------------------------------------------------------------
**/
var status = -1;

var marriageRoom;
var marriageAction = 0;
var marriageGifts;

function start() {
    marriageRoom = cm.getPlayer().getMarriageInstance() != null;
    if (!marriageRoom) {
        marriageGifts = cm.getUnclaimedMarriageGifts();
        marriageAction = (!marriageGifts.isEmpty() ? 2 : ((cm.haveItem(4031423) || cm.haveItem(4031424)) ? 1 : 0));
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (marriageRoom) {
        if (status == 0) {
            var talk = "你好.欢迎来到婚礼礼品登记处.你想查看谁的心愿单?";
            var options = ["Groom", "Bride"];

            cm.sendSimple(talk + "\r\n\r\n#b" + generateSelectionMenu(options) + "#k");        
        } else {
            cm.sendMarriageWishlist(selection == 0);
            cm.dispose();
        }
    } else {
        if (marriageAction == 2) {     // unclaimed gifts
            if (status == 0) {
                var talk = "你好,看起来有些无人认领的结婚礼物.在婚礼礼品登记处领取他们吧.";
                cm.sendNext(talk);
            } else {
                cm.sendMarriageGifts(marriageGifts);
                cm.dispose();
            }
        } else if (marriageAction == 1) {     // onyx prizes
            if (status == 0) {
                var msg = "你好,这里可以使用新郎新娘的玛瑙宝箱以及玛瑙宝箱兑换奖品!#b";
                var choice1 = new Array("我有一个新郎新娘的玛瑙宝箱", "我有一个玛瑙宝箱");
                for (var i = 0; i < choice1.length; i++) {
                    msg += "\r\n#L" + i + "#" + choice1[i] + "#l";
                }
                cm.sendSimple(msg);
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.haveItem(4031424)) {
                        if (cm.getPlayer().isMarried()) {   // thanks MedicOP for solving an issue here
                            if(cm.getInventory(2).getNextFreeSlot() >= 0) {
                                var rand = Math.floor(Math.random() * bgPrizes.length);
                                cm.gainItem(bgPrizes[rand][0], bgPrizes[rand][1]);

                                cm.gainItem(4031424,-1);
                                cm.dispose();
                            } else {
                                cm.sendOk("消耗栏没有足够的空间.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("已婚人士才能领取这个礼盒中的奖品.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("你没有新郎新娘的玛瑙宝箱.");
                        cm.dispose();
                    }
                } else if (selection == 1) {
                    if (cm.haveItem(4031423)) {
                        if(cm.getInventory(2).getNextFreeSlot() >= 0) {
                            var rand = Math.floor(Math.random() * cmPrizes.length);
                            cm.gainItem(cmPrizes[rand][0], cmPrizes[rand][1]);

                            cm.gainItem(4031423,-1);
                            cm.dispose();
                        } else {
                            cm.sendOk("消耗栏没有足够的空间.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("你没有玛瑙宝箱.");
                        cm.dispose();
                    }
                }
            }
        } else {
            cm.sendOk("你好,欢迎来到婚礼村的婚礼礼品登记处.我们会为新婚夫妇以及幸运宾客分发礼物.");
            cm.dispose();
        }        
    }
}

function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}