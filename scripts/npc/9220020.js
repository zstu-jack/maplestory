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
                        if(!cm.isEventLeader()) {
                                cm.sendNext("请让你的队长与我对话，来了解有关继续下一阶段的信息");
                                cm.dispose();
                                return;
                        }
                        
                        var eim = cm.getEventInstance();
                        if(eim.getIntProperty("statusStg1") == 1) {
                                cm.sendNext("穿过这条通道后将会与Boss进行战斗。");
                        } else {
                                if(cm.haveItem(4032118, 15)) {
                                        cm.gainItem(4032118, -15);

                                        eim.setIntProperty("statusStg1", 1);
                                        eim.showClearEffect();
                                        eim.giveEventPlayersStageReward(1);

                                        cm.sendNext("你找到了足够多的信件，太棒了！现在，你们可以穿过这条通道与V战斗了。做好准备！");
                                } else {
                                        cm.sendNext("请交给我#r15封秘密文件#k。");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}