importPackage(Packages.server.life);

function start(ms) {
        var pos = new java.awt.Point(467, 0);
	var mobId = 9400610;
        var mobName = "ºÚ°µ¶À½ÇÊÞ";
        
	var player = ms.getPlayer();
	var map = player.getMap();

	if(map.getMonsterById(mobId) != null){
		return;   	       
	}

	map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
	player.message(mobName + " ³öÏÖÁË£¡");
}