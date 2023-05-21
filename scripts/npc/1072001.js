/*
NPC-魔法师转职教官
位置-101020000
 */
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
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            if (cm.isQuestCompleted(100007)) {
                cm.sendOk("你是一名真正的英雄");
                cm.dispose();
            } else if (cm.isQuestCompleted(100006)) {
                cm.sendNext("我会将你传送进去，打败里面怪物，收集30颗黑珠，然后和我在里面的一位同事交谈。他会给你一份 #b英雄的证明#k，来证实你已经通过了测试。祝你好运！");
                status = 4;
            } else if (cm.isQuestStarted(100006)) {
                cm.sendNext("显而易见这封信来自于 #b老格林德尔#k，所以你千里迢迢来到这里参加魔法师2转测试。好的，我会向你解释测试内容。不要太出汗，它并没有那么复杂。");
            } else {
                cm.sendOk("一旦你准备好了，我可以告诉你测试内容。");
                cm.dispose();
            }
        } else if (status == 1)
            cm.sendNextPrev("我将会把你传送进一个隐藏地图，你会看到平常见不到的怪物。他们看起来和普通的一样，但状态完全不同。它们既不会提高你的经验水平，也不会为你提供物品。");
        else if (status == 2)
            cm.sendNextPrev("当你击败这些怪物，你会获得一个名为 #b#t4031013##k 的石头。这是一种特殊的大理石，由他们阴险、邪恶的思想制成。收集其中的30个，然后去和我的一个同事谈谈，这就是你通过测试的方式。");
        else if (status == 3)
            cm.sendYesNo("一旦你进去，在你完成任务之前，你不能离开。如果你死了，你的经验值会下降。所以，你最好做好充足的准备。好吧，你想现在就进去吗？");
        else if (status == 4) {
            cm.sendNext("我会将你传送进去，打败里面怪物，收集30颗黑珠，然后和我在里面的一位同事交谈。他会给你一份 #b英雄的证明#k，来证实你已经通过了测试。祝你好运！");
            cm.completeQuest(100006);
            cm.startQuest(100007);
            cm.gainItem(4031009, -1);
        } else if (status == 5) {
            cm.warp(108000200, 0);
            cm.dispose();
        } else cm.dispose();
    }
}
