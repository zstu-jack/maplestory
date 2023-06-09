var quantities = Array(10, 8, 6, 5, 4, 3, 2, 1, 1, 1);
var prize1 = Array(1442047, 2000000, 2000001, 2000002, 2000003, 2000004, 2000005, 2430036, 2430037, 2430038, 2430039, 2430040); //1 day
var prize2 = Array(1442047, 4080100, 4080001, 4080002, 4080003, 4080004, 4080005, 4080006, 4080007, 4080008, 4080009, 4080010, 4080011);
var prize3 = Array(1442047, 1442048, 2022070);
var prize4 = Array(1442048, 2430082, 2430072); //7 day
var prize5 = Array(1442048, 2430091, 2430092, 2430093, 2430101, 2430102); //10 day
var prize6 = Array(1442048, 1442050, 2430073, 2430074, 2430075, 2430076, 2430077); //15 day
var prize7 = Array(1442050, 3010183, 3010182, 3010053, 2430080); //20 day
var prize8 = Array(1442050, 3010178, 3010177, 3010075, 1442049, 2430053, 2430054, 2430055, 2430056, 2430103, 2430136); //30 day
var prize9 = Array(1442049, 3010123, 3010175, 3010170, 3010172, 3010173, 2430201, 2430228, 2430229); //60 day
var prize10 = Array(1442049, 3010172, 3010171, 3010169, 3010168, 3010161, 2430117, 2430118, 2430119, 2430120, 2430137); //1 year
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}	
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {	
			cm.sendNext("��ã�����#p" + cm.getNpc() + "#k��������пյĻ�...���Ը���һ��������˵��Щ���ڸ�����֯ #r�#k �����Ҳ���һ����ȥ...��ô����Ը�����һ��ȥ������");
		} else if (status == 1) {	
			cm.sendSimple("�ţ�������Щ����ţ���������...\r\n#L0##e1.#n#b����ʲô���Ļ��#k#l\r\n#L1##e2.#n#b��Ϊ����ϸ˵������ݡ�#k#l\r\n#L2##e3.#n#b�õģ������볡�ɣ�#k#l\r\n#L3##e4.#n#bʹ����ʤ֤���齻�����ߡ�#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendNext("����MapleStory Global����֮��ȫ�������������������ڽ��У�GM����������ڼ�ٰ����˾�ϲ��GM�������ʱ��ע��ϵͳ��ʾ����֤�����ܲμ�һ�λ��Ӯȡ������");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendSimple("�ӵ�ж�����Ϸ���ݡ��ڲ��뵽��Ϸ��֮ǰ�˽���Ϸ�淨�Ǻ��а����ġ�ѡ��һ������Ҫ�˽����Ϸ�ɣ�#b\r\n#L0#��¥~��¥~#l\r\n#L1#��ߵ�#l\r\n#L2#ѩ����#l\r\n#L3#Ҭ�ӱ���#l\r\n#L4#OX�ʴ�#l\r\n#L5#Ѱ����Ϸ#l#k");
			} else if (selection == 2) {
				var marr = cm.getQuestRecord(100295);
				if (marr.getCustomData() == null) {
					marr.setCustomData("0");
				}
				var dat = parseInt(marr.getCustomData());
				if (dat + 3600000 >= cm.getCurrentTime()) {
					cm.sendNext("���ڹ�ȥ��1Сʱ�ڲμӹ���ˡ�");
				} else if (!cm.canHold(4031019)) {
					cm.sendNext("���ڳ������ռ䡣");
				} else if (cm.getChannelServer().getEvent() > -1 && !cm.haveItem(4031019)) {
					cm.getPlayer().saveLocation("EVENT");
					cm.getPlayer().setChalkboard(null);
					marr.setCustomData("" + cm.getCurrentTime());
					cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
				} else {
					cm.sendNext("�����ǻĿǰ��δ��ʼ���ѳ���#b��ħ�ļ�#k������24Сʱ�ڲμӹ��������޷��볡�����Ժ����ԡ�");
				}
				cm.dispose();
			} else if (selection == 3) {
				var selStr = "������������ʤ֤����һ����ߣ�";
				for (var i = 0; i < quantities.length; i++) {
					selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# ����(" + quantities[i] + ")#l";
				}
				cm.sendSimple(selStr);
				status = 9;
			}
		} else if (status == 3) {
			if (selection == 0) {
				cm.sendNext("#b[��¥~��¥~]#k�У���������Ҫʹ�����ݵִ���߲㡣�����������ڶഫ�͵�������֮��ѡ����ȷ�����ȥ����һ�㡣\r\n\r\n��Ϸ��ͼ��Ϊ���㣬ʱ������Ϊ#b6����#k����[��¥~��¥~]��С�#b�޷�������Ծ��ʹ�ÿ����ƶ����Ṧ��Ҳ����ʹ�õ��������ƶ��ٶ�#k��������д������ڽ����������ֵĵط����������������ǡ�");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendNext("#b[��ߵ�]��һ���ϰ���#k�����̿�ɭ��������ͬ��֮���ʱ��������Խ�����ָ������ϰ��ﵽ�յ㼴�ɻ�ʤ��\r\n\r\n������ĸ��ؿ���ʱ������Ϊ #b15����#k����[��ߵ�]��У��޷�ʹ�ÿ����ƶ����Ṧ���ܡ�");
				cm.dispose();
			} else if (selection == 2) {
				cm.sendNext("#b[ѩ����]#k�У���ҽ���ΪMaple�Ӻ�Story����֧����չ����������ƴ��һ��#b��ʱ��������ѩ������ľ����Զ�����������#k������ڹ涨ʱ�������Ӷ�û�н�ѩ���Ƶ��յ㣬���Ƶý�Զ��һ�ӻ�ʤ��\r\n\r\n��Ҫʹѩ��������밴#bCtrl��#k����ѩ������Զ�̹����뼼�ܹ����ڵ�ͼ�о���ʧЧ��#bֻ�н�����ͨ�����ܹ���Ч#k��\r\n\r\n���һ����ɫ����ѩ����/�����ᱻ�ͻ���㡣���������㸽����ѩ�˿��谭�Է���ѩ��������������Ҫ���Ĳ߻�ս�ԣ������ù���ѩ����ѩ��֮��Ķ�Ա�ֹ���");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendNext("#b[Ҭ�ӱ���]#k�У���ҽ���ΪMaple�Ӻ�Story����֧����չ����������#b�ռ�����Ҭ�ӵĶ���#kΪʤ��ʱ������Ϊ#b5����#k�������������ƽ�֣����ʱ2����������ʤ�ߡ���������Ȼ��ƽ����������ƽ�ָ��ա�\r\n\r\n����Զ�̹����뼼�ܹ����ڵ�ͼ�о���ʧЧ��#bֻ�н�����ͨ�����ܹ���Ч#k�����û��Я��һ����ս����������ͨ�����ͼ�е�NPC�������۽�ɫӵ�������ĵȼ����������ܣ�����ɵ��˺��������κ�����\r\n\r\n��С�ĵ�ͼ�е��ϰ������塣�����ɫ�ڻ��ͼ���������������ͳ�ͼ����Ҭ�ӵ���ǰ�������һ�ι�������һ�Ӯ����öҬ�ӵķ�����ֻ����ȫ��ص�Ҭ�ӲŻ�Ʒ֣�Ҳ����˵û�д��������䣬��ͻȻ��ʧ��Ҭ�Ӳ��ᱻ�Ʒ֡���ͼ�ײ���һö�����ϴ������صĴ��͵㣬�������������");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendNext("#b[OX�ʴ�]#k�ǿ��ٱ��ð�յ�֪ʶ�Դ����Ϸ���μ���Ϸ�������Ҫ�鿴����#bM#kʱ������С��ͼ��ȷ��X��O��λ�á���Ŀ�ܹ���#r10��#k����������������ҽ����ʤ��\r\n\r\nһ��GM������Ŀ�������Ҫ��X��O��ѡ����ȷѡ�վ��̨�ס�û��ѡ����Լ��ڴﵽʱ������ʱ��Ȼ��ԥ���������Ҳ����Ϊ�����˴���𰸣�ͬ���ᱻ���ͳ�ͼ��������Ļ����[��ȷ]����֮ǰ����վ����̨���ϣ���Ҫ�����ƶ���Ϊ�˷�ֹ�κ���ʽ�����ף���OX�ʴ��ڼ佫��������������Ƶ�����졣");
				cm.dispose();
			} else if (selection == 5) {
				cm.sendNext("#b[Ѱ����Ϸ]#k��#b��10������#k��Ѱ�������ڸ���ͼ�ڵ�#b�ر�ͼ#kΪĿ�����Ϸ��ÿ�����䶼�������صĲر��䣬һ���ÿ����ǣ����л����ø��ֵ��ߡ�����Ҫ����Щ�������ҵ��ر�ͼ��\r\n������Ա�#b��ͨ����#k���ƻ���һ����òر�ͼ���Ϳ���ͨ�������׵��ߵ�NPC������ħ�ļ�������NPC����Ѱ����Ϸ��ͼ������������Ҳ����������۵�#b����#k���ｻ����\r\n\r\n�ڻ�У���ͼ�������ص���ںʹ��͵㡣��ʹ�����ǵĻ���ֻҪ�ڶ�Ӧ�ص㰴#b[��[��#k���Ϳ��Դ��͵���һ�������ŵ���������Ҳ�п��ܷ������ص����ӻ����ӡ�Ҳ��Щ�����ڱ��򿪺�Ὣ�㴫�͵����ص�ͼ����Щ���ر���ֻ��ͨ�����ź���ܷ��֣�����ϸ������\r\n\r\n��Ѱ����Ϸ�У�һ�й������ܶ�����#r����#k������ֻ��ʹ����ͨ�����򿪱��䡣");
				cm.dispose();
			}
		} else if (status == 10) {
			if (selection < 0 || selection > quantities.length) {
				return;
			}
			var ite = 4031332 + selection;
			var quan = quantities[selection];
			var pri;
			switch(selection) {
				case 0:
					pri = prize1;
					break;
				case 1:
					pri = prize2;
					break;
				case 2:
					pri = prize3;
					break;
				case 3:
					pri = prize4;
					break;
				case 4:
					pri = prize5;
					break;
				case 5:
					pri = prize6;
					break;
				case 6:
					pri = prize7;
					break;
				case 7:
					pri = prize8;
					break;
				case 8:
					pri = prize9;
					break;
				case 9:
					pri = prize10;
					break;
				default:
					cm.dispose();
					return;
			}
			var rand = Math.floor(Math.random() * pri.length);
			if (!cm.haveItem(ite, quan)) {
				cm.sendOk("You need #b" + quan + " #t" + ite + "##k to exchange it with item.");
			} else if (cm.getInventory(1).getNextFreeSlot() <= -1 || cm.getInventory(2).getNextFreeSlot() <= -1 || cm.getInventory(3).getNextFreeSlot() <= -1 || cm.getInventory(4).getNextFreeSlot() <= -1) {
				cm.sendOk("You need space for this item.");
			} else {
				cm.gainItem(pri[rand], 1);
				cm.gainItem(ite, -quan);
				cm.gainMeso(100000 * selection); //temporary prize lolol
			}
			cm.dispose();
		}
	}
}