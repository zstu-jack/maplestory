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
                        if(cm.isQuestStarted(3339)) {
                                var progress = cm.getQuestProgressInt(23339, 1);
                            
                                if(progress == 3) {
                                        cm.sendGetText("水开始流动的同时，管道也有了反应。一处隐秘的暗门打开后，能看到键盘就在它的背面。需要输入#b密码#k。");
                                } else if(progress == 1) {
                                        cm.setQuestProgress(23339, 1, 2);
                                        cm.dispose();
                                } else if(progress < 3) {
                                        cm.setQuestProgress(23339, 1, 0);
                                        cm.dispose();
                                } else {
                                        cm.warp(261000001, 1);
                                        cm.dispose();
                                }
                        } else {
                                if(cm.isQuestCompleted(3339)) {
                                        cm.warp(261000001, 1);
                                }
                                
                                cm.dispose();
                        }
                } else if(status == 1) {
                        if(cm.getText() == "my love Phyllia") {//需要结合任务对话去改动。可能是我的挚爱琵丽雅之类的。。看看任务对话先
                                cm.setQuestProgress(23339, 1, 4);
                                cm.warp(261000001, 1);
                                cm.dispose();
                        }
                        else{
                                cm.sendOk("#r答案错误#k！");
                                cm.dispose();
                        }
                }
        }
}
