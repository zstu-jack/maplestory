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
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
	NPC NAME: Cesar (1)
	NPC ID: 2101018
	Author: Vcoc
	Function: AriantPQ
*/

status = -1;
function start() {
    if((cm.getPlayer().getLevel() < 19 || cm.getPlayer().getLevel() > 30) && !cm.getPlayer().isGM()){
        cm.sendNext("很抱歉。你的等级不在20~30之间，无法参加。");
        cm.dispose();
        return;
    }
    action(1,0,0);
}

function action(mode, type, selection){
    status++;
    if (status == 4){
        cm.getPlayer().saveLocation("MIRROR");
        cm.warp(980010000, 3);
        cm.dispose();
    }
    if(mode != 1){
        if(mode == 0 && type == 0)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0)
        cm.sendNext("我在阿里安特为全世界的勇士们准备了一场盛大的节日庆典。这就是 #b阿里安特竞技大会#k。");
    else if (status == 1)
        cm.sendNextPrev("阿里安特竞技大会是玩家之间比拼打猎技巧的盛会。在这场竞技大会中，你的目的不是猎杀怪物；而是 #b降低怪物的HP值，然后用宝石捕捉它们#k。#bT最终获得最多宝石的勇士将取得比赛的胜利#k。");
    else if (status == 2)
        cm.sendSimple("如果你是位来自 #b勇士部落#k ，在武术教练那里接受过训练，强壮勇敢的战士，那有没有兴趣参加阿里安特竞技大会呢？\r\n#b#L0#我很乐意参加这场竞技盛会。#l");
    else if (status == 3)
        cm.sendNext("好，我现在就送你去竞技场。希望看到你在赛场上无往不利！");
}