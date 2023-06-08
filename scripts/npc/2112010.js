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
	Yulete's Office (926110203)
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
                
                if(cm.getMapId() == 926110203) {
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
                                        cm.sendOk("不...我被打败了？这怎么可能？我所做的一切都是为了发展伟大的炼金术！你们没有道理监禁我，不管是谁站在我的立场上都会这样做！什么，你们说不是这样？他们会仅仅因为觉得科学危险就阻碍它的发展进程？哈，别开玩笑了！");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("看啊！玛加提亚炼金术的巅峰之作！哈哈哈哈哈哈...");
                                        } else if(state == 0) {
                                                cm.sendOk("你们这群家伙还真难缠，哎唷。非常好，请允许我介绍我的最新武器，由炼金科学前沿技术催化而成的造物——#r法兰肯#k！");
                                                eim.dropMessage(5, "犹泰：请允许我介绍我的最新武器，由炼金科学前沿技术催化而成的造物——法兰肯！");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300151);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("你们这群家伙还真难缠，哎唷。非常好，请允许我介绍我的最新武器，由蒙特鸠和卡帕莱特的炼金科学前沿技术...那群无聊的玛加提亚协会禁止研究的炼金术催化而成的造物——#r生气的法兰肯#k！");
                                                eim.dropMessage(5, "犹泰：请允许我介绍我的最新武器，由蒙特鸠和卡帕莱特的炼金科学前沿技术...那群无聊的玛加提亚协会禁止研究的炼金术催化而成的造物——生气的法兰肯！");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300152);
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