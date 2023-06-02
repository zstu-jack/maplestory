function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想登船吗？");
        } else {
            cm.sendOk("开往神木村的船还没有到达，请稍后再来。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确定已经购买去往神木村的船票了吗？请检查你的背包。");
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
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("开往神木村的船还没有到达，请稍后再来。");
    }
    cm.dispose();
}