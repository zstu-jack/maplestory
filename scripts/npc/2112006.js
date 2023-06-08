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
 * @author: Ronan
 * @npc: Romeo
 * @func: MagatiaPQ area NPC
*/

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
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
                
                if(!eim.isEventCleared()) {
                        if(status == 0) {
                                if(eim.getIntProperty("npcShocked") == 0 && cm.haveItem(4001131, 1)) {
                                        cm.gainItem(4001131, -1);
                                        eim.setIntProperty("npcShocked", 1);
                                        
                                        cm.sendNext("喔？你找到了一封给我的信？这样的时候，会是什么...嘶，发生大事情了。朋友们，打起精神来，现在是前所未有的危急时刻！");
                                        eim.dropMessage(6, "看完朱丽叶的信之后，罗密欧显得非常震惊。");
                                        
                                        cm.dispose();
                                        return;
                                } else if (eim.getIntProperty("statusStg4") == 1) {
                                        var door = cm.getMap().getReactorByName("rnj3_out3");
                                    
                                        if(door.getState() == 0) {
                                                cm.sendNext("我来为你们开启这扇门。");
                                                door.hitReactor(cm.getClient());
                                        } else {
                                                cm.sendNext("请快些，朱丽叶遇到麻烦了。");
                                        }
                                        
                                        cm.dispose();
                                        return;
                                } else if (cm.haveItem(4001134, 1) && cm.haveItem(4001135, 1)) {
                                        if (cm.isEventLeader()) {
                                                cm.gainItem(4001134, -1);
                                                cm.gainItem(4001135, -1);
                                                cm.sendNext("太好了！你们把蒙特鸠和卡帕莱特的文件都拿到了，现在可以继续下一阶段。");

                                                eim.showClearEffect();
                                                eim.giveEventPlayersStageReward(4);
                                                eim.setIntProperty("statusStg4", 1);
                                                
                                                cm.getMap().killAllMonsters();
                                                cm.getMap().getReactorByName("rnj3_out3").hitReactor(cm.getClient());
                                        } else {
                                                cm.sendOk("请让你的队长把文件交给我。");
                                        }

                                        cm.dispose();
                                        return;
                                } else {
                                        cm.sendYesNo("为了拯救朱丽叶，我们必须继续努力，请不要放慢脚步。如果你觉得无法进行下去，你的伙伴还有我都会理解你的...所以，你现在想退场吗？");
                                }
                        } else {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if(status == 0) {
                                if(eim.getIntProperty("escortFail") == 0) {
                                        cm.sendNext("朱丽叶终于得救了！感谢你们努力将她从犹泰的魔爪中拯救出来。犹泰会因为抗逆玛加提亚而受审的，感谢你们。从现在开始，他要弥补自己所做作为造成的后果，我们会留意他的行动，以免他今后制造什么新的麻烦。");
                                }
                                else {
                                        cm.sendNext("朱丽叶现在安全了，尽管她在战斗中受了伤...感谢你们努力将她从犹泰的魔爪中拯救出来。犹泰会因为抗逆玛加提亚而受审的，感谢你们。");
                                        status = 2;
                                }
                        } else if(status == 1) {
                                cm.sendNext("现在，为了表达我们的感激之情，请收下这份礼物。");
                        } else if(status == 2) {
                                if(cm.canHold(4001159)) {
                                        cm.gainItem(4001159, 1);
                                        
                                        if(eim.getIntProperty("normalClear") == 1) cm.warp(926100600, 0);
                                        else cm.warp(926100500, 0);
                                } else {
                                        cm.sendOk("请确保你的其他栏有至少1格空位。");
                                }
                                
                                cm.dispose();
                        } else {
                                cm.warp(926100600, 0);
                                cm.dispose();
                        }
                }
        }
}