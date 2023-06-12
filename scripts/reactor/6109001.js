function act() {
	var eim = rm.getEventInstance();
	if (eim != null) {
                var mapId = rm.getMap().getId();
            
		if (mapId == 610030200) {
			eim.dropMessage(6, "弓箭手印记已经被激活了。");
			eim.setIntProperty("glpq2", eim.getIntProperty("glpq2") + 1);
			if (eim.getIntProperty("glpq2") == 5) { //all 5 done
				eim.dropMessage(6, "幻日之力为你开启了通向下一个入口的道路，请继续前进。");
                                
				eim.showClearEffect(mapId, "2pt", 2);
                                eim.giveEventPlayersStageReward(2);
			}
		} else if (mapId == 610030300) {
			eim.dropMessage(6, "弓箭手印记已经被激活了。你听到了齿轮转动的声音！死亡之柱被激活了，快跑！");
	    		eim.setIntProperty("glpq3", eim.getIntProperty("glpq3") + 1);
			rm.getMap().moveEnvironment("menhir1", 1);
			rm.getMap().moveEnvironment("menhir2", 1);
	    		if (eim.getIntProperty("glpq3") == 5 && eim.getIntProperty("glpq3_p") == 5) {
				eim.dropMessage(6, "幻日之力为你开启了通向下一个入口的道路，请继续前进。");
				
                                eim.showClearEffect(mapId, "3pt", 2);
                                eim.giveEventPlayersStageReward(3);
	    		}
		}
	}
}