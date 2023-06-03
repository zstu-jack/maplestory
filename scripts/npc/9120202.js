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
/* Konpei
 * 
 * @Author Ronan
 */
 
var status;
 
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
    
                var eim = cm.getEventInstance();
                if(!eim.isEventCleared()) {
                        if (status == 0) {
                                cm.sendYesNo("如果现在离开，将无法返回。确定要离开吗？");
                        } else if (status == 1) {
                                cm.warp(801040004, 1);
                                cm.dispose();
                        }
                } else {
                        if(status == 0) {
                                cm.sendNext("你们做到了，太漂亮了！现在我们的城镇不再受这群怪物威胁了！请收下这些奖励，这是这座城市对你们付出的奖赏。稍后，我会送你们回到城镇。");//原文虽然如此，但没有把奖励写进去，后期需要增补。
                        }

                        if(status == 1) {
                                var eim = cm.getEventInstance();
                                if(!eim.giveEventReward(cm.getPlayer())) {
                                        cm.sendNext("请先腾出背包空间再与我对话。");
                                } else {
                                        cm.warp(801040101);
                                }

                                cm.dispose();
                        }
                }
        }
}