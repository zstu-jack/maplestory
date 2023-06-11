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
/*
@       Author : Ronan
@
@	NPC = Amos (PQ)
@	Map = AmoriaPQ maps
@	Function = AmoriaPQ Host
@
@	Description: Bonus stages of the Amorian Challenge
*/

var debug = false;
var status = 0;
var curMap, stage;

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 670010200) / 100) + 1;
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else if (mode == 0){
            cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getPlayer().getEventInstance();
                if(curMap == 670010750) {
                        if(cm.haveItem(4031597, 35)) {
                                if(cm.canHold(1102101) && eim.getIntProperty("marriedGroup") == 0) {
                                        eim.setIntProperty("marriedGroup", 1);

                                        var baseId = (cm.getPlayer().getGender() == 0) ? 1102101 : 1102104;
                                        var rnd = Math.floor(Math.random() * 3);
                                        cm.gainItem(baseId + rnd);

                                        cm.sendNext("干得好!你首先集齐了35个#t4031597#,这里有一份为你准备的特殊奖励.请收下.");
                                        cm.gainItem(4031597, -35);
                                        cm.gainExp(4000 * cm.getPlayer().getExpRate());
                                } else if(eim.getIntProperty("marriedGroup") == 0) {
                                        cm.sendNext("请检查物品栏是否有用于接收奖励的空余后再次与我对话!");
                                } else {
                                        cm.sendNext("成功收集到了35个#t4031597#.做得不错,可惜有人已经先你一步获得了额外奖励.趁还有时间,继续进行接下来的任务吧!");
                                        cm.gainItem(4031597, -35);
                                        cm.gainExp(4000 * cm.getPlayer().getExpRate());
                                }
                        } else {
                                cm.sendNext("为了领取奖励,请从这里收集35个#t4031597#交给我.只有#r第一位收集齐道具的玩家可以获得额外奖励#k,不过其余人收集齐所需道具后也可以获得同样的经验奖励.当然,也可以选择#b跳过这个额外的阶段#k,#b通过一侧的传送口#k进入普通关卡.");
                        }
                } else {
                        cm.sendNext("趁还有时间,继续进行接下来的任务吧!");
                }
                
                cm.dispose();
        }
}