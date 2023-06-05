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
//Moose, Warps to exit

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
	cm.dispose();
        return;
    }
    
    status++;
    if(status == 0) {
        if(cm.isQuestStarted(6180) && cm.getQuestProgressInt(6180, 9300096) < 200) {
            cm.sendYesNo("请注意：停留在训练场的期间，要确保 #b装备了#t1092041##k吗，这是非常重要的。准备好进入训练场了吗？");
        }
        
        else {
            cm.sendOk("只有接受了任务派遣的人才能进入训练场。");
            cm.dispose();
        }
    }
    
    else if(status == 1) {
        if (cm.getPlayer().haveItemEquipped(1092041)) {
            cm.sendNext("在任务结束前装备好你的盾牌，不然你就得从头再来了！");
        } else {
            cm.sendOk("进入训练场前，请确保已装备 #r#t1092041##k。");
            cm.dispose();
        }
    }
    else {
        cm.warp(924000001, 0);
        cm.dispose();
    }
}
