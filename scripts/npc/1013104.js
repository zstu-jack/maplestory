function start() {
	if (cm.isQuestStarted(22007)) {
		if (!cm.haveItem(4032451)) {
			cm.gainItem(4032451, true);
			cm.sendNext("#b(��õ���һ�������������͵������ݡ�)");
		} else {
			cm.sendNext("#b(���Ѿ������һ��������������ĵ��������ݡ�)");
		}
	} else {
		cm.sendNext("#b(�����ڲ���Ҫ�ü����ˡ�)#k");
	}
	cm.dispose();
}