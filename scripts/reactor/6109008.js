function act() {
	var eim = rm.getEventInstance();
	if (eim != null) {
		eim.dropMessage(6, "有一把宗师圣像的武器已被复位。");
		eim.setIntProperty("glpq5", eim.getIntProperty("glpq5") + 1);
		if (eim.getIntProperty("glpq5") == 5) { //all 5 done
			eim.dropMessage(6, "幻日之力为你开启了通向下一个入口的道路，请继续前进。");
                        
			eim.showClearEffect(610030500, "5pt", 2);
                        eim.giveEventPlayersStageReward(5);
		}
	}
}