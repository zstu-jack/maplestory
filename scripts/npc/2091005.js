/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>
    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

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
* @Author: Moogra, XxOsirisxX, Ronan
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.config);
importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_on_inventory;
var belt_points;

var status = -1;
var selectedMenu = -1;
var dojoWarp = 0;

function start() {
    if (disabled) {
        cm.sendOk("师父告诉我目前道场#r闭馆#k，所以我不能放你进去。");
        cm.dispose();
        return;
    }
    
    belt_points = YamlConfig.config.server.USE_FAST_DOJO_UPGRADE ? Array(10, 90, 200, 460, 850) : Array(200, 1800, 4000, 9200, 17000);
    
    belt_on_inventory = new Array();
    for (var i = 0; i < belts.length; i++) {
        belt_on_inventory.push(cm.haveItemWithId(belts[i], true));
    }
                            
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.getPlayer().setDojoStage(dojoWarp);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        
        if(status == 0) {
            if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                var text = "你能走到这里真令人惊讶！但接下来的就没那么简单了。想要继续挑战吗？\r\n\r\n#b#L0#我想继续挑战#l\r\n#L1#我想离开#l\r\n";
                if (!GameConstants.isDojoPartyArea(cm.getPlayer().getMapId())) {
                    text += "#L2#我想现在记录目前为止的得分#l";
                }
                cm.sendSimple(text);
            } else if (cm.getPlayer().getLevel() >= 25) {
                if (cm.getPlayer().getMap().getId() == 925020001) {
                    cm.sendSimple("我的师父是武陵最强的存在，你想要挑战他吗？很好，不过你很快就会后悔了。 \r\n\r\n#b#L0#我拍想单独挑战武陵道场。.#l\r\n#L1#我想组队挑战武陵道场。#l\r\n\r\n#L2#我想兑换道场腰带。#l\r\n#L3#我想重置我的道场点数。#l\r\n#L4#我想领取道场勋章。#l\r\n#L5#武陵道场是什么？#l");
                } else {
                    cm.sendYesNo("怎么，你要放弃了？就快到下一关了！真的要放弃挑战现在离开吗？");
                }
            } else {
                cm.sendOk("嘿！你是瞧不起我的师父吗？你以为你要挑战的是谁？真是笑话！至少也要有#b25#k级才能挑战他。");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getPlayer().getMap().getId() == 925020001) {
                if (mode >= 0) {
                    if (status == 1)
                        selectedMenu = selection;
                    if (selectedMenu == 0) { //I want to challenge him alone.
                        if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                            if (status == 1) {
                                cm.sendYesNo("嘿！那边那位，这是你头一回来吧，嗯？我师父不轻易和任何人见面，他很忙的。而且看你的样子，我可不觉得他会在意你。哈！不过今天你运气好...告诉你，如果你能打败我，我就允许你去见见我师父。你意下如何啊？");
                            } else if (status == 2) {
                                if (mode == 0) {
                                    cm.sendNext("哈哈！你想用这副可怜巴巴的模样讨好谁？\r\n从哪儿来回哪儿去吧！");
                                    cm.dispose();
                                    return;
                                } else {
                                    var avDojo = cm.getClient().getChannelServer().ingressDojo(true, 0);

                                    if(avDojo < 0) {
                                        if(avDojo == -1) cm.sendOk("所有道场都正在使用中。等一会儿再来尝试吧。");
                                        else cm.sendOk("可能是你的队伍正在挑战道场，又或者是你的队伍使用道场的时间尚未结束。等他们结束，你才能进去。");
                                    }
                                    else {
                                        cm.getClient().getChannelServer().getMapFactory().getMap(925020010 + avDojo).resetMapObjects();
                                        
                                        cm.resetDojoEnergy();
                                        cm.warp(925020010 + avDojo, 0);
                                    }

                                    cm.dispose();
                                    return;
                                }
                            }
                        } else if (cm.getPlayer().getDojoStage() > 0) {
                            dojoWarp = cm.getPlayer().getDojoStage();
                            cm.getPlayer().setDojoStage(0);
                            
                            var stageWarp = ((dojoWarp / 6) | 0) * 5;
                            cm.sendYesNo("上一次单人挑战道场时，你抵达了第 #b" + stageWarp + "#k 层。现在我可以直接送你去那里。你想去吗？ (选择 #r否#k 的话，该记录将被清除。)");
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(false, dojoWarp);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有道场都正在使用中。等一会儿再来尝试吧。");
                                else cm.sendOk("可能是你的队伍正在挑战道场，又或者是你的队伍使用道场的时间尚未结束。等他们结束，你才能进去。");
                                
                                cm.getPlayer().setDojoStage(dojoWarp);
                            } else {
                                var warpDojoMap = 925020000 + (dojoWarp + 1) * 100 + avDojo;
                                cm.getClient().getChannelServer().resetDojoMap(warpDojoMap);
                                
                                cm.resetDojoEnergy();
                                cm.warp(warpDojoMap, 0);
                            }

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 1) { //I want to challenge him with a party.
                        var party = cm.getPlayer().getParty();
                        if (party == null) {
                            cm.sendNext("你以为你能去哪儿？你这人连队长都不是！让你的队长来跟我说。");
                            cm.dispose();
                            return;
                        }
                        
                        if (party.getLeader().getId() != cm.getPlayer().getId()) {
                            cm.sendNext("你以为你能去哪儿？你这人连队长都不是！让你的队长来跟我说。");
                            cm.dispose();
                            return;
                        }

                        //else if (party.getMembers().size() == 1) {
                        //    cm.sendNext("You're going to take on the challenge as a one-man party?");
                        //}

                        else if (!isBetween(party, 30)) {
                            cm.sendNext("你的队伍等级差距太大，没法进去。所有队员的等级差得保持在 #r30级#k 以内。");
                            cm.dispose();
                            return;
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(true, cm.getParty(), 0);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有道场都正在使用中。等一会儿再来尝试吧。");
                                else cm.sendOk("可能是你的队伍正在挑战道场，又或者是你的队伍使用道场的时间尚未结束。等他们结束，你才能进去。");
                            } else {
                                cm.getClient().getChannelServer().resetDojoMap(925030100 + avDojo);
                                
                                cm.resetPartyDojoEnergy();
                                cm.warpParty(925030100 + avDojo);
                            }

                            cm.dispose();
                            return;
                        }

                    } else if (selectedMenu == 2) { //I want to receive a belt.
                        if (!cm.canHold(belts[0])) {
                            cm.sendNext("在你的装备栏里腾出空位，才能获得道场腰带！");
                            cm.dispose();
                            return;
                        }
                        if (mode < 1) {
                            cm.dispose();
                            return;
                        }
                        if (status == 1) {
                            var selStr = "你有 #b" + cm.getPlayer().getDojoPoints() + "#k 点道场点数。师父很青睐天赋异禀的家伙。如果你有出众的道场点数，就可以根据具体得点收到一根道场腰带。\r\n";
                            for (var i = 0; i < belts.length; i++) {
                                if (belt_on_inventory[i]) {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "# (已持有)";
                                } else
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                            }
                            cm.sendSimple(selStr);
                        } else if (status == 2) {
                            var belt = belts[selection];
                            var level = belt_level[selection];
                            var points = belt_points[selection];
                            
                            var oldbelt = (selection > 0) ? belts[selection - 1] : -1;
                            var haveOldbelt = (oldbelt == -1 || cm.haveItemWithId(oldbelt, false));
                            
                            if (selection > 0 && !belt_on_inventory[selection - 1]) {
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else if (cm.getPlayer().getDojoPoints() >= points) {
                                if (selection > 0 && !haveOldbelt) {
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                                } else if (cm.getPlayer().getLevel() > level) {
                                    if(selection > 0) cm.gainItem(oldbelt, -1);
                                    cm.gainItem(belt, 1);
                                    cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - points);
                                    cm.sendNext("这是 #i" + belt + "# #b#t" + belt + "##k。你在道场中的英勇气概我们都看在眼里。做得不错！");
                                } else
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 3) { //I want to reset my training points.
                        if (status == 1) {
                            cm.sendYesNo("如果重置道场点数，它就归零了，你明白吧？不过这也不完全是坏事。要是你在重置后重新收集道场点数，就能再获得同样的腰带了。现在要重置道场点数吗？");
                        } else if (status == 2) {
                            if (mode == 0) {
                                cm.sendNext("你是需要清醒一下还是怎样？去外面透透气再回来找我吧。");
                            } else {
                                cm.getPlayer().setDojoPoints(0);
                                cm.sendNext("好了！你的道场点数已经清零了。把它视为一个新起点，努力修行吧！");
                            }
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 4) { //I want to receive a medal.
                        if (status == 1 && cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.sendYesNo("你还没达到领取徽章的要求啊？在武陵道场里把同一个敌人打倒#b100次#k才能领取 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k。你好像都没有打败 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k 100次... 想不想试着打败#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k？");
                        } else if (status == 2 || cm.getPlayer().getVanquisherStage() > 0) {
                            if (mode == 0) {
                                cm.sendNext("没有这个想法，那就算了。");
                            } else {
                                if (cm.getPlayer().getDojoStage() > 37) {
                                    cm.sendNext("你达成了所有徽章挑战。");
                                } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                                    cm.sendNext("还差 #b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k 次才能领取 #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k。再加把劲儿。记住，只有师父在武陵道场里召唤的怪物才算数。别忘了离开每一层之前清理所有的怪物！#r要是没清理完怪物就进入下一层，那就不算一次胜利。#k.");
                                else if (cm.getPlayer().getVanquisherStage() <= 0) {
                                    cm.getPlayer().setVanquisherStage(1);
                                } else {
                                    cm.sendNext("You have obtained #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                                    cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                                    cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                                    cm.getPlayer().setVanquisherKills(0);
                                }
                            }

                            cm.dispose();
                            return;
                        } else {
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                        cm.sendNext("我的师父是武陵最强的存在。这座武陵道场就是他一手创建的，足足有 #r38层#k 那么高！你可以一层一层地爬上去，锻炼自己。当然了，想要登顶可不太容易。");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.dispose();
                    return;
                }
            } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                if (selectedMenu == -1)
                    selectedMenu = selection;
                
                if (selectedMenu == 0) {
                    var hasParty = (cm.getParty() != null);
                    
                    var firstEnter = false;
                    var avDojo = cm.getClient().getChannelServer().lookupPartyDojo(cm.getParty());
                    if(avDojo < 0) {
                        if(hasParty) {
                            if(!cm.isPartyLeader()) {
                                cm.sendOk("你又不是队长。想继续挑战，就让你的队长来跟我说。");
                                cm.dispose();
                                return;
                            }
                            
                            if(!isBetween(cm.getParty(), 35)) {
                                cm.sendOk("你的队伍等级差距太大，没法进去。所有队员的等级差得保持在 #r35级#k 以内。");
                                cm.dispose();
                                return;
                            }
                        }
                        
                        avDojo = cm.getClient().getChannelServer().ingressDojo(hasParty, cm.getParty(), Math.floor((cm.getPlayer().getMap().getId()) / 100) % 100);
                        firstEnter = true;
                    }

                    if(avDojo < 0) {
                        if(avDojo == -1) cm.sendOk("所有道场都正在使用中。等一会儿再来尝试吧。");
                        else cm.sendOk("你的队伍已经在道场登记了。等登记时间过去再入场吧。");
                    } else {
                        var baseStg = hasParty ? 925030000 : 925020000;
                        var nextStg = Math.floor((cm.getPlayer().getMap().getId() + 100) / 100) % 100;

                        var dojoWarpMap = baseStg + (nextStg * 100) + avDojo;
                        if(firstEnter) {
                            cm.getClient().getChannelServer().resetDojoMap(dojoWarpMap);
                        }
                        
                        //non-leader party members can progress whilst having the record saved if they don't command to enter the next stage
                        cm.getPlayer().setDojoStage(0);
                        
                        if(!hasParty || !cm.isLeader()) cm.warp(dojoWarpMap, 0);
                        else cm.warpParty(dojoWarpMap, 0);
                    }

                    cm.dispose();
                    return;
                } else if (selectedMenu == 1) { //I want to leave
                    if (status == 1) {
                        cm.sendYesNo("怎么，你要放弃了？真的要退场吗？");
                    } else {
                        if (mode == 1) {
                            cm.warp(925020002, "st00");
                        }
                        cm.dispose();
                        return;
                    }
                } else if (selectedMenu == 2) { //我想现在记录目前为止的得分
                    if (status == 1) {
                        cm.sendYesNo("如果记录目前为止的得分，就可以从上次离开的地方继续挑战。方便吧？你想记录现在的得分吗？");
                    } else {
                        if (mode == 0) {
                            cm.sendNext("你觉得自己还能更进一步？哈哈！");//这里的Good luck结合上下文以及萧公一贯的口气，可能是有些嘲讽的，而且祝你好运也有点西式，就用意思模糊的哈哈替代了。
                        } else if (cm.getPlayer().getDojoStage() == Math.floor(cm.getMapId() / 100) % 100) {
                            cm.sendOk("你的得分已经记好了。下次你来挑战道场时，就可以回到这儿。");
                        } else {
                            cm.sendNext("我记下了你的得分。下次想上去的时候告诉我，你就可以从离开的位置开始挑战。记好了，如果选择#b继续挑战武陵道场#k，#r记录就会消失#k，选的时候小心点。");
                            cm.getPlayer().setDojoStage(Math.floor(cm.getMapId() / 100) % 100);
                        }
                        cm.dispose();
                        return;
                    }
                }
            } else {
                if (mode == 0) {
                    cm.sendNext("别犹豫不决了！很快你就会哭着求我回来。");
                } else if (mode == 1) {
                    var dojoMapId = cm.getPlayer().getMap().getId();
                    
                    cm.warp(925020002, 0);
                    cm.getPlayer().message("你能不能拿定主意啊？");
                    
                    cm.getClient().getChannelServer().freeDojoSectionIfEmpty(dojoMapId);
                }
                cm.dispose();
            }
        }
    }
}

function sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points) {
    var beltReqStr = (oldbelt != -1) ? " 背包里必须有 #i" + oldbelt + "# 腰带，" : "";
    
    var pointsLeftStr = (points - cm.getPlayer().getDojoPoints() > 0) ? " 需要 #r" + (points - cm.getPlayer().getDojoPoints()) + "#k 道场点数" : "";
    var beltLeftStr = (!haveOldbelt) ? " 背包里必须得有未装备的腰带" : "";
    var conjStr = (pointsLeftStr.length > 0 && beltLeftStr.length > 0) ? " 和" : "";
        
    cm.sendNext("想获得 #i" + belt + "# #b#t" + belt + "##k，" + beltReqStr + " 要达到 #b" + level + "#k级，并且至少拥有 #b" + points + " 道场点数#k。\r\n\r\n如果想获得腰带，" + beltLeftStr + conjStr + pointsLeftStr + "。");
}

function isRestingSpot(id) {
    return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}

function isBetween(party, range) {
    var lowest = cm.getPlayer().getLevel();
    var highest = lowest;
    for (var x = 0; x < party.getMembers().size(); x++) {
        var lvl = party.getMembers().get(x).getLevel();
        if (lvl > highest)
            highest = lvl;
        else if (lvl < lowest)
            lowest = lvl;
    }
    return (highest - lowest) <= range;
}
