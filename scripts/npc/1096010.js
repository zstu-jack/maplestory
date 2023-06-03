function start() {
	if (cm.isQuestStarted(2566)) {
		if (!cm.haveItem(4032985)) {
			if (cm.canHold(4032985)) {
				cm.gainItem(4032985, true);
				cm.earnTitle("你找到了点火装置。把它带到切割器上。");
			}
		} else {
			cm.earnTitle("你已经有点火装置了。");
		}
	}
	cm.dispose();
}