importPackage(Packages.client);

var item;
var status = -1;
var item;

function end(mode, type, selection) {
	if(mode == 0) {
		qm.dispose();
		return;
	}
        status++;

	if(status == 0) {
		qm.sendNext("�Ҿ�֪������������Ժܿ���ɵ�! �ϴ������úܺ�, ����������ҵ���˰��� �ð�,��������ô��, ���뱨����. #b#p1051000##k ���Űɣ���ʿ��ϣ����������и���˳����");
	}

	else if(status == 1) {
	    if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
		qm.sendOk("���װ��������.");
		qm.dispose();
		return;
	    }

            var stance = qm.getPlayer().getJobStyle();
            if(stance == Packages.client.MapleJob.WARRIOR) item = 1072003;
            else if(stance == Packages.client.MapleJob.MAGICIAN) item = 1072077;
            else if(stance == Packages.client.MapleJob.BOWMAN || stance == Packages.client.MapleJob.CROSSBOWMAN) item = 1072081;
            else if(stance == Packages.client.MapleJob.THIEF) item = 1072035;
            else if(stance == Packages.client.MapleJob.BRAWLER || stance == Packages.client.MapleJob.GUNSLINGER) item = 1072294;
            else item = 1072018;
         
            qm.gainItem(item, 1);
            qm.gainItem(4000007, -150);
            qm.gainExp(2200);
            qm.completeQuest();
            
            qm.sendOk("�ð�, ������Ժ���Ҫ����������ʱ�������ҡ����С��϶�����Ҫ����������������æ~");
        }

        else if (status == 2) {
            qm.dispose();
        }
}