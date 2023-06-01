function enter(pi) {
    pi.message("你找到了通往地下寺庙入口的小路。");
    pi.playPortalSound(); pi.warp(105100000, 2);
    return true;
}