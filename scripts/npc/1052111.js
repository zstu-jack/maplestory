/*
	Trash Can 3
	Kerning Subway
*/

var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1){
		cm.dispose();
		return;
	}
	else{
		if(mode == 0 && status == 0){
			cm.dispose();
			return;
		}
		else if(mode == 0)
			status--;
		else
			status++;

		if(status == 0) {
			if(cm.isQuestStarted(20710)) {
				if(!cm.hasItem(4032136)) {
					if(cm.canHold(4032136)) {
						cm.gainItem(4032136, 1);
						cm.sendNext("�㷢��һ�� #b#t4032136##k ������Ͱ��!   #i4032136#");
					} else {
						cm.sendOk("#i4032136# �����ռ䲻���ˡ�");
					}
				} else {
					cm.sendOk("����ֻ��һ������Ͱ��");
				}
			} else {
				cm.sendOk("����ֻ��һ������Ͱ��");
			}
		} else if(status == 1){
			cm.dispose();
		}
	}
}