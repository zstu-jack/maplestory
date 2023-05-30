var status = -1;
var itemids = Array(2040728, 2040729, 2040730, 2040731, 2040732, 2040733, 2040734, 2040735, 2040736, 2040737, 2040738, 2040739);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		cm.sendSimple("你好啊, #h0#。在我这里，你可以用蝙蝠怪的皮碎片换取奖励。\r\n\r\n#r#L1#兑换物品。#l#k");
	} else if (status == 1) {
		var selStr = "好的，让我瞧瞧你能兑换什么...\r\n\r\n#b";
		for (var i = 0; i < itemids.length; i++) {
			selStr += "#L" + i + "##i" + itemids[i] + "##z" + itemids[i] + "##l\r\n";
		}
		cm.sendSimple(selStr);
	} else if (status == 2) {
		if (!cm.canHold(itemids[selection], 1)) {
			cm.sendOk("背包空间不足。");
		} else if (!cm.haveItemWithId(4001261)) {
			cm.sendOk("碎片数量不足。");
		} else {
			cm.gainItem(4001261, -1);
			cm.gainItem(itemids[selection], 1);
			cm.sendOk("兑换成功。");
		}
		cm.dispose();
	}
}