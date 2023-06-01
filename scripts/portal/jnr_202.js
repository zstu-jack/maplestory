function enter(pi) {
    if (pi.getMap().getReactorByName("jnr32_out").getState() == 1) {
	pi.playPortalSound(); pi.warp(926110200, 2);
        return true;
    } else {
	pi.playerMessage(5, "实验室的门尚未开启。");
        return false;
    }
}