function act() {
	var eim = rm.getEventInstance();
	if (eim != null) {
		eim.dropMessage(6, "战士印记已经被激活了。");
		eim.setIntProperty("glpq4", eim.getIntProperty("glpq4") + 1);
		if (eim.getIntProperty("glpq4") == 5) { //all 5 done
			eim.dropMessage(6, "幻日之力为你开启了通向下一个入口的道路，请继续前进。");
                        
                        eim.showClearEffect(610030400, "4pt", 2);
                        eim.giveEventPlayersStageReward(4);
		}
	}
}