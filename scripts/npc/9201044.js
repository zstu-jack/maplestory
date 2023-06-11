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
@	Description: Used to find the combo to unlock the next door. Players stand on 5 different crates to guess the combo.
*/

importPackage(Packages.server.life);

var debug = false;
var autopass = false;

function spawnMobs(maxSpawn) {
    var spawnPosX;
    var spawnPosY;

    var mapObj = cm.getMap();
    if (stage == 2) {
        spawnPosX = [619, 299, 47, -140, -471];
        spawnPosY = [-840, -840, -840, -840, -840];

        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 2; j++) {
                var mobObj1 = MapleLifeFactory.getMonster(9400515);
                var mobObj2 = MapleLifeFactory.getMonster(9400516);
                var mobObj3 = MapleLifeFactory.getMonster(9400517);

                mapObj.spawnMonsterOnGroundBelow(mobObj1, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
                mapObj.spawnMonsterOnGroundBelow(mobObj2, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
                mapObj.spawnMonsterOnGroundBelow(mobObj3, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
            }
        }
    } else {
        spawnPosX = [2303, 1832, 1656, 1379, 1171];
        spawnPosY = [240, 150, 300, 150, 240];

        for(var i = 0; i < maxSpawn; i++) {
            var rndMob = 9400519 + Math.floor(Math.random() * 4);
            var rndPos = Math.floor(Math.random() * 5);

            var mobObj = MapleLifeFactory.getMonster(rndMob);
            mapObj.spawnMonsterOnGroundBelow(mobObj, new Packages.java.awt.Point(spawnPosX[rndPos], spawnPosY[rndPos]));
        }
    }
}

function generateCombo1() {
	var positions = Array(0,0,0,0,0,0,0,0,0);
        var rndPicked = Math.floor(Math.random() * Math.pow(3, 5));
        
        while(rndPicked > 0) {
            (positions[rndPicked % 3])++;
            
            rndPicked = Math.floor(rndPicked / 3);
        }
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
                        returnString += ",";
	}
	
	return returnString;
}

function generateCombo2() {
	var toPick = 5, rndPicked;
	var positions = Array(0,0,0,0,0,0,0,0,0);
	while(toPick > 0) {
		rndPicked = Math.floor(Math.random() * 9);
                
                if(positions[rndPicked] == 0) {
                        positions[rndPicked] = 1;
                        toPick--;
                }
	}
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
                        returnString += ",";
	}
	
	return returnString;
}

var status = 0;
var curMap, stage;

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    if(stage > 1) {
        eim.showClearEffect(true);
        eim.linkToNextStage(stage, "apq", curMap);  //opens the portal to the next map
    }
    else {
        cm.getMap().getPortal("go01").setPortalState(false);
        
        var val = Math.floor(Math.random() * 3);
        eim.showClearEffect(670010200, "gate" + val, 2);
        
        cm.getMap().getPortal("go0" + val).setPortalState(true);
        eim.linkPortalToScript(stage, "go0" + val, "apq0" + val, curMap);
    }
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
                        cm.sendNext("传送口已经开启,去迎接你们的挑战吧.");
                }
                else {
                        if (eim.isEventLeader(cm.getPlayer())) {
                                var state = eim.getIntProperty("statusStg" + stage);

                                if(state == -1) {           // preamble
                                        if(stage == 1) cm.sendOk("欢迎来到#b婚礼村挑战第" + stage + "关卡#k.在这个关卡,你需要和#p9201047#交谈,他会为你们解答任务的更多细节.击碎魔镜后,将碎片交给#p9201047#,然后进入下一阶段.");
                                        else if(stage == 2) cm.sendOk("欢迎来到#b婚礼村挑战第" + stage + "关卡#k.在这个关卡,欢迎来到#b婚礼村挑战第" + stage + "关卡#k.在这个关卡,让你的5名队员站在台子上,尝试各种组合,从而开启通往下一关的传送门.等你们准备好了就告诉我,我就会告诉你们组合是否正确.但要做好准备,如果多次尝试后没有成功,就会出现怪物.");
                                        else if(stage == 3) cm.sendOk("欢迎来到#b婚礼村挑战第" + stage + "关卡#k.在这个关卡,让你的5名队员站在台子上,尝试各种组合,从而开启通往下一关的传送门.等你们准备好了就告诉我,我就会告诉你们组合是否正确.给你们一个小提示,数一数场上出现的水灵,它会提示你们所站立的位置中有多少是正确的.");

                                        var st = (autopass) ? 2 : 0;
                                        eim.setProperty("statusStg" + stage, st);
                                }
                                else {       // check stage completion
                                        if(state == 2) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                                return;
                                        }

                                        var map = cm.getPlayer().getMap();
                                        if(stage == 1) {
                                                if(eim.getIntProperty("statusStg" + stage) == 1) {
                                                    clearStage(stage, eim, curMap);
                                                } else {
                                                    cm.sendOk("想了解更多信息的话,去问问#p9201047#吧.");
                                                }
                                        } else if(stage == 2 || stage == 3) {
                                                if(map.countMonsters() == 0) {
                                                        objset = [0,0,0,0,0,0,0,0,0];
                                                        var playersOnCombo = 0;
                                                        var party = cm.getEventInstance().getPlayers();
                                                        for (var i = 0; i < party.size(); i++) {
                                                            for (var y = 0; y < map.getAreas().size(); y++) {
                                                                if (map.getArea(y).contains(party.get(i).getPosition())) {
                                                                    playersOnCombo++;
                                                                    objset[y] += 1;
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        if (playersOnCombo == 5/* || cm.getPlayer().gmLevel() > 1*/ || debug) {
                                                            var comboStr = eim.getProperty("stage" + stage + "combo");
                                                            if (comboStr == null || comboStr == "") {
                                                                if (stage == 2) {
                                                                    comboStr = generateCombo1();
                                                                } else {
                                                                    comboStr = generateCombo2();
                                                                }

                                                                eim.setProperty("stage" + stage + "combo", comboStr);
                                                                if(debug) print("generated " + comboStr + " for stg" + stage + "\n");
                                                            }

                                                            var combo = comboStr.split(',');
                                                            var correctCombo = true;
                                                            var guessedRight = objset.length;
                                                            var playersRight = 0;

                                                            if(!debug) {
                                                                for (i = 0; i < objset.length; i++) {
                                                                    if (parseInt(combo[i]) != objset[i]) {
                                                                        correctCombo = false;
                                                                        guessedRight--;
                                                                    } else {
                                                                        if(objset[i] > 0) playersRight++;
                                                                    }
                                                                }
                                                            } else {
                                                                for (i = 0; i < objset.length; i++) {
                                                                    var ci = cm.getPlayer().countItem(4000000 + i);

                                                                    if (ci != parseInt(combo[i])) {
                                                                        correctCombo = false;
                                                                        guessedRight--;
                                                                    } else {
                                                                        if(ci > 0) playersRight++;
                                                                    }
                                                                }
                                                            }


                                                            if (correctCombo/* || cm.getPlayer().gmLevel() > 1*/) {
                                                                eim.setProperty("statusStg" + stage, 1);
                                                                clearStage(stage, eim, curMap);
                                                                cm.dispose();
                                                            } else {
                                                                var miss = eim.getIntProperty("missCount") + 1;
                                                                var maxMiss = (stage == 2) ? 7 : 1;

                                                                if (miss < maxMiss) {   //already implies stage 2
                                                                    eim.setIntProperty("missCount", miss);

                                                                    if(guessedRight == 6) { //6 unused slots on this stage
                                                                        cm.sendNext("所有的绳子上重量都不对.想想接下来该尝试哪种组合吧.");
                                                                        cm.mapMessage(5, "亚莫斯: 所有的绳子重量都不对.");
                                                                    }
                                                                    else {
                                                                        cm.sendNext("有的绳子重量正确了.想想接下来该尝试哪种组合吧.");
                                                                        cm.mapMessage(5, "亚莫斯: 有的绳子重量正确了.");
                                                                    }
                                                                } else {
                                                                    spawnMobs(playersRight);
                                                                    eim.setIntProperty("missCount", 0);
                                                                    if(stage == 2) {
                                                                        eim.setProperty("stage2combo", "");

                                                                        cm.sendNext("你们没能找到正确的组合,现在它们即将被重置了.从头再来吧.");
                                                                        cm.mapMessage(5, "亚莫斯: 你们没能找到正确的组合,现在它们即将被重置了.从头再来吧.");
                                                                    }
                                                                }

                                                                eim.showWrongEffect();
                                                                cm.dispose();
                                                            }
                                                        } else {
                                                            if(stage == 2) cm.sendNext("看来你们还没有找到通过这一关的方法.思考如何安排台子上的5名成员来过关吧.记住,只有5人可以站在台子上,不要随意走动,那样可能会使你们错过正确答案.这一点可要记好了.继续尝试吧.");
                                                            else cm.sendNext("看来你们还没有找到通过这一关的方法.思考如何安排不同台子上的5名成员来过关吧.记住,只有5人可以站在台子上,不要随意走动,那样可能会使你们错过正确答案.这一点可要记好了.继续尝试吧.");

                                                            cm.dispose();
                                                        }
                                                } else {
                                                        cm.sendNext("尝试下一个组合之前,先把场上的怪物都清理掉.");
                                                }
                                        }
                                }
                        } else {
                                cm.sendNext("让你的#b队长#k来跟我对话。");
                        }
                }
                
                cm.dispose();
        }
}