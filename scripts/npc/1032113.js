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
            cm.sendOk("#bħ��ʦ������#kֻ��#r��20��#k����Ҳ��ܴ��͹�ȥ��");
            cm.dispose();
            return;
        }
        
	var selStr = "��ȷ��Ҫȥ#bħ��ʦ������#k?";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#ħ��ʦ������ " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("�����Ѿ������ˡ�");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    }
}