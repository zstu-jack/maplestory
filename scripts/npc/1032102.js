/*
        @author RMZero213 (RaGEZONE)
	Just keep this header here and don't claim that you made it.
*/

/*
	1032102.js
	Mar the Fairy
	Dragon Evolver
*/

importPackage(Packages.client.inventory);
importPackage(Packages.client.inventory.manipulator);
importPackage(Packages.server);

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && type > 0) {
			cm.sendOk("�ðɣ��´��ټ���");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
                    
		if (status == 0) {
			cm.sendYesNo("���Ǿ��顪��������������һ��15������߼���ı����������һ�����֮ʯ���ҿ��Խ�����ı�������������˵Ļ����������Խ����õ�����������������ô����");
		} else if (status == 1) {
			if (cm.haveItem(5000028, 1)) {
				cm.gainItem(5000028, -1);
				cm.gainItem(5000029, 1);
				cm.sendOk("������ô�õ�������ģ����Ѿ������ˣ�");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0) == null) {
				cm.sendOk("ȷ����ĳ���װ���ڲ�۵�һ��");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getItemId() < 5000029 || cm.getPlayer().getPet(0).getItemId() > 5000033 || !cm.haveItem(5380000,1)) {
				cm.sendOk("�ҿ���û�취������. �������� #i5380000##t5380000#, �����ĳ���������֮һ�� #d#i5000029##t5000029##k, #g#i5000030##t5000030##k, #r#i5000031##t5000031##k, #b#i5000032##t5000032##k, ���� #e#i5000033##t5000033##n ֻҪ�ȼ��ﵽ15�����ҾͿ��԰�������Ӵ.");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getLevel() < 15) {
				cm.sendOk("��ĳ������ﵽ15�������ϲ��ܽ�����");
				cm.dispose();
			} else if (cm.haveItem(5000029,2) || cm.haveItem(5000030,2) || cm.haveItem(5000031,2) || cm.haveItem(5000032,2) || cm.haveItem(5000033,2)) {
				cm.sendSimple("������ɾ�������������� #r#L0#ɾ���ҵ���������һ��#l#k #b#L1#�Ƴ�����еĵ�һ����#l#k #g#L2#����лл#l#k");
			} else {
                                var i;
                            
                                for(i = 0; i < 3; i++) {
                                    if(cm.getPlayer().getPet(i) != null && cm.getPlayer().getPet(i).getItemId() == 5000029) {
                                        pet = cm.getPlayer().getPet(i);
                                        break;
                                    }
                                }
                                if(i == 3) {
                                    cm.sendOk("��û�д������ı�������Ҫôȱ��#b#t5380000##k.");
                                    cm.dispose();
                                    return;
                                }
                            
				var id = cm.getPlayer().getPet(i).getItemId();
				//var name = cm.getPlayer().getPet(i).getName();
				//var level = cm.getPlayer().getPet(i).getLevel();
				//var closeness = cm.getPlayer().getPet(i).getCloseness();
				//var fullness = cm.getPlayer().getPet(i).getFullness();
				//MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
				if (id < 5000029 || id > 5000033) {
					cm.sendOk("���������ԡ�");
					cm.dispose();
				}
				var rand = 1 + Math.floor(Math.random() * 10);
				var after = 0;
				if (rand >= 1 && rand <= 3) {
					after = 5000030;
				} else if (rand >= 4 && rand <= 6) {
					after = 5000031;
				} else if (rand >= 7 && rand <= 9) {
					after = 5000032;
				} else if (rand == 10) {
					after = 5000033;
				} else {
					cm.sendOk("���������ԡ�");
					cm.dispose();
				}
				
                                /*if (name.equals(MapleItemInformationProvider.getInstance().getName(id))) {
				 	name = MapleItemInformationProvider.getInstance().getName(after);
				}*/
                
				cm.gainItem(5380000, -1);
				cm.evolvePet(i, after);
                                
				cm.sendOk("�����ɹ���! ��֮ǰ�� #i" + id + "# #t" + id + "#, ���ڽ������� #i" + after + "# #t" + after + "#!");
				cm.dispose();
			}
		} else if (status == 2) {
			if (selection == 0) {
				MapleInventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.CASH, 1, 1, true);
				cm.sendOk("������������һ����ɾ��");
			} else if (selection == 1) {
				if (cm.haveItem(5000029, 2)) {
					cm.gainItem(5000029, -1);
				} else if (cm.haveItem(5000030, 2)) {
					cm.gainItem(5000030, -1);
				} else if (cm.haveItem(5000031, 2)) {
					cm.gainItem(5000031, -1);
				} else if (cm.haveItem(5000032, 2)) {
					cm.gainItem(5000032, -1);
				} else if (cm.haveItem(5000033, 2)) {
					cm.gainItem(5000033, -1);
				}
				cm.sendOk("�Ƴ��ɹ���");
			} else if (selection == 2) {
				cm.sendOk("�õģ��ڴ��´μ��档");
			}
			cm.dispose();
		}
	}
}