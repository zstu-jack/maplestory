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
            var talk = "���.��ӭ����������Ʒ�ǼǴ�.����鿴˭����Ը��?";
            var options = ["Groom", "Bride"];

            cm.sendSimple(talk + "\r\n\r\n#b" + generateSelectionMenu(options) + "#k");        
        } else {
            cm.sendMarriageWishlist(selection == 0);
            cm.dispose();
        }
    } else {
        if (marriageAction == 2) {     // unclaimed gifts
            if (status == 0) {
                var talk = "���,��������Щ��������Ľ������.�ڻ�����Ʒ�ǼǴ���ȡ���ǰ�.";
                cm.sendNext(talk);
            } else {
                cm.sendMarriageGifts(marriageGifts);
                cm.dispose();
            }
        } else if (marriageAction == 1) {     // onyx prizes
            if (status == 0) {
                var msg = "���,�������ʹ�������������觱����Լ���觱���һ���Ʒ!#b";
                var choice1 = new Array("����һ�������������觱���", "����һ����觱���");
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
                                cm.sendOk("������û���㹻�Ŀռ�.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("�ѻ���ʿ������ȡ�������еĽ�Ʒ.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("��û�������������觱���.");
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
                            cm.sendOk("������û���㹻�Ŀռ�.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("��û����觱���.");
                        cm.dispose();
                    }
                }
            }
        } else {
            cm.sendOk("���,��ӭ���������Ļ�����Ʒ�ǼǴ�.���ǻ�Ϊ�»���Լ����˱��ͷַ�����.");
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