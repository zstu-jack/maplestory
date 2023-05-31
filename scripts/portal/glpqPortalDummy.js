function enter(pi) {
    var react = pi.getMap().getReactorByName("mob0");
    
    if (react.getState() < 1) {
        react.forceHitReactor(1);
        
        var eim = pi.getEventInstance();
        eim.setIntProperty("glpq1", 1);
        
        pi.getEventInstance().dropMessage(5, "传送装置中有一股奇异的力量被触发了，隐藏通道现已开启。");
        pi.playPortalSound(); pi.warp(610030100, 0);
        
        pi.getEventInstance().showClearEffect();
        eim.giveEventPlayersStageReward(1);
        return true;
    }
    
    pi.getEventInstance().dropMessage(5, "由于最近一次传送发生了错误，传送装置目前无法使用。请寻找其它方法离开。");
    return false;
}