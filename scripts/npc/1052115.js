var status = 0;
var section = 0;
importPackage(java.lang);
//questid 29931, infoquest 7662

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 1) {
	if (cm.getMapId() == 910320001) {
		cm.warp(910320000, 0);
		cm.dispose();
	} else if (cm.getMapId() == 910330001) {
		var itemid = 4001321;
		if (!cm.canHold(itemid)) {
			cm.sendOk("请在其他栏留出至少1格空间。");
		} else {
			cm.gainItem(itemid,1);
			cm.warp(910320000, 0);
		}
		cm.dispose();
	} else if (cm.getMapId() >= 910320100 && cm.getMapId() <= 910320304) {
		cm.sendYesNo("你想要离开这里吗？");
		status = 99;
	} else {
		cm.sendSimple("我是林车长。\r\n#b#e#L1#进入积满灰尘的站台。#l#n\r\n#L2#前往999次列车平台。#l\r\n#L3#领取<荣誉乘务员勋章>。#l#k");
	}
    } else if (status == 2) {
		section = selection;
		if (selection == 1) {
			if (cm.getPlayer().getLevel() < 25 || cm.getPlayer().getLevel() > 30 || !cm.isLeader()) {
				cm.sendOk("组成队伍后，由队长进行对话。需要所有队员等级在25~30区间内.");
			} else {
				if (!cm.start_PyramidSubway(-1)) {
					cm.sendOk("积满灰尘的站台目前满员了。");
				}
			}
			//todo
		} else if (selection == 2) {
			if (cm.haveItem(4001321)) {
				if (cm.bonus_PyramidSubway(-1)) {
					cm.gainItem(4001321, -1);
				} else {
					cm.sendOk("999次列车平台目前满员了。");
				}
			} else {
				cm.sendOk("你没有999次列车车票。");
			}
		} else if (selection == 3) {
			var record = cm.getQuestRecord(7662);
			var data = record.getCustomData();
			if (data == null) {
				record.setCustomData("0");
				data = record.getCustomData();
			}
			var mons = parseInt(data);
			if (mons < 10000) {
				cm.sendOk("请击败 10,000 只站台内的怪物再来与我对话。击杀数： " + mons);
			} else if (cm.canHold(1142141) && !cm.haveItem(1142141)){
				cm.gainItem(1142141,1);
				cm.startQuest(29931);
				cm.completeQuest(29931);
			} else {
				cm.sendOk("你的背包空间不足。");
			}
		}
		cm.dispose();
	} else if (status == 100) {
		cm.warp(910320000,0);
		cm.dispose();
	}
}