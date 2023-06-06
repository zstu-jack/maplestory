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

var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }

                if (mode == 1)
                        status++;
                else
                        status--;
                    
                if(cm.getMapId() == 925100500) {
                        if (status == 0) {
                                if(cm.isEventLeader()) {
                                        cm.sendOk("得救了！真是多谢你们。");
                                }
                                else {
                                        cm.sendOk("得救了！真是多谢你们。领取奖励之前，让你们的队长和我说话...");
                                        cm.dispose();
                                }
                        }
                        else {
                                cm.getEventInstance().clearPQ();
                                cm.dispose();
                        }
                }
                else {
                        if (status == 0) {
                                cm.sendSimple("谢谢你们救了我！我有什么可以帮你们的吗？\r\n#b#L0#送我离开这里。\r\n#L1#领取老海盗的帽子。");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (!cm.canHold(4001158, 1)) {
                                                cm.sendOk("请在其他栏腾出空间。");
                                                cm.dispose();
                                                return;
                                        }
                                        cm.gainItem(4001158, 1);
                                        cm.warp(251010404,0);
                                } else {
                                        if (cm.haveItem(1003267, 1)) {
                                                cm.sendOk("这顶帽子是最好的，给你。");
                                        } else if (cm.haveItem(1002573, 1)) {
                                                if (cm.haveItem(4001158, 20)) {	
                                                        if (cm.canHold(1003267,1)) {
                                                                cm.gainItem(1002573, -1);
                                                                cm.gainItem(4001158, -20);
                                                                cm.gainItem(1003267,1);
                                                                cm.sendOk("给你这顶帽子。");
                                                        } else {
                                                                cm.sendOk("请在装备栏腾出容纳帽子的空位。");
                                                        }
                                                } else {
                                                        cm.sendOk("需要获得 20枚 #t4001158# 来交换下一顶帽子。");
                                                }
                                        } else if (cm.haveItem(1002572, 1)) {
                                                if (cm.haveItem(4001158, 20)) {
                                                        if (cm.canHold(1002573,1)) {
                                                                cm.gainItem(1002572, -1);
                                                                cm.gainItem(4001158, -20);
                                                                cm.gainItem(1002573,1);
                                                                cm.sendOk("给你这顶帽子。");
                                                        } else {
                                                                cm.sendOk("请在装备栏腾出容纳帽子的空位。");
                                                        }
                                                } else {
                                                        cm.sendOk("需要获得 20枚 #t4001158# 来交换下一顶帽子。");
                                                }
                                        } else {
                                                if (cm.haveItem(4001158, 20)) {	
                                                        if (cm.canHold(1002572,1)) {
                                                                cm.gainItem(4001158, -20);
                                                                cm.gainItem(1002572,1);
                                                                cm.sendOk("给你这顶帽子。");
                                                        } else {
                                                                cm.sendOk("请在装备栏腾出容纳帽子的空位。");
                                                        }
                                                } else {
                                                        cm.sendOk("需要获得 20枚 #t4001158# 来交换下一顶帽子。");
                                                }
                                        }
                                }

                                cm.dispose();
                        }
                }
                
        }
}
