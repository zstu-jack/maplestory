var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
	    cm.sendNext("你，注定是龙族之王。。。你终于到了。", 1);//Dragon Master 龙神
	} else if (status == 1) {
	    cm.sendNextPrev("去履行龙王的职责吧。。。", 1);//龙神职业群脚本，可以跳过
	} else if (status == 2) {
	    cm.warp(900090101, 0);
	    cm.dispose();
	}
}