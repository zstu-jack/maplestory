function enter(pi) {
	if (pi.getPlayer().getParty() != null && pi.isEventLeader() && pi.haveItem(4001055,1)) {
                pi.playPortalSound();
                pi.getEventInstance().warpEventTeam(920010100);
                return true;
	} else {
		pi.playerMessage(5,"�ɳ��и���Ů��������ݵ���ӳ�Ա���ζӳ������ܽ������");
                return false;
	}
}