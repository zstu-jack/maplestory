/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Eurek the Alchemist - Multiple Place
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var menu = "";
var set;
var makeitem;
var access = true;
var reqitem = new Array();
var cost = 4000;
var makeditem = new Array(4006000,4006001);
var reqset = new Array([[[4000046,20],[4000027,20],[4021001,1]],
						[[4000025,20],[4000049,20],[4021006,1]],
						[[4000129,15],[4000130,15],[4021002,1]],
						[[4000074,15],[4000057,15],[4021005,1]],
						[[4000054,7],[4000053,7],[4021003,1]]],
						
						[[[4000046,20],[4000027,20],[4011001,1]],
						[[4000014,20],[4000049,20],[4011003,1]],
						[[4000132,15],[4000128,15],[4011005,1]],
						[[4000074,15],[4000069,15],[4011002,1]],
						[[4000080,7],[4000079,7],[4011004,1]]]);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1 || (mode == 0 && (status ==1 || status == 2))) {
		cm.dispose();
		return;
	}
	if(mode == 0) {
		cm.sendNext("材料不够吗？别担心。等到你凑齐需要的材料再来找我。无论是打猎或是从其他玩家那里购买，总有办法的，加油。");
		cm.dispose();
	}
	if(mode == 1) {
		status++;
	}
	if(status == 0) {
		cm.sendNext("好，下一步是把青蛙的舌头和松鼠的牙齿还有...啊，是的！忘记加入闪闪发亮的白色粉末了！朋友，这下真的糟糕了...哇！你在那边站着有多久了？我可~能有点太过于沉浸在工作中了...呵呵。");
	} else if(status == 1) {
		cm.sendSimple("如你所见，我是位正在四处旅行的炼金术师。虽然还在修行，但也能做几件你可能会用到的东西。你想看看吗？\r\n\r\n#L0##b制作魔法石#k#l\r\n#L1##b制作召回石#k#l");
	} else if(status == 2) {
		set = selection;
		makeitem = makeditem[set];
		for(i=0; i < reqset[set].length; i++) {
			menu += "\r\n#L"+i+"##b制作需要 #t"+reqset[set][i][0][0]+"# 和 #t"+reqset[set][i][1][0]+"##k#l";
		}
		cm.sendSimple("哈哈...#b#t"+makeitem+"##k是一种只有我才能制造的秘石。许多冒险者好像需要用它来施展强大的技能，而不仅仅是用到MP和HP。有5种方法可以制作#t"+makeitem+"#。你要怎么选？"+menu);
	} else if(status == 3) {
		set = reqset[set][selection];
		reqitem[0] = new Array(set[0][0],set[0][1]);
		reqitem[1] = new Array(set[1][0],set[1][1]);
		reqitem[2] = new Array(set[2][0],set[2][1]);
		menu = "";
		for(i=0; i < reqitem.length; i++) {
			menu += "\r\n#v"+reqitem[i][0]+"# #b"+reqitem[i][1]+" #t"+reqitem[i][0]+"##k";
		}
		menu += "\r\n#i4031138# #b"+cost+" 金币#k";
		cm.sendYesNo("要制作 #b5个 #t"+makeitem+"##k，需要以下材料。大多数材料可以在打猎时获得，所以得到他们并不会太困难。你觉得呢？想要做一些吗？\r\n"+menu);
	} else if(status == 4) {
		for(i=0; i < reqitem.length; i++) {
			if(!cm.haveItem(reqitem[i][0],reqitem[i][1]))
				access = false;
		}
		if(access == false || !cm.canHold(makeitem) || cm.getMeso() < cost) {
			cm.sendNext("请确认是否带够了所有需要的材料，以及其他栏是否已满。");
		} else {
			cm.sendOk("给，拿着。这是5块#b#t"+makeitem+"##k。不得不说真是一批杰作。好了。如果以后需要帮助，一定要记得回来找我。");
			cm.gainItem(reqitem[0][0],-reqitem[0][1]);
			cm.gainItem(reqitem[1][0],-reqitem[1][1]);
			cm.gainItem(reqitem[2][0],-reqitem[2][1]);
			cm.gainMeso(-cost);
			cm.gainItem(makeitem,5);
		}
		cm.dispose();
	}
}
