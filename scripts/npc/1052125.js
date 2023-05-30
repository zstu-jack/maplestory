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
	NPC Name: 		June
	Map(s): 		Kerning Square : 7th Floor 
	Description: 	Entrance to Spirit of Rock
	Depart_topFloorEnter
	request for a new song (block the portal before the spirit)
	composition fee (block the portal before the spirit)
	Say "NO" to Plagiarism (now we can open the portal)
*/
var status = -1;

function start() {
    cm.sendSimple("前方正在维修无法通行，目前仅允许满足条件的人通过。#b\n\r\n#L0#我正在协助 #eBlake#n 。#l\r\n#L1#我是废都广场 #rVIP#b !#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
    	if (selection == 0) {
    		if (cm.isQuestStarted(2286) || cm.isQuestStarted(2287) || cm.isQuestStarted(2288)) {
        		var em = cm.getEventManager("RockSpirit");
                        if (!em.startInstance(cm.getPlayer())) {
                            cm.sendOk("战斗已经开始，请稍后进入。");
                        }
    			cm.dispose();
    			return;
    		} else {
    			cm.sendOk("Blake可没说过你正在协助他.");  
       		}
    	} else {
    		if (cm.isQuestCompleted(2290)) {
                        if(cm.getPlayer().getLevel() > 50) {
                                cm.sendOk("VIP区域仅面向 #r50级或以下#k 的角色开放.");
                        } else {
                                cm.sendOk("VIP区域仅面向完成了“进入VIP区域”任务，并持有 #r#t4032521#s#k的人开放.");
                        }
                } else {
                        cm.sendOk("#rVIP#k？你看起来并不像是 #rVIP贵宾#k 啊，在我叫保安之前，从这儿离开。"); 
                }
    	}
    	cm.dispose();
    }
}