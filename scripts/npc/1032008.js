function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你要去天空之城吗?");
        else{
            cm.sendOk("天空之城的飞船已经启航，请耐心等待下一趟。");
            cm.dispose();
        }
    }else{
        cm.sendOk("逃票这种骚操作，在我这里是行不通的，建议你去买票吧。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变主意，就和我谈谈！");
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
        cm.sendOk("天空之城的飞船已经启航，请耐心等待下一趟。");
        cm.dispose();
    }
}	