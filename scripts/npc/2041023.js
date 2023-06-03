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
//First version thanks to Moogra

/**
 * @author: Ronan
 * @npc: Flo
 * @map: Ludibrium - Path of Time (220050300)
 * @func: Elemental Thanatos room
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
                        if(!(cm.isQuestCompleted(6316) && (cm.isQuestStarted(6225) || cm.isQuestStarted(6315)))) {
                                cm.sendOk("You seems to have no reason to meet element-based Thanatos.");
                                cm.dispose();
                                return;
                        }
                    
                        em = cm.getEventManager("ElementalBattle");
                        if(em == null) {
                                cm.sendOk("The Elemental Battle has encountered an error.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务：Elemental Thanatos>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nYou are looking for Elemental Thanatos, right? If you team up with another mage, with the opposite elemental affinity as yours, you guys will be able to overcome them. As a leader, talk to me when you feel ready to go.#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。");
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
                        } else {
                                cm.sendOk("#e#b<组队任务：Elemental Thanatos>#k#n\r\n Team up with another mage with #rdifferent elemental affinity#k before entering the stage. This team aspect is crucial to overcome the elementals inside.");
                                cm.dispose();
                        }
                }
        }
}
