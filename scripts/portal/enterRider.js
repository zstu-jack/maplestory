function enter(pi) {
    if(pi.isQuestStarted(21610) && pi.haveItem(4001193, 1) == 0) {
        var em = pi.getEventManager("Aran_2ndmount");
        if (em == null) {
            pi.message("抱歉，第二次骑宠任务目前尚未开放。");
            return false;
        }
        else {
            var em = pi.getEventManager("Aran_2ndmount");
            if (!em.startInstance(pi.getPlayer())) {
                pi.message("已经有其他人在地图里面了，请稍后再试。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    } else {
        pi.playerMessage(5, "只有执行第二次骑宠任务的玩家才能进入这片区域。");
        return false;
    }
}