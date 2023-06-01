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
	Author: Traitor
	Map(s):	Mu Lung Dojo Entrance
	Desc:   Sends the entrance message or the taunt message from that dojo guy
*/
var messages = Array("胆敢挑战武陵道场，你真是勇气可嘉。", "如果你想尝尝失败的滋味，就进来吧。", "我会让你后悔挑战武陵道场的，快进来。");

function start(ms) {
    if (ms.getPlayer().getMap().getId() == 925020000) {
        if(ms.getPlayer().getMap().findClosestPlayerSpawnpoint(ms.getPlayer().getPosition()).getId() == 0) {
            ms.getPlayer().startMapEffect(messages[(Math.random() * messages.length) | 0], 5120024);
        }
        
        ms.resetDojoEnergy();
    } else {
        ms.getPlayer().resetEnteredScript(); //in case the person dcs in here we set it at dojang_tuto portal
        ms.getPlayer().startMapEffect("哈，让我看看你的实力。从这里出去只有一条路，那就是打败我！", 5120024);
    }
}
