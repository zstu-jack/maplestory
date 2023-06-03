function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(status == 0){
			cm.sendSimple("当你到达10级时，你会了解的，但如果你想提前做好准备，你可以查看以下信息。\r\n\r\n 告诉我，你想知道什么?\r\n#b#L0#关于你#l\r\n#L1#小地图#l\r\n#L2#任务窗口w#l\r\n#L3#物品栏#l\r\n#L4#普通攻击狩猎#l\r\n#L5#如何拾取物品#l\r\n#L6#如何装备物品#l\r\n#L7#技能栏#l\r\n#L8#如何使用快捷栏#l\r\n#L9#如何攻击箱子#l\r\n#L10#如何坐在椅子上#l\r\n#L11#世界地图#l\r\n#L12#任务通知#l\r\n#L13#数据统计#l\r\n#L14#天鹅座骑士是谁?#l");
	    } else if(status == 1){
			if(selection == 0){
				cm.sendNext("我在女孩希纳斯的守护者神兽。我的主人————女皇，命令我引导每一个来到冒险世界的人加入女皇骑士团。我将协助并跟随你，直到你成为骑士的那一天。如果有任何问题，随时咨询我。");
		    } else if(selection == 1){
				cm.guideHint(1);
				cm.dispose();
			} else if(selection == 2){
				cm.guideHint(2);
				cm.dispose();
			} else if(selection == 3){
				cm.guideHint(3);
				cm.dispose();
			} else if(selection == 4){
				cm.guideHint(4);
				cm.dispose();
			} else if(selection == 5){
				cm.guideHint(5);
				cm.dispose();
			} else if(selection == 6){
				cm.guideHint(6);
				cm.dispose();
			} else if(selection == 7){
				cm.guideHint(7);
				cm.dispose();
			} else if(selection == 8){
				cm.guideHint(8);
				cm.dispose();
			} else if(selection == 9){
				cm.guideHint(9);
				cm.dispose();
			} else if(selection == 10){
				cm.guideHint(10);
				cm.dispose();
			} else if(selection == 11){
				cm.guideHint(11);
				cm.dispose();
			} else if(selection == 12){
				cm.guideHint(12);
				cm.dispose();
			} else if(selection == 13){
				cm.guideHint(13);
				cm.dispose();				
			} else if(selection == 14){
				cm.sendOk("黑魔法师正试图改变并征服我们和平的冒险岛世界。为了应对风险，女皇成立了骑士团，现在被称为女皇骑士团。当你达到10级时，你可以成为一名骑士。");
				cm.dispose();
			} 
		}else if(status == 2){
				cm.sendNextPrev("不用担心。你在游玩过程中会逐渐学到基本技能。你达到10级后，你可以随时问我问题，所以不用着急。");
				cm.dispose();
			}
	}
}