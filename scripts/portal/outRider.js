function enter(pi) {
    if(pi.canHold(4001193, 1)) {
        pi.gainItem(4001193, 1);
        pi.playPortalSound(); pi.warp(211050000, 4);
        return true;
    } else {
        pi.playerMessage(5, "�޷����յ��ߣ������������ڳ�1��ռ䡣");
        return false;
    }
}