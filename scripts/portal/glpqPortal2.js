function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        pi.playPortalSound(); pi.warp(610030300, 0);
        
	if (eim.getIntProperty("glpq3") < 5 || eim.getIntProperty("glpq3_p") < 5) {
            if(eim.getIntProperty("glpq3_p") == 5) {
                pi.mapMessage(6, "��Щ��ӡ��δ��������з�ӡ��������󣬿ɽ�����һ�׶Ρ�");
            } else {
                eim.setIntProperty("glpq3_p", eim.getIntProperty("glpq3_p") + 1);
                
                if(eim.getIntProperty("glpq3") == 5 && eim.getIntProperty("glpq3_p") == 5) {
                    pi.mapMessage(6, "��������������ͨ�����������һ�׶Ρ�");
                    
                    eim.showClearEffect(610030300, "3pt", 2);
                    eim.giveEventPlayersStageReward(3);
                } else {
                    pi.mapMessage(6, "ð����ͨ����һ�����ԣ����� " + (5 - eim.getIntProperty("glpq3_p")) + " ����Ҫͨ����");
                }
            }
	}
        else {
            pi.getPlayer().dropMessage(6, "�ײ��Ĵ��͵��ѿ����������ǰ����");
        }
        
        return true;
    }
    
    return false;
}