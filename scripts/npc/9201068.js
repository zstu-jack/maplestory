status = -1;
close = false;
oldSelection = -1;
var em;

function start() {
    em = cm.getEventManager("Subway");
    var text = "这里是新叶城检票口。";
	var hasTicket = false;
    if (cm.haveItem(4031713) && cm.getPlayer().getMapId() == 600010001){
        text += "\r\n#b#L0##t4031713#";
		hasTicket = true;
	}
	if(!hasTicket){
		cm.sendOk("你好像没有车票？请从贝尔处购买车票。");
		cm.dispose();
	}else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("你在这里还有些事情要处理，对吧？");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(selection == 0){
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("这趟列车看起来有足够的空间，请准备好您的车票。旅程可能会有些稍微有些漫长，但您会按时到达目的地。怎么样？你想要乘车吗？");
            else{
                cm.sendNext("列车将在一分钟内出发，请耐心等待下一班车。出发前一分钟会准时停止检票，届时请准时搭乘。");
                cm.dispose();
            }
        }
        oldSelection = selection;
    }else if(status == 1){
        if (oldSelection == 0 && cm.haveItem(4031713)) {
            if(em.getProperty("entry") == "true") {
                cm.gainItem(4031713, -1);
                cm.warp(600010002);
            }
            else {
                cm.sendNext("列车将在一分钟内出发，请耐心等待下一班车。出发前一分钟会准时停止检票，届时请准时搭乘。");
            }
        } else {
            cm.sendNext("没有车票，无法乘车。");
	}
        
        cm.dispose();
    }
}