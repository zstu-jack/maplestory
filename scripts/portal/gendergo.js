function enter(pi) {
    var map = pi.getPlayer().getMap();
    if(pi.getPortal().getName() == "female00") {
        if (pi.getPlayer().getGender() == 1) {
            pi.playPortalSound(); pi.warp(map.getId(), "female01");
            return true;
        } else {
            pi.message("����ͨ��Ů��������ǰ����һ��Ĵ��͵㡣");
            return false;
        }
    } else {
        if (pi.getPlayer().getGender() == 0) {
            pi.playPortalSound(); pi.warp(map.getId(), "male01");
            return true;
        } else {
            pi.message("����ͨ������������ǰ����һ��Ĵ��͵㡣");
            return false;
        }
    }
}