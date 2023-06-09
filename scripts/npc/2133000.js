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
 * @npc: Ellin
 * @map: 300030100 - Deep Fairy Forest
 * @func: Ellin PQ
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

                if (status == 0) {
                        em = cm.getEventManager("EllinPQ");
                        if(em == null) {
                                cm.sendOk("艾琳森林组队任务遇到了一个错误。");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务：毒雾森林>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想组成或加入一支队伍来揭开#b毒雾森林#k的谜团吗？让你的#b队长#k与我对话，或者创建一个队伍。#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。\r\n#L3#我想要兑换奖励。");
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
                                cm.sendOk("#e#b<组队任务：毒雾森林>#k#n\r\n在这个组队任务中，你们的任务是逐步穿越森林，打倒路上遇到的所有怪物，解开遭遇的许多谜题，团结起来，克服时间上的限制、击退强大的生物。击败最终的Boss后，#b抵达退场地图时#k可以获得一块石板，作为全队的额外奖励。祝你们好运。");
                                cm.dispose();
                        }
                        else {
                                cm.sendSimple("你想要领取哪种奖励？\r\n#b#L0#兑换阿尔泰耳环。\r\n#L1#兑换发光的阿尔泰耳环。\r\n#L2#兑换闪耀的阿尔泰耳环。");
                        }
                } else if (status == 2) {
                        if (selection == 0) {
                                if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("或许你尚未获得阿尔泰耳环，也可能拥有的阿尔泰碎片不足 10枚。");
                                        cm.dispose();
                                }
                        } else if (selection == 1){
                                if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,-1);
                                        cm.gainItem(1032061, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                       cm.sendOk("或许你尚未获得阿尔泰耳环，也可能拥有的阿尔泰碎片不足 10枚。");
                                       cm.dispose();
                                }
                        } else if (selection == 2){
                                if (cm.haveItem(1032061) && !cm.haveItem(1032072) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032061,-1);
                                        cm.gainItem(1032072, 1);    // thanks yuxaij for noticing unexpected itemid here
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("或许你尚未获得发光的阿尔泰耳环 ，也可能拥有的阿尔泰碎片不足 10枚。");
                                        cm.dispose();
                                }
                        }
                }
        }
}