/*
	NPC: Small Tree Stump
	MAP: Victoria Road - Top of the Tree That Grew (101010103)
	QUEST: Maybe it's Arwen! (20716)
*/

var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;


	if(status == 0){
		if(cm.isQuestStarted(20716)){
			if(!cm.hasItem(4032142)){
				if(cm.canHold(4032142)){
					cm.gainItem(4032142, 1);
					cm.sendOk("��װ��һЩ�峺����Һ�� #i4032142#");
				}
				else
					cm.sendOk("��ȷ�����#r������#k�ж���Ŀո�");
			}
			else
				cm.sendOk("��Һ��ԴԴ���ϵĴ����С��׮��������");
		}
		else
			cm.sendOk("��Һ��ԴԴ���ϵĴ����С��׮��������");
	}
	else if(status == 1){
		cm.dispose();
		return;
	}
}