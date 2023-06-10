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
	? - Victoria Road: Pet-Walking Road (100000202)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
        2.0 - Second Version by Moogra
---------------------------------------------------------------------------------------------------
**/

function start() {
    cm.sendYesNo("#b(看到有什么东西被草遮住了。要取出来吗？)");
}

function action(mode, type, selection) {
    if (mode == -1) {
    } else if (mode == 0) {
        cm.sendNext("#b(没有多想，不去碰它。)");
    } else if (mode == 1) {
        cm.sendNext("#b(呃啊啊...是宠物便便！)");
        cm.gainItem(4031922, 1);
    }
    cm.dispose();
}