function enter(pi) {
        var eim = pi.getEventInstance();
    
        if (eim.isEventCleared()) {
                if(pi.isEventLeader()) {
                        pi.playPortalSound();
                        eim.warpEventTeam(930000800);
                        return true;
                } else {
                        pi.playerMessage(5, "队长进入传送点方可通过。");
                        return false;
                }
        } else {
                pi.playerMessage(5, "请消灭所有的剧毒石头虫。");
                return false;
        }
}