var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        }
    
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.sendNext("任务尚未开启...");
            cm.dispose();
            return;
        }
        switch(cm.getPlayer().getMapId()) {
            case 610030100:
                if (status == 0) {
                    cm.sendNext("啊，你成功了！不过长话短说：他们已经发现我们了。宗师护卫们马上就要来了。我们最好快点行动。");
                } else if (status == 1) {
                    cm.sendNext("通往堕落宗师们所在地的传送点被破坏了。我们得找到其他的方式通过这些死亡陷阱。");
                } else if (status == 2) {
                    cm.sendNext("你们可以在这里的某处找到传送点...最好快点。我稍后会跟上你们的。");
                    cm.dispose();
                }
                break;
            case 610030200:
               if (status == 0) {
                    cm.sendNext("非常成功！我觉得现在想要打开这条通道，需要每个职业的冒险者各显神通才能突破。");
               } else if (status == 1) {
                    cm.sendNext("他们要使用各自的技能攻击名为印记的机关。一旦五枚印记全部激活，我们就可以通过了。");
                    cm.dispose();
               }
               break;
            case 610030300:
               if (status == 0) {
                    cm.sendNext("现在我们有更多的印记要激活了。At least five Adventurers have to climb to the very top and go through the portal. Stay aware though: not every wall or ground on this map is what it seems to be, so tread lightly!");
               } else if (status == 1) {
                    cm.sendNext("Oh, and beware of these death traps: Menhirs. They really pack a punch. Good luck.");
                    cm.dispose();
               }
               break;
            case 610030400:
               if (status == 0) {
                    cm.sendNext("现在我们有更多的印记要激活了。However, some of them don't work. Here all jobs must fill their roles, as at least one of these Sigils are activated by their job skills, however there can be more than one per job, so be sure to test them all.");
               } else if (status == 1) {
                    cm.sendNext("These Stirges will get in your way, but they're merely a distraction. To get rid of them, get five adventurers to stand on the middle-left platform simultaneously. To pass, try every one of these Sigils until they work.");
                    cm.dispose();
               }
               break;
            case 610030500:
               if (status == 0) {
                    cm.sendNext("Surprised you made it this far! What you see here is the statue of Crimsonwood Keep, but without any of it's weapons.");
               } else if (status == 1) {
                    cm.sendNext("There are five rooms, marked by a statue near each of them, around the statue.");
               } else if (status == 2) {
                    cm.sendNext("I suspect that each of these rooms have one of the statue's five weapons.");
               } else if (status == 3) {
                    cm.sendNext("Bring back the weapons and restore them to the Relic of Mastery!");
                    cm.dispose();
               }
               break;
            case 610030700:
               cm.sendNext("That was some good work out there! This leads the way to the Twisted Masters' Armory.");
               cm.dispose();
               break;
        }
    }
}