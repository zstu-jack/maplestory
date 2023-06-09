var status = -1;
var exchangeItem = 4000438;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("这些怪物都是小菜一碟！我只要一剑挥下，它们就都会全被杀光...不过最好先搞到一把剑再说。#b\r\n#L0#这些藤条给你。你应该可以用它们做一把更好的剑。#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你拥有的数量不够... 我需要至少100个。");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("好主意！我可以给你 #i4310000#绝对音感 来交换每100只你给我的 #i" + exchangeItem + "##t" + exchangeItem + "#。你想交换多少？(目前拥有：" + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("我是请在其他栏腾出足够空间。");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感激不尽。");
	    }
	}
        cm.dispose();
    }
}