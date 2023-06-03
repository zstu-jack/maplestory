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
	Jeff - El Nath : El Nath : Ice Valley II (211040200)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;

function start() {
    if(cm.haveItem(4031450, 1)) {
        cm.warp(921100100, 1);
        cm.dispose();
        return;
    }
    
    cm.sendNext("看起来你想要深入这片区域。在那里，你会发现自己被凶猛危险的怪物们围绕着。所以即便你觉得自己已经足够强大了，也最好再考虑一下。很久之前，我们的村子里有几个胆大的男人进入里面，想要除掉威胁着村子的存在。然而没有一个人从里面回来...");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status == 1 && mode == 0 && cm.getLevel() > 49) {
            cm.sendNext("即便你的等级足够高，进入里面还是有些勉强。但如果你改了主意，就来找我。毕竟保护这里是我的职责。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.getLevel() > 49)
                cm.sendYesNo("如果你决定要进去，我劝你还是改变主意。但如果你坚持的话...我只会允许强大到能够在里面活下去的人入内。因为我真的不想看到更多伤亡了。让我看看...嗯...！你看起来非常强大。好吧，你想要进入里面吗？");
             else 
                cm.sendPrev("如果你决定要进去，我劝你还是改变主意。但如果你坚持的话...我只会允许强大到能够在里面活下去的人入内。因为我真的不想看到更多伤亡了。让我看看...嗯...你还没有到达50级。我不能允许你入内，放弃吧。");
        } else if (status == 2) {
            if (cm.getLevel() >= 50) 
                cm.warp(211040300, 5);
            cm.dispose();
        }
    }
}