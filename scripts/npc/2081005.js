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
//@Author Moogra, Ronan
//Fixed grammar, javascript syntax

importPackage(Packages.client);

var status = 0;
var price = 100000;

function isTransformed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210003;
}

function start() {
    if(!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))) {
        cm.sendOk("这里是神木村飞龙峡谷至高无上的统治者暗黑龙王的巢穴。只有 #b看起来有资格#k 谒见祂的人可以通过这里。 #b外来者#k 是不受欢迎的，滚出这里！");
        cm.dispose();
        return;
    }
    
    cm.sendSimple("这里是生命之穴入口。你想要进入里面与 #r暗黑龙王#k 战斗吗？如果想要和他战斗，你可能会需要一些 #b#v2000005##k 来恢复从 #r暗黑龙王#k 那里受到的伤害。\r\n#L1#我要花100,000金币购买10瓶！#l\r\n\#L2#不需要了，现在让我入场。#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (selection == 1) {
        if(cm.getMeso() >= price) {
            if(!cm.canHold(2000005)) {
                cm.sendOk("抱歉，你的背包空间不足。");
            } else {
                cm.gainMeso(-price);
                cm.gainItem(2000005, 10);
                cm.sendOk("感谢你购买这些药水。善用它们吧！");
            }
        } else {
            cm.sendOk("抱歉，你的金币不足。");
        }
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99)
            cm.warp(240050000, 0);
        else
            cm.sendOk("抱歉。至少需要达到100级或以上才能进入。");
        cm.dispose();
    }
}