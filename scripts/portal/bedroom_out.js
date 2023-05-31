function enter(pi) {
	if (pi.isQuestStarted(2570)) {
		pi.playPortalSound(); pi.warp(120000101, 0);
		return true;
	}
	pi.earnTitle("你还有一些事情要做。我能从你的眼中看到。等等...没什么，原来那是眼屎。");
	return false;
}