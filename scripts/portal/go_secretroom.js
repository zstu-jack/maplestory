function enter(pi) {
	if(!pi.isQuestCompleted(2335) && !(pi.isQuestStarted(2335) && pi.hasItem(4032405))){
		pi.getPlayer().message("�Ž������š���Ҫ����Ļ�����Ҫ���ҵ�Կ�ס�");
		return false;
	}

	if(pi.isQuestStarted(2335)){
		pi.forceCompleteQuest(2335, 1300002);
		pi.giveCharacterExp(5000, pi.getPlayer());
		pi.gainItem(4032405, -1);
	}
	pi.playPortalSound();
	pi.warp(106021001, 1);
	return true;
}