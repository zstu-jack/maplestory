/*
 * NPC : Francis (Doll master)
 * Map : 910510200
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1 || mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
    	status++;
    } else {
    	status--;
    }
    if (status == 0) {
    	cm.sendNext("���Ǹ�����˹����ɫ֮�����µ���żʦ�����Ȼ���������ҵĲ�ż��ʽ... ������ǰ����ǻ��ˣ�������Ҿ����Ź��㡣�������ץ��������ô�������Ժ�ħ��ʦ֮�����ģ����Ի����㸶�����ۡ�", 9);
    } else if (status == 1) {
    	cm.sendNextPrev("#b(��ɫ֮������ʲô����Щ�ºͺ�ħ��ʦ����ʲô��ϵ������Ӧ�ð���Щ���鱨�����³��)#k", 3);
    } else if (status == 2) {
        cm.completeQuest(21719);
        cm.warp(105040200, 10);//104000004 
        cm.dispose();
    }
}