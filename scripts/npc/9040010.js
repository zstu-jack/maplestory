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
function start() {
    var eim = cm.getPlayer().getEventInstance();
    if (eim != null) {
        if (cm.isEventLeader()) {
            if (cm.haveItem(4001024)) {
                cm.removeAll(4001024);
                var prev = eim.setProperty("bossclear", "true");
                if (prev == null) {
                    var start = parseInt(eim.getProperty("entryTimestamp"));
                    var diff = Date.now() - start;
                    
                    var points = 1000 - Math.floor(diff / (100 * 60));
                    if(points < 100) points = 100;
                    
                    cm.getGuild().gainGP(points);
                }
                
                eim.clearPQ();
            }
            else {
                cm.sendOk("这是你们的最终挑战。击败潜伏在鲁碧安里面的恶魔，然后将宝石交给我。");
            }
        }
        else {
            cm.sendOk("T这是你们的最终挑战。击败潜伏在鲁碧安里面的恶魔，然后让你们的队长将宝石交给我。");
        }
    }
    else
        cm.warp(990001100);
    
    cm.dispose();
}