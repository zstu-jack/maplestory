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
/* Olson the Toy Soldier
	2040002

map: 922000010
quest: 3230
escape: 2040028
*/

var status = 0;
var em;

function start() {
    if (cm.isQuestStarted(3230)) {
        em = cm.getEventManager("DollHouse");

        if (em.getProperty("noEntry") == "false") {
            cm.sendNext("钟摆藏在一个与其他玩具外观有细微差别的娃娃之家里。");
        }
        else {
            cm.sendOk("其他人正在调查这片区域，请稍候。");
            cm.dispose();
        }
    }
    else {
        cm.sendOk("这里不允许无关市民入内。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) 
            cm.sendYesNo("准备好进入娃娃之家了吗？");
        else if (status == 2) {
            var em = cm.getEventManager("DollHouse");
            if (!em.startInstance(cm.getPlayer())) {
                cm.sendOk("嗯...看起来已经有其他人提前入内了，请稍候。");
            }
            
            cm.dispose();
        }
    }
}