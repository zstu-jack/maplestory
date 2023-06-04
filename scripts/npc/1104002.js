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
                var mapobj = cm.getMap();
            
                if (mode == 0 && type > 0) {
                        cm.getPlayer().dropMessage(5, "埃雷奥诺尔：哦，没有女皇的庇护，居然赢过我们？现在你做到了！");
                        
                        mapobj.spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new Packages.java.awt.Point(850, 0));
                        mapobj.destroyNPC(1104002);
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(!cm.isQuestStarted(20407)) {
                                cm.sendOk("...骑士,你看起来还#b没有勇气#k面对这场战斗, 当一个人还没有做好战斗的心理准备时，是无法战胜它的。和你那只笨拙的大鸟谈谈你的懦弱，也许它会给你一些鼓励。");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendAcceptDecline("哈哈哈哈！女皇的这块领地已经归我们了，这无疑是#b黑色之翼#k向冒险世界迈出的一个巨大成功。。。你呢？还敢面对我们吗？你看起来足够强壮，考虑成为我们团队的后备补充力量吧，#r想加入我们吗#k，朋友？");
                } else if (status == 1) {
                        cm.sendOk("嘿，懦夫在#b黑法师的军团#k中没有立足之地！");
                        cm.dispose();
                }
        }
}
