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
			cm.sendOk("������������������1��ռ䡣");
		} else {
			cm.gainItem(itemid,1);
			cm.warp(910320000, 0);
		}
		cm.dispose();
	} else if (cm.getMapId() >= 910320100 && cm.getMapId() <= 910320304) {
		cm.sendYesNo("����Ҫ�뿪������");
		status = 99;
	} else {
		cm.sendSimple("�����ֳ�����\r\n#b#e#L1#��������ҳ���վ̨��#l#n\r\n#L2#ǰ��999���г�ƽ̨��#l\r\n#L3#��ȡ<��������Աѫ��>��#l#k");
	}
    } else if (status == 2) {
		section = selection;
		if (selection == 1) {
			if (cm.getPlayer().getLevel() < 25 || cm.getPlayer().getLevel() > 30 || !cm.isLeader()) {
				cm.sendOk("��ɶ�����ɶӳ����жԻ�����Ҫ���ж�Ա�ȼ���25~30������.");
			} else {
				if (!cm.start_PyramidSubway(-1)) {
					cm.sendOk("�����ҳ���վ̨Ŀǰ��Ա�ˡ�");
				}
			}
			//todo
		} else if (selection == 2) {
			if (cm.haveItem(4001321)) {
				if (cm.bonus_PyramidSubway(-1)) {
					cm.gainItem(4001321, -1);
				} else {
					cm.sendOk("999���г�ƽ̨Ŀǰ��Ա�ˡ�");
				}
			} else {
				cm.sendOk("��û��999���г���Ʊ��");
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
				cm.sendOk("����� 10,000 ֻվ̨�ڵĹ����������ҶԻ�����ɱ���� " + mons);
			} else if (cm.canHold(1142141) && !cm.haveItem(1142141)){
				cm.gainItem(1142141,1);
				cm.startQuest(29931);
				cm.completeQuest(29931);
			} else {
				cm.sendOk("��ı����ռ䲻�㡣");
			}
		}
		cm.dispose();
	} else if (status == 100) {
		cm.warp(910320000,0);
		cm.dispose();
	}
}