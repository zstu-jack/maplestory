/*
  Growlie (that fatass uhh.. hungry lion or whatever)

  @author FightDesign (RageZONE)
  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
        eim.setProperty(stage + "stageclear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(stage);
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0) {
                cm.dispose();
                return;
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 0)
                        status += ((chosen == 2) ? 1 : -1);
                else
                        status++;
                    
                if (status == 0) {
                        if (cm.isEventLeader()) {
                                cm.sendSimple("我是小老虎，你怎么来的？\r\n#b#L0# 我想知道这里的一切。#l\r\n#L1# 我给你带来了 #t4001101#.#l\r\n#L2# 我要离开这里。#l");
                        } else {
                                cm.sendSimple("我是小老虎，你怎么来的？\r\n#b#L0# 查看说明。#l\r\n#L2# 我要离开这里。#l");
                        }
                } else if (status == 1) {
                        if (chosen == -1)
                                chosen = selection;
                        if (chosen == 0) {
                                cm.sendNext("每个满月都能在这里品尝到月妙兔制作的美味年糕。");
                        } else if (chosen == 1) {
                                if (cm.haveItem(4001101, 10)) {
                                        cm.sendNext("请把年糕递给我。嗯。。。这看起来很美味。下次再来找我了解更多#b#t4001101##k。祝你回家旅途平安！");
                                } else {
                                        cm.sendOk("建议你再检查一下背包，是否有 #b10 #t4001101#s#k.");
                                        cm.dispose();
                                }
                        } else if (chosen == 2) {
                                cm.sendYesNo("你确定要离开这里吗？");
                        }
                        else {
                                cm.dispose();
                                return;
                        }
                } else if (status == 2) {
                        if (chosen == 0) {
                                cm.sendNextPrev("从这片区域的报春花叶子上采集报春花种子，将种子种植在新月附近的平台处，即可看到报春花绽放。报春花有6种类型，它们都需要对应的平台。平台对了，花朵的种子才能开出花来。");
                        } else if (chosen == 1) {
                                cm.gainItem(4001101, -10);

                                var eim = cm.getEventInstance();
                                clearStage(1, eim);

                                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                                map.killAllMonstersNotFriendly();

                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                if (mode == 1) {
                                        cm.warp(910010300);
                                } else {
                                        cm.sendOk("快收集一些美味的年糕，时间不多了。。。");
                                }
                                cm.dispose();
                        }
                } else if (status == 3) {
                        if (chosen == 0) {
                                cm.sendNextPrev("当报春花盛开时，满月就会升起，这时月妙兔就会出现并开始敲打制作年糕。你的任务是阻止怪物骚扰月妙兔，确保它能够集中精力制作年糕。");
                        }
                } else if (status == 4) {
                        if (chosen == 0) {
                                cm.sendNextPrev("我希望你和你的同伴合作，给我10个年糕。注意倒计时，超过时间你回被强制传送离开。");
                        }
                } else {
                        cm.dispose();
                }
        }
}