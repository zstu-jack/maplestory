/*
	Serryl (1091003)
	Location: The Nautilus
*/

/**
	Author: xQuasar
*/

function start() {
	cm.getPlayer().setCS(true);
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else
		cm.dispose();
	if (status == 0 && mode == 1) {
		var selStr = "什么？你想自己制作武器和手套？不是开玩笑吗...如果没有经验的话，自己动手制作是很困难的...交给我这个有20年制作经验的老手吧。这对我来说再简单不过了。";
		var options = new Array("制作拳甲","制作手枪","制作手套");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#b#L" + i + "# " + options[i] + "#l#k";
		}
			
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType == 0){ //Making a Knuckler
			var selStr = "只要你有所需的材料，我就可以为你制作上好的拳甲，你想制作哪种？";
			var knucklers = new Array("拳甲 (等级限制：15级，海盗)", "格斗指虎 (等级限制：20级，海盗)", "三日月冲拳 (等级限制：25级，海盗)", "全覆式拳甲 (等级限制：30级，海盗)", "双翼拳甲 (等级限制：35级，海盗)", "刺棘拳甲 (等级限制：40级，海盗)", "蛇吻 (等级限制：50级，海盗)");
			for (var i = 0; i < knucklers.length; i++){
				selStr += "\r\n#b#L" + i + "# " + knucklers[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 1){ //Making a Gun
			var selStr = "只要你有所需的材料，我就可以为你制作上好的手枪，你想制作哪种？";
			var guns = new Array("单发手铳 (等级限制：15级，海盗)", "大型手铳 (等级限制：20级，海盗)", "突击手铳 (等级限制：25级，海盗)", "银枪 (等级限制：30级，海盗)", "红杰克 (等级限制：35级，海盗)", "黑郁金香 (等级限制：40级，海盗)", "金钱豹 (等级限制：50级，海盗)");
			for (var i = 0; i < guns.length; i++){
				selStr += "\r\n#b#L" + i + "# " + guns[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //Making a pair of pirate gloves
			var selStr = "只要你有所需的材料，我就可以为你制作上好的手套，你想制作哪种？";
			var gloves = new Array ("胶皮手套","皮腕轮","铜腕轮","摸鱼手","鲨皮手套","追命","幽明","搜魂");
			for (var i = 0; i < gloves.length; i++){
				selStr += "\r\n#b#L" + i + "# " + gloves[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		if (equip)
			status++;
	}
	else if (status == 3 && mode == 1) {
		if (equip)
		{
			selectedItem = selection;
			qty = 1;
		}
		else
			qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

		if (selectedType == 0){ //Making a Knuckler
			var itemSet = new Array(1482001, 1482002, 1482003, 1482004, 1482005, 1482006, 1482007);
			var matSet = new Array(4000021, new Array(4011001,4011000,4000021,4003000), new Array(4011000,4011001,4003000), new Array(4011000,4011001,4000021,4003000), new Array(4011000,4011001,4000021,4003000), new Array(4011000,4011001,4021000,4000021,4003000), new Array(4000039,4011000,4011001,4000030,4000021,4003000));
			var matQtySet = new Array(20, new Array(1,1,10,5), new Array(2,1,10), new Array(1,1,30,10), new Array(2,2,30,20), new Array(1,1,2,50,20), new Array(150,1,2,20,20,20));
			var costSet = new Array(1000,2000,5000,15000,30000,50000,100000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
		else if (selectedType == 1){ //Making a Gun
			var itemSet = new Array(1492001, 1492002, 1492003, 1492004, 1492005, 1492006, 1492007);
			var matSet = new Array(new Array(4011000,4003000,4003001), new Array(4011000,4003000,4003001,4000021), new Array(4011000,4003000), new Array(4011001,4000021,4003000), new Array(4011006,4011001,4000021,4003000), new Array(4011004,4011001,4000021,4003000), new Array(4011006,4011004,4011001,4000030,4003000));
			var matQtySet = new Array(new Array(1,5,1), new Array(1,10,5,10), new Array(2,10), new Array(2,10,10), new Array(10,2,5,10), new Array(1,2,10,20), new Array(1,2,4,30,30));
			var costSet = new Array (1000,2000,5000,15000,30000,50000,100000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
		else if (selectedType == 2){ //Making a pair of pirate gloves
			var itemSet = new Array(1082180, 1082183, 1082186, 1082189, 1082192, 1082195, 1082198, 1082201);
			var matSet = new Array(new Array(4000021,4021003),4000021,new Array(4011000,4000021),new Array(4021006,4000021,4003000),new Array(4011000,4000021,4003000),new Array(4000021,4011000,4011001,4003000),new Array(4011000,4000021,4000030,4003000),new Array(4011007,4021008,4021007,4000030,4003000));
			var matQtySet = new Array(new Array(15,1),35,new Array(2,20),new Array(2,50,10),new Array(3,60,15),new Array(80,3,3,25),new Array(3,20,40,30),new Array(1,1,1,50,50));
			var costSet = new Array(1000,8000,15000,25000,30000,40000,50000,70000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50,60);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
			
		prompt = "制作一件 #t" + item + "# 需要以下清单中列出的材料。这件物品的装备等级限制是" + levelLimit + "，请在制作前确定你真的需要它。怎么样，确定要制作吗？\r\n";
		
		if (mats instanceof Array){
			for(var i = 0; i < mats.length; i++){
				prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
		}
		
		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost * qty + " 金币";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 4 && mode == 1) {
		var pass = true;

                if(!cm.canHold(item)) {
                    cm.sendOk("请检查你的物品栏是否有足够空间。");
                    cm.dispose();
                    return;
                }
		else if (cm.getMeso() < cost * qty)
			{
				cm.sendNext("请确保你拥有制作道具所需的一切材料。另外，要保证装备栏的空间足够。如果装备栏已满，我将无法为你制作。");
                                cm.dispose();
                                return;
			}
		else
			{
                            if (mats instanceof Array) {
                                for(var i = 0; pass && i < mats.length; i++)
                                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                                        pass = false;
                            }
                            else if (!cm.haveItem(mats, matQty * qty))
                                pass = false;
				/*if (mats instanceof Array) {
					for(var i = 0; pass && i < mats.length; i++)
					{
						if (matQty[i] * qty == 1)	{
							if (!cm.haveItem(mats[i]))
							{
								pass = false;
							}
						}
						else {
							var count = 0;
							var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
							while (iter.hasNext()) {
								count += iter.next().getQuantity();
							}
							if (count < matQty[i] * qty)
								pass = false;
						}					
					}
				}
				else {
					var count = 0;
					var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
					while (iter.hasNext()) {
						count += iter.next().getQuantity();
					}
					if (count < matQty * qty)
						pass = false;
				}
                                */
			}
			
			if (pass == false) 
				cm.sendNext("请确保你拥有制作道具所需的一切材料。另外，要保证装备栏的空间足够。如果装备栏已满，我将无法为你制作。");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i] * qty);
					}
				}
				else
					cm.gainItem(mats, -matQty * qty);
					
				if (cost > 0)
					cm.gainMeso(-cost * qty);
				
				if (item == 4003000)//screws
					cm.gainItem(4003000, 15 * qty);
				else
					cm.gainItem(item, qty);
				cm.sendOk("做好了。如果你还有别的需要...总之，我会一直呆这儿。");
			}
		cm.dispose();
	}
}