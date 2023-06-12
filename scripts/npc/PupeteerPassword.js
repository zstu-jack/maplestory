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
                        cm.sendOk("你在寻找人偶师的线索，但似乎有股强大的力量在道路前方阻挡着...最好回去找#b#p1061019##k。");
                        cm.setQuestProgress(21728, 21761, 0);
                        cm.dispose();
                        return;
                }
            
		cm.sendGetText("可疑的声音打破了四周的静谧，那声音问道：#b暗号是什么#k？");
	}
	else if(status == 1){
                if(cm.getText() == "Francis is a genius Puppeteer!"){//要结合任务给出，跳过
			if(cm.isQuestStarted(20730) && cm.getQuestProgressInt(20730, 9300285) == 0)
				cm.warp(910510001, 1);
                        else if(cm.isQuestStarted(21731) && cm.getQuestProgressInt(21731, 9300346) == 0)
				cm.warp(910510001, 1);
			else
                                cm.playerMessage(5, "给出了正确的答案，然而有一股神秘的力量阻止着前进。");

			cm.dispose();
		}
		else{
			cm.sendOk("#r答错了！#k");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}