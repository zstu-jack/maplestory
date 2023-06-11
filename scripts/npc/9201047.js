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
/* The Glimmer Man
	Amoria PQ Stg1/exit
 */

var status;
var curMap, stage;
 
function start() {
        curMap = cm.getMapId();
        stage = Math.floor((curMap - 670010200) / 100) + 1; 
    
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {        
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(cm.getMapId() != 670010200) {
                            cm.sendYesNo("那么,你们想要现在退出吗?");
                        } else {
                            if(cm.isEventLeader()) {
                                var eim = cm.getEventInstance();
                                var st = eim.getIntProperty("statusStg" + stage);
                                
                                if(cm.haveItem(4031595, 1)) {
                                    cm.gainItem(4031595, -1);
                                    eim.setIntProperty("statusStg" + stage, 1);

                                    cm.sendOk("干得好,你们获得了#t4031595#!你们成功地完成了任务,去找亚莫斯汇报吧.");
                                } else if(st < 1 && cm.getMap().countMonsters() == 0) {
                                    eim.setIntProperty("statusStg" + stage, 1);
                                    
                                    var mapObj = cm.getMap();
                                    mapObj.toggleDrops();
                                    
                                    var mobObj = Packages.server.life.MapleLifeFactory.getMonster(9400518);
                                    mapObj.spawnMonsterOnGroundBelow(mobObj, new Packages.java.awt.Point(-245, 810));
                                    
                                    cm.sendOk("怪物出现了!击败它们,找到#b#t4031596##k!");
                                } else {
                                    if(st < 1) cm.sendOk("你们的任务是寻回#b#t4031595##k.为了完成这个任务,你们需要一把#b#t4031596##k,它会从这附近出现的怪物身上掉落.想要到达怪物所在的房间,需要根据性别进入对应通道,女士请通过左侧的通道进入,而男士则需通过右侧的通道进入.");
                                    else cm.sendOk("你们的任务是寻回#b#t4031595##k.为此首先需要击败怪物,获得#b#t4031596##k.");
                                }
                            } else {
                                cm.sendOk("你们的任务是寻回#b#t4031595##k.为了完成这个任务,你们需要一把#b#t4031596##k,它会从这附近出现的怪物身上掉落.想要到达怪物所在的房间,需要根据性别进入对应通道,女士请通过左侧的通道进入,而男士则需通过右侧的通道进入.之后请#b队长#k携带#b#t4031595##k与我对话,方可完成这一关的挑战.");
                            }
                            
                            cm.dispose();
                        }
                } else if(status == 1) {
                    cm.warp(670010000, "st00");
                    cm.dispose();
                }
        }
}