function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
	if (eim.getIntProperty("glpq6") < 3){
	    pi.playerMessage(5, "´«ËÍÃÅÉÐÎ´¿ªÆô¡£");
            return false;
	} else {
	    pi.playPortalSound(); pi.warp(610030700, 0);
            return true;
	}
    }
    
    return false;
}