function enter(pi) {
    if(pi.getMap().countMonsters() == 0) {
        if(pi.canHold(4001193, 1)) {
            pi.gainItem(4001193, 1);
            pi.playPortalSound(); pi.warp(140010210, 0);
            return true;
        } else {
            pi.playerMessage(5, "�޷����յ��ߣ������������ڳ�1��ռ䡣");
            return false;
        }
    } else {
        pi.playerMessage(5, "����������Ⱥ�󷽿��뿪��");
        return false;
    }
}