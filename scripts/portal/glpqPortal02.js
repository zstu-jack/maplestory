function enter(pi) {
    if (pi.getPlayer().getJob().getJobNiche() == 2) {
	pi.playPortalSound(); pi.warp(610030521,0);
        return true;
    } else {
	pi.playerMessage(5, "ֻ�з�ʦ���Խ������");
        return false;
    }
}