function start() {
	if (cm.isQuestStarted(2566)) {
		if (!cm.haveItem(4032985)) {
			if (cm.canHold(4032985)) {
				cm.gainItem(4032985, true);
				cm.earnTitle("���ҵ��˵��װ�á����������и����ϡ�");
			}
		} else {
			cm.earnTitle("���Ѿ��е��װ���ˡ�");
		}
	}
	cm.dispose();
}