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
@       Author : Ronan
@
@	NPC = Amos (PQ)
@	Map = AmoriaPQ maps
@	Function = AmoriaPQ Host
@
@	Description: Last stages of the Amorian Challenge
*/

var debug = false;
var status = 0;
var curMap, stage;

function isAllGatesOpen() {
    var map = cm.getPlayer().getMap();
    
    for(var i = 0; i < 7; i++) {
        var gate = map.getReactorByName("gate0" + i);
        if(gate.getState() != 4) {
            return false;
        }
    }
    
    return true;
}

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    
    eim.showClearEffect(true);
    eim.linkToNextStage(stage, "apq", curMap);  //opens the portal to the next map
}

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 670010200) / 100) + 1;
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else if (mode == 0){
            cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getPlayer().getEventInstance();
                if(eim.getProperty(stage.toString() + "stageclear") != null) {
                        if(stage < 5) cm.sendNext("传送口已经开启,去迎接你们的挑战吧.");
                        else if(stage == 5) eim.warpEventTeamToMapSpawnPoint(670010700, 0);
                        else {
                                if(cm.isEventLeader()) {
                                        if(eim.getIntProperty("marriedGroup") == 0) {
                                                eim.restartEventTimer(1 * 60 * 1000);
                                                eim.warpEventTeam(670010800);
                                        } else {
                                                eim.setIntProperty("marriedGroup", 0);

                                                eim.restartEventTimer(2 * 60 * 1000);
                                                eim.warpEventTeamToMapSpawnPoint(670010750, 1);
                                        }
                                } else {
                                        cm.sendNext("等待你们的队长开启奖励关卡.");
                                }
                        }
                }
                else {
                        if(stage != 6) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        var state = eim.getIntProperty("statusStg" + stage);

                                        if(state == -1) {           // preamble
                                                if(stage == 4) cm.sendOk("欢迎来到#b婚礼村挑战第" + stage + "关卡#k.在这个关卡,你需要从这里的怪物身上收集#b50个 #t4031597##k.");
                                                else if(stage == 5) cm.sendOk("欢迎来到#b婚礼村挑战第" + stage + "关卡#k.来到这里不容易吧?那么在这一关,你需要做的很简单,就是活下来.首先要存活下来,才能挑战这一关的Boss.");

                                                var st = (debug) ? 2 : 0;
                                                eim.setProperty("statusStg" + stage, st);
                                        }
                                        else {       // check stage completion
                                                if(stage == 4) {
                                                        if(cm.haveItem(4031597, 50)) {
                                                            cm.gainItem(4031597, -50);

                                                            var tl = eim.getTimeLeft();
                                                            if(tl >= 5 * 60 * 1000) {
                                                                eim.setProperty("timeLeft", tl.toString());
                                                                eim.restartEventTimer(4 * 60 * 1000);
                                                            }

                                                            cm.sendNext("干得好!我现在就帮你们开启传送门.");
                                                            cm.mapMessage(5, "亚莫斯: 时间不多了.你们的目标是开启大门,在下一张地图的另一侧汇合,祝你们好运!");
                                                            clearStage(stage, eim, curMap);
                                                        } else {
                                                            cm.sendNext("没听清吗?我需要#r50个 #t4031597##k,这样才能成功通过这一关.");
                                                        }

                                                } else if(stage == 5) {
                                                        var pass = true;

                                                        if(eim.isEventTeamTogether()) {
                                                            var party = cm.getEventInstance().getPlayers();
                                                            var area = cm.getMap().getArea(2);

                                                            for (var i = 0; i < party.size(); i++) {
                                                                    var chr = party.get(i);

                                                                    if (chr.isAlive() && !area.contains(chr.getPosition())) {
                                                                        pass = false;
                                                                        break;
                                                                    }
                                                            }
                                                        } else {
                                                            pass = false;
                                                        }

                                                        if(pass) {
                                                                if(isAllGatesOpen()) {
                                                                    var tl = eim.getProperty("timeLeft");
                                                                    if(tl != null) {
                                                                        var tr = eim.getTimeLeft();

                                                                        var tl = parseFloat(tl);
                                                                        eim.restartEventTimer(tl - (4 * 60 * 1000 - tr));
                                                                    }

                                                                    cm.sendNext("好了,队伍已经集结完毕.如果你们准备好与#r感性蝙蝠怪#k战斗了,就和我对话.");

                                                                    cm.mapMessage(5, "亚莫斯: 现在只剩下与Boss战斗的环节了!不过要注意,一旦进入场地后将立即开始战斗.");
                                                                    clearStage(stage, eim, curMap);
                                                                } else {
                                                                    cm.sendNext("你们是传送到这儿来的吗,嗯?我一眼就看出来了.这样可不行,必须把所有大门都打开才能完成这一阶段.回去开启所有大门后再来找我对话.");
                                                                }
                                                        } else {
                                                                cm.sendNext("你的队伍还没有集结完毕,给他们一点时间.");
                                                        }
                                                }
                                        }
                                } else {
                                        cm.sendNext("让你的#b队长#k来跟我对话。");
                                }
                        } else {
                                var area = cm.getMap().getArea(0);
                                if (area.contains(cm.getPlayer().getPosition())) {
                                        if(cm.getPlayer().isAlive()) {
                                                cm.warp(670010700, "st01");
                                        } else {
                                                cm.sendNext("稍微休息一下吧...你已经死了.");
                                        }
                                } else {
                                        if(cm.isEventLeader()) {
                                                if(cm.haveItem(4031594, 1)) {
                                                        cm.gainItem(4031594, -1);
                                                        cm.sendNext("恭喜!你们的队伍击败了感性蝙蝠怪,完成了#b婚礼村挑战#k!与我再次对话前往奖励关卡吧.");

                                                        clearStage(stage, eim, curMap);
                                                        eim.clearPQ();
                                                } else {
                                                        cm.sendNext("怎么样?取回#b#t4031594##k了吗?这是你们最后的试炼,坚持一下!")
                                                }
                                        } else {
                                                cm.sendNext("让你的#b队长#k来跟我对话。");
                                        }
                                }
                        }
                }
                
                cm.dispose();
        }
}