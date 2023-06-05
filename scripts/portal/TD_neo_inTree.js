function enter(pi) {
    var nex = pi.getEventManager("GuardianNex");
    if(nex == null) {
        pi.message("时间守护兽努克斯挑战遇到了一个错误，目前无法使用。");
        return false;
    }
    
    var quests = [3719, 3724, 3730, 3736, 3742, 3748];
    var mobs = [7120100, 7120101, 7120102, 8120100, 8120101, 8140510];
    
    for(var i = 0; i < quests.length; i++) {
        if (pi.isQuestActive(quests[i])) {
            if(pi.getQuestProgressInt(quests[i], mobs[i]) != 0) {
                pi.message("你面前的就是时间守护兽努克斯，履行你的使命吧。");
                return false;
            }
            
            if(!nex.startInstance( i, pi.getPlayer())) {
                pi.message("已经有玩家入场挑战时间守护兽努克斯了。请等待他们完成挑战后再尝试进入。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    }
    
    pi.message("一股神秘的力量阻止着你进入这里。");
    return false;
}