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
 *@Author Ronan
 * Rolly
 *	Ludibrium - Exit of the Maze (809050016)
 *	Gives Ludibrium Maze Party Quest reward
 */

var status = 0;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		cm.sendYesNo("你的队伍非常努力地收集到了30张或以上的玩具城迷宫门票。为此，我为你们每人准备了一份礼物。收下礼物后，你会被传送回玩具城。要现在收下礼物吗？");
        } else if(status == 1) {
                var eim = cm.getEventInstance();
                    
                if(!eim.giveEventReward(cm.getPlayer())) {
                        cm.sendNext("请确认你的#r装备栏#k, #r消耗栏#k或#r其他栏#k是否有足够的空间。清理出一些空间再来和我对话。");
                } else {
                        cm.warp(809050017);
                }

                cm.dispose();
        }
    }
}