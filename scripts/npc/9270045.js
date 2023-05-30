/*
	(220080001)
*/

var status = -1;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	cm.sendYesNo("你确定想要离开吗?挑战将从新开始!");
    } else if (status == 1) {
	cm.warp(541020700);
	if (cm.getPlayerCount(541020800) == 0) {
		cm.getMap(541020800).resetReactors();
		cm.getMap(541020800).resetFully();
	}
	cm.dispose();
    } else {
	cm.dispose();
	}
}