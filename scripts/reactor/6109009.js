function act() {
	var eim = rm.getEventInstance();
	if (eim != null) {
		eim.dropMessage(6, "��һ����ʦʥ��������ѱ���λ��");
		eim.setIntProperty("glpq5", eim.getIntProperty("glpq5") + 1);
		if (eim.getIntProperty("glpq5") == 5) { //all 5 done
			eim.dropMessage(6, "����֮��Ϊ�㿪����ͨ����һ����ڵĵ�·�������ǰ����");
                        
			eim.showClearEffect(610030500, "5pt", 2);
                        eim.giveEventPlayersStageReward(5);
		}
	}
}