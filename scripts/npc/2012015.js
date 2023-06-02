/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	El Nath Magic Spot - Orbis Tower <20th Floor>(200080200)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
    1.2 - Now official version (action(1,0,0) is stupid) by Moogra
	1.1 - Official Text and Method [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

function start() {
    if (cm.haveItem(4001019))
        cm.sendYesNo("可以使用#b#t4001019##k 来激活 #b#p2012014##k。你想要传送到 #b#p2012015##k 所在的地方吗？");
    else {
        cm.sendOk("这块 #b#p2012015##k 可以将你传送到 #b#p2012014##k 所在的地方，但必须要用魔法石觉醒卷轴（通天塔）来激活。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode > 0) {
        cm.gainItem(4001019, -1);
        cm.warp(200080200, 0);
    }
    cm.dispose();
}
