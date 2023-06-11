var map = 677000010;
var quest = 28283;
var status = -1;
var inHuntingGround;

function start(mode, type, selection) {
        inHuntingGround = (cm.getMapId() >= 677000010 && cm.getMapId() <= 677000012);
	action(1, 0, 0);        
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if(!inHuntingGround) {
            if (cm.isQuestStarted(quest)) {
                if(!cm.getPlayer().haveItemEquipped(1003036)) {
                    cm.sendOk("ǰ���ĵ�·������һ�ɶ��...��Ҫװ��#r�������Ұ��ͷ#k���ɽ��롣");
                    cm.dispose();
                    return;
                }

                cm.sendYesNo("����Ҫ�����ƶ���#b#m" + map + "##k��");
            } else {
                cm.sendOk("��ڱ����ص����������š�");
                cm.dispose();
            }
        } else {
            if(cm.getMapId() == 677000011) {
                map = 677000012;
                cm.sendYesNo("����Ҫ�����ƶ���#b#m" + map + "##k��");
            } else {
                map = 105050400;
                cm.sendYesNo("����Ҫ#b�뿪����#k��");
            }
        }
    } else {
        cm.warp(map, 0);
	cm.dispose();
    }
}