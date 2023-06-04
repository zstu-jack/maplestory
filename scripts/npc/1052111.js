/*
	Trash Can 3
	Kerning Subway
*/

var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1){
		cm.dispose();
		return;
	}
	else{
		if(mode == 0 && status == 0){
			cm.dispose();
			return;
		}
		else if(mode == 0)
			status--;
		else
			status++;

		if(status == 0) {
			if(cm.isQuestStarted(20710)) {
				if(!cm.hasItem(4032136)) {
					if(cm.canHold(4032136)) {
						cm.gainItem(4032136, 1);
						cm.sendNext("你在垃圾桶里发现了一个#b#t4032136##k！  #i4032136#");//You have found a #b#t4032136##k in the trash can!   #i4032136#语序
					} else {
						cm.sendOk("其他栏空间不足，装不下#i4032136#。");//Not enough space in your ETC inventory.（ETC是其他栏的意思）
					}
				} else {
					cm.sendOk("只是一个随处可见的垃圾桶。");//Just a trash can sitting there.结合上下文，只是一个随处可见的垃圾桶。
				}
			} else {
				cm.sendOk("只是一个随处可见的垃圾桶。");
			}
		} else if(status == 1){
			cm.dispose();
		}
	}
}