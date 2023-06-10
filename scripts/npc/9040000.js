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
 * @npc: Shuang
 * @map: Victoria Road: Excavation Site<Camp> (101030104)
 * @func: Start Guild PQ
*/

var status = 0;
var sel;
var em = null;

function findLobby(guild) {
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
                var lobby = iterator.next();
                
                if(lobby.getIntProperty("guild") == guild) {
                        if(lobby.getIntProperty("canJoin") == 1) return lobby;
                        else return null;
                }
        }
        
        return null;
}

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
                        em = cm.getEventManager("GuildQuest");
                        if(em == null) {
                                cm.sendOk("家族对抗赛遇到了一个错误。");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#e#b<家族任务：圣瑞尼亚家族对抗赛>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这条道路通向圣瑞尼亚。有什么事要做？#b\r\n#L0#申请开启家族对抗赛。#l\r\n#L1#申请参加家族对抗赛。#l\r\n#L2#我想要听取更多相关细节。#l");
                } else if (status == 1) {
                        sel = selection;
                        if (selection == 0) {
                                if(!cm.isGuildLeader()) {
                                        cm.sendOk("只有族长/副族长可以申请开启家族对抗赛。");
                                        cm.dispose();
                                } else {
                                        if(em.isQueueFull()) {
                                                cm.sendOk("本频道的家族对抗赛正在进行中。请耐心等待稍后再试，或切换至其他频道尝试。");
                                                cm.dispose();
                                        } else {
                                                var qsize = em.getQueueSize();
                                                cm.sendYesNo(((qsize > 0) ? "目前已有 #r" + qsize + "#k 个家族正在约战。" : "") + "你想要率领你的家族参战吗？");
                                        }
                                }
                        } else if (selection == 1) {
                                if(cm.getPlayer().getGuildId() > 0) {
                                        var eim = findLobby(cm.getPlayer().getGuildId());
                                        if(eim == null) {
                                                cm.sendOk("你的家族目前在本频道没有进行约战。请确认你的家族是否参战或在其他频道申请了家族对抗赛。");
                                        } else {
                                                if(cm.isLeader()) {
                                                        em.getEligibleParty(cm.getParty());
                                                        eim.registerParty(cm.getPlayer());
                                                } else {
                                                        eim.registerPlayer(cm.getPlayer());
                                                }
                                        }
                                } else {
                                        cm.sendOk("没有家族，无法参加家族对抗赛。");
                                }
                                
                                cm.dispose();
                        } else {
                                var reqStr = "";
                                reqStr += "\r\n\r\n    参与成员要求：\r\n\r\n";
                                reqStr += "     - 至少有一名队伍成员#r小于等于30级#k。\r\n";
                                reqStr += "     - 至少有一名队伍成员职业为#r飞侠#k并拥有#r隐身术#k和#r满级的轻功#k。\r\n";
                                reqStr += "     - 至少有一名队伍成员职业为#r魔法师#k并拥有#r满级的快速移动#k。\r\n";
                                reqStr += "     - 至少有一名队伍成员为#r远程攻击职业#k，如弓箭手，刺客或火枪手。\r\n";
                                reqStr += "     - 至少有一名队伍成员拥有#r远距离跳跃技能#k，如拥有满级二段跳的刺客或拥有轻羽鞋的火枪手。\r\n";
                            
                                cm.sendOk("#e#b<家族任务：圣瑞尼亚家族对抗赛>#k#n\r\n与你的家族成员组成队伍，巧妙地从骷髅大军的手中夺回鲁碧安。团结协作去解决圣瑞尼亚遗迹中的谜题与挑战。完成任务后，队员将获得丰厚的奖励，并且为家族赢得大量家族积分。" + reqStr);
                                cm.dispose();
                        }
                } else if (status == 2) {
                        if (sel == 0) {
                                var entry = em.addGuildToQueue(cm.getPlayer().getGuildId(), cm.getPlayer().getId());
                                if(entry > 0) {
                                        cm.sendOk("你的家族已成功申请参加家族对抗赛。聊天窗口内已经发布了一条消息，通知你的所有家族成员了解到家族任务状态。\r\n\r\n#r重要事项#k：作为本次任务的队长，#r你必须在等待时间结束前留在当前频道#k。#b若离开本频道#k将会取消家族参与任务资格。另外，作为队长在任务过程中任何时间节点离开都将导致任务中断，家族成员会被移除对抗赛名单。");
                                } else if(entry == 0) {
                                        cm.sendOk("本频道的家族对抗赛正在进行中。请耐心等待稍后再试，或切换至其他频道尝试。");
                                } else {
                                        cm.sendOk("你的家族已经在本频道申请了家族对抗赛，请等待家族对应的对抗赛轮次。");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}