function enter(pi) {
    if(pi.getMap().countMonsters() == 0) {
        if(pi.canHold(4001193, 1)) {
            pi.gainItem(4001193, 1);
            pi.playPortalSound(); pi.warp(140010210, 0);
            return true;
        } else {
            pi.playerMessage(5, "无法接收道具，请在其他栏腾出1格空间。");
            return false;
        }
    } else {
        pi.playerMessage(5, "击败所有狼群后方可离开。");
        return false;
    }
}