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
/* Author: Xterminator, Moogra
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    cm.sendSimple("你和我有生意吗?\r\n#L0##b请告诉我这个地方的情况.#l\r\n#L1#我是通过精灵玛尔的话来到这里的...#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.sendNext("太忙了，现在不是时候？如果你想了解的话，回来找我。");
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                if (cm.haveItem(4031035)) {
                    cm.sendNext("收到那封信，带着你的宠物跳过障碍物，把那封信交给我弟弟的教练弗罗德。把信给他，你的宠物就会有好事情发生。");
                    cm.dispose();
                } else
                    cm.sendYesNo("这是你可以和宠物一起散步的路。你可以带着它到处走，或者训练你的宠物穿过障碍物。如果你还没有和你的宠物太近，那可能会出现问题，他也不会像你一样听从你的命令…那么，你觉得呢？想训练你的宠物吗?");
            } else {
                cm.sendOk("嘿，你确定你见过仙女马尔吗？如果你以前从未见过她，不要骗我，因为这很明显。那甚至不是一个好的谎言!!");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.gainItem(4031035, 1);
            cm.sendNext("好的，这是信。如果你直接去的话，他不会知道我派你去的，所以和你的宠物一起穿过障碍物，到最上面去，然后和训练师弗罗德谈谈，把信给他。如果你在遇到障碍的时候注意你的宠物，那就不难了。祝你好运!");
            cm.dispose();
        }
    }
}