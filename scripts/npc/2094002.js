var status = -1;
var level = 1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.warp(251010404,0);
	cm.dispose();
	return;
    }
    
    if(status == 1) {   // leaders cant withdraw
        cm.warp(251010404,0);
        return;
    }
    
    if (!cm.isEventLeader()) {
	cm.sendYesNo("希望你的队长能亲自来和我对话。又或者，你打算退出，放弃这次活动吗？");
    }
    else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404,0);
            cm.sendNext("没有开始组队任务，你是怎么跑到这儿来的？");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch(cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("我们正在向海盗船前进！要想进去，我们必须干掉所有挡在路上的怪物。");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp.equals("0")) {
                    if (cm.haveItem(4001120,20)) {
                        cm.sendNext("干得漂亮！现在去找来20个中级海盗的证明。");
                        cm.gainItem(4001120,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("我们正在向海盗船前进！要想进去，你们必须能证明自己拥有海盗的身份。去找来20个初级海盗的证明。");
                    }
                } else if (emp.equals("1")) {
                    if (cm.haveItem(4001121,20)) {
                        cm.sendNext("干得漂亮！现在去找来20个中级海盗的证明。");
                        cm.gainItem(4001121,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("我们正在向海盗船前进！要想进去，你们必须能证明自己拥有海盗的身份。去找来20个中级海盗的证明。");
                    }
                } else if (emp.equals("2")) {
                    if (cm.haveItem(4001122,20)) {
                        cm.sendNext("干得漂亮！我们走。");
                        cm.gainItem(4001122,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("我们正在向海盗船前进！要想进去，你们必须能证明自己拥有海盗的身份。去找来20个高级海盗的证明。");
                    }
                } else {
                    cm.sendNext("下一阶段已经开启了，前进！");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("我们得先消灭看守，才能奇袭海盗船。");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("老海盗的宝箱出现了！如果你刚巧有一把钥匙，把它扔在宝箱前，宝藏就会出现。不过这也会让老海盗变得更加愤怒。");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("这些桔梗精藏起来了，我们得放它们自由。");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("老海盗的宝箱出现了！如果你刚巧有一把钥匙，把它扔在宝箱前，宝藏就会出现。不过这也会让老海盗变得更加愤怒。");
                    if (eim.getProperty("stage3a").equals("0")) {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("这些桔梗精藏起来了，我们得放它们自由。");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("这些家伙是凯丁和克鲁，它们为老海盗卖命。当你觉得时机已到，就把它们干掉。");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("这些家伙是这艘船的动力来源。我们得用骷髅钥匙把它们都锁进船舱！");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("谢谢你救下了我们的首领，我们欠你一个人情！");
                } else {
                    cm.sendNext("打败所有怪物！老海盗的喽啰也不要放过！");
                }
                cm.dispose();
                break;
        }
    }
    
    
}