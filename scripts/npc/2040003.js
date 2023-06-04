var status = 0;
var entry;
function start() {
	if(cm.getPlayer().getMapId() == 922000000) {
		entry = 0;
		cm.sendYesNo("你要离开本关卡吗？");
		status++;
	}

	else if(cm.isQuestStarted(3239)) {
		entry = 1;
		cm.sendYesNo("你想要进入 #b玩具工厂 <第4地区>#k 吗？");
		status++;
	}
	else {
		cm.sendOk("#b玩具工厂 <第4地区>#k 不会对无关市民开放。");
	}
}

function action(mode, type, selection) {
	if(status == 1) {
		if(entry == 0) {
			if(mode <= 0) {
				cm.sendOk("好的，如果你急着离开，就回来找我。");
				cm.dispose();
				return;
			}
			
			cm.warp(922000009, 0);
			if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
			cm.dispose();
		}

		else {
			if(mode <= 0) {
				cm.dispose();
				return;
			}
                        
                        if(cm.getWarpMap(922000000).countPlayers() == 0) {
                                cm.warp(922000000, 0);
                                if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
                        } else {
                                cm.sendOk("其他人已经入场尝试回收零件，请等待他们完成后再尝试进入。");
                        }
	
			cm.dispose();		
		}
	}
}