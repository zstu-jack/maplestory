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
                if(cm.isQuestStarted(21728)) {
                        cm.sendOk("����Ѱ����żʦ�����������ƺ��й�ǿ��������ڵ�·ǰ���赲��...��û�ȥ��#b#p1061019##k��");
                        cm.setQuestProgress(21728, 21761, 0);
                        cm.dispose();
                        return;
                }
            
		cm.sendGetText("���ɵ��������������ܵľ��ף��������ʵ���#b������ʲô#k��");
	}
	else if(status == 1){
                if(cm.getText() == "Francis is a genius Puppeteer!"){//Ҫ����������������
			if(cm.isQuestStarted(20730) && cm.getQuestProgressInt(20730, 9300285) == 0)
				cm.warp(910510001, 1);
                        else if(cm.isQuestStarted(21731) && cm.getQuestProgressInt(21731, 9300346) == 0)
				cm.warp(910510001, 1);
			else
                                cm.playerMessage(5, "��������ȷ�Ĵ𰸣�Ȼ����һ�����ص�������ֹ��ǰ����");

			cm.dispose();
		}
		else{
			cm.sendOk("#r����ˣ�#k");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}