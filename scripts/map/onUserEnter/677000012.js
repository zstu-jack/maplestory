importPackage(Packages.server.life);

function start(ms) {
        var pos = new java.awt.Point(842, 0);
	var mobId = 9400633;
        var mobName = "地狱大公";
        
	var player = ms.getPlayer();
	var map = player.getMap();

	if(map.getMonsterById(mobId) != null){
		return;   	       
	}

	map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
	player.message(mobName + "出现了！");
}