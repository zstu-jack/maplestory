function enter(pi) {
	if (pi.getPlayer().getParty() != null && pi.isEventLeader() && pi.haveItem(4001055,1)) {
                pi.playPortalSound();
                pi.getEventInstance().warpEventTeam(920010100);
                return true;
	} else {
		pi.playerMessage(5,"由持有复活女神的生命草的组队成员担任队长，才能进入这里。");
                return false;
	}
}