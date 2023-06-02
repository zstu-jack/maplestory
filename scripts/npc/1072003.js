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

/* Thief Job Instructor
	Thief 2nd Job Advancement
	Victoria Road : Construction Site North of Kerning City (102040000)
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
                        if (cm.isQuestCompleted(100010)) {
                            cm.sendOk("真是了不起的家伙！");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100009)) {
                            cm.sendNext("好的，我允许你入内。打败里面的怪物并收集30颗黑珠，然后和我那位在里面的同僚对话。他会给你 #b英雄证书#k 作为通过测试的证明。祝你好运。");
                            status = 3;
                        } else if (cm.isQuestStarted(100009)) {
                            cm.sendNext("喔，这不是 #b达克鲁#k 寄来的信件吗？");
                        } else {
                            cm.sendOk("准备好后再与我对话，我会向你解释考试内容。");
                            cm.dispose();
                        }
                }
                
                else if(status == 1)
                    cm.sendNextPrev("想要证明自己的实力吗？很好...");
                else if (status == 2)
                    cm.sendAcceptDecline("我会给你这个机会，希望你把握住。");
                else if (status == 3) {
                    cm.sendOk("需要收集#b30个 #t4031013##k。祝你好运。");
                    cm.completeQuest(100009);
                    cm.startQuest(100010);
                    cm.gainItem(4031011, -1);
                } else if (status == 4) {
                    cm.warp(108000400, 0);
                    cm.dispose();
                }
                else {
                    cm.dispose();
                }
        }
}
