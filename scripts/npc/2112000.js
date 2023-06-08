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
/* Yulete
	Yulete's Office (926100203)
	Magatia NPC
 */

var status;
 
importPackage(Packages.server.life);
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function playersTooClose() {
        var npcpos = cm.getMap().getMapObject(cm.getNpcObjectId()).getPosition();
        var listchr = cm.getMap().getPlayers();
        
        for (var iterator = listchr.iterator(); iterator.hasNext();) {
            var chr = iterator.next();
            
            var chrpos = chr.getPosition();
            if(Math.sqrt( Math.pow((npcpos.getX() - chrpos.getX()), 2) + Math.pow((npcpos.getY() - chrpos.getY()), 2) ) < 310) return true;
        }
        
        return false;
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
    
                var eim = cm.getEventInstance();
                
                if(cm.getMapId() == 926100203) {
                        if(status == 0) {
                                var state = eim.getIntProperty("yuleteTalked");

                                if(state == -1) {
                                    cm.sendOk("嗨，看起来你们有伴儿了。那么祝你们玩得开心，我就先失陪了。");

                                } else if (playersTooClose()) {
                                    cm.sendOk("哦...你们好。从你们踏入这片区域开始，我就在#b监视你们的动向#k。能来到这儿真不容易，我得称赞一下你们。真不巧，看时间现在我刚刚好有个约会，恐怕不得不先离开了。但不用担心，我的#r小家伙们#k会招待你们的。那么，我就先告退了。");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else if (eim.getIntProperty("npcShocked") == 0) {
                                    cm.sendOk("嚯~你们还真是相当狡猾啊？算了，无所谓。从你们踏入这片区域开始，我就在#b监视你们的动向#k。能来到这儿真不容易，我得称赞一下你们。真不巧，看时间现在我刚刚好有个约会，恐怕不得不先离开了。但不用担心，我的#r小家伙们#k会招待你们的。那么，我就先告退了。");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else {
                                    cm.sendOk("...哈哈！什么，等等——你们怎么会来到这里？我应该已经封锁了所有通往这里的通道！没关系，这个异常情况很快就会得到解决。听我的命令：启动 #r超级武器#k！！你们，没错，你们所有人。别以为这里能在这里结束一切。看看你们的同伴，他们就快要不行了。我先暂时撤退了。");

                                    eim.setIntProperty("yuleteTalked", 1);
                                }
                        }
                        
                        cm.dispose();
                } else {
                        if(status == 0) {
                                if(eim.isEventCleared()) {
                                        cm.sendOk("Nooooo... I have been beated? But how? Everything I did was for the sake of the development of a greater alchemy! You can't jail me, I did what everybody standing in a place like mine would do! But no, they simply decided to damp up the progress of the science JUST BECAUSE it was deemed dangerous??? Oh, come on!");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("Behold! The pinnacle of Magatia's alchemy studies! Hahahahahahaha...");
                                        } else if(state == 0) {
                                                cm.sendOk("You guys are such a pain, geez. Very well, I present you my newest weapon, brought by the finest alchemy, #rFrankenroid#k.");
                                                eim.dropMessage(5, "Yulete: I present you my newest weapon, brought by the finest alchemy, Frankenroid!");

                                                var mapobj = eim.getMapInstance(926100401);
                                                var bossobj = MapleLifeFactory.getMonster(9300139);
                                                
                                                //mapobj.spawnMonsterWithEffect(bossobj, 13, new Packages.java.awt.Point(250, 100));
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("You guys are such a pain, geez. Very well, I present you my newest weapon, brought by the finest combined alchemy of Alcadno's and Zenumist's, those that the boring people of Magatia societies have banned to bring along, the #rmighty Frankenroid#k!");
                                                eim.dropMessage(5, "Yulete: I present you my newest weapon, brought by the finest combined alchemy of Alcadno's and Zenumist's, those that the boring people of Magatia societies have banned to bring along, the mighty Frankenroid!!");

                                                var mapobj = eim.getMapInstance(926100401);
                                                var bossobj = MapleLifeFactory.getMonster(9300140);
                                                
                                                //mapobj.spawnMonsterWithEffect(bossobj, 14, new Packages.java.awt.Point(250, 100));
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 2);
                                                eim.setIntProperty("yuletePassed", -1);
                                        }
                                }
                        }
                        
                        cm.dispose();
                }
        }
}