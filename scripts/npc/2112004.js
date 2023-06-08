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
 * @npc: Romeo
 * @map: Magatia - Zenumist - Hidden Room (261000011)
 * @func: Magatia PQ (Zenumist)
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
                    
                if(cm.getMapId() != 261000011) {
                        if(status == 0) {
                                cm.sendYesNo("为了拯救朱丽叶，我们必须继续努力，请不要放慢脚步。如果你觉得无法进行下去，你的伙伴还有我都会理解你的...所以，你现在想退场吗？");
                        } else if(status == 1) {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_Z");
                                if(em == null) {
                                        cm.sendOk("玛加提亚组队任务(蒙特鸠)发生了错误。");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我心爱的朱丽叶被绑架了！虽然她是卡帕莱特协会的成员，但我无法因为这场愚蠢的争执而对她受难袖手旁观。请你和你的同伴们帮我救出她吧！求求你们，拜托了！！请让你的#b队长#k来与我对话。#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。");
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
                                        cm.sendOk("#e#b<组队任务：罗密欧与朱丽叶>#k#n\r\n不久前，一位名叫犹泰的学者因为在研究中结合特鸠与卡帕莱特的炼金术而遭到驱逐。因为两种炼金术的结合蕴含着不可预测的力量，玛加提亚颁布了法令禁止同时学习两者。然而，犹泰无视了这条法令，同时进行两种炼金术的研究，因此被驱逐了。\r\n犹泰正在进行复仇，掳走我的心上人后，下一个目标就会是我。因为我们是玛加提亚的名片，两所协会的继承人。但我并不害怕，我们必须不惜一切代价把她营救回来！\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}