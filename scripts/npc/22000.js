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
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("乘坐这艘船，你将前往一个更大的大陆。花费 #e150金币#n，我将带你前往 #b金银岛#k。问题是，一旦你离开这个地方，你就再也回不来了。你怎么认为？你想去金银岛吗？");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 1) {
            status -= 2;
        } else if (type == 1 || (mode == -1 && type != 1)) {
            if (mode == 0) {
                cm.sendOk("emm，我猜想你在这还有一些事情要做...");
            }
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801)) {
            cm.sendNext("Okay，现在给我150金币... Hey，那是什么？那是村长卢卡斯的介绍信吗？你应该告诉我你有那个东西。我桑克斯非常赞赏伟大的人，既然你有卢卡斯的推荐信，那么我认为你有非常非常大的潜力成为一个伟大的冒险家。这次旅行我不会向你收费！");
        } else {
            cm.sendNext("厌倦了这个地方？请先给我 #e150金币#n ...");
        }
    } else if (status == 2) {
        if (cm.haveItem(4031801)) {
            cm.sendNextPrev("既然你有推荐信，我就不收你的费用。好了，系好安全带，因为我们现在就要去金银岛，可能会有点动荡！！");
        } else if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("什么，你是说你想不带钱就走？你是个怪人。。。");
                cm.dispose();
            } else {
                cm.sendNext("非常好！ #e150#n 金币已收到！好的，那我门出发去金银岛！");
            }
        } else {
            cm.sendOk("让我们看看。。。我觉得你不够强壮。你必须至少达到7级才能去金银岛。");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}