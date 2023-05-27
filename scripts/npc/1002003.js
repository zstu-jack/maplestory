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
/* Author: Xterminator
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("我想只有孤独的人才不需要好友吧??\r\n和你开玩笑的！！假如你真的需要扩展你的好友列表可以来找我的唷!);
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("我不认为你没有朋友，你只是不想花25万金币来扩充自己的好友栏!);
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("我还记得昨晚玛丽亚叫的...嗯，你好！你想要扩展你的好友列表么？给我一些钱，我可以帮你。但你要记住，它只是帮你这个角色扩展了好友位哦！");
	} else if (status == 1) {
		cm.sendYesNo("好吧，一次很愉快的聊天！其实这并不贵的，#b250.000#k金币，我会添加5个空位到你的好友列表中。永久扩展你的好友列表，很划算吧！);
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("嘿!你确定你有 #b250,000 冒险币么#k? 如果够的话，再确认是不是你的好友栏已经 #b100#k 格了。满格了哦！);
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-250000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("好了，帮你多增加5个好友栏.如果你还需要可以再来找我.老顾客也是这个价，生活不易，有空多来照顾我的生意呀!");
			cm.dispose();
			}
		}
	}
}