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
/* guild emblem npc */

var status = 0;
var sel;

function start() {
    cm.sendSimple("你好，我是蕾雅，负责公会标志的相关业务。\r\n#b#L0#制作/更改公会标志。#l#k");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            sel = selection;
            if (sel == 0) {
                if (cm.getPlayer().getGuildRank() == 1)
                    cm.sendYesNo("制作或更改公会标志需要花费#b 5,000,000 金币#k，是否继续？");
                else
                    cm.sendOk("只有族长才能更改家族标志。请转告你的族长，让他亲自来找我。");
            }
        }
        else if (status == 2 && sel == 0) {
            cm.getPlayer().genericGuildMessage(17);
            cm.dispose();
        } else
            cm.dispose();
    }
}
