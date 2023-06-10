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
var completed;

function start() {
    completed = cm.haveItem(4031508, 5) && cm.haveItem(4031507,5);
    
    if (completed) {
        cm.sendNext("哇~你成功地收集了#b#t4031508##k和#b#t4031507##k各5份。好的，我现在就送你回动物园。请在抵达那里时再找我对话。");
    } else {
        cm.sendYesNo("你还没有完成任务要求，确定要就这样离开吗？");
    }
}

function action(mode, type, selection){
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }
    
    if(status == 0) {
        cm.sendOk("那么就这样好了，我送你回去。");
    } else {
        if (completed) {
            cm.getEventInstance().clearPQ();
        } else {
            cm.warp(923010100, 0);
        }
        
        cm.dispose();
    }
}