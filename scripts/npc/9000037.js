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
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
*/

var status = 0;
var state;
var em = null;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;
    
    for(var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());
    
    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if(midLevel <= 20) lobby = 0;
    else if(midLevel <= 40) lobby = 1;
    else if(midLevel <= 60) lobby = 2;
    else if(midLevel <= 80) lobby = 3;
    else if(midLevel <= 90) lobby = 4;
    else if(midLevel <= 100) lobby = 5;
    else if(midLevel <= 110) lobby = 6;
    else lobby = 7;
        
    return lobby;
}

function start() {
	status = -1;
        state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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
                        if(state == 3) {
                                if(cm.getEventInstance().getProperty("clear") == null) {
                                        cm.getEventInstance().clearPQ();
                                        cm.getEventInstance().setProperty("clear", "true");
                                }
                            
                                if(cm.isEventLeader()) {
                                        cm.sendOk("你的团队完成了如此惊人的成就，#b击败了所有BOSS#k，恭喜！我会在你出去的时候给你奖励。。。");
                                }
                                else {
                                        cm.sendOk("#b击败了所有BOSS#k，祝贺你！你现在将获得一个与你在这里的表现相匹配的奖品！");
                                }
                        }
                        else if(state == 2) {
                                if(cm.isEventLeader()) {
                                        if(cm.getPlayer().getEventInstance().isEventTeamTogether()) {
                                                cm.sendYesNo("你的团队准备好进入下一阶段了吗？你们真的想继续吗？");
                                        }
                                        else {
                                                cm.sendOk("请等待您的团队准备好后再继续。");
                                                cm.dispose();
                                                return;
                                        }
                                }
                                else {
                                        cm.sendOk("等待你的队长给我继续前进的信号。如果你想退出，请穿过出口，你会被送出去，并且可以获得目前的奖励。");
                                        cm.dispose();
                                        return;
                                }
                        } else if(state == 1) {
                                cm.sendYesNo("你确定要离开吗？");
                        }
                        else {
                                em = cm.getEventManager("BossRushPQ");
                                if(em == null) {
                                        cm.sendOk("出现错误");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                                
                                cm.sendSimple("#e#b<副本挑战：BOSS连战>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你是希望组队挑战，还是单人挑战？ 如果想要开始，请让#b队长#k与我交谈#b\r\n#L0#我想参加副本\r\n#L1#更变 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "激活") + " 搜索功能.\r\n#L2#我想了解更多细节");
                        }
                } else if (status == 1) {
                        if(state == 3) {
                                if(!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                                        cm.sendOk("请事先清空你的背包，至少每个栏目有一个空格");
                                        cm.dispose();
                                        return;
                                }
                                
                                cm.warp(970030000);
                                cm.dispose();
                        } else if(state == 2) {
                                var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                                cm.getPlayer().getEventInstance().restartEventTimer(restSpot * 4 * 60000);  // adds (restspot number * 4) minutes
                                cm.getPlayer().getEventInstance().warpEventTeam(970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot));
                                
                                cm.dispose();
                        } else if(state == 1) {
                                cm.warp(970030000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("请组队再来参加，单人作战也需要组队");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("必须要队长才能进入副本");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        var lobby = detectTeamLobby(eli), i;
                                                        for(i = lobby; i < 8; i++) {
                                                                if(em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) break;
                                                        }
                                                        
                                                        if(i == 8) {
                                                                cm.sendOk("当前其他团队正在#r挑战副本#k请更换频道或等待对方退出.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你还不能开始这个团队任务，因为你的队员没有到齐，或者你的队员没有挑战资格。");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的状态为: #b" + (psState ? "禁用" : "启用") + "#k. 搜索队伍功能，想把它换回来就跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队副本: 连续BOSS战>#k#n\r\n来自各地的冒险家来到这里，测试他们在战斗中的技能和能力。与冒险家们并肩作战，或者独自面对所有，获得所有的荣耀，这取决于你。奖励是根据冒险者到达的关卡给予的，额外的奖励可能会发给一名随机幸运成员，所有奖励都会在探险结束时获得。\r\n\r\n这个副本支持不同等级之间的组队，如果你想有更好的机会迅速为你的团队建立一个副本团队，那么就与级别较低的冒险家组队。");
                                        cm.dispose();
                                }
                        }
                }
        }
}