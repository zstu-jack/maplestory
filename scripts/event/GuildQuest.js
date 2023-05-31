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
 * @event: Sharenian Guild PQ
*/

var isPq = true;
var minPlayers = 6, maxPlayers = 30;
var minLevel = 1, maxLevel = 255;
var entryMap = 990000000;
var exitMap = 990001100;
var recruitMap = 101030104;
var clearMap = 990001000;

var minMapId = 990000000;
var maxMapId = 990001101;

var waitTime = 3;       //  3 minutes
var eventTime = 90;     // 90 minutes
var bonusTime = 0.5;    // 30 seconds

var lobbyRange = [0, 0];

function init() {
        setEventRequirements();
}

function setLobbyRange() {
        return lobbyRange;
}

function setEventRequirements() {
        var reqStr = "";
        
        reqStr += "\r\n    组队人数限制: ";
        if(maxPlayers - minPlayers >= 1) reqStr += minPlayers + " ~ " + maxPlayers;
        else reqStr += minPlayers;
        
        reqStr += "\r\n    等级限制: ";
        if(maxLevel - minLevel >= 1) reqStr += minLevel + " ~ " + maxLevel;
        else reqStr += minLevel;
        
        reqStr += "\r\n    所有组队成员需要来自同一家族";
        
        reqStr += "\r\n    时间限制: ";
        reqStr += eventTime + " 分钟";
        
        em.setProperty("party", reqStr);
}

function setEventExclusives(eim) {
        var itemSet = [1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001029, 4001030, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037];
        eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {
        var itemSet, itemQty, evLevel, expStages;

        evLevel = 1;    //Rewards at clear PQ
        itemSet = [];
        itemQty = [];
        eim.setEventRewards(evLevel, itemSet, itemQty);
        
        expStages = [];    //bonus exp given on CLEAR stage signal
        eim.setEventClearStageExp(expStages);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
        var eligible = [];
        var hasLeader = false;
        
        var guildId = 0;
        
        if(party.size() > 0) {
                var partyList = party.toArray();
                
                for(var i = 0; i < party.size(); i++) {
                        var ch = partyList[i];
                        if(ch.isLeader()) {
                                guildId = ch.getGuildId();
                                break;
                        }
                }

                for(var i = 0; i < party.size(); i++) {
                        var ch = partyList[i];

                        if(ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel && ch.getGuildId() == guildId) {
                                if(ch.isLeader()) hasLeader = true;
                                eligible.push(ch);
                        }
                }
        }
        
        if(!(hasLeader)) eligible = [];
        return eligible;
}

function setup(level, lobbyid) {
        var eim = em.newInstance("Guild" + lobbyid);
        eim.setProperty("level", level);
        
        eim.setProperty("guild", 0);
        eim.setProperty("canJoin", 1);
        eim.setProperty("canRevive", 0);
        
        eim.getInstanceMap(990000000).resetPQ(level);
        eim.getInstanceMap(990000100).resetPQ(level);
        eim.getInstanceMap(990000200).resetPQ(level);
        eim.getInstanceMap(990000300).resetPQ(level);
        eim.getInstanceMap(990000301).resetPQ(level);
        eim.getInstanceMap(990000400).resetPQ(level);
        eim.getInstanceMap(990000401).resetPQ(level);
        eim.getInstanceMap(990000410).resetPQ(level);
        eim.getInstanceMap(990000420).resetPQ(level);
        eim.getInstanceMap(990000430).resetPQ(level);
        eim.getInstanceMap(990000431).resetPQ(level);
        eim.getInstanceMap(990000440).resetPQ(level);
        eim.getInstanceMap(990000500).resetPQ(level);
        eim.getInstanceMap(990000501).resetPQ(level);
        eim.getInstanceMap(990000502).resetPQ(level);
        eim.getInstanceMap(990000600).resetPQ(level);
        eim.getInstanceMap(990000610).resetPQ(level);
        eim.getInstanceMap(990000611).resetPQ(level);
        eim.getInstanceMap(990000620).resetPQ(level);
        eim.getInstanceMap(990000630).resetPQ(level);
        eim.getInstanceMap(990000631).resetPQ(level);
        eim.getInstanceMap(990000640).resetPQ(level);
        eim.getInstanceMap(990000641).resetPQ(level);
        eim.getInstanceMap(990000700).resetPQ(level);
        eim.getInstanceMap(990000800).resetPQ(level);
        eim.getInstanceMap(990000900).resetPQ(level);
        eim.getInstanceMap(990001000).resetPQ(level);
        eim.getInstanceMap(990001100).resetPQ(level);
        eim.getInstanceMap(990001101).resetPQ(level);
        
        respawnStages(eim);
        
        var ts = Date.now();
        ts += (60000 * waitTime);
        eim.setProperty("entryTimestamp", "" + ts);
        
        eim.startEventTimer(waitTime * 60000);    
        
        setEventRewards(eim);
        setEventExclusives(eim);
        
        return eim;
}

function isTeamAllJobs(eim) {
        var eventJobs = eim.getEventPlayersJobs();
        var rangeJobs = parseInt('111110', 2);
        
        return ((eventJobs & rangeJobs) == rangeJobs);
}

function afterSetup(eim) {
        var leader = em.getChannelServer().getPlayerStorage().getCharacterById(eim.getLeaderId());
        if(leader != null) {
                eim.setProperty("guild", "" + leader.getGuildId());
        }
}

function respawnStages(eim) {}

function playerEntry(eim, player) {
        var map = eim.getMapInstance(entryMap);
        player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
        if(eim.isEventCleared()) {
                eim.warpEventTeam(990001100);
        } else {
                if(eim.getIntProperty("canJoin") == 1) {
                        eim.setProperty("canJoin", 0);

                        if(eim.checkEventTeamLacking(true, minPlayers)) {
                                end(eim);
                        } else {
                                eim.startEventTimer(eventTime * 60000);
                                
                                if(isTeamAllJobs(eim)) {
                                        var rnd = Math.floor(Math.random() * 4);
                                        eim.applyEventPlayersItemBuff(2023000 + rnd);
                                }
                        }
                } else {
                        end(eim);
                }
        }
}

function playerUnregistered(eim, player) {
        player.cancelEffect(2023000);
        player.cancelEffect(2023001);
        player.cancelEffect(2023002);
        player.cancelEffect(2023003);
}

function playerExit(eim, player) {
        eim.unregisterPlayer(player);
        player.changeMap(exitMap, 0);
}

function changedMap(eim, player, mapid) {
        if (mapid < minMapId || mapid > maxMapId) {
                if (eim.isEventTeamLackingNow(true, minPlayers, player) && eim.getIntProperty("canJoin") == 0) {
                        eim.unregisterPlayer(player);
                        end(eim);
                }
                else
                        eim.unregisterPlayer(player);
        }
}

function afterChangedMap(eim, player, mapid) {
        if (mapid == 990000100) {
                var texttt = "任务简介：参与者应当知晓，一旦进入守护之峡谷，任何没有装备#b#t1032033##k的人都会因为毒雾侵蚀而立刻死亡。一旦角色所在的队伍离开地图，进入下一阶段前，请确保在区域内 #b攻击闪耀之石#k 并在进入下一关卡前 #b装备掉落的物品#k 。这会帮助你顺畅地通过关卡，祝你好运。";
                player.getAbstractPlayerInteraction().npcTalk(9040000, texttt);
        }
}

function changedLeader(eim, leader) {}

function playerDead(eim, player) {
        if(player.getMapId() == 990000900) {
                if(player.getMap().countAlivePlayers() == 0 && player.getMap().countMonsters() > 0) {
                        end(eim);
                }
        }
}

function playerRevive(eim, player) { // player presses ok on the death pop up.
        if(eim.getIntProperty("canRevive") == 0) {
                if (eim.isEventTeamLackingNow(true, minPlayers, player) && eim.getIntProperty("canJoin") == 0) {
                        player.respawn(eim, exitMap);
                        end(eim);
                }
                else {
                        player.respawn(eim, exitMap);
                }
                
                return false;
        }
        
        return true;
}

function playerDisconnected(eim, player) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player) && eim.getIntProperty("canJoin") == 0) {
                eim.unregisterPlayer(player);
                end(eim);
        }
        else
                eim.unregisterPlayer(player);
}

function leftParty(eim, player) {}

function disbandParty(eim) {}

function monsterValue(eim, mobId) {
        return 1;
}

function end(eim) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
                playerExit(eim, party.get(i));
        }
        eim.dispose();
}

function giveRandomEventReward(eim, player) {
        eim.giveEventReward(player);
}

function clearPQ(eim) {
        eim.stopEventTimer();
        eim.setEventCleared();
        
        eim.warpEventTeam(clearMap);
        eim.startEventTimer(bonusTime * 60000);
}

function monsterKilled(mob, eim) {}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {
        em.schedule("reopenGuildQuest", em.getLobbyDelay() * 1.5 * 1000);
}

function reopenGuildQuest() {
        em.attemptStartGuildInstance();
}