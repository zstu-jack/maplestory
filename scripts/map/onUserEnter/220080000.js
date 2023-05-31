importPackage(Packages.server.life);

function start(ms){
        var player = ms.getPlayer();
        var map = player.getMap();       
        if (ms.getPlayerCount(220080001) == 0 && !isStart(ms)) {
			ms.getMap(220080000).resetReactors();
		}
}

function isStart(ms){
	var list = ms.getMap(220080000).getAllReactors().iterator();
	while(list.hasNext()){
		var r = list.next();
		if(r.getState() == 1)
			return false;
	}
	return true;
}