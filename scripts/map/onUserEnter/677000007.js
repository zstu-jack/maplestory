importPackage(Packages.server.life);

function start(ms) {
        var pos = new java.awt.Point(171, 50);
	var mobId = 9400611;
        var mobName = "雪之猫女";
        
	var player = ms.getPlayer();
	var map = player.getMap();

	if(map.getMonsterById(mobId) != null){
		return;   	       
	}

	map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
	player.message(mobName + "出现了！");
}