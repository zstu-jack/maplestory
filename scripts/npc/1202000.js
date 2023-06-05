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
	action(1, 0, 0);	
}

function action(mode, type, selection) {  
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("你终于醒了。。。!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("你是。。。？", 2);
		} else if (status == 2) {
			cm.sendNextPrev("与黑魔法师战斗的英雄。。我一直在等你醒来！", 8);
		} else if (status == 3) {
			cm.sendNextPrev("你。。。你是谁？你在说什么？", 2);
		} else if (status == 4) {
			cm.sendNextPrev("我是谁。。。？我怎么什么都记不起来了。。。啊~~~~~！！！我的头好疼！", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("你还好吗？", 8);
		} else if (status == 1) {
			cm.sendNextPrev("我什么都记不起来了。我在哪里？你是谁。。。？", 2);
		} else if (status == 2) {
			cm.sendNextPrev("冷静。没有必要恐慌。你什么都记不起来了，是因为黑魔法师的诅咒抹去了你的记忆。我会告诉你，你想知道的一切。。。稍安勿躁。", 8);
		} else if (status == 3) {
			cm.sendNextPrev("你是数百年前与黑魔法师战斗并拯救冒险世界的大英雄。但在最后一刻，黑魔法师的诅咒让你睡了很长很长的时间。于是。。。你失去了所有记忆。", 8);
		} else if (status == 4) {
			cm.sendNextPrev("这个岛叫里恩，是黑魔法师困住你的地方。尽管有它的名字，但由于黑魔法师诅咒的原因，这个岛常年被冰雪覆盖。你是在冰洞深处被发现的。", 8);
		} else if (status == 5) {
			cm.sendNextPrev("我的名字叫丽琳，我属于里恩家族。里恩家族已经等待英雄归来很长时间了，我们终于找到了你。你终于回来了！", 8);
		} else if (status == 6) {
			cm.sendNextPrev("我说得太多了。如果你不能真正理解我刚刚告诉你的一切，没关系。你最终会找回记忆的。目前，#b你应该前往#k里恩镇。我会一直陪在你身边，直到你到达那里。", 8);
		} else if (status == 7) {
			cm.spawnGuide();
			cm.warp(140090100, 0);
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("你还想问些什么? 我会尽量解释详细些的。 #b#l\r\n#L0#我是谁? #l #l\r\n#L1#我在哪? #l #l\r\n#L2#你是谁?#l#l\r\n#L3#我该做些什么？#l #l\r\n#L4#如何打开背包？#l #l\r\n#L5#如何提升我的技能?#l #l\r\n#L6#如何使用物品，装备？#l #l\r\n#L7#如何使用快捷栏? #l #l\r\n#L8#如何破坏箱子?#l #l\r\n#L9#如何使用座椅？#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("你是数百年前从黑魔法师手中拯救冒险世界的英雄之一。由于黑魔法师的诅咒，你失去了记忆。");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("这个岛叫里恩，这是黑魔法师诅咒你，并将你冰封的地方。是一个被冰雪覆盖的小岛，大多数居民是企鹅。");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("我是丽琳，里恩家族的成员，正如预言的那样，我一直在等待你的归来。我现在是你的向导。");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("我们别再浪费时间了，直接进城去吧。我们到那里后我会告诉你细节。");
					cm.dispose();
				} else if(selection == 4) {
					cm.guideHint(14);
					cm.dispose();
				} else if(selection == 5) {
					cm.guideHint(15);
					cm.dispose();
				} else if(selection == 6) {
					cm.guideHint(16);
					cm.dispose();
				} else if(selection == 7) {
					cm.guideHint(17);
					cm.dispose();
				} else if(selection == 8) {
					cm.guideHint(18);
					cm.dispose();
				} else if(selection == 9) {
					cm.guideHint(19);
					cm.dispose();
				}									
		}
	}
}
}