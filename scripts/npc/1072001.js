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
                cm.sendOk("真是了不起的家伙！");
                cm.dispose();
            } else if (cm.isQuestCompleted(100006)) {
                cm.sendNext("好的，我允许你入内。打败里面的怪物并收集30颗黑珠，然后和我那位在里面的同僚对话。他会给你 #b英雄证书#k 作为通过测试的证明。祝你好运。");
                status = 4;
            } else if (cm.isQuestStarted(100006)) {
                cm.sendNext("看起来这封信是 #b汉斯#k让你交给我的。这么说，你是来这里参加魔法师2转考试的吧。好的，我会向你解释考试内容。别太紧张，内容并不算复杂。");
            } else {
                cm.sendOk("准备好后再与我对话，我会向你解释考试内容。");
                cm.dispose();
            }
        } else if (status == 1)
            cm.sendNextPrev("我会把你传送进一个隐藏地图，你会遇到一些平时难得一见的怪物。他们看起来和普通的怪物一样，内在却完全不同。它们既不会给你经验，也不会掉落普通物品。");
        else if (status == 2)
            cm.sendNextPrev("当你击败这些怪物时，它们有几率掉落 #b#t4031013##k。这是一种，由怪物恶念凝结而成的特殊石球。收集30个并转交给我我在里面的同僚，你就可以通过考试。");
        else if (status == 3)
            cm.sendYesNo("一旦进去，完成任务之前都无法离开。如果在里面死亡，经验值也会减少...所以你最好有充分的准备...那么，你想现在入场吗？");
        else if (status == 4) {
            cm.sendNext("好的，我允许你入内。打败里面的怪物并收集30颗黑珠，然后和我那位在里面的同僚对话。他会给你 #b英雄证书#k 作为通过测试的证明。祝你好运。");
            cm.completeQuest(100006);
            cm.startQuest(100007);
            cm.gainItem(4031009, -1);
        } else if (status == 5) {
            cm.warp(108000200, 0);
            cm.dispose();
        } else cm.dispose();
    }
}
