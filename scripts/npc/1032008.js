function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你要乘船前往天空之城吗?");
        else{
            cm.sendOk("飞往天空之城的飞船已经开走了，请耐心等待下一趟。");
            cm.dispose();
        }
    }else{
        cm.sendOk("需要船票才能登船，请确认你的包裹。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好的，如果你改变了主意请跟我说。");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("开往天空之城的飞船即将起航，请等待下一趟。");
        cm.dispose();
    }
}	