function act() {
	var eim = rm.getEventInstance();
	if (eim != null) {
		eim.dropMessage(6, "սʿӡ���Ѿ��������ˡ�");
		eim.setIntProperty("glpq4", eim.getIntProperty("glpq4") + 1);
		if (eim.getIntProperty("glpq4") == 5) { //all 5 done
			eim.dropMessage(6, "����֮��Ϊ�㿪����ͨ����һ����ڵĵ�·�������ǰ����");
                        
                        eim.showClearEffect(610030400, "4pt", 2);
                        eim.giveEventPlayersStageReward(4);
		}
	}
}