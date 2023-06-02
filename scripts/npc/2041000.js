function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你想前往天空之城吗？");
        else{
            cm.sendOk("开往天空之城的飞船已经出发了。请耐心等待下一班次。");
            cm.dispose();
        }
    }else{
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
    
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(220000111);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else {
        cm.sendOk("开往天空之城的飞船即将出发。请耐心等待下一班次。");
        cm.dispose();
    }
}