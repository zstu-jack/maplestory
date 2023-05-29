function start() {
	if (cm.isQuestStarted(22007)) {
		if (!cm.haveItem(4032451)) {
			cm.gainItem(4032451, true);
			cm.sendNext("#b(你得到了一个鸡蛋。把它送到犹他州。)");
		} else {
			cm.sendNext("#b(你已经获得了一个鸡蛋。拿着你的蛋给犹他州。)");
		}
	} else {
		cm.sendNext("#b(你现在不需要拿鸡蛋了。)#k");
	}
	cm.dispose();
}