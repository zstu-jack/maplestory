var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
        var eim = cm.getEventInstance();
        if (eim != null && eim.getIntProperty("glpq6") == 3) {
                cm.sendOk("...做得好。你们的实力已经超越了堕落的宗师们。穿过那扇大门去领取奖励吧。");
                cm.dispose();
                return;
        }
        
        if (!cm.isEventLeader()) {
                cm.sendNext("请让你的队长来与我对话。");
                cm.dispose();
                return;
        }
    
        if (mode == 1) {
                status++;
        } else {
                status--;
        }

        if (eim != null) {
                if (eim.getIntProperty("glpq6") == 0) {
                        if (status == 0) {
                                cm.sendNext("欢迎来到宗师们的会议大厅。今晚将由我来招待你们...");
                        } else if (status == 1) {
                                cm.sendNext("今晚，我们将会享用一整队冒险家...哈哈...");
                        } else if (status == 2) {
                                cm.sendNext("就让受过特训的宗师护卫会会你们吧！");
                                cm.mapMessage(6, "小心了！宗师护卫接近了！");
                                for (var i = 0; i < 10; i++) {
                                        var mob = eim.getMonster(9400594);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                for (var i = 0; i < 20; i++) {
                                        var mob = eim.getMonster(9400582);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                eim.setIntProperty("glpq6", 1);
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 1) {
                        if (cm.getMap().countMonsters() == 0) {
                                if (status == 0) {
                                        cm.sendOk("嗯。怎么回事？你们打败了他们吗？");
                                } else if (status == 1) {
                                        cm.sendNext("哈，无所谓。堕落的宗师们欢迎你们的到来。");
                                        cm.mapMessage(6, "堕落的宗师们接近了！");

                                        //Margana
                                        var mob = eim.getMonster(9400590);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-22, 1));

                                        //Red Nirg
                                        var mob2 = eim.getMonster(9400591);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-22, 276));

                                        //Hsalf
                                        var mob4 = eim.getMonster(9400593);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob4, new java.awt.Point(496, 276));

                                        //Rellik
                                        var mob3 = eim.getMonster(9400592);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob3, new java.awt.Point(-496, 276));

                                        eim.setIntProperty("glpq6", 2);
                                        cm.dispose();
                                }
                        } else {
                                cm.sendOk("不必在我身上白费功夫了，宗师护卫们会招待你的。");
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 2) {
                        if (cm.getMap().countMonsters() == 0) {
                                cm.sendOk("什么？啊...怎么会发生这种事情。");
                                cm.mapMessage(5, "通向下一阶段的传送门已经开启。");
                                eim.setIntProperty("glpq6", 3);
                                
                                eim.showClearEffect(true);
                                eim.giveEventPlayersStageReward(6);
                                
                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                cm.sendOk("不必在我身上白费功夫了，堕落的宗师们会招待你的。");
                                cm.dispose();
                        }
                } else {
                        cm.sendOk("...做得好。你们的实力已经超越了堕落的宗师们。穿过那扇大门去领取奖励吧。");
                        cm.dispose();
                }
        } else {
                cm.dispose();
        }
}