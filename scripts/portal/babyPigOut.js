function enter(pi) {
	if (pi.isQuestCompleted(22015)) {
		pi.playPortalSound();
		pi.warp(100030300, 2);
	} else {
		pi.playerMessage(5, "��Ⱦ�С��ɣ�");//not gms like
	}
	return true;
}
