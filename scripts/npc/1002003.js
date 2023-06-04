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
		cm.sendNext("我知道了...你不像看起来那么交友广泛...开玩笑的。总之如果你改变主意，就尽管来找我，那时我们再好好谈谈。如果你交到了很多朋友，你知道的...呵呵..");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("我知道了...和我想得一样，你确实有很多朋友。如果不是这样的话，你只是现在身上还没带够 240,000 金币吧？总之如果你改变主意，就尽管来找我，那时我们再好好谈谈。也就是说，你从朋友们那里得到了金援的话... 呵呵...");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("真希望今天的收入和昨天一样多...呃，你好！想不想扩充你的好友列表？你看起来像是拥有很多好友的家伙...嗯，你觉得呢？只要花一些钱，我就能帮你做到。不过我提醒你，这项服务只会在你当前角色身上生效，不会影响到账户下的其他角色。是否想要扩展好友列表呢？");
	} else if (status == 1) {
		cm.sendYesNo("这主意不错，并且其实也没有那么贵。只要 #b240,000 金币就能扩充 5 个好友列表空位#k。不过，我是不会拆分出售的。一旦购买了这个服务，好友列表就永久性地扩充。所以如果你确实需要更多好友空间，最好在我这里购买。你怎么认为？要把 240,000 金币花在这里吗？");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("嘿....你确定带够了 #b240,000 mesos#k吗？那样的话，瞧瞧你是不是把好友列表扩充到上限了。就算你出再多金币，也只能将好友列表扩充到可以容纳 #b50#k 位好友而已。");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("好的！你的好友列表现在扩展了额外的5个空位，可以自己瞧瞧。如果你还需要更多的好友列表空间，就再来找我。当然，这项服务不是免费的...那么，再会了...");
			cm.dispose();
			}
		}
	}
}