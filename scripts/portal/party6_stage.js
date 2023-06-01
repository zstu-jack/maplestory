function enter(pi) {
	switch(pi.getMapId()) {
		case 930000000:
			pi.playPortalSound(); pi.warp(930000100,0);
                        return true;
			break;
		case 930000100:
			if (pi.getMap().getMonsters().size() == 0) {
				pi.playPortalSound(); pi.warp(930000200,0);
                                return true;
			} else {
				pi.playerMessage(5, "请消灭所有的怪物。");
                                return false;
			}
			break;
		case 930000200:
			if (pi.getMap().getReactorByName("spine") != null && pi.getMap().getReactorByName("spine").getState() < 4) {
				pi.playerMessage(5, "前方的道路被刺藤挡住了。");
                                return false;
			} else {
				pi.playPortalSound(); pi.warp(930000300,0); //assuming they cant get past reactor without it being gone
                                return true;
			}
			break;
                        
                default:
                        pi.playerMessage(5, "通往传送点的路上没有阻碍了。");
                        return false;
	}
}