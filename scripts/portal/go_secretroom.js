function enter(pi) {
	if(!pi.isQuestCompleted(2335) && !(pi.isQuestStarted(2335) && pi.hasItem(4032405))){
		pi.getPlayer().message("门紧紧锁着。想要进入的话，需要先找到钥匙。");
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