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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
*/

var status = 0;
var state;
var em = null;

function start() {
	status = -1;
        state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
                        if(state == 1) {
                                cm.sendYesNo("你想要离开这里吗？");
                        }
                        else {
                                em = cm.getEventManager("KerningPQ");
                                if(em == null) {
                                        cm.sendOk("废弃都市组队任务遇到了一个错误。");
                                        cm.dispose();
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                            
                                cm.sendSimple("#e#b<组队任务：第一次同行>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n与组队成员一起完成一次任务怎样？你会在这里遇到障碍和困难，只有出色的团队合作才能克服这一切。如果你想尝试挑战，请让你的#b队长#k来和我说话。#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。");
                        }
                } else if (status == 1) {
                        if(state == 1) {
                                cm.warp(103000000);
                                cm.dispose();
                        }
                        else {
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
                                } else {
                                        cm.sendOk("#e#b<组队任务：第一次同行>#k#n\r\n你们必须在这次组队任务的探索过程中经历许多障碍和谜题。整个团队通力合作，一起打败最终boss并收集掉落的道具，最终领取奖励，并进入奖励关卡。");
                                        cm.dispose();
                                }
                        }
                }
        }
}