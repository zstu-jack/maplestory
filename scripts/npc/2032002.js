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
/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
*/

var status;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getPlayer().getEventInstance();
        
        if (status == 0) {
            if(!eim.isEventCleared()) {
                cm.sendSimple("...#b\r\n#L0#我应该做什么？#l\r\n#L1#我带来了火石母矿碎片！#l\r\n#L2#我想要离开！#l");
            } else {
                cm.sendNext("你们完成了这场严酷的挑战，现在可以领取奖励了。");
            }
        }
        else if (status == 1) {
            if(!eim.isEventCleared()) {
                selectedType = selection;
                if (selection == 0) {
                    cm.sendNext("你们需要重塑扎昆的核心来揭示它的力量所在。在这洞穴的某处隐藏着 #b\"火石的母矿\"#k，它是核心的主要构成部分。找到它，带回来给我。\r\n\r\n对了，可以另外帮我一点小忙吗？这洞穴的石头和宝箱里还藏着很多 #b废矿卷轴#k。如果你能找齐30张，我也会给你一些奖励。");
                    cm.dispose();
                    return;
                }
                else if (selection == 1) {
                    if(!cm.isEventLeader()) {
                        cm.sendNext("请让你的队长将火石的母矿交给我，完成这场严酷的挑战。");
                        cm.dispose();
                        return;
                    }

                    if (!cm.haveItem(4001018)) { //fire ore
                        cm.sendNext("请带着 #b火石的母矿#k 来找我。");
                        cm.dispose();
                    }
                    else {
                        gotAllDocs = cm.haveItem(4001015, 30);
                        if (!gotAllDocs) { //documents
                            cm.sendYesNo("你们把火石的母矿带回来了？这样的话，我可以给你和你的队员们每人一块，这应该完全足够用来重塑扎昆的核心了。接受奖励之前，请确保全部队伍成员的背包里都有足够的格子。");
                        } else {
                            cm.sendYesNo("你们把火石的母矿和废矿卷轴带回来了？这样的话，我可以给你和你的队员们每人一块，这应该完全足够用来重塑扎昆的核心了。另外，因为你们 #r足够多的废矿卷轴#k ，我还会为你们提供能够 #b能够随时将你传送到扎昆入口#k 的特殊道具。接受奖励之前，请确保全部队伍成员的背包里都有足够的格子。");
                        }
                    }
                } else if (selection == 2)
                    cm.sendYesNo("确定想要现在离开吗？如果你是队长，全队将会一起退场。 ");
            } else {
                if(eim.getProperty("gotDocuments") == 1) {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHoldAll([2030007, 4031061], [5, 1])) {
                            cm.gainItem(2030007, 5);
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("请确保全部队伍成员的背包里都有足够的格子。");
                        }
                    } else {
                        cm.sendOk("你们已经获得了自己的那份奖励，现在可以从那边的传送点离开这里。");
                    }
                } else {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHold(4031061, 1)) {
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("请确保全部队伍成员的背包里都有足够的格子。");
                        }
                    } else {
                        cm.sendOk("你们已经获得了自己的那份奖励，现在可以从那边的传送点离开这里。");
                    }
                }
                
                cm.dispose();
            }
            
        }
        else if (status == 2) {
            if (selectedType == 1) {
                cm.gainItem(4001018, -1);
                
                if(gotAllDocs) {
                    cm.gainItem(4001015, -30);
                    
                    eim.setProperty("gotDocuments", 1);
                    eim.giveEventPlayersExp(20000);
                } else {
                    eim.giveEventPlayersExp(12000);
                }
                
                eim.clearPQ();
                cm.dispose();
            }
            else if (selectedType == 2) {
                cm.warp(211042300);
                cm.dispose();
            }
        }
    }
}