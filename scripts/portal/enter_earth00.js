function enter(pi) {
    if (!pi.haveItem(4031890)) {
        pi.getPlayer().dropMessage(6, "û�л��򿨣��޷�ʹ�ô���װ�á�");
        return false;
    }
    
    pi.playPortalSound(); pi.warp(221000300,"earth00");
    return true;
}