function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你要登船吗？");
        } else {
            cm.sendOk("航班还未抵达，请稍后再来。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确定已经购买去往天空之城的船票了吗？请再次检查背包。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变了主意，随时来找我。");
        cm.dispose();
	return;
    }
    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(240000111);
        cm.gainItem(4031045, -1);
    } else {
        cm.sendOk("航班还未抵达，请稍后再来。");
    }
    cm.dispose();
}