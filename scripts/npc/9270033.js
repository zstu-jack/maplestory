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
/* 	Engine room - Bob
 * 	@author Ronan
*/

var eim;
var status = 0;

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
    
                eim = cm.getEventInstance();
                if(status == 0) {
                        if(!eim.isEventCleared()) {
                                cm.sendYesNo("确定要现在离开这里吗？");
                        } else {
                                cm.sendYesNo("你们成功击败了幽灵船长，干得漂亮！确定要现在离开这里吗？");
                        }
                } else if(status == 1) {
                        if(eim.isEventCleared()) {
                                if(!eim.giveEventReward(cm.getPlayer())) {
                                        cm.sendOk("请在背包中腾出足够的空间来接收战利品。");
                                        cm.dispose();
                                        return;
                                }
                        }
                    
                        cm.warp(541010110, 0);
                        cm.dispose();
                }
        }
}
