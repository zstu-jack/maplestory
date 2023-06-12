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
                    cm.sendNext("啊，你成功了！不过长话短说：他们已经发现我们了。宗师护卫们马上就会抵达这里。我们最好快点行动。");
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
                    cm.sendNext("他们可以使用各自的技能攻击名为印记的机关。一旦五枚印记全部激活，我们就可以通过了。");
                    cm.dispose();
               }
               break;
            case 610030300:
               if (status == 0) {
                    cm.sendNext("现在我们有更多的印记要激活了。至少需要五位冒险家爬到最顶端穿过传送门。不过请注意：这张地图并非所有墙壁和地面都像看起来那么真实，要小心。");
               } else if (status == 1) {
                    cm.sendNext("对了，还要小心那些名为死亡之柱的死亡陷阱。它们真的很厉害，祝你们好运。");
                    cm.dispose();
               }
               break;
            case 610030400:
               if (status == 0) {
                    cm.sendNext("现在我们有更多的印记要激活了。不过，有一些已经失效了。在这里所有职业的冒险家都需要各尽所能，因为每个职业的技能都至少可以激活这些印记中的某一个。当然也有些职业可以激活不止一个印记，所以要确保每个印记都尝试一下。");
               } else if (status == 1) {
                    cm.sendNext("这些蝙蝠是会有些挡路，不过也只是稍稍会有些分散注意力而已。想要避免被干扰的话，让五位冒险家同时站在中间靠左的台子上就可以了。为了通过，请尝试激活每个印记，直到它们亮起。");
                    cm.dispose();
               }
               break;
            case 610030500:
               if (status == 0) {
                    cm.sendNext("你们能走到这里真是令人惊讶！你们在这里看到的是绯红城堡的宗师圣像，但本应被它握在手中的武器却不翼而飞了。");
               } else if (status == 1) {
                    cm.sendNext("这里有五个房间，每个房间前都有一尊小型石像，它们环绕着这座宗师圣像。");
               } else if (status == 2) {
                    cm.sendNext("我怀疑每个房间里都有一把与宗师圣像相应位置对应的武器。");
               } else if (status == 3) {
                    cm.sendNext("取回所有武器，将它们原样复位到宗师圣像手中。");
                    cm.dispose();
               }
               break;
            case 610030700:
               cm.sendNext("你们干得太棒了！这条路通向堕落宗师们的军械库。");
               cm.dispose();
               break;
        }
    }
}