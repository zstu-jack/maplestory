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
		cm.sendGetText("���ɵ��������������ܵľ��ף��������ʵ���#b������ʲô#k��");
	}
	else if(status == 1){
		if(cm.getText() == "֥�鿪��"){
			if(cm.isQuestCompleted(3925))
				cm.warp(260010402, 1);//GMS��������Open Sesam��CMS��������֥�鿪��
			else
                                cm.playerMessage(5, "˵������ȷ�İ��ţ�Ȼ������Ĵ�����˿������");

			cm.dispose();
		}
		else{
			cm.sendOk("#r���Ų��ԣ�");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}