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
	cm.sendNext("#b(û��ȥ�����ڲ���Ķ���)");
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
		cm.sendNext("#b(����...��...�ǳ���ı�㣡)");
		cm.dispose();
	    } else {
		cm.sendYesNo("#b(������ʲô����������ס�ˡ�Ҫȡ������)");
	    }
	} else {
	    cm.sendOk("#b(û�ҵ��κζ�����)");
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.sendNext("(�ҵ��˳���ѵ��ʦ�غõĶ���...����ֽ����)");
	cm.gainItem(4031921, 1);
	cm.dispose();
    }
}