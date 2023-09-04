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

/**
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
*/

importPackage(Packages.tools);
importPackage(java.awt);

var stage1Questions = Array(
    "���⣺���ռ�������תְΪսʿ������͵ȼ�������ȵ�֤�顣",
    "���⣺���ռ�������תְΪսʿ�����������������ȵ�֤�顣",
    "���⣺���ռ�������תְΪħ��ʦ�����������������ȵ�֤�顣",
    "���⣺���ռ�������תְΪ�����������������������ȵ�֤�顣",
    "���⣺���ռ�������תְΪ���������������������ȵ�֤�顣",
    "���⣺���ռ�����еڶ���תְ������͵ȼ�������ȵ�֤�顣",
    "���⣺���ռ�������תְΪħ��ʦ������͵ȼ�������ȵ�֤�顣");
var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);

var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
    
var stage2Combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3Combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4Combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);
    
    eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
}

var originMinPlayers = 3;

function rectangleStages(eim, property, areaCombos, areaRects) {
    // С��3��ʱ���ش���ȷ
    if(eim.getPlayerCount() < 3){
        return true;
    }

    var c = eim.getProperty(property);
    if(c == null) {
        c = Math.floor(Math.random() * areaCombos.length);
        eim.setProperty(property, c.toString());
    }
    else c = parseInt(c);
    
    // get player placement
    var players = eim.getPlayers();
    var playerPlacement = new Array(0, 0, 0, 0, 0, 0);

    for(var i = 0; i < eim.getPlayerCount(); i++) {
        for(var j = 0; j < areaRects.length; j++) {
            if(areaRects[j].contains(players.get(i).getPosition())) {
                playerPlacement[j] += 1;
                break;
            }
        }
    }

    var curCombo = areaCombos[c];
    var accept = true;
    for(var j = 0; j < curCombo.length; j++) {
        if(curCombo[j] != playerPlacement[j]) {
            accept = false;
            break;
        }
    }
    
    return accept;
}

var status = -1;
var eim;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
        eim = cm.getEventInstance();
    
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
                    
                if(status == 0) {
                        var curMap = cm.getMapId();
                        var stage = curMap - 103000800 + 1;
                        if(eim.getProperty(stage.toString() + "stageclear") != null) {
                                if(stage < 5) {
                                        cm.sendNext("���͵��Ѿ���������ǰ����һ�׶Ρ�");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendNext("�������ţ���ͨ�������еĿ��顣���úܺã�����һ��С��Ʒ����ȷ�������������������������㹻�Ŀո�");
                                }
                        }
                        else if(curMap == 103000800) {   // stage 1
                                if(cm.isEventLeader()) {
                                        var numpasses = eim.getPlayerCount() - 1;     // minus leader

                                        if(cm.hasItem(4001008, numpasses)) {
                                                cm.sendNext("���ռ����� " + numpasses + " ��ͨ�����֤��ף����ͨ����һ�ؿ����һῪ��ͨ����һ�׶εĴ��͵㡣ʱ�����ޣ������̿�ʼ�ж���ף���Ǻ��ˣ�");
                                                clearStage(stage, eim, curMap);
                                                eim.gridClear();
                                                cm.gainItem(4001008, -numpasses);
                                        }
                                        else {
                                                cm.sendNext("��Ǹ������е�ͨ�����֤�������㡣����Ҫ������ͨ���������������ͨ��֤�������Ƕ���������ȥ�ӳ���õ������֣�Ҳ����һ��Ҫ " + numpasses + " �Ų���ͨ�����ؿ�������Ķ�Ա������⣬�ռ�����ͨ�����֤���ٽ����ҡ�");
                                        }
                                }
                                else {
                                        var data = eim.gridCheck(cm.getPlayer());

                                        if(data == 0) {
                                                cm.sendNext("��л�����֤�顣�뽫ͨ��֤������Ķӳ���");
                                        } else if(data == -1) {
                                                data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                                                eim.gridInsert(cm.getPlayer(), data);

                                                var question = stage1Questions[data - 1];
                                                cm.sendNext(question);
                                        } else {
                                                var answer = stage1Answers[data - 1];

                                                if(cm.itemQuantity(4001007) == answer) {
                                                        cm.sendNext("�ش���ȷ������Ҹ�����һ�� #bͨ�����֤#k�������������Ķӳ���");
                                                        cm.gainItem(4001007, -answer);
                                                        cm.gainItem(4001008, 1);
                                                        eim.gridInsert(cm.getPlayer(), 0);
                                                }
                                                else {
                                                        var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                                                        cm.sendNext("��Ǹ���ش����\r\n" + question);
                                                }
                                        }
                                }
                                
                                cm.dispose();
                        } else if(curMap == 103000801) {   // stage 2
                                var stgProperty = "stg2Property";
                                var stgCombos = stage2Combos;
                                var stgAreas = stage2Rects;

                                var nthtext = "2", nthobj = "����", nthverb = "����", nthpos = "������������̫�͵�λ��";
                                var nextStgId = 103000802;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("�����ݶӳ�������ָʾͨ����һ�ؿ���");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ã���ӭ������" + nthtext + "�׶Ρ������������߿������" + nthobj + "����Щ" + nthobj + "����#b3����ͨ����һ�׶εĴ��͵������#k����Ҫ���ľ�����#b3λ��Ա�ҵ���ȷ��" + nthobj + "��" + nthverb + "�����档#k\r\n���������" + nthpos + "��ͬ����Ϊ�𰸴�����ͣ����" + nthobj + "���м䣬����ȷ���������Ƿ�����ȷ�𰸡����⣬ֻ��3����Ա����ͣ����" + nthobj + "�ϡ�һ������" + nthverb + "��ȥ���ӳ���Ҫ#b˫������ȷ�ϴ��Ƿ���ȷ#k�����ڣ�������" +nthverb + "��ȥѰ����ȷ��" +  nthobj + "�ɣ�");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���͵��Ѿ���������ǰ����һ�׶Ρ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ�3����ȷ��" + nthobj + "���뿼�ǲ�ͬ��" + nthobj + "��ϡ�ͬһʱ��ֻ��3�˿���" + nthverb + "��" + nthobj + "�ϣ�������� " + nthpos + "����ͬ����Ϊ�𰸴�����ע�⡣�������԰ɡ�");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000802) {
                                var stgProperty = "stg3Property";
                                var stgCombos = stage3Combos;
                                var stgAreas = stage3Rects;

                                var nthtext = "3", nthobj = "ƽ̨", nthverb = "վ��", nthpos = "վ���ھ����Ե̫����λ��";
                                var nextStgId = 103000803;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("�����ݶӳ�������ָʾͨ����һ�ؿ���");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ã���ӭ������" + nthtext + "�׶Ρ������������߿������" + nthobj + "����Щ" + nthobj + "����#b3����ͨ����һ�׶εĴ��͵������#k����Ҫ���ľ�����#b3λ��Ա�ҵ���ȷ��" + nthobj + "��" + nthverb + "�����档#k\r\n���������" + nthpos + "��ͬ����Ϊ�𰸴�����ͣ����" + nthobj + "���м䣬����ȷ���������Ƿ�����ȷ�𰸡����⣬ֻ��3����Ա����ͣ����" + nthobj + "�ϡ�һ������" + nthverb + "��ȥ���ӳ���Ҫ#b˫������ȷ�ϴ��Ƿ���ȷ#k�����ڣ�������" +nthverb + "��ȥѰ����ȷ��" +  nthobj + "�ɣ�");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���͵��Ѿ���������ǰ����һ�׶Ρ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ�3����ȷ��" + nthobj + "���뿼�ǲ�ͬ��" + nthobj + "��ϡ�ͬһʱ��ֻ��3�˿���" + nthverb + "��" + nthobj + "�ϣ�������� " + nthpos + "����ͬ����Ϊ�𰸴�����ע�⡣�������԰ɡ�");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000803) {
                                var stgProperty = "stg4Property";
                                var stgCombos = stage4Combos;
                                var stgAreas = stage4Rects;

                                var nthtext = "4", nthobj = "ľͰ", nthverb = "վ��", nthpos = "վ���ھ����Ե̫����λ��";
                                var nextStgId = 103000804;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("�����ݶӳ�������ָʾͨ����һ�ؿ���");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ã���ӭ������" + nthtext + "�׶Ρ������������߿������" + nthobj + "����Щ" + nthobj + "����#b3����ͨ����һ�׶εĴ��͵������#k����Ҫ���ľ�����#b3λ��Ա�ҵ���ȷ��" + nthobj + "��" + nthverb + "�����档#k\r\n���������" + nthpos + "��ͬ����Ϊ�𰸴�����ͣ����" + nthobj + "���м䣬����ȷ���������Ƿ�����ȷ�𰸡����⣬ֻ��3����Ա����ͣ����" + nthobj + "�ϡ�һ������" + nthverb + "��ȥ���ӳ���Ҫ#b˫������ȷ�ϴ��Ƿ���ȷ#k�����ڣ�������" +nthverb + "��ȥѰ����ȷ��" +  nthobj + "�ɣ�");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���͵��Ѿ���������ǰ����һ�׶Ρ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ�3����ȷ��" + nthobj + "���뿼�ǲ�ͬ��" + nthobj + "��ϡ�ͬһʱ��ֻ��3�˿���" + nthverb + "��" + nthobj + "�ϣ�������� " + nthpos + "����ͬ����Ϊ�𰸴�����ע�⡣�������԰ɡ�");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000804) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        if (cm.haveItem(4001008, 10)) {
                                                cm.sendNext("������͵�ͨ�����Ľ����׶Ρ������п��Ը����ɵش�����ͨ����޶�ʱ���ڣ����Ծ����ڽ����ؿ����ԣ�Ҳ����ͨ����ͼ�ұߵ�NPC�뿪�ؿ�����һ��ף������ͨ�������йؿ��������ǵĶӳ����ҶԻ���ȡ������������ͨ�������ؿ���ͨ�����ౣ��...");
                                                cm.gainItem(4001008, -10);

                                                clearStage(stage, eim, curMap);
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("��á���ӭ������5�׶Σ����������Ĺؿ������ǻ�����������boss����Ĺ���������й���ռ�#bͨ��֤#k���������ǽ����ҡ���Ա���#bͨ��֤#k�󣬶ӳ�Ҫ������ȫ���ռ���������Щ��������������죬��ǿ��ó���������С��һ�㡣ף���Ǻ��ˣ�");
                                        }
                                } else {
                                        cm.sendNext("��ӭ������5�׶Σ����������Ĺؿ������ǻ�����������boss����Ĺ���������й���ռ�#bͨ��֤#k��������#b�����ӳ�r#k������������������ȡ������");
                                }
                                
                                cm.dispose();
                        }
                }
                else if (status == 1) {
                        if(!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("���ڳ������ռ䡣");
                        } else {
                                cm.warp(103000805, "st00");
                        }
                        
                        cm.dispose();
                }
        }
}
