function enter(pi) {
    if(pi.canHold(4001193, 1)) {
        pi.gainItem(4001193, 1);
        pi.playPortalSound(); pi.warp(211050000, 4);
        return true;
    } else {
        pi.playerMessage(5, "无法接收道具，请在其他栏腾出1格空间。");
        return false;
    }
}