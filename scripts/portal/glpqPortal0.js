function enter(pi) {
    if (pi.getEventInstance().getIntProperty("glpq1") == 0) {
        pi.getEventInstance().dropMessage(5, "门扉目前被一股力量所阻挡，无法进入。");
        return false;
        
    } else {
        pi.playPortalSound(); pi.warp(610030200, 0);
        return true;
    }
}

