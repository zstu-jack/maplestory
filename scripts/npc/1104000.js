var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;

	if(status == 0){
		cm.sendNext("怎么回事...你不该来这儿！");
	}
	else if(status == 1){
		var puppet = cm.getEventManager("Puppeteer");
		puppet.setProperty("player", cm.getPlayer().getName());
		puppet.startInstance(cm.getPlayer());
		cm.dispose();
		return;
	}
}