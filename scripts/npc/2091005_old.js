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
* @Author: Moogra, XxOsirisxX
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);

/* var belt_points = Array(200, 1800, 4000, 9200, 17000); */
var belt_points = Array(5, 45, 100, 230, 425); /* Watered down version */

var status = -1;
var selectedMenu = -1;

function start() {
	if(disabled) {
		cm.sendOk("师父告诉我目前道场#r闭馆#k，所以我不能放你进去。");
		cm.dispose();
		return;
	}
	
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        var text = "能走到这里真令人惊讶！但接下来的就没那么简单了。想要继续挑战吗？\r\n\r\n#b#L0#我想继续挑战#l\r\n#L1#我想离开#l\r\n";
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
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001) {
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("嘿！那边那位，这是你头一回来吧，嗯？我师父不轻易和任何人见面，他很忙的。而且看你的样子，我可不觉得他会在意你。哈！不过今天你运气好...告诉你，如果你能打败我，我就允许你去见见我师父。你意下如何啊？");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("哈哈！你想用这副可怜巴巴的模样讨好谁？\r\n从哪儿来回哪儿去吧！");
                        } else {
                           if(cm.getClient().getChannelServer().getMapFactory().getMap(925020010).getCharacters().size() > 0) {
                                cm.sendOk("Someone is already in Dojo.");
                                cm.dispose();
                                return;
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("The last time you took the challenge by yourself, you went up to level " + cm.getPlayer().getDojoStage() + ". I can take you there right now. Do you want to go there?");
                    } else {
                        cm.warp(mode == 1 ? 925020000 + cm.getPlayer().getDojoStage() * 100 : 925020100, 0);
                        cm.dispose();
                    }
                } else {
					for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
						if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
							cm.sendOk("Someone is already in the Dojo." + i);
							cm.dispose();
							return;
						}
					}
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
                if (party == null) {
                    cm.sendNext("你以为你能去哪儿？你这人连队长都不是！让你的队长来跟我说。");
                    cm.dispose();
                    return;
                }
                var lowest = cm.getPlayer().getLevel();
                var highest = lowest;
                for (var x = 0; x < party.getMembers().size(); x++) {
                    var lvl = party.getMembers().get(x).getLevel();
                    if (lvl > highest)
                        highest = lvl;
                    else if (lvl < lowest)
                        lowest = lvl;
                }
                var isBetween30 = highest - lowest < 30;
                if (party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("你以为你能去哪儿？你这人连队长都不是！让你的队长来跟我说。");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendNext("You're going to take on the challenge as a one-man party?");
                } else if (!isBetween30) {
                    cm.sendNext("你的队伍等级差距太大，没法进去。所有队员的等级差得保持在 #r30级#k 以内。");
                } else {
                    for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
                            if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("Someone is already in the Dojo.");
                                    cm.dispose();
                                    return;
                            }
                    }
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "你有 #b" + cm.getPlayer().getDojoPoints() + "#k 点道场点数。师父很青睐天赋异禀的家伙。如果你有出众的道场点数，就可以根据具体得点收到一根道场腰带。\r\n";
                    for (var i = 0; i < belts.length; i++) {
                        if (cm.haveItemWithId(belts[i], true)) {
                            selStr += "\r\n     #i" + belts[i] + "# #t" + belts[i] + "#(Obtain)";
                        } else
                            selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#l";
                    }
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    if (cm.getPlayer().getDojoPoints() > points) {
                        if (cm.getPlayer().getLevel() > level)
                            cm.gainItem(belt, 1);
                        else
                            cm.sendNext("In order to receive #i" + belt + "# #b#t" + belt + "##k, you have to be at least over level #b" + level + "#k and you need to have earned at least #b" + points + " training points#k.\r\n\r\nIf you want to obtain this belt, you need #r" + (points - cm.getPlayer().getDojoPoints()) + "#k more training points.");
                    } else
                        cm.sendNext("In order to receive #i" + belt + "# #b#t" + belt + "##k, you have to be at least over level #b" + level + "#k and you need to have earned at least #b" + points + " training points#k.\r\n\r\nIf you want to obtain this belt, you need #r" + (points - cm.getPlayer().getDojoPoints()) + "#k more training points.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("如果重置道场点数，它就归零了，你明白吧？不过这也不完全是坏事。要是你在重置后重新收集道场点数，就能再获得同样的腰带了。现在要重置道场点数吗？");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("你是需要清醒一下还是怎样？去外面透透气再回来找我吧。");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("好了！你的道场点数已经清零了。把它视为一个新起点，努力修行吧！");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0 && cm.getPlayer().getVanquisherStage() <= 0) {
                    cm.sendYesNo("你还没达到领取徽章的要求啊？在武陵道场里把同一个敌人打倒#b100次#k才能领取 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k。你好像都没有打败 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k 100次... 想不想试着打败#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k？");
                } else if (status == 1 || cm.getPlayer().getVanquisherStage() > 0) {
                    if (mode == 0) {
                        cm.sendNext("没有这个想法，那就算了。");
                        cm.dispose();
                    } else {
                        if (cm.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("You have complete all medals challenges.");
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
                }
            } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                cm.sendNext("Our master is the strongest person in Mu Lung. The place he built is called the Mu Lung Dojo, a building that is 38 stories tall! You can train yourself as you go up each level. Of course, it'll be hard for someone at your level to reach the top.");
                cm.dispose();
            }
        } else
            cm.dispose();
    } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        if (selectedMenu == -1)
            selectedMenu = selection;
        status++;
        if (selectedMenu == 0) {
            cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
            cm.dispose();
        } else if (selectedMenu == 1) { //I want to leave
            if (status == 0) {
                cm.sendAcceptDecline("怎么，你要放弃了？真的要退场吗？");
            } else {
                if (mode == 1) {
                    cm.warp(925020002, "st00");
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //我想现在记录目前为止的得分
            if (status == 0) {
                cm.sendYesNo("如果记录目前为止的得分，就可以从上次离开的地方继续挑战。方便吧？你想记录现在的得分吗？");
            } else {
                if (mode == 0) {
                    cm.sendNext("你觉得自己还能更进一步？哈哈！");
                } else if (925020000 + cm.getPlayer().getDojoStage() * 100 == cm.getMapId()) {
                    cm.sendOk("你的得分已经记好了。下次你来挑战道场，就能回到这里。");
                } else {
                    cm.sendNext("I recorded your score. If you tell me the next time you go up, you'll be able to start where you left off.");
                    cm.getPlayer().setDojoStage((cm.getMapId() - 925020000) / 100);
                }
                cm.dispose();
            }
        }
    } else {
        if (mode == 0) {
            cm.sendNext("别犹豫不决了！很快你就会哭着求我回来。");
        } else if (mode == 1) {
            cm.warp(925020002, 0);
            cm.getPlayer().message("你能不能拿定主意啊？");
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
