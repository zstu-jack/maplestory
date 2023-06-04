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
/* Adobis
 * 
 * El Nath - The Door to Zakum (211042300)
 * 
 * Vs Zakum Recruiter NPC
 * 
 * Custom Quest 100200 = Whether you can start Zakum PQ
 * Custom Quest 100201 = Whether you have done the trials
*/

var status;
var em;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if(cm.haveItem(4001109, 1)) {
            cm.warp(921100000, "out00");
            cm.dispose();
            return;
        }
        
        if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) {   // thanks Vcoc for finding out a need of reapproval from the masters for Zakum expeditions
            if (cm.getPlayer().getLevel() >= 50) {  // thanks Z1peR for noticing not-so-clear unmet requirements message here.
                cm.sendOk("小心，那些来自远古的力量仍未被遗忘...如果你想要挑战 #r扎昆#k ，从 #b长老公馆#k 的各位长老处获得许可后 #b通过试炼#k，到那时才有资格挑战扎昆。");
            } else {
                cm.sendOk("小心，那些来自远古的力量仍未被遗忘...");
            }
            
            cm.dispose();
            return;
        }
        
        em = cm.getEventManager("ZakumPQ");
        if(em == null) {
            cm.sendOk("扎昆组队任务遇到了一个错误。");
            cm.dispose();
            return;
        }
        
        if (status == 0) {
            cm.sendSimple("#e#b<组队任务：前往扎昆的祭台>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n小心，那些来自远古的力量仍未被遗忘...#b\r\n#L0#调查未知废矿区 (第一阶段)#l\r\n#L1#探索扎昆迷宫 (第二阶段)#l\r\n#L2#领取献给扎昆的祭品 (Stage 3)#l");//直面火山的呼吸和制作火焰的眼不认真看物品的玩家会觉得有些突兀，所以用CMS现行脚本内容替代。另外征讨扎昆这种翻译怎么看怎么怪，所以用目的地作为组队任务的名字了。
        }
        else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("处于组队状态时，才能执行组队任务。");
                    cm.dispose();
                } else if(!cm.isLeader()) {
                    cm.sendOk("如果想执行组队任务，请让你的队长来和我对话。");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if(eli.size() > 0) {
                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("本频道已经有队伍正在执行组队任务，请等待其完成组队任务或切换至其他频道。");
                        }
                    }
                    else {
                        cm.sendOk("目前无法执行组队任务，原因可能是组队人数不满足要求，组队中存在不符合资格的成员，组队成员没有进入本地图之一。如果缺少组队成员，请尝试组队搜索功能。");
                    }

                    cm.dispose();
                }
            } else if(selection == 1) {
                if (cm.haveItem(4031061) && !cm.haveItem(4031062))
                    cm.sendYesNo("想要尝试获取 #b火山的呼吸#k 吗？如果在里面失败，很有可能会死亡。");
                else {
                    if (cm.haveItem(4031062)) cm.sendNext("你已经获得 #b火山的呼吸#k 不再需要进行本试炼了。");
                    else cm.sendNext("请完成上一阶段的试炼后再行尝试。");
                    
                    cm.dispose();
                }
            } else {
                if(cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    if(!cm.haveItem(4000082, 30)) {
                        cm.sendOk("你通过了试炼，但现在仍然需要 #b30枚 #t4000082##k 来制作 5个 #t4001017#。");
                    } else {
                        cm.completeQuest(100201);
                        cm.gainItem(4031061, -1);
                        cm.gainItem(4031062, -1);
                        cm.gainItem(4000082, -30);

                        cm.gainItem(4001017, 5);
                        cm.sendNext("你已经 #r通过了试炼#k，现在起你被获准挑战扎昆。");
                    }
                    
                    cm.dispose();
                } else {
                    cm.sendOk("道具不足，无法兑换 #b#t4001017##k。");
                    cm.dispose();
                }
            }
        }
        else if (status == 2) {
            cm.warp(280020000, 0);
            cm.dispose();
        }
    }
}
