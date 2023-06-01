function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        pi.playPortalSound(); pi.warp(610030300, 0);
        
	if (eim.getIntProperty("glpq3") < 5 || eim.getIntProperty("glpq3_p") < 5) {
            if(eim.getIntProperty("glpq3_p") == 5) {
                pi.mapMessage(6, "有些封印尚未被激活，所有封印都被激活后，可进入下一阶段。");
            } else {
                eim.setIntProperty("glpq3_p", eim.getIntProperty("glpq3_p") + 1);
                
                if(eim.getIntProperty("glpq3") == 5 && eim.getIntProperty("glpq3_p") == 5) {
                    pi.mapMessage(6, "贤者们允许你们通过这里，进入下一阶段。");
                    
                    eim.showClearEffect(610030300, "3pt", 2);
                    eim.giveEventPlayersStageReward(3);
                } else {
                    pi.mapMessage(6, "冒险者通过了一处测试，还有 " + (5 - eim.getIntProperty("glpq3_p")) + " 处需要通过。");
                }
            }
	}
        else {
            pi.getPlayer().dropMessage(6, "底部的传送点已开启，请继续前进。");
        }
        
        return true;
    }
    
    return false;
}