/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

var status;
 
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
                        if (!(cm.isQuestCompleted(20407) || cm.isQuestStarted(20407) && cm.getQuestProgressInt(20407, 9001010) != 0) && cm.getMap().countMonster(9001010) == 0 && cm.getMap().getNPCById(1104002) == null) {
                                cm.sendOk("呃。。。咳咳。 #b#h0##k, 是你吗? #r#p1104002##k..她~~~她已经来了！ #b#h0##k, 真的很抱歉，我现在在这种状态下无法帮你了，她的能力太过于强大,我哪怕用尽全力，也无法战胜，拜托~~你了， #b#h0##k!请务必打败她! ....");
                                cm.spawnNpc(1104002, new java.awt.Point(850, 0), cm.getMap());
                        } else {
                                cm.sendOk("...");
                        }
                        
                        cm.dispose();
                }
        }
}
