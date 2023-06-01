function enter(pi) {
    if (pi.haveItem(3992041, 1)) {
	pi.playPortalSound(); pi.warp(610030020, "out00");
        return true;
    } else {
	pi.playerMessage(5, "巨大的铁门纹丝不动，键石形状的插槽在其上清晰可见。");
        return false;
    }
}