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
			cm.sendOk("好吧，下次见..");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
                    
		if (status == 0) {
			cm.sendYesNo("我是妖精玛丽。如果你拥有一条15级或以上的幼龙、一块进化之石，我可以帮助它进化。如果运气不错的话，你会得到一条黑龙！想不想试一试？");
		} else if (status == 1) {
			if (cm.haveItem(5000028, 1)) {
				cm.gainItem(5000028, -1);
				cm.gainItem(5000029, 1);
				cm.sendOk("我不知道你是怎么弄到龙蛋的，不过现在它已经成功孵化了。");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0) == null) {
				cm.sendOk("请确认你的宠物龙已装备在1号栏");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getItemId() < 5000029 || cm.getPlayer().getPet(0).getItemId() > 5000033 || !cm.haveItem(5380000,1)) {
				cm.sendOk("你还不满足要求，你需要拿来一块#i5380000##t5380000#, 另外拥有#d#i5000029##t5000029##k, #g#i5000030##t5000030##k, #r#i5000031##t5000031##k, #b#i5000032##t5000032##k, #e#i5000033##t5000033##n 其中的一种，并把它装备在1号栏。");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getLevel() < 15) {
				cm.sendOk("幼年龙抵达15级后才能进化。");
				cm.dispose();
			} else if (cm.haveItem(5000029,2) || cm.haveItem(5000030,2) || cm.haveItem(5000031,2) || cm.haveItem(5000032,2) || cm.haveItem(5000033,2)) {
				cm.sendSimple("你拥有两条重复的进化龙，我可以为你销毁一条。请注意，销毁的进化龙将无法恢复。\r\n#r#L0#销毁现金栏第一格的物品.#l#k\r\n#b#L1#销毁背包中的第一只龙类宠物.#l#k\r\n#g#L2#不需要了，谢谢.#l#k");
			} else {
                                var i;
                            
                                for(i = 0; i < 3; i++) {
                                    if(cm.getPlayer().getPet(i) != null && cm.getPlayer().getPet(i).getItemId() == 5000029) {
                                        pet = cm.getPlayer().getPet(i);
                                        break;
                                    }
                                }
                                if(i == 3) {
                                    cm.sendOk("你没有可以进化的幼龙，或是没有携带 #b#t5380000##k.");
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
					cm.sendOk("发生了未知错误。");
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
					cm.sendOk("发生了未知错误。");
					cm.dispose();
				}
				
                                /*if (name.equals(MapleItemInformationProvider.getInstance().getName(id))) {
				 	name = MapleItemInformationProvider.getInstance().getName(after);
				}*/
                
				cm.gainItem(5380000, -1);
				cm.evolvePet(i, after);
                                
				cm.sendOk("你的幼龙进化成功了！它曾经是一条 #i" + id + "# #t" + id + "#, 现在进化为了 #i" + after + "# #t" + after + "#!");
				cm.dispose();
			}
		} else if (status == 2) {
			if (selection == 0) {
				MapleInventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.CASH, 1, 1, true);
				cm.sendOk("你现金物品栏的第一格物品已被销毁");
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
				cm.sendOk("背包中的第一只龙类宠物已被销毁.");
			} else if (selection == 2) {
				cm.sendOk("好的，下回见。");
			}
			cm.dispose();
		}
	}
}