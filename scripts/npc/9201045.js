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
                        if(stage < 5) cm.sendNext("���Ϳ��Ѿ�����,ȥӭ�����ǵ���ս��.");
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
                                        cm.sendNext("�ȴ����ǵĶӳ����������ؿ�.");
                                }
                        }
                }
                else {
                        if(stage != 6) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        var state = eim.getIntProperty("statusStg" + stage);

                                        if(state == -1) {           // preamble
                                                if(stage == 4) cm.sendOk("��ӭ����#b�������ս��" + stage + "�ؿ�#k.������ؿ�,����Ҫ������Ĺ��������ռ�#b50�� #t4031597##k.");
                                                else if(stage == 5) cm.sendOk("��ӭ����#b�������ս��" + stage + "�ؿ�#k.�������ﲻ���װ�?��ô����һ��,����Ҫ���ĺܼ�,���ǻ�����.����Ҫ�������,������ս��һ�ص�Boss.");

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

                                                            cm.sendNext("�ɵú�!�����ھͰ����ǿ���������.");
                                                            cm.mapMessage(5, "��Ī˹: ʱ�䲻����.���ǵ�Ŀ���ǿ�������,����һ�ŵ�ͼ����һ����,ף���Ǻ���!");
                                                            clearStage(stage, eim, curMap);
                                                        } else {
                                                            cm.sendNext("û������?����Ҫ#r50�� #t4031597##k,�������ܳɹ�ͨ����һ��.");
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

                                                                    cm.sendNext("����,�����Ѿ��������.�������׼������#r���������#kս����,�ͺ��ҶԻ�.");

                                                                    cm.mapMessage(5, "��Ī˹: ����ֻʣ����Bossս���Ļ�����!����Ҫע��,һ�����볡�غ�������ʼս��.");
                                                                    clearStage(stage, eim, curMap);
                                                                } else {
                                                                    cm.sendNext("�����Ǵ��͵����������,��?��һ�۾Ϳ�������.�����ɲ���,��������д��Ŷ��򿪲��������һ�׶�.��ȥ�������д��ź��������ҶԻ�.");
                                                                }
                                                        } else {
                                                                cm.sendNext("��Ķ��黹û�м������,������һ��ʱ��.");
                                                        }
                                                }
                                        }
                                } else {
                                        cm.sendNext("�����#b�ӳ�#k�����ҶԻ���");
                                }
                        } else {
                                var area = cm.getMap().getArea(0);
                                if (area.contains(cm.getPlayer().getPosition())) {
                                        if(cm.getPlayer().isAlive()) {
                                                cm.warp(670010700, "st01");
                                        } else {
                                                cm.sendNext("��΢��Ϣһ�°�...���Ѿ�����.");
                                        }
                                } else {
                                        if(cm.isEventLeader()) {
                                                if(cm.haveItem(4031594, 1)) {
                                                        cm.gainItem(4031594, -1);
                                                        cm.sendNext("��ϲ!���ǵĶ�������˸��������,�����#b�������ս#k!�����ٴζԻ�ǰ�������ؿ���.");

                                                        clearStage(stage, eim, curMap);
                                                        eim.clearPQ();
                                                } else {
                                                        cm.sendNext("��ô��?ȡ��#b#t4031594##k����?����������������,���һ��!")
                                                }
                                        } else {
                                                cm.sendNext("�����#b�ӳ�#k�����ҶԻ���");
                                        }
                                }
                        }
                }
                
                cm.dispose();
        }
}