var status = -1;
var exchangeItem = 4000439;

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
        cm.sendSimple("����#p2131001#����Ƭ������ǿ���ħ��ʦ��#b\r\n#L0#��Щʯ����㡣��Ӧ�ÿ���������ʩչħ����#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("��ӵ�е���������... ����Ҫ����100����");
	    cm.dispose();
	} else {
            // thanks yuxaij for noticing a few methods having parameters not matching the expected Math library function parameter types��ƥ��͸ĵ�������³Ҫ����
	    cm.sendGetNumber("�����⣡�ҿ��Ը��� #i4310000#�������� ������ÿ100������ҵ� #i" + exchangeItem + "##t" + exchangeItem + "#�����뽻�����٣�(Ŀǰӵ�У�" + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("�����������ڳ��㹻�ռ䡣");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("�м�������");
	    }
	}
        cm.dispose();
    }
}