function enter(pi) {
    if (!pi.haveItem(4031890)) {
        pi.getPlayer().dropMessage(6, "没有霍夫卡，无法使用传送装置。");
        return false;
    }
    
    pi.playPortalSound(); pi.warp(221000300,"earth00");
    return true;
}