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
        Neru - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
        Xterminator
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
        1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    if (cm.haveItem(4031128)) {
        cm.sendNext("呃，这是我哥哥的信！可能是要训斥我没有认真工作了吧...啊...你是听从我哥哥的建议，训练你的宠物到了这里吗？真不错！既然你们努力到达了这里，我会提供你和宠物之间的亲密度的。");
    } else {
        cm.sendOk("我的哥哥告诉我要好好照看这些障碍，但是...我们之间隔得那么远，就总是想闲逛一会儿...呵呵，既然他没有出现在视线之内，我不妨先休息几分钟。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else if (cm.getPlayer().getNoPets() == 0)
        cm.sendNextPrev("嗯...你没有带着宠物来啊？这些障碍是为了宠物准备的。没有宠物的话，来这里做什么？出去！");
    else {
        cm.gainItem(4031128, -1);
        cm.gainCloseness(4);
        cm.sendNextPrev("怎么样？有没有觉得和宠物的亲密度提高了？如果你有时间，可以再带着它进行障碍训练...当然，要先获得我哥哥的允许才行。");
    }
    cm.dispose();
}