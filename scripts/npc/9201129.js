var map = 677000000;
var quest = 28198;
var questItem = 4032495;
var status = -1;

function start(mode, type, selection) {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if (cm.isQuestStarted(quest)) {
            if (cm.haveItem(questItem)) {
                cm.sendYesNo("你想要现在移动到#b#m" + map + "##k吗？");
            } else {
                cm.sendOk("入口被一股神秘的力量封锁着，只有使用来自埃尔帕姆的力量才能解开。");
                cm.dispose();
            }
        } else {
            cm.sendOk("入口被神秘的力量封锁着。");
            cm.dispose();
        }
    } else {
	cm.warp(map, 0);
	cm.dispose();
    }
}