importPackage(Packages.server.life);

function start(ms) {
        var pos = new java.awt.Point(461, 61);
	var mobId = 9400612;
        var mobName = "ţħ��";
        
	var player = ms.getPlayer();
	var map = player.getMap();

	if(map.getMonsterById(mobId) != null){
		return;   	       
	}

	map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
	player.message(mobName + " �����ˣ�");
}