var map = 677000002;
var quest = 28238;
var questItem = 4032492;
var status = -1;

function start(mode, type, selection) {
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
        if (cm.isQuestStarted(quest)) {
            if (cm.haveItem(questItem)) {
                cm.sendYesNo("����Ҫ�����ƶ���#b#m" + map + "##k��");
            } else {
                cm.sendOk("��ڱ�һ�����ص����������ţ�ֻ��ʹ�����԰�����ķ���������ܽ⿪��");
                cm.dispose();
            }
        } else {
            cm.sendOk("��ڱ����ص����������š�");
            cm.dispose();
        }
    } else {
        if(cm.haveItem(4032481, 1)) cm.gainItem(4032481, -1);
	if(cm.haveItem(4032482, 1)) cm.gainItem(4032482, -1);
        if(cm.haveItem(4032483, 1)) cm.gainItem(4032483, -1);
	
	cm.warp(map, 0);
	cm.dispose();
    }
}