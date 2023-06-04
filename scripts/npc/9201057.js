function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("开往 " + (cm.c.getPlayer().getMapId() == 103000100 ? "新叶城" : "废弃都市") + " 列车整点起每分钟都会出发，费用为 #b5,000 金币k。确定要购买 #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k吗？");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("要在列车启动前下车吗？车票将无法退款。");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
	var item = 4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000);

        if(!cm.canHold(item)) {
            cm.sendNext("其他栏没有足够空间。");
	}
	else if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(item, 1);
            cm.sendNext("请收好车票。");
        }else
            cm.sendNext("你的金币不够。");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}