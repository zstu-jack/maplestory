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
	Weaver - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    cm.sendYesNo("这里是可以和你的宠物一起散步的训练场。你可以在这里四处走走，或者训练宠物通过这里的一系列障碍。但是如果你和宠物之间的亲密度不高的话，它也有可能会不太听你的命令...所以，你觉得呢？想要训练一下你的宠物吗？");
}

function action(mode, type, selection) {
    if (mode == -1){
    } else if (mode == 0) {
        cm.sendNext("嗯...现在很忙没时间训练宠物？那么等到你有空想要训练宠物的时候，就来找我吧。");
    } else if (mode == 1) {
        if (cm.haveItem(4031128))
            cm.sendNext("拿着这封信，和你的宠物一起越过障碍，把它送给我的弟弟奈勒。你的宠物就会从中得到成长。");
        else {
            cm.gainItem(4031128, 1);
            cm.sendOk("好的，信在这里。如果你直接去找他，他一定不会知道信是我写的。所以和你的宠物一起越过每一处障碍，抵达最顶端，然后把信交给奈勒。如果在闯关的时候多关心你的宠物，这次训练应该就不会太难。祝你好运！");
        }
    }
    cm.dispose();
}