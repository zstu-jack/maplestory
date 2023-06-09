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
/**
* @Author : iAkira, Kevintjuh93
**/
var status = 0; 
var selected = 0;

function start() {
	if (cm.getPlayer().getMapId() == 100000000) {
		cm.sendNext("看那里！你看到了吗？没看到？一个UFO刚刚飞过去了...看那里！！有人被吸入UFO了...啊啊啊啊啊啊，是佳佳！#r佳佳被一架UFO绑架啦！#k");
	}
}

function action(m,t,s) { 
	if (m > 0) {
		status++; 
		if (cm.getPlayer().getMapId() == 100000000) { // warper completed
			if (status == 1) {
				if (cm.getPlayer().getLevel() >= 12) 
					cm.sendYesNo("我们现在要怎么办？虽然UFO只是谣传，但是...我听说如果被外星人绑架的话，就会有可怕的事情发生在身上...也许佳佳现在就正在经历这一切！求求你，求求你救救佳佳！\r\n #b佳佳可能有些迷糊还笨蛋兮兮的，但是#k他真的是个好人。我们没法坐视这样可怕的事情发生在佳佳身上。对了！爷爷月妙知道怎么拯救他！我会送你去月球，请你去见爷爷，拯救佳佳！！！");
				else 
					cm.sendOk("喔！看起来你还不满足拯救佳佳的等级要求。请你达到12级或更高等级时再回来吧。");
          
			} else if (status == 2)
				cm.sendNext("非常谢谢你。请去救下佳佳！爷爷月妙会帮助你的。");
			else if (status == 3) {
				cm.warp(922240200, 0); 
				cm.dispose();
			}
		}
	} else if (m < 1) {
		cm.dispose();
	}
}