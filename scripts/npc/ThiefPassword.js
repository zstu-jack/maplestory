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
		cm.sendGetText("可疑的声音打破了四周的静谧，那声音问道：#b暗号是什么#k？");
	}
	else if(status == 1){
		if(cm.getText() == "芝麻开门"){
			if(cm.isQuestCompleted(3925))
				cm.warp(260010402, 1);//GMS的密码是Open Sesam，CMS的密码是芝麻开门
			else
                                cm.playerMessage(5, "说出了正确的暗号，然而宝库的大门纹丝不动。");

			cm.dispose();
		}
		else{
			cm.sendOk("#r暗号不对！");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}