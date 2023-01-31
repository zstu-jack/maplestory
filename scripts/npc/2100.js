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
	NPC Name: 		Sera
	Map(s): 		Maple Road : Entrance - Mushroom Town Training Camp (0), Maple Road: Upper level of the Training Camp (1), Maple Road : Entrance - Mushroom Town Training Camp (3)
	Description: 		First NPC
*/

var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3) {
        cm.sendYesNo("欢迎来到冒险岛世界。这个训练营的目的是帮助初学者。你想参加这个训练营吗？有些人没有参加培训课程就开始了他们的旅程。但我强烈建议你先参加培训课程。");
    } else {
        cm.sendNext("这是你培训计划开始的第一个图像室。在这个房间里，你将提前了解你选择的职业。");
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && status == 0) {
            cm.sendYesNo("你真的想马上开始你的旅程吗？");
            return;
        } else if (mode == 0 && status == 1 && type == 0) {
            status -= 2;
            start();
            return;
        } else if (mode == 0 && status == 1 && type == 1) {
            cm.sendNext("如果你已经做了决定，请再次和我对话");
        }
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3) {
        if (status == 0) {
            cm.sendNext("好的，那我就让你进入训练营。请听从教员的指挥。");
        } else if (status == 1 && type == 1) {
            cm.sendNext("看来你想在不参加训练计划的情况下开始你的旅程。然后，我会让你去训练场。小心~");
        } else if (status == 1) {
            cm.warp(1, 0);
            cm.dispose();
        } else {
            cm.warp(40000, 0);
            cm.dispose();
        }
    } else if (status == 0) {
        cm.sendPrev("一旦你足够努力训练，你就有资格获得一份职业。你可以成为赫丽娜的弓箭手，汉斯的魔法师，武术教练的战士，达克鲁的飞侠。。。");
    } else {
        cm.dispose();
    }
}