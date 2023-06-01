function enter(pi) {
        var em = pi.getEventManager("KerningTrain");
        if (!em.startInstance(pi.getPlayer())) {
            pi.message("本次列车已满员，请乘坐下一班。");
            return false;
        }
        
	pi.playPortalSound();
	return true;
}