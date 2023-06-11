var map = 677000004;
var quest = 28179;
var questItem = 4032491;
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
	if(cm.haveItem(4001341, 1)) cm.gainItem(4001341, -1);
        if(cm.haveItem(4032478, 1)) cm.gainItem(4032478, -1);
	
	cm.warp(map, 0);
	cm.dispose();
    }
}