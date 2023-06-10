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
/*
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103000 - Pierre
*	Map =  Ludibrium - Ludibrium Maze 16
*	NPC MapId = 809050015
*	Function = Gives LMPQ EXP reward
*
*/

var status = 0;
var qty = 0;

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
                
                if (status == 0) {
                        if(cm.isEventLeader()) {
                                if(!cm.getEventInstance().isEventTeamTogether()) {
                                        cm.sendOk("至少一名或更多组队成员尚未抵达，请稍候。");
                                        cm.dispose();
                                }
                                else if(cm.hasItem(4001106, 30)) {
                                        qty = cm.getItemQuantity(4001106);
                                        cm.sendYesNo("干得漂亮！你在本轮中找到了 " + qty + " 张#t4001106#，你的队伍会因此获得与之相应的经验奖励。现在想要传送离开这里吗？");
                                }
                                else {
                                        cm.sendOk("你的队伍目前尚无法完成这次组队任务，因为你们还没有收集到至少30张#t4001106#。");
                                        cm.dispose();
                                }
                        }
                        else {
                                cm.sendOk("想结束这个任务的话，让你的队长来找我对话。");
                                cm.dispose();
                        }
                } else if(status == 1) {
                        cm.removeAll(4001106);
                        cm.getEventInstance().giveEventPlayersExp(50 * qty);
                        cm.getEventInstance().clearPQ();
                        cm.dispose();
                }
        }
}