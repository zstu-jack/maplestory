function enter(pi) {
	if (pi.isQuestStarted(2570)) {
		pi.playPortalSound(); pi.warp(120000101, 0);
		return true;
	}
	pi.earnTitle("�㻹��һЩ����Ҫ�������ܴ�������п������ȵ�...ûʲô��ԭ��������ʺ��");
	return false;
}