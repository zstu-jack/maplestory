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

/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
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
                        if (cm.isQuestCompleted(100004)) {
                            cm.sendOk("真是了不起的家伙！");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100003)) {
                            cm.sendNext("好的，我允许你入内。打败里面的怪物并收集30颗黑珠，然后和我那位在里面的同僚对话。他会给你 #b英雄证书#k 作为通过测试的证明。祝你好运。");
                            status = 4;
                        } else if (cm.isQuestStarted(100003)) {
                            cm.sendNext("看起来这封信是 #b武术教练#k 让你交给我的。这么说，你是来这里参加战士2转考试的吧。好的，我会向你解释考试内容。别太紧张，内容并不算复杂。");
                        } else {
                            cm.sendOk("准备好后再与我对话，我会向你解释考试内容。");
                            cm.dispose();
                        }
                }
                else if (status == 1)
                        cm.sendNextPrev("我会把你传送进一个隐藏地图，你会遇到一些平时难得一见的怪物。他们看起来和普通的怪物一样，内在却完全不同。它们既不会给你经验，也不会掉落普通物品。");
                else if (status == 2)
                        cm.sendNextPrev("当你击败这些怪物时，它们有几率掉落 #b#t4031013##k。这是一种，由怪物恶念凝结而成的特殊石球。收集30个并转交给我我在里面的同僚，你就可以通过考试。");
                else if (status == 3)
                        cm.sendYesNo("一旦进去，完成任务之前都无法离开。如果在里面死亡，经验值也会减少...所以你最好有充分的准备...那么，你想现在入场吗？");
                else if (status == 4) {
                        cm.sendNext("好的，我允许你入内。打败里面的怪物并收集30颗黑珠，然后和我那位在里面的同僚对话。他会给你 #b英雄证书#k 作为通过测试的证明。祝你好运。");
                        cm.completeQuest(100003);
                        cm.startQuest(100004);
                        cm.gainItem(4031008, -1);
                }
                else if (status == 5) {
                        cm.warp(108000300, 0);
                        cm.dispose();
                } else {
                    cm.dispose();
                }
        }
}
