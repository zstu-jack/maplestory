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
		cm.sendNext("...һ�Ű�ӰͻȻ���֣��������㣿��������ô�ᷢ���� #b#p1032001##k �ļ����أ�������������ʲô����ı...");
	}
	else if(status == 1){
		cm.sendNextPrev("�ҵð���Щ���鶼�������������������ҡ�");
	}
	else if(status == 2){
		cm.dispose();
	}
}