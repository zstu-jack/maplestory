function enter(pi) {
        var em = pi.getEventManager("KerningTrain");
        if (!em.startInstance(pi.getPlayer())) {
            pi.message("�����г�����Ա���������һ�ࡣ");
            return false;
        }
        
	pi.playPortalSound();
	return true;
}