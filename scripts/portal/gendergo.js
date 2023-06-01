function enter(pi) {
    var map = pi.getPlayer().getMap();
    if(pi.getPortal().getName() == "female00") {
        if (pi.getPlayer().getGender() == 1) {
            pi.playPortalSound(); pi.warp(map.getId(), "female01");
            return true;
        } else {
            pi.message("这里通向女生区，请前往另一侧的传送点。");
            return false;
        }
    } else {
        if (pi.getPlayer().getGender() == 0) {
            pi.playPortalSound(); pi.warp(map.getId(), "male01");
            return true;
        } else {
            pi.message("这里通向男生区，请前往另一侧的传送点。");
            return false;
        }
    }
}