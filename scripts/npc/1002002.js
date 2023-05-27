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
    cm.sendSimple("你听说过海滩吗？ #b黄金海岸#k, 位于利思港附近？ 我现在可以带你去那里，只要支付 #b1500 金币#k就行啦, 如果你有 #b海滩的VIP门票#k那你就是尊贵的客人，我将免费送你去哦.\r\n\r\n#L0##b 支付1500金币.#l\r\n#L1# 我有VIP门票。#l\r\n#L2# VIP门票是什么？#k?#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1)
        if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
            if(type == 1)
                cm.sendNext("你是不是有事情要处理？是参观或着打猎？去休息一下吧！！如果你改变主意了，那就和我谈谈。");
            cm.dispose();
            return;
        } else
            status -= 2;
    if (selection == 0)
        status++;
    if(status == 1){
        if(selection == 1)
            cm.sendYesNo("有#b黄金海岸的VIP门票#k? 你可以随时带着它去黄金海岸。注意：你可能会在那里遇到一些怪物。好的，你现在想去黄金海岸吗？");
        else if (selection == 2)
            cm.sendNext("你居然有 #b黄金海岸的VIP门票！#k 不可思议！！只要您拥有，您就可以免费前往弗洛里娜海滩。这是一件非常罕见的物品，甚至我们都不得不购买，但不幸的是，几周前，我在暑假期间丢失了它。");
    } else if (status == 2){
        if(type != 1 && selection != 0) {
            cm.sendNextPrev("我回来时没有带它，没有它感觉很糟心。希望你把它捡起来放在安全的地方。不管怎样，这是我的故事，谁知道呢，你也许可以把它捡起来好好利用。如果你有任何问题，可以随时提问。");
            cm.dispose();
        } else{
            if (cm.getMeso() < 1500 && selection == 0)
                cm.sendNext("哈哈~你的钱袋，貌似有些瘪。试试卖装备、打怪或者做任务。你知道我在说什么。");
            else if(!cm.haveItem(4031134) && selection != 0){
                cm.sendNext("口袋里似乎没有#b黄金海岸的VIP门票。\r\n#k 再去找找，风里雨里，我始终在这等你。");
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