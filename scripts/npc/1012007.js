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
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/

function start() {
    if (cm.haveItem(4031035))
        cm.sendNext("嗯，那是我哥哥的信！可能是因为我觉得自己没工作没东西……嗯？啊……你听从了我哥哥的建议，训练了你的宠物，然后站在这里，嗯？好极了！！既然你努力来这里，我会提高你和你宠物的亲密程度。");
    else {
        cm.sendOk("我哥哥告诉我要照顾宠物的障碍物，但是…因为我离他太远了，我忍不住想四处游逛……呵呵，既然我看不见他，不妨冷静一下。.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getNoPets() == 0)
            cm.sendNextPrev("你真的带着你的宠物来了吗？这些障碍物是给宠物的。没有它你在这里干什么？？离开这里!");
        else {
            cm.gainItem(4031035, -1);
            cm.gainCloseness(2, 0);
            cm.sendNextPrev("你怎么认为？你不觉得你和你的宠物越来越亲近了吗？如果你有时间，在这个障碍物上再训练你的宠物……当然，在我哥哥的允许下.");
        }
        cm.dispose();
    }
}