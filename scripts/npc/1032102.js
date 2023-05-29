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
			cm.sendOk("好吧，下次再见！");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
                    
		if (status == 0) {
			cm.sendYesNo("我是精灵——玛尔。如果你有一条15级或更高级别的宝贝龙宠物和一块进化之石，我可以进化你的宝贝龙。如果幸运的话，甚至可以进化得到黑龙！你想让我这么做吗？");
		} else if (status == 1) {
			if (cm.haveItem(5000028, 1)) {
				cm.gainItem(5000028, -1);
				cm.gainItem(5000029, 1);
				cm.sendOk("你是怎么得到这个蛋的，它已经孵化了！");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0) == null) {
				cm.sendOk("确保你的宠物装备在插槽第一格。");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getItemId() < 5000029 || cm.getPlayer().getPet(0).getItemId() > 5000033 || !cm.haveItem(5380000,1)) {
				cm.sendOk("我可能没办法帮助你. 你必须给我 #i5380000##t5380000#, 如果你的宠物是以下之一： #d#i5000029##t5000029##k, #g#i5000030##t5000030##k, #r#i5000031##t5000031##k, #b#i5000032##t5000032##k, 或者 #e#i5000033##t5000033##n 只要等级达到15级，我就可以帮你升级哟.");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getLevel() < 15) {
				cm.sendOk("你的宠物必须达到15级或以上才能进化。");
				cm.dispose();
			} else if (cm.haveItem(5000029,2) || cm.haveItem(5000030,2) || cm.haveItem(5000031,2) || cm.haveItem(5000032,2) || cm.haveItem(5000033,2)) {
				cm.sendSimple("我正在删除宝贝龙的数据 #r#L0#删除我的特殊栏第一格#l#k #b#L1#移除库存中的第一条龙#l#k #g#L2#不，谢谢#l#k");
			} else {
                                var i;
                            
                                for(i = 0; i < 3; i++) {
                                    if(cm.getPlayer().getPet(i) != null && cm.getPlayer().getPet(i).getItemId() == 5000029) {
                                        pet = cm.getPlayer().getPet(i);
                                        break;
                                    }
                                }
                                if(i == 3) {
                                    cm.sendOk("你没有待进化的宝贝龙，要么缺少#b#t5380000##k.");
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
					cm.sendOk("错误，请重试。");
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
					cm.sendOk("错误，请重试。");
					cm.dispose();
				}
				
                                /*if (name.equals(MapleItemInformationProvider.getInstance().getName(id))) {
				 	name = MapleItemInformationProvider.getInstance().getName(after);
				}*/
                
				cm.gainItem(5380000, -1);
				cm.evolvePet(i, after);
                                
				cm.sendOk("进化成功了! 它之前是 #i" + id + "# #t" + id + "#, 现在进化成了 #i" + after + "# #t" + after + "#!");
				cm.dispose();
			}
		} else if (status == 2) {
			if (selection == 0) {
				MapleInventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.CASH, 1, 1, true);
				cm.sendOk("您的特殊栏第一格已删除");
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
				cm.sendOk("移除成功。");
			} else if (selection == 2) {
				cm.sendOk("好的，期待下次见面。");
			}
			cm.dispose();
		}
	}
}