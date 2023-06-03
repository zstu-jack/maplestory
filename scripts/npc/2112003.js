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
 * @npc: Juliet
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
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
                    
                if(cm.getMapId() != 261000021) {
                        if(status == 0) {
                                cm.sendYesNo("We must keep fighting to save Romeo, please keep your pace. If you are not feeling so well to continue, your companions and I will understand... So, are you going to retreat?");
                        } else if(status == 1) {
                                cm.warp(926110700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_A");
                                if(em == null) {
                                        cm.sendOk("The Magatia PQ (Alcadno) has encountered an error.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：Romeo and Juliet>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nMy beloved Romeo has been kidnapped! Although he is Zenumist's, I can't stand by and just see him suffer just because of this foolish clash. I need you and your colleagues help to save him! Please, help us!! Please have your #bparty leader#k talk to me.#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。");
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
                                        cm.sendOk("#e#b<组队任务：Romeo and Juliet>#k#n\r\nNot long ago, a scientist named Yulete has been banished from this town because of his researches of combined alchemies of Alcadno's and Zenumist's. Because of the immensurable amount of power coming from this combination, it is forbidden by law to study both. Yet, he ignored this law and got hands in both researches. As a result, he has been exiled.\r\nHe is now retaliating, already took my beloved one and his next target is me, as we are big pictures of Magatia, successors of both societies. But I'm not afraid. We must recover him at all costs!\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}