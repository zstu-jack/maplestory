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

/**
 * @author: Ronan
 * @npc: Wonky
 * @map: 200080101 - Orbis - The Unknown Tower
 * @func: Orbis PQ
*/

var status = 0;
var em = null;

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

                if(cm.getMapId() == 200080101) {
                        if (status == 0) {
                                em = cm.getEventManager("OrbisPQ");
                                if(em == null) {
                                        cm.sendOk("女神塔组队任务遇到了一个错误。");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：女神塔>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想创建或加入一支队伍来揭开#b女神塔#k的谜团吗？让你的#b队长#k与我对话，或者创建一个队伍。#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。\r\n#L3#我想要兑换奖励。");
                        } else if (status == 1) {
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
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("现在组队搜索状态为: #b" + (psState ? "启用" : "禁用") + "#k。需要更改时请与我对话。");
                                        cm.dispose();
                                } else if (selection == 2) {
                                        cm.sendOk("#e#b<组队任务：女神塔>#k#n\r\n我们的女神在很久之前就不知去向了，据说她最后一次现身的地方是女神塔。与此同时，我们的家园也已经被最近出现在天空之城附近的魔物以及精灵强大的力量所占据。它们的首领目前是远古精灵，它很有可能知道女神的下落。所以我们现在正在寻找一群勇敢的英雄进入女神塔，帮助我们夺回家园、拯救女神。如果队伍中拥有所有职业（战士、魔法师、弓箭手、飞侠、海盗），全队将在任务过程中获得温莉的祝福。可以帮帮我们吗？\r\n");//因为you兼具你、你们两种不同的意义，很多处翻译中将其省略以避免含义分歧。
                                        cm.dispose();
                                }
                                else {
                                        cm.sendSimple("你想要领取哪种奖励？\r\n#b#L0#Give me女神的手镯.\r\n");
                                }
                        } else if (status == 2) {
                                if (selection == 0) {
                                        if (!cm.haveItem(1082232) && cm.haveItem(4001158, 10) && canHold(1082232)) {
                                                cm.gainItem(1082232, 1);//上一行尝试加入装备栏是否有空格的判断
                                                cm.gainItem(4001158, -10);
                                                cm.dispose();
                                        } else {
                                                cm.sendOk("无法兑换奖励。已拥有女神的手镯、没有足够的装备栏空间或持有的 #t4001158# 不足10个。");
                                                cm.dispose();
                                        }
                                }
                        }
                } else {
                        if(status == 0) {
                                cm.sendYesNo("确定要从拯救女神的任务中离开吗？");
                        } else if(status == 1) {
                                cm.warp(920011200);
                                cm.dispose();
                        }
                }
        }
}