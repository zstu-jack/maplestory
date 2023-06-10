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
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103001 - Rolly
*	Map =  Ludibrium - <Ludibrium>
*	NPC MapId = 220000000
*	Function = Start LMPQ
*
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        em = cm.getEventManager("LudiMazePQ");
                        if(em == null) {
                                cm.sendOk("玩具城迷宫组队任务遇到了一个错误。");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务：玩具城迷宫>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这里是玩具城迷宫的入口，祝你们玩得开心！\r\n#b#L0#进入玩具城迷宫#l\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#玩具城迷宫是什么？");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("请组成队伍后再尝试探索迷宫。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("如果确定要进行组队任务，请让你的队长与我对话。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("本频道已经有队伍正在执行组队任务，请等待其完成组队任务或切换至其他频道。");
                                                }
                                        }
                                        else {
                                                cm.sendOk("需要组成3人或以上的组队才能探索该迷宫。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("现在组队搜索状态为: #b" + (psState ? "启用" : "禁用") + "#k。需要更改时请与我对话。");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务：玩具城迷宫>#k#n\r\n这个迷宫面向3名或以上成员组成的队伍开放，所有参与者的等级需要处于51~70级之间。玩家需要在15分钟内走出迷宫。玩家可以使用每个房间中心的传送点前往其它房间，（有希望）以此找到出口。小丑玩偶会在出口处等你，只要与它对话就可以安全离开。探索途中开启房间里的箱子并击败其中的怪物就会获得门票，来到出口处时，全队将根据获得的门票数量获得经验奖励。如果队长提交了30张或以上的门票，全队将会获得额外奖励。如果在15分钟之内没有成功走出迷宫，本次探索将不会得到任何经验奖励。如果在迷宫中退出游戏，该玩家将自动被送出迷宫。如果队友在中途退场，只要队伍成员数量不少于3人，其余成员也可以继续任务。遇到无法打猎怪物的紧急状况时，可以绕开它们避免发生意外。这会是一场毅力和智慧的考验。祝你好运。");
                                cm.dispose();
                        }
                }
        }
}