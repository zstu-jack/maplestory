/**
-- Odin JavaScript --------------------------------------------------------------------------------
	? - Victoria Road: Pet-Walking Road (100000202)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
	cm.sendNext("#b(没有去摸藏在草里的东西)");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	if (cm.getQuestStatus(4646) == 1) {
	    if (cm.haveItem(4031921)) {
		cm.sendNext("#b(这是...恶...是宠物的便便！)");
		cm.dispose();
	    } else {
		cm.sendYesNo("#b(看到有什么东西被草遮住了。要取出来吗？)");
	    }
	} else {
	    cm.sendOk("#b(没找到任何东西。)");
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.sendNext("(找到了宠物训练师藏好的东西...是张纸条。)");
	cm.gainItem(4031921, 1);
	cm.dispose();
    }
}