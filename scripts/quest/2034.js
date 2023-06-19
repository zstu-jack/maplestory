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
		qm.sendNext("我就知道。。。你可以很快完成的! 上次你做得很好, 你又来办理业务了啊？ 好吧,你做的这么棒, 我想报答你. #b#p1051000##k 拿着吧，勇士，希望你今后的旅行更加顺利。");
	}

	else if(status == 1) {
	    if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
		qm.sendOk("你的装备栏满了.");
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
            
            qm.sendOk("好吧, 如果你以后需要工作，请随时回来找我。这个小镇肯定会需要像你这样的人来帮忙~");
        }

        else if (status == 2) {
            qm.dispose();
        }
}