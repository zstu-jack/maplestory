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
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
var status = 0;

function start() {
    cm.sendSimple("你听说过明珠港附近有一片令人流连忘返的#b黄金海滩#k吗？只要支付#b1500金币#k，或使用#b自由旅行券#k，我就可以送你去那里。\\r\\n\\r\\n#L0##b我愿意付 1500金币。#l\\r\\n#L1#我有自由旅行券。#l\\r\\n#L2#什么是自由旅行券？#k#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1)
        if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
            if(type == 1)
                cm.sendNext("你在这里还有些事情要处理吗？看起来你最近疲于旅行和打猎了。稍作休息后如果改变了主意，就来找我谈谈。");
            cm.dispose();
            return;
        } else
            status -= 2;
    if (selection == 0)
        status++;
    if(status == 1){
        if(selection == 1)
            cm.sendYesNo("你有#b自由旅行券#k？那就可以随时使用它前往黄金海岸。不过要小心，那附近也是有怪物的。那么，现在要前往黄金海岸吗？");
        else if (selection == 2)
            cm.sendNext("你一定很好奇 #b自由旅行券#k 是什么。哈哈，这也难怪。拥有自由旅行券的话，就可以免费前往黄金海岸。这东西珍贵又抢手，我好不容易才买到一张。但之前不小心弄丢了。");
    } else if (status == 2){
        if(type != 1 && selection != 0) {
            cm.sendNextPrev("弄丢它以后回来时，感觉真是糟透了。希望捡到它的人能妥善保管。总之，我的故事就是这样了，如果你捡到了它，就好好使用。还有什么问题的话，尽管来找我问。");
            cm.dispose();
        } else{
            if (cm.getMeso() < 1500 && selection == 0)
                cm.sendNext("你的金币不足。");
            else if(!cm.haveItem(4031134) && selection != 0){
                cm.sendNext("你的#b自由旅行券#k 在哪儿？是不是弄丢了？好好找找吧。");
            }else{
                if(selection == 0)
                    cm.gainMeso(-1500);
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
            }
            cm.dispose();
        }
    }
}