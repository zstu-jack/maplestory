var status = -1;
var map = 910060000;
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
                cm.sendOk("这个训练场只对20级以下的玩家开放。");
                cm.dispose();
                return;
        } else if (cm.isQuestActive(22515) || cm.isQuestActive(22516) || cm.isQuestActive(22517) || cm.isQuestActive(22518)) {
		cm.sendYesNo("你想去训练中心吗？");
		status = 1;
	} else {
                var selStr = "你想去训练中心吗？";
                for (var i = 0; i < num; i++) {
                        selStr += "\r\n#b#L" + i + "# 训练中心 " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
                }
                cm.sendSimple(selStr);
        }
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("训练中心人满为患。");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    } else if (status == 2) {
	cm.warp(910060100,0);
	cm.dispose();
    }
}