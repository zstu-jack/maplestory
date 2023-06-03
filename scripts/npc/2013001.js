/**
 * @author: Ronan
 * @npc: Chamberlain Eak
 * @map: Orbis - Tower of Goddess
 * @func: Orbis PQ
*/

var status = 0;
var em = null;

function isStatueComplete() {
    for(var i = 1; i <= 6; i++) {
        if(cm.getMap().getReactorByName("scar" + i).getState() < 1) return false;
    }
    
    return true;
}

function clearStage(stage, eim) {
    eim.setProperty("statusStg" + stage, "1");
    eim.showClearEffect(true);
}

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
    
        if (cm.getPlayer().getMapId() == 920011200) { //exit
            cm.warp(200080101);
            cm.dispose();
            return;
        }
        if (!cm.isEventLeader()) {
            if(cm.getPlayer().getMapId() == 920010000) {
                cm.warp(920010000, 2);
                cm.dispose();
                return;
            }

            cm.sendOk("请让队长来与我对话。");
            cm.dispose();
            return;
        }

        var eim = cm.getEventInstance();

        switch(cm.getPlayer().getMapId()) {
            case 920010000:
                if(eim.getIntProperty("statusStg0") != 1) {
                    eim.warpEventTeamToMapSpawnPoint(920010000, 2);
                    eim.giveEventPlayersExp(3500);
                    clearStage(0, eim);

                    cm.sendNext("请救救女神吧，她被这座塔里最可怕的存在远古精灵封印了...他把女神像的碎片藏在了不同的位置。我们得把所有的碎片归位！哦...请允许我自我介绍，我是女神塔的管家，易克。是雅典娜女神的忠实仆人。");
                } else {
                    cm.warp(920010000, 2);
                }
                cm.dispose();
                break;
            case 920010100:
                if (isStatueComplete()) {
                    if (eim.getIntProperty("statusStg7") == -1) {
                        eim.warpEventTeam(920010800);
                    } else if(eim.getIntProperty("statusStg8") == -1) {
                        cm.sendOk("喔！你拿来了#t4001055#！请把它放在雕像的基座那里来唤醒雅典娜女神吧。");
                    } else {
                        cm.sendOk("感谢你拯救了雅典娜女神，去和她对话吧...");
                    }
                } else {
                    cm.sendOk("求求你，救救雅典娜！收集女神像的六块碎片，用它们把女神像拼凑完整...然后与我对话进入最后的关卡,取回生命草。");
                } 
                break;
            case 920010200: //walkway
                if (!cm.haveItem(4001050,30)) {
                    cm.sendOk("从这一阶段的怪物身上收集30粒女神像碎片带来给我，我会把它们拼成一整块。");
                } else {
                    cm.sendOk("一粒不少！拿着，这是女神像的第一块碎片。");
                    cm.removeAll(4001050);
                    cm.gainItem(4001044,1); //first piece
                    eim.giveEventPlayersExp(3500);
                    clearStage(1, eim);
                }
                break;
            case 920010300: //storage
                if(eim.getIntProperty("statusStg2") != 1) {
                    if(cm.getMap().countMonsters() == 0 && cm.getMap().countItems() == 0) {
                        if(cm.canHold(4001045)) {
                            cm.sendOk("喔，我找到了女神像的第二块碎片。给你。");
                            cm.gainItem(4001045, 1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(2, eim);
                            eim.setProperty("statusStg2", "1");
                        } else {
                            cm.sendOk("我找到了女神像的第二块碎片，请在背包里腾出至少一个位置来。");
                        }
                    } else {
                        cm.sendOk("找到被藏在这个房间里的第二块女神像碎片。");
                    }
                } else {
                    cm.sendOk("Well done. Go find the other statue pieces.");
                }
                
                break;
            case 920010400: //lobby
                if (eim.getIntProperty("statusStg3") == -1) {
                    cm.sendOk("请找到与女神今天心情相符的唱片，把它放在留声机上。\r\n#v4001056# 星期日\r\n#v4001057# 星期一\r\n#v4001058# 星期二\r\n#v4001059# 星期三\r\n#v4001060# 星期四\r\n#v4001061# 星期五\r\n#v4001062# 星期六\r\n");
                } else if (eim.getIntProperty("statusStg3") == 0) {
                    cm.getMap().getReactorByName("stone3").forceHitReactor(1);
                    cm.sendOk("哇，就是这首音乐...确实和今天最相符合。干得漂亮，请从前方出现的箱子里获得女神像的碎片吧。");
                    eim.giveEventPlayersExp(3500);
                    clearStage(3, eim);
                    eim.setProperty("statusStg3", "2");
                    
                } else {
                    cm.sendOk("非常感谢你们！");
                }
                break;
            case 920010500: //sealed
                if (eim.getIntProperty("statusStg4") == -1) {
                    var total = 3;
                    for(var i = 0; i < 2; i++) {
                        var rnd = Math.round(Math.random() * total);
                        total -= rnd;
                        
                        eim.setProperty("stage4_" + i, rnd);
                    }
                    eim.setProperty("stage4_2", "" + total);
                    
                    eim.setProperty("statusStg4", "0");
                }
                if (eim.getIntProperty("statusStg4") == 0) {
                    var players = Array();
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var z = cm.getMap().getNumPlayersInArea(i);
                        players.push(z);
                        total += z;
                    }
                    if (total != 3) {
                        cm.sendOk("需要有3名玩家站上踏板。");
                    } else {
                        var num_correct = 0;
                        for (var i = 0; i < 3; i++) {
                            if (eim.getProperty("stage4_" + i).equals("" + players[i])) {
                                num_correct++;
                            }
                        }
                        if (num_correct == 3) {
                            cm.sendOk("你们找到了正确的组合！请从地图顶部出现的箱子里获得女神像的碎片吧。");
                            cm.getMap().getReactorByName("stone4").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(4, eim);
                        } else {
                            eim.showWrongEffect();
                            if (num_correct > 0) {
                                cm.sendOk("有一部分玩家站在正确的踏板上。");
                            } else {
                                cm.sendOk("所有玩家都站在错误的踏板上。");
                            }
                        }
                    }
                } else {
                    cm.sendOk("干得漂亮！去寻找其它碎片拯救雅典娜女神吧！");
                }
                cm.dispose();
                break;
            case 920010600: //lounge
                if(eim.getIntProperty("statusStg5") == -1) {
                    if (!cm.haveItem(4001052,40)) {
                        cm.sendOk("从这一阶段的怪物身上收集40粒女神像碎片带来给我，我会把它们拼成一整块。");
                    } else {
                        cm.sendOk("You got them all! Here, the 5th statue piece.");
                        cm.removeAll(4001052);
                        cm.gainItem(4001048,1); //fifth piece
                        eim.giveEventPlayersExp(3500);
                        clearStage(5, eim);
                        eim.setIntProperty("statusStg5", 1);
                    }
                } else {
                    cm.sendOk("一粒不少！拿着，这是女神像的第五块碎片。");
                }
                break;
            case 920010700: //on the way up
                if (eim.getIntProperty("statusStg6") == -1) {
                    var rnd1 = Math.floor(Math.random() * 5);
                    
                    var rnd2 = Math.floor(Math.random() * 5);
                    while(rnd2 == rnd1) {
                        rnd2 = Math.floor(Math.random() * 5);
                    }
                    
                    if(rnd1 > rnd2) {
                        rnd1 = rnd1 ^ rnd2;
                        rnd2 = rnd1 ^ rnd2;
                        rnd1 = rnd1 ^ rnd2;
                    }
                    
                    var comb = "";
                    for(var i = 0; i < rnd1; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd1 + 1; i < rnd2; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd2 + 1; i < 5; i++) comb += "0";
                    
                    eim.setProperty("stage6_c", "" + comb);
                    
                    eim.setProperty("statusStg6", "0");
                }
                
                var comb = eim.getProperty("stage6_c");
                
                if (eim.getIntProperty("statusStg6") == 0) {
                    var react = "";
                    var total = 0;
                    for(var i = 1; i <= 5; i++) {
                        if (cm.getMap().getReactorByName("" + i).getState() > 0) {
                            react += "1";
                            total += 1;
                        } else {
                            react += "0";
                        }
                    }
                    
                    if (total != 2) {
                        cm.sendOk("需要在地图顶部至少拉起2根拉杆。");
                    } else {
                        var num_correct = 0;
                        var psh_correct = 0;
                        for (var i = 0; i < 5; i++) {
                            if (react.charCodeAt(i) == comb.charCodeAt(i)) {
                                num_correct++;
                                if(react.charAt(i) == '1') psh_correct++;
                            }
                        }
                        if (num_correct == 5) {
                            cm.sendOk("You found the right combination! Retrieve the statue piece from inside it!");
                            cm.getMap().getReactorByName("stone6").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(6, eim);
                        } else {
                            eim.showWrongEffect();
                            if (psh_correct >= 1) {
                                cm.sendOk("有一部分拉杆处于正确的位置。");
                            } else {
                                cm.sendOk("只有一根拉杆处于正确的位置。");
                            }
                        }
                    }
                } else {
                    cm.sendOk("干得漂亮，去寻找其它碎片吧！");
                }
                break;
            case 920010800:
                cm.sendNext("请击败远古精灵！使用奇怪的种子种出黑食人花后，击杀它就能够召唤远古精灵。打败远古精灵之后，用得到的生命草来拯救雅典娜女神吧！"); 
                break;
            case 920010900:
                if(eim.getProperty("statusStg8") == "1") {
                    cm.sendNext("这里是女神塔的监狱。你们或许可以在这里找到一些好东西，不过别忘了主要任务是尽可能快地解开前方的谜题。");
                } else {
                    cm.sendNext("在这里是找不到任何碎片的。沿着梯子爬上去返回女神塔的中心部分，去别的地方找找吧。等到你们成功解救女神，再回来探索也不迟。");
                }
                break;
            case 920011000:
                if(cm.getMap().countMonsters() > 0) {
                    cm.sendNext("这里是女神塔的隐藏房间。消灭这里的所有怪物后与我交谈，我会送你前往宝物仓库。");
                } else {
                    cm.warp(920011100, "st00");
                }
                break;
        }
        cm.dispose();
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}