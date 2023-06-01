function enter(pi) {
    if(pi.getEventInstance().getIntProperty("statusStg8") == 1) {
        pi.playPortalSound(); pi.warp(920010930,0);
        return true;
    }
    else {
        pi.playerMessage(5, "精灵的力量仍然影响着通天塔，目前无法进入这处禁地。");
        return false;
    }
}