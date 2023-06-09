var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        if (cm.getPlayer().getMapId() == 922240200)  {
                                cm.sendOk("真不像样子，等你准备好了再来吧。");
                        }
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.getMapId() == 922240200) {
                                cm.sendSimple("你刚刚是不是有什么话要说...？#b\b\r\n#L0#我想要拯救佳佳。#l\r\n");    //#L1#I want to go to the Space Mine.#l
                        } else if (cm.getMapId() >= 922240000 && cm.getMapId() <= 922240019) {
                                cm.sendYesNo("就算掉下来也不要担心。你总共有3次机会。还是想要放弃吗？"); 
                        } else if (cm.getMapId() >= 922240100 && cm.getMapId() <= 922240119) {
                                var text = "你费了很大的功夫来营救佳佳，但看起来我们又回到原点了。";				
                                var rgaga = cm.getPlayer().getEvents().get("rescueGaga");
                                if (rgaga.getCompleted() > 10) {
                                        text += "请别放弃，直到佳佳获救。我要送你一艘太空船来奖励你迄今为止的成就。虽然破破烂烂的，但应该还能使用。看看你的#b技能窗口#k吧。";
                                        rgaga.giveSkill(cm.getPlayer());
                                } else 
                                        text += "我们回去吧。";

                                cm.sendNext(text); 
                        }
                } else {
                        if (cm.getPlayer().getMapId() == 922240200) {
                                if (status == 1) {
                                        if(selection == 0) {
                                                selected = 1;
                                                cm.sendNext("你来了！事情的经过我已经从婴儿月妙那里听说了。你来了真让我欣慰，我正要找人帮忙呢。佳佳是我的朋友，他以前帮助过我，而且时常来这边看望我。很不幸的是，他被外星人绑架了。"); 
                                        } else {
                                                selected = 2;
                                                cm.sendYesNo("在宇宙矿山里可以找到一种名为#b氪结晶体#k的矿石，它蕴含着神秘的宇宙力量。#b氪结晶体#l通常是祖母绿色的，然而一旦被太空船的#b太空射线#k击中就会转化为金色。要记住，为了挫败外星人的阴谋，需要找到#b10枚金色氪结晶体和10枚绿色氪结晶体#k。不过即便只有#b1枚氪结晶体#k也能帮上忙。尽可能多地把它们找来给我。哦，还有一件事！太空矿山被外星章鱼看守着。它们因为#b氪结晶体#k的力量变得无比强大，所以不要试图打败他们。只要把注意力集中在快速收集结晶体上就好。"); 
                                        } 
                                } else if (status == 2) {
                                        if(selected == 1) {
                                                cm.sendYesNo("如果我们就那么把佳佳丢在外星人那里，就会有可怕的事情发生在他身上！我会借给你婴儿月妙从前用过的那艘太空船来帮你拯救佳佳。佳佳可能有些迷糊还笨蛋兮兮的，但是#k他真的是个不错的年轻人。你现在想要去救他吗？");
                                        } else if(selected == 2) { 
                                                cm.sendOk("还没有编码，哭哭脸。");//这个意思就是宇宙矿山此路不通。L1被注释掉了
                                                cm.dispose();
                                        }
                                } else if (status == 3) {
                                        var em = cm.getEventManager("RescueGaga");
                                        if (em == null) {
                                                cm.sendOk("活动目前尚未开启。");
                                        } else if (!em.startInstance(cm.getPlayer())) {
                                                cm.sendOk("地图中目前已有其他玩家，请稍后再来。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        } else if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        }
                }
        }
}