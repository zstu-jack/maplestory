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
		cm.sendGetText("这里是封印的寺院入口...#b暗号#k！");
	}
	else if(status == 1){
                if(cm.getWarpMap(925040100).countPlayers() > 0) {
                        cm.sendOk("已经有人进入了封印的寺院。");
                        cm.dispose();
                        return;
                }
		if(cm.getText() == "Actions speak louder than words"){//事实胜于雄辩，但这个要和任务文本对应去改。
			if(cm.isQuestStarted(21747) && cm.getQuestProgressInt(21747, 9300351) == 0)
				cm.warp(925040100, 0);
                        else
                                cm.playerMessage(5, "说出了正确答案，但仍有一股神秘的力量在入口处阻挡。");

			cm.dispose();
		}
		else{
			cm.sendOk("#r答案错误#k！");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}