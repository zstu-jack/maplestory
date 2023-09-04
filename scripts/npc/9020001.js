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
    "问题：请收集与新手转职为战士所需最低等级数字相等的证书。",
    "问题：请收集与新手转职为战士所需最低力量数字相等的证书。",
    "问题：请收集与新手转职为魔法师所需最低智力数字相等的证书。",
    "问题：请收集与新手转职为弓箭手所需最低敏捷数字相等的证书。",
    "问题：请收集与新手转职为飞侠所需最低敏捷数字相等的证书。",
    "问题：请收集与进行第二次转职所需最低等级数字相等的证书。",
    "问题：请收集与新手转职为魔法师所需最低等级数字相等的证书。");
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
    // 小于3人时返回答案正确
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
                                        cm.sendNext("传送点已经开启，请前往下一阶段。");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendNext("难以置信！你通过了所有的考验。做得很好，这是一点小奖品。请确保背包的消耗栏和其他栏有足够的空格。");
                                }
                        }
                        else if(curMap == 103000800) {   // stage 1
                                if(cm.isEventLeader()) {
                                        var numpasses = eim.getPlayerCount() - 1;     // minus leader

                                        if(cm.hasItem(4001008, numpasses)) {
                                                cm.sendNext("你收集到了 " + numpasses + " 张通行许可证。祝贺你通过这一关卡！我会开启通往下一阶段的传送点。时间有限，请立刻开始行动。祝你们好运！");
                                                clearStage(stage, eim, curMap);
                                                eim.gridClear();
                                                cm.gainItem(4001008, -numpasses);
                                        }
                                        else {
                                                cm.sendNext("抱歉，你持有的通行许可证数量不足。你需要交给我通过本关所需的所有通行证，数量是队伍人数减去队长后得到的数字，也就是一共要 " + numpasses + " 张才能通过本关卡。让你的队员解答问题，收集所有通行许可证后再交给我。");
                                        }
                                }
                                else {
                                        var data = eim.gridCheck(cm.getPlayer());

                                        if(data == 0) {
                                                cm.sendNext("感谢你带来证书。请将通行证交给你的队长。");
                                        } else if(data == -1) {
                                                data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                                                eim.gridInsert(cm.getPlayer(), data);

                                                var question = stage1Questions[data - 1];
                                                cm.sendNext(question);
                                        } else {
                                                var answer = stage1Answers[data - 1];

                                                if(cm.itemQuantity(4001007) == answer) {
                                                        cm.sendNext("回答正确！因此我给了你一张 #b通行许可证#k。请把它交给你的队长。");
                                                        cm.gainItem(4001007, -answer);
                                                        cm.gainItem(4001008, 1);
                                                        eim.gridInsert(cm.getPlayer(), 0);
                                                }
                                                else {
                                                        var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                                                        cm.sendNext("抱歉，回答错误。\r\n" + question);
                                                }
                                        }
                                }
                                
                                cm.dispose();
                        } else if(curMap == 103000801) {   // stage 2
                                var stgProperty = "stg2Property";
                                var stgCombos = stage2Combos;
                                var stgAreas = stage2Rects;

                                var nthtext = "2", nthobj = "绳子", nthverb = "悬挂", nthpos = "悬挂在绳子上太低的位置";
                                var nextStgId = 103000802;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请依据队长给出的指示通过这一关卡。");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("你好，欢迎来到第" + nthtext + "阶段。你可以在我身边看到许多" + nthobj + "。这些" + nthobj + "中有#b3处与通向下一阶段的传送点相关联#k。你要做的就是让#b3位队员找到正确的" + nthobj + "并" + nthverb + "在上面。#k\r\n但如果你们" + nthpos + "将同样视为答案错误。请停留在" + nthobj + "的中间，才能确认这个组合是否是正确答案。另外，只有3名队员可以停留在" + nthobj + "上。一旦他们" + nthverb + "上去，队长就要#b双击我来确认答案是否正确#k。现在，请你们" +nthverb + "上去寻找正确的" +  nthobj + "吧！");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("传送点已经开启，请前往下一阶段。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到3处正确的" + nthobj + "。请考虑不同的" + nthobj + "组合。同一时间只有3人可以" + nthverb + "在" + nthobj + "上，如果你们 " + nthpos + "，将同样视为答案错误，请注意。继续尝试吧。");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000802) {
                                var stgProperty = "stg3Property";
                                var stgCombos = stage3Combos;
                                var stgAreas = stage3Rects;

                                var nthtext = "3", nthobj = "平台", nthverb = "站立", nthpos = "站立在距离边缘太近的位置";
                                var nextStgId = 103000803;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请依据队长给出的指示通过这一关卡。");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("你好，欢迎来到第" + nthtext + "阶段。你可以在我身边看到许多" + nthobj + "。这些" + nthobj + "中有#b3处与通向下一阶段的传送点相关联#k。你要做的就是让#b3位队员找到正确的" + nthobj + "并" + nthverb + "在上面。#k\r\n但如果你们" + nthpos + "将同样视为答案错误。请停留在" + nthobj + "的中间，才能确认这个组合是否是正确答案。另外，只有3名队员可以停留在" + nthobj + "上。一旦他们" + nthverb + "上去，队长就要#b双击我来确认答案是否正确#k。现在，请你们" +nthverb + "上去寻找正确的" +  nthobj + "吧！");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("传送点已经开启，请前往下一阶段。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到3处正确的" + nthobj + "。请考虑不同的" + nthobj + "组合。同一时间只有3人可以" + nthverb + "在" + nthobj + "上，如果你们 " + nthpos + "，将同样视为答案错误，请注意。继续尝试吧。");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000803) {
                                var stgProperty = "stg4Property";
                                var stgCombos = stage4Combos;
                                var stgAreas = stage4Rects;

                                var nthtext = "4", nthobj = "木桶", nthverb = "站立", nthpos = "站立在距离边缘太近的位置";
                                var nextStgId = 103000804;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请依据队长给出的指示通过这一关卡。");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("你好，欢迎来到第" + nthtext + "阶段。你可以在我身边看到许多" + nthobj + "。这些" + nthobj + "中有#b3处与通向下一阶段的传送点相关联#k。你要做的就是让#b3位队员找到正确的" + nthobj + "并" + nthverb + "在上面。#k\r\n但如果你们" + nthpos + "将同样视为答案错误。请停留在" + nthobj + "的中间，才能确认这个组合是否是正确答案。另外，只有3名队员可以停留在" + nthobj + "上。一旦他们" + nthverb + "上去，队长就要#b双击我来确认答案是否正确#k。现在，请你们" +nthverb + "上去寻找正确的" +  nthobj + "吧！");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("传送点已经开启，请前往下一阶段。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到3处正确的" + nthobj + "。请考虑不同的" + nthobj + "组合。同一时间只有3人可以" + nthverb + "在" + nthobj + "上，如果你们 " + nthpos + "，将同样视为答案错误，请注意。继续尝试吧。");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000804) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        if (cm.haveItem(4001008, 10)) {
                                                cm.sendNext("这个传送点通向最后的奖励阶段。在其中可以更轻松地打猎普通怪物。限定时间内，可以尽情在奖励关卡打猎，也可以通过地图右边的NPC离开关卡。再一次祝贺你们通过了所有关卡。让你们的队长与我对话领取奖励，并开启通往奖励关卡的通道。多保重...");
                                                cm.gainItem(4001008, -10);

                                                clearStage(stage, eim, curMap);
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("你好。欢迎来到第5阶段，这里是最后的关卡。你们会在这里遇到boss级别的怪物。请打败所有怪物，收集#b通行证#k，并把它们交给我。队员获得#b通行证#k后，队长要将它们全部收集起来。这些怪物或许看起来眼熟，但强大得超乎想象，请小心一点。祝你们好运！");
                                        }
                                } else {
                                        cm.sendNext("欢迎来到第5阶段，这里是最后的关卡。你们会在这里遇到boss级别的怪物。请打败所有怪物，收集#b通行证#k并把它们#b交给队长r#k。完成任务后，请找我领取奖励。");
                                }
                                
                                cm.dispose();
                        }
                }
                else if (status == 1) {
                        if(!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("请腾出背包空间。");
                        } else {
                                cm.warp(103000805, "st00");
                        }
                        
                        cm.dispose();
                }
        }
}
