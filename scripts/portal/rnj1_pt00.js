function enter(pi) {
    if (pi.getEventInstance().getIntProperty("statusStg1") == 1) {
	pi.playPortalSound(); pi.warp(926100001, 0); //next
        return true;
    } else {
	pi.playerMessage(5, "��������δ������");
        return false;
    }
}