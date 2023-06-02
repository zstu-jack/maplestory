function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想前往玩具城?");
        } else {
            cm.sendOk("开往玩具城的飞船已经出发了。请耐心等待下一班次。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确定已经购买去往玩具城的船票了吗？请再次检查背包。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变了主意，随时来找我。");
        cm.dispose();
	return;
    } 
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("开往玩具城的飞船即将出发。请耐心等待下一班次。");
        cm.dispose();
    }
}