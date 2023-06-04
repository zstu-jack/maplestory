/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Ronan (HeavenMS)
        3.0 - Third Version by Jayd - translated CPQ contents to English and added Pirate items
                                Special thanks to 闋兼檹 (ryantpayton) for also stepping in to translate CPQ scripts.
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var rnk = -1;
var n1 = 50; //???
var n2 = 40; //??? ???
var n3 = 7; //35
var n4 = 10; //40
var n5 = 20; //50

var cpqMap = 980000000;
var cpqMinLvl = 30;
var cpqMaxLvl = 50;
var cpqMinAmt = 2;
var cpqMaxAmt = 6;

// Ronan's custom ore refiner NPC
var refineRocks = true;     // enables moon rock, star rock
var refineCrystals = true;  // enables common crystals
var refineSpecials = true;  // enables lithium, special crystals
var feeMultiplier = 7.0;

function start() {
    status = -1;
    
    if (!Packages.config.YamlConfig.config.server.USE_CPQ) {
        if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            status = 0;
            action(1, 0, 4);
        } else {
            cm.sendOk("怪物嘉年华目前尚未开启。");
            cm.dispose();
        }
        
        return;
    }
    
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if (cm.getPlayer().getMapId() == 980000010) {
            if (status == 0) {
                cm.sendNext("希望你在怪物嘉年华里玩得开心！");
            } else if (status > 0) {
                cm.warp(980000000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("很遗憾，虽然你表现出众，但还是取得了平局或输掉了比赛。下次努力取胜吧！\r\n\r\n#b你的评分是：" + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("很遗憾，虽然你表现不错，但还是取得了平局或输掉了比赛。如果再稍微努力一点，胜利就可能属于你！\r\n\r\n#b你的评分是：" + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("很遗憾，你取得了平局或输掉了比赛。胜利属于奋战到底的人。我有看到你的努力，胜利对你而言并非遥不可及。继续努力吧！\r\n\r\n#b你的评分是：" + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("很遗憾，你取得了平局或输掉了比赛。你的表现很能够说明问题。希望你下次更加努力。\r\n\r\n#b你的评分是：" + shiu);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 10:
                        cm.warp(980000000, 0);
                        cm.gainExp(17500);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980000000, 0);
                        cm.gainExp(1200);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980000000, 0);
                        cm.gainExp(5000);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980000000, 0);
                        cm.gainExp(2500);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("恭喜你取得了胜利！赢得真是漂亮，对方毫无还手之力！我期待你下次也能有同样出色的表现！\r\n\r\n#b你的评分是：" + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("恭喜你取得了胜利！太棒了！你在对抗中表现得很好！如果再给多一点时间，你一定会拔得头筹的！下次一定没问题！\r\n\r\n#b你的评分是：" + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("恭喜你取得了胜利。你也做了一些贡献，不过这并不能算是完胜。我期待你下次能有更好的表现。\r\n\r\n#b你的评分是：" + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("恭喜你取得了胜利。虽然你的表现并配不上这场胜利。下次怪物嘉年华中要表现得更加活跃才行！\r\n\r\n#b你的评分是：" + shi);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 1:
                        cm.warp(980000000, 0);
                        cm.gainExp(50000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980000000, 0);
                        cm.gainExp(25500);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980000000, 0);
                        cm.gainExp(21000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980000000, 0);
                        cm.gainExp(19505);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getMapId() == cpqMap) {   // only CPQ1
            if (status == 0) {
                if (cm.getParty() == null) {
                    status = 10;
                    cm.sendOk("需要结成队伍后方可加入战斗！");
                } else if (!cm.isLeader()) {
                    status = 10;
                    cm.sendOk("若想要开启战斗，请让#b队长#k与我交谈。");
                } else {
                    var party = cm.getParty().getMembers();
                    var inMap = cm.partyMembersInMap();
                    var lvlOk = 0;
                    var isOutMap = 0;
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i).getLevel() >= cpqMinLvl && party.get(i).getLevel() <= cpqMaxLvl) {
                            lvlOk++;

                            if (party.get(i).getPlayer().getMapId() != cpqMap) {
                                isOutMap++;
                            }
                        }
                    }

                    if (party >= 1) {
                        status = 10;
                        cm.sendOk("队伍人数不足。需要与#b" + cpqMinAmt + "#k - #r" + cpqMaxAmt + "#k等级内队员同地图方可进行。");
                    } else if (lvlOk != inMap) {
                        status = 10;
                        cm.sendOk("请确认队员等级均处于(" + cpqMinLvl + "~" + cpqMaxLvl + ")!");
                    } else if (isOutMap > 0) {
                        status = 10;
                        cm.sendOk("尚有组队成员不在当前地图。");
                    } else {
                        if (!cm.sendCPQMapLists()) {
                            cm.sendOk("全部怪物嘉年华场地都在战斗中，请稍后再试。");
                            cm.dispose();
                        }
                    }
                }
            } else if (status == 1) {
                if (cm.fieldTaken(selection)) {
                    if (cm.fieldLobbied(selection)) {
                        cm.challengeParty(selection);
                        cm.dispose();
                    } else {
                        cm.sendOk("房间已满。");
                        cm.dispose();
                    }
                } else {
                    var party = cm.getParty().getMembers();
                    if ((selection >= 0 && selection <= 3) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 2)) {
                        cm.sendOk("需要至少2名玩家方可开启战斗！");
                    } else if ((selection >= 4 && selection <= 5) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 3)) {
                        cm.sendOk("需要至少3名玩家方可开启战斗！");
                    } else {
                        cm.cpqLobby(selection);
                    }
                    cm.dispose();
                }
            } else if (status == 11) {
                cm.dispose();
            }
        } else {
            if (status == 0) {
                var talk = "你想做点什么？如果没有参加过怪物嘉年华，那么此前有些事情你需要了解一下！\r\n#b#L0#前往怪物嘉年华（初级）。#l \r\n#L3#前往怪物嘉年华（进阶）。#l \r\n#L1#了解有关怪物嘉年华。#l\r\n#L2#以#t4001129#换取奖励。#l";
                if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
                    talk += "\r\n#L4# ...我只想冶炼一些母矿。#l";
                }
                cm.sendSimple(talk);
            } else if (status == 1) {
                if (selection == 0) {
                    if ((cm.getLevel() > 29 && cm.getLevel() < 51) || cm.getPlayer().isGM()) {
                        cm.getChar().saveLocation("MONSTER_CARNIVAL");
                        cm.warp(980000000, 0);
                        cm.dispose();
                        return;
                    } else if (cm.getLevel() < 30) {
                        cm.sendOk("30级以下无法参加怪物嘉年华。达到相应等级再来与我交谈。");
                        cm.dispose();
                        return;
                    } else {
                        cm.sendOk("抱歉，怪物嘉年华（初级）仅限30~50级玩家参与。");
                        cm.dispose();
                        return;
                    }
                } else if (selection == 1) {
                    status = 60;
                    cm.sendSimple("你想做点什么？\r\n#b#L0#什么是怪物嘉年华？#l\r\n#L1#简要介绍怪物嘉年华。#l\r\n#L2#怪物嘉年华的详细信息。#l\r\n#L3#我没有什么想要问的了。#l");
                } else if (selection == 2) {
                    cm.sendSimple("请记住，获得#t4001129#后，你可以交换相应奖励。挑选你心仪的奖品吧！\r\n#b#L0# #t1122007# (" + n1 + " 纪念币)#l\r\n#L1# #t2041211# (" + n2 + " 纪念币)#l\r\n#L2#战士武器#l\r\n#L3#魔法师武器#l\r\n#L4#弓箭手武器#l\r\n#L5#飞侠武器#l\r\n#L6#海盗武器#l");
                } else if (selection == 3) {
                    cm.getChar().saveLocation("MONSTER_CARNIVAL");
                    cm.warp(980030000, 0);
                    cm.dispose();
                    return;
                } else if (selection == 4) {
                    var selStr = "好的，我提供了一项更为安全的#b矿石精炼#k服务，不过合成费要比通常的服务多收取#r" + ((feeMultiplier * 100) | 0) + "%#k。你意下如何？#b";

                    var options = new Array("冶炼矿石母矿","冶炼宝石母矿");
                    if(refineCrystals) {
                        options.push("冶炼水晶母矿");
                    }
                    if(refineRocks) {
                        options.push("冶炼矿锭/宝石");
                    }

                    for (var i = 0; i < options.length; i++){
                        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
                    }

                    cm.sendSimple(selStr);
                    
                    status = 76;
                }
            } else if (status == 2) {
                select = selection;
                if (select == 0) {
                    if (cm.haveItem(4001129, n1) && cm.canHold(4001129)) {
                        cm.gainItem(1122007, 1);
                        cm.gainItem(4001129, -n1);
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认是否拥有#b#t4001129##k或装备栏已满。");
                        cm.dispose();
                    }
                } else if (select == 1) {
                    if (cm.haveItem(4001129, n2) && cm.canHold(2041211)) {
                        cm.gainItem(2041211, 1);
                        cm.gainItem(4001129, -n2);
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认是否拥有#b#t4001129##k或消耗栏已满。");
                        cm.dispose();
                    }
                } else if (select == 2) {//S2 Warrior 26 S3 Magician 6 S4 Bowman 6 S5 Thief 8
                    status = 10;
                    cm.sendSimple("请确认你拥有#t4001129#以换取所需的武器。选择一把你愿意以#t4001129#交换的武器。样样都是上上之选，大家都这么说！\r\n#b#L0# #z1302004# (" + n3 + " 纪念币)#l\r\n#L1# #z1402006# (" + n3 + " 纪念币)#l\r\n#L2# #z1302009# (" + n4 + " 纪念币)#l\r\n#L3# #z1402007# (" + n4 + " 纪念币)#l\r\n#L4# #z1302010# (" + n5 + " 纪念币)#l\r\n#L5# #z1402003# (" + n5 + " 纪念币)#l\r\n#L6# #z1312006# (" + n3 + " 纪念币)#l\r\n#L7# #z1412004# (" + n3 + " 纪念币)#l\r\n#L8# #z1312007# (" + n4 + " 纪念币)#l\r\n#L9# #z1412005# (" + n4 + " 纪念币)#l\r\n#L10# #z1312008# (" + n5 + " 纪念币)#l\r\n#L11# #z1412003# (" + n5 + " 纪念币)#l\r\n#L12# 下一页(1/2)#l");
                } else if (select == 3) {
                    status = 20;
                    cm.sendSimple("选择你想要兑换的武器。这里的武器都让人爱不释手，自己挑就行！ \r\n#b#L0# #z1372001# (" + n3 + "纪念币)#l\r\n#L1# #z1382018# (" + n3 + " 纪念币)#l\r\n#L2# #z1372012# (" + n4 + " 纪念币)#l\r\n#L3# #z1382019# (" + n4 + " 纪念币)#l\r\n#L4# #z1382001# (" + n5 + " 纪念币)#l\r\n#L5# #z1372007# (" + n5 + " 纪念币)#l");
                } else if (select == 4) {
                    status = 30;
                    cm.sendSimple("选择你想要兑换的武器。这里的武器都让人爱不释手，自己挑就行！ \r\n#b#L0# #z1452006# (" + n3 + " 纪念币)#l\r\n#L1# #z1452007# (" + n4 + " 纪念币)#l\r\n#L2# #z1452008# (" + n5 + " 纪念币)#l\r\n#L3# #z1462005# (" + n3 + " 纪念币)#l\r\n#L4# #z1462006# (" + n4 + " 纪念币)#l\r\n#L5# #z1462007# (" + n5 + " 纪念币)#l");
                } else if (select == 5) {
                    status = 40;
                    cm.sendSimple("选择你想要兑换的武器。这批武器都是上等货色。选一把自己喜欢的！ \r\n#b#L0# #z1472013# (" + n3 + " 纪念币)#l\r\n#L1# #z1472017# (" + n4 + " 纪念币)#l\r\n#L2# #z1472021# (" + n5 + " 纪念币)#l\r\n#L3# #z1332014# (" + n3 + " 纪念币)#l\r\n#L4# #z1332031# (" + n4 + " 纪念币)#l\r\n#L5# #z1332011# (" + n4 + " 纪念币)#l\r\n#L6# #z1332016# (" + n5 + " 纪念币)#l\r\n#L7# #z1332003# (" + n5 + " 纪念币)#l");
                } else if (select == 6) {
                    status = 50; //pirate rewards
                    cm.sendSimple("选择你想要兑换的武器。这批武器都是上等货色。选一把自己喜欢的！ \r\n#b#L0# #z1482005# (" + n3 + " 纪念币)#l \r\n#b#L1# #z1482006# (" + n4 + " 纪念币)#l \r\n#b#L2# #z1482007# (" + n5 + " 纪念币)#l \r\n#b#L3# #z1492005# (" + n3 + " 纪念币)#l \r\n#b#L4# #z1492006# (" + n4 + " 纪念币)#l \r\n#b#L5# #z1492007# (" + n5 + " 纪念币)#l");
                }
            } else if (status == 11) {
                if (selection == 12) {
                    cm.sendSimple("选择你想要兑换的武器。我这里的武器都很好用。瞧瞧吧！ \r\n#b#L0# #z1322015# (" + n3 + " 纪念币)#l\r\n#L1# #z1422008# (" + n3 + " 纪念币)#l\r\n#L2# #z1322016# (" + n4 + " 纪念币)#l\r\n#L3# #z1422007# (" + n4 + " 纪念币)#l\r\n#L4# #z1322017# (" + n5 + " 纪念币)#l\r\n#L5# #z1422005# (" + n5 + " 纪念币)#l\r\n#L6# #z1432003# (" + n3 + " 纪念币)#l\r\n#L7# #z1442003# (" + n3 + " 纪念币)#l\r\n#L8# #z1432005# (" + n4 + " 纪念币)#l\r\n#L9# #z1442009# (" + n4 + " 纪念币)#l\r\n#L10# #z1442005# (" + n5 + " 纪念币)#l\r\n#L11# #z1432004# (" + n5 + " 纪念币)#l\r\n#L12# Back to the first page (2/2)#l");
                } else {
                    var item = new Array(1302004, 1402006, 1302009, 1402007, 1302010, 1402003, 1312006, 1412004, 1312007, 1412005, 1312008, 1412003);
                    var cost = new Array(n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5);
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                        cm.dispose();
                    }
                }
            } else if (status == 12) {
                if (selection == 12) {
                    status = 10;
                    cm.sendSimple("请确认你拥有#t4001129#以换取所需的武器。选择一把你愿意以#t4001129#交换的武器。样样都是上上之选，大家都这么说！ \r\n#b#L0# #z1302004# (" + n3 + " 纪念币)#l\r\n#L1# #z1402006# (" + n3 + " 纪念币)#l\r\n#L2# #z1302009# (" + n4 + " 纪念币)#l\r\n#L3# #z1402007# (" + n4 + " 纪念币)#l\r\n#L4# #z1302010# (" + n5 + " 纪念币)#l\r\n#L5# #z1402003# (" + n5 + " 纪念币)#l\r\n#L6# #z1312006# (" + n3 + " 纪念币)#l\r\n#L7# #z1412004# (" + n3 + " 纪念币)#l\r\n#L8# #z1312007# (" + n4 + " 纪念币)#l\r\n#L9# #z1412005# (" + n4 + " 纪念币)#l\r\n#L10# #z1312008# (" + n5 + " 纪念币)#l\r\n#L11# #z1412003# (" + n5 + " 纪念币)#l\r\n#L12# Continue to the next page(1/2)#l");
                } else {
                    var item = new Array(1322015, 1422008, 1322016, 1422007, 1322017, 1422005, 1432003, 1442003, 1432005, 1442009, 1442005, 1432004);
                    var cost = new Array(n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5, n5);
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                        cm.dispose();
                    }
                }
            } else if (status == 21) {
                var item = new Array(1372001, 1382018, 1372012, 1382019, 1382001, 1372007);
                var cost = new Array(n3, n3, n4, n4, n5, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                    cm.dispose();
                }
            } else if (status == 31) {
                var item = new Array(1452006, 1452007, 1452008, 1462005, 1462006, 1462007);
                var cost = new Array(n3, n4, n5, n3, n4, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                    cm.dispose();
                }
            } else if (status == 41) {
                var item = new Array(1472013, 1472017, 1472021, 1332014, 1332031, 1332011, 1332016, 1332003);
                var cost = new Array(n3, n4, n5, n3, n4, n4, n5, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                    cm.dispose();
                }
            } else if (status == 51) {
                var item = new Array(1482005, 1482006, 1482007, 1492005, 1492006, 1492007);
                var cost = new Array(n3, n4, n5, n3, n4, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#t4001129##k，或物品栏已满，请确认后重试。");
                    cm.dispose();
                }
            } else if (status == 61) {
                select = selection;
                if (selection == 0) {
                    cm.sendNext("哈哈！我是休彼德蔓，怪物嘉年华的主办者。在此举办第一届#b怪物嘉年华#k，等待像你这样的冒险家参与这场盛会。");
                } else if (selection == 1) {
                    cm.sendNext("#b怪物嘉年华#k是两队玩家进入战场，向对方场地放置怪物的对抗活动。#b根据所取得嘉年华点数(CP)确定战斗胜利的一方#k。");
                } else if (selection == 2) {
                    cm.sendNext("当你进入怪物嘉年华战场时，可以看到一侧的怪物列表窗口。只需#选中想要应用的效果或放置的怪物，然后按下确认#k。很简单，不是吗？");
                } else {
                    cm.dispose();
                }
            } else if (status == 62) {
                if (select == 0) {
                    cm.sendNext("#b怪物嘉年华#k是什么？哈哈哈！可以这样说，这会是你难以忘怀的一次体验！在活动中与像你一样的其他玩家对抗！#k");
                } else if (select == 1) {
                    cm.sendNext("进入怪物嘉年华后，你需要#b消灭敌队召唤的怪物来获取CP点数，并使用这些点数干扰对方攻击怪物#k。");
                } else if (select == 2) {
                    cm.sendNext("当你熟悉了这些命令后，试着使用#bTAB和F1 ~ F12#k。TAB 可以在#b召唤兽 / 技能 / 召唤物#k之间切换，与此同时#bF1 ~ F12能够快速切换到该命令所在窗口#k。");
                }
            } else if (status == 63) {
                if (select == 0) {
                    cm.sendNext("你们双方如果要真刀真枪地打一架的话也太危险了，我可不希望你们这么野蛮。你们双方既是竞争对手，也是朋友。战斗与竞争的激情澎湃汹涌，让所有人都欢欣鼓舞。不过前提是你们双方的团队都#b积极召唤怪物，并努力消灭对方为你们召唤的怪物#k。这就是怪物嘉年华的精髓所在。还有，你可以用活动期间获取的嘉年华纪念币#b换取崭新的道具与武器#k!");
                } else if (select == 1) {
                    cm.sendNext("有三种方法方法可以干扰敌队：#b召唤怪物、负面效果、放置召唤物#k。如果你想要更详细的说明，我也会为你深入讲解。");
                } else if (select == 2) {
                    cm.sendNext("#b召唤兽#k 通过这个选项召唤一只怪物攻击敌队。使用CP点数召唤的召唤兽会在敌方战斗区域出现，并攻击敌队。");
                }
            } else if (status == 64) {
                if (select == 0) {
                    cm.sendNext("当然，事情没有这么简单。还有其他方式可以阻止对方消灭怪物，这取决于你的选择。你觉得呢？想来一场友谊赛吗？");
                    cm.dispose();
                } else if (select == 1) {
                    cm.sendNext("要记住。囤积CP点数可不是个好主意。#b你使用的CP点数有助于在怪物嘉年华中分出胜负#k。");
                } else if (select == 2) {
                    cm.sendNext("#b技能#k 使用黑暗、虚弱或是其它负面状态来阻止敌队消灭怪物。需要的点数不多，效果却很好。只不过持续时间并不会很久。要巧妙地利用它才好。");
                }
            } else if (status == 65) {
                if (select == 1) {
                    cm.sendNext("对了，别担心变成一个小墓碑之类的事情。在怪物嘉年华里#b死亡并不会损失经验#k。这可真是一次独特的体验啊！");
                    cm.dispose();
                } else if (select == 2) {
                    cm.sendNext("#b召唤物#k 召唤后极大地提升己方召唤的怪物能力。召唤物将会持续生效，直至被敌队摧毁为止。因此你最好先召唤几只怪物，然后再召唤它。");
                }
            } else if (status == 66) {
                cm.sendNext("最后一点，参与怪物嘉年华时，#b你无法使用随身携带的增益道具和药剂#k。不过，战场中的怪物也会掉落这些东西供你使用，当你#b拾取该物品时，物品会即刻生效#k。因此要懂得选取合适的时机拾取物品。");
                cm.dispose();
            } else if (status == 77) {
                var allDone;

                if (selection == 0) {
                    allDone = refineItems(0); // minerals
                } else if (selection == 1) {
                    allDone = refineItems(1); // jewels
                } else if (selection == 2 && refineCrystals) {
                    allDone = refineItems(2); // crystals
                } else if (selection == 2 && !refineCrystals || selection == 3) {
                    allDone = refineRockItems(); // moon/star rock
                }

                if(allDone) {
                    cm.sendOk("做好了，谢谢惠顾~");
                } else {
                    cm.sendOk("做好了。不过有些物品并没能#b成功合成#k。这是因为你的其他栏已满，或没有足够的金币支付费用。");
                }
                cm.dispose();
            }
        }
    }
}

function getRefineFee(fee) {
    return ((feeMultiplier * fee) | 0);
}

function isRefineTarget(refineType, refineItemid) {
    if(refineType == 0) { //mineral refine
        return refineItemid >= 4010000 && refineItemid <= 4010007 && !(refineItemid == 4010007 && !refineSpecials);
    } else if(refineType == 1) { //jewel refine
        return refineItemid >= 4020000 && refineItemid <= 4020008 && !(refineItemid == 4020008 && !refineSpecials);
    } else if(refineType == 2) { //crystal refine
        return refineItemid >= 4004000 && refineItemid <= 4004004 && !(refineItemid == 4004004 && !refineSpecials);
    }
    
    return false;
}

function getRockRefineTarget(refineItemid) {
    if(refineItemid >= 4011000 && refineItemid <= 4011006) {
        return 0;
    } else if(refineItemid >= 4021000 && refineItemid <= 4021008) {
        return 1;
    }
    
    return -1;
}

function refineItems(refineType) {
    var allDone = true;
    
    var refineFees = [[300,300,300,500,500,500,800,270],[500,500,500,500,500,500,500,1000,3000],[5000,5000,5000,5000,1000000]];
    var itemCount = {};
    
    var iter = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();

        if(isRefineTarget(refineType, itemid)) {
            var ic = itemCount[itemid];
            
            if(ic != undefined) {
                itemCount[itemid] += it.getQuantity();
            } else {
                itemCount[itemid] = it.getQuantity();
            }
        }
    }
    
    for(var key in itemCount) {
        var itemqty = itemCount[key];
        var itemid = parseInt(key);
        
        var refineQty = ((itemqty / 10) | 0);
        if(refineQty <= 0) continue;
        
        while(true) {
            itemqty = refineQty * 10;
        
            var fee = getRefineFee(refineFees[refineType][(itemid % 100) | 0] * refineQty);
            if(cm.canHold(itemid + 1000, refineQty, itemid, itemqty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);
                cm.gainItem(itemid, -itemqty);
                cm.gainItem(itemid + (itemid != 4010007 ? 1000 : 1001), refineQty);
                
                break;
            } else if(refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }
    
    return allDone;
}

function refineRockItems() {
    var allDone = true;
    var minItems = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    var minRocks = [2147483647, 2147483647];
    
    var rockItems = [4011007, 4021009];
    var rockFees = [10000, 15000];

    var iter = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();
        var rockRefine = getRockRefineTarget(itemid);
        if(rockRefine >= 0) {
            var rockItem = ((itemid % 100) | 0);
            var itemqty = it.getQuantity();
            
            minItems[rockRefine][rockItem] += itemqty;
        }
    }
    
    for(var i = 0; i < minRocks.length; i++) {
        for(var j = 0; j < minItems[i].length; j++) {
            if(minRocks[i] > minItems[i][j]) {
                minRocks[i] = minItems[i][j];
            }
        }
        if(minRocks[i] <= 0 || minRocks[i] == 2147483647) continue;
        
        var refineQty = minRocks[i];
        while(true) {
            var fee = getRefineFee(rockFees[i] * refineQty);
            if(cm.canHold(rockItems[i], refineQty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);

                var j;
                if(i == 0) {
                    for(j = 4011000; j < 4011007; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                } else {
                    for(j = 4021000; j < 4021009; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                }
                
                break;
            } else if(refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }
    
    return allDone;
}
