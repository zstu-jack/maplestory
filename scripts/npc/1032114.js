var status = -1;
var map = 910120000;
var num = 5;
var maxp = 5;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status <= 1) {
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
        if(cm.getLevel() >= 20) {
            cm.sendOk("#b魔法师修炼场#k只能#r≤20级#k的玩家才能传送过去。");
            cm.dispose();
            return;
        }
        
	var selStr = "你确定要去#b魔法师修炼场#k?";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#魔法师修炼场 " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("里面已经有人了。");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    }
}