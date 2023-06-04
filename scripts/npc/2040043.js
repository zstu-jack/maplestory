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
@	Author : Twdtwd
@       Author : Ronan
@
@	NPC = Blue Balloon
@	Map = Hidden-Street <Stage 8>
@	NPC MapId = 922010800
@	Function = LPQ - 8 Stage
@
@	Description: Used to find the combo to unlock the next door. Players stand on 5 different crates to guess the combo.
*/

function generateCombo() {
	var countPicked = 0;
	var positions = Array(0,0,0,0,0,0,0,0,0);
	while(countPicked < 5) {
		var picked = Math.floor(Math.random() * positions.length);
		if(positions[picked] == 1) // Don't let it pick one its already picked.
			continue;
			
		positions[picked] = 1;
		countPicked++;
	}
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
		returnString += ",";
	}
	
	return returnString;
	
}

var debug = false;
var status = 0;
var curMap, stage;

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);
    
    eim.linkToNextStage(stage, "lpq", curMap);  //opens the portal to the next map
}

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;
    
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
                        cm.sendNext("传送门已经开启，可以前往下一阶段。");
                }
                else {
                        if (eim.isEventLeader(cm.getPlayer())) {
                                var state = eim.getIntProperty("statusStg" + stage);

                                if(state == -1) {           // preamble
                                        cm.sendOk("你好，欢迎来到#b第" + stage + "阶段#k。在这个阶段，5名队员需要依次站在这些方块上面，形成正确的组合来解锁下一阶段。同一个方块上面只能站着一个玩家。");
                                        
                                        var st = (debug) ? 2 : 0;
                                        eim.setProperty("statusStg" + stage, st);
                                }
                                else {       // check stage completion
                                        if(state == 2) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                                return;
                                        }
                                    
                                        objset = [0,0,0,0,0,0,0,0,0];
                                        var playersOnCombo = 0;
                                        var map = cm.getPlayer().getMap();
                                        var party = cm.getEventInstance().getPlayers();
                                        for (var i = 0; i < party.size(); i++) {
                                            for (var y = 0; y < map.getAreas().size(); y++) {
                                                if (map.getArea(y).contains(party.get(i).getPosition())) {
                                                    playersOnCombo++;
                                                    objset[y] = 1;
                                                    //cm.mapMessage(5, "Player found on " + (y + 1));
                                                    break;
                                                }
                                            }
                                        }

                                        if (playersOnCombo == 5 || cm.getPlayer().gmLevel() > 1) {
                                            var comboStr = eim.getProperty("stage" + stage + "combo");
                                            if(comboStr == null) {
                                                comboStr = generateCombo();
                                                eim.setProperty("stage" + stage + "combo", comboStr);
                                            }
                                            
                                            var combo = comboStr.split(',');
                                            var correctCombo = true;
                                            for (i = 0; i < objset.length && correctCombo; i++)
                                                if (parseInt(combo[i]) != objset[i]) {
                                                    //cm.mapMessage(5, "Combo failed on " + (i + 1));
                                                    correctCombo = false;
                                                }
                                            if (correctCombo || cm.getPlayer().gmLevel() > 1) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                            } else {
                                                eim.showWrongEffect();
                                                cm.dispose();
                                            }
                                        } else {
                                            cm.sendNext("看起来你们还没有找到正确的5个方块，请尝试不同的方块组合。同一时间只有5名玩家可以站在方块上，如果有人在这时移动，将不会被认为是给出了答案，请记住这一点。");
                                            cm.dispose();
                                        }
                                }
                        } else {
                                cm.sendNext("请让你的#b队长#k来跟我对话。");
                        }
                }
                
                cm.dispose();
        }
}