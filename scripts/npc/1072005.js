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

var status;
var completed;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                    if (cm.haveItem(4031013,30)) {
                        completed = true;
                        cm.sendNext("哦哦哦...你收集到了整整30枚黑珠！这应该很难...简直不可思议！好的，你通过了考试。我会给你 #b英雄证书#k。拿好它，回魔法密林吧。");
                    } else {
                        completed = false;
                        cm.sendSimple("需要收集#b30个 #t4031013##k。祝你好运。 \r\n#b#L1#我想要现在离开。#l");
                    }
                } else if(status == 1) {
                    if(completed) {
                        cm.removeAll(4031013);
                        cm.completeQuest(100007);
                        cm.startQuest(100008);
                        cm.gainItem(4031012);
                    }
                    
                    cm.warp(101020000, 1);
                    cm.dispose();
                }
        }
}
