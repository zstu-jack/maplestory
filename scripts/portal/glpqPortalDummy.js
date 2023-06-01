function enter(pi) {
    var react = pi.getMap().getReactorByName("mob0");
    
    if (react.getState() < 1) {
        react.forceHitReactor(1);
        
        var eim = pi.getEventInstance();
        eim.setIntProperty("glpq1", 1);
        
        pi.getEventInstance().dropMessage(5, "����װ������һ������������������ˣ�����ͨ�����ѿ�����");
        pi.playPortalSound(); pi.warp(610030100, 0);
        
        pi.getEventInstance().showClearEffect();
        eim.giveEventPlayersStageReward(1);
        return true;
    }
    
    pi.getEventInstance().dropMessage(5, "�������һ�δ��ͷ����˴��󣬴���װ��Ŀǰ�޷�ʹ�á���Ѱ�����������뿪��");
    return false;
}