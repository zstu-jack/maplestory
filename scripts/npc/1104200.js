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
                        cm.sendNext("#b#p1104002##k.是黑女巫。。。她把我困在这里了。。快！现在没有时间了，她已经在去圣地的路上了!");
                } else if (status == 1) {
                        cm.sendYesNo("呃，请跟随皇家骑士团,立即赶往 #r圣地#k, #r女皇#k现在非常危险!! 我现在还剩下一丝的法力，哪怕透支生命，我也愿意将你们传送过去拯救大家，冒险家，你准备好了吗？ #b即将要和女巫正面战斗了！#k");
                } else if (status == 2) {
                        if(cm.getWarpMap(913030000).countPlayers() == 0) {
                                cm.warp(913030000, 0);
                        } else {
                                cm.sendOk("已经有队伍在挑战，请稍后。");
                        }
                        
                        cm.dispose();
                }
        }
}