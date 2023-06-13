importPackage(Packages.server.quest);
importPackage(Packages.server.life);

function enter(pi) {
	if(pi.isQuestStarted(21201)) { // Second Job
		for (var i = 108000700; i < 108000709; i++){
			if(pi.getPlayerCount(i) > 0 && pi.getPlayerCount(i + 10) > 0)
				continue;
			
			pi.playPortalSound();
			pi.warp(i, "out00");
			pi.setQuestProgress(21202, 21203, 0);
			return true;
		}
		pi.message("镜子目前一片空白，因为有太多冒险者同时尝试唤起回忆。请稍候再试。");
		return false;
	} else if(pi.isQuestStarted(21302) && !pi.isQuestCompleted(21303)) { // Third Job
		if(pi.getPlayerCount(108010701) > 0 || pi.getPlayerCount(108010702) > 0) {
			pi.message("镜子目前一片空白，因为有太多冒险者同时尝试唤起回忆。请稍候再试。");
			return false;
		} else {
			var map = pi.getClient().getChannelServer().getMapFactory().getMap(108010702);
			spawnMob(-210, 454, 9001013, map);
			
			pi.playPortalSound();
			pi.setQuestProgress(21303, 21203, 1);
			pi.warp(108010701, "out00");
			return true;
		}
	} else {
                pi.message("你已经通过了考验，不需要再次面对镜子了。");
		return false;
	}
}

function spawnMob(x, y, id, map) {
	if(map.getMonsterById(id) != null)
		return;
		
	var mob = MapleLifeFactory.getMonster(id);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(x, y));
}