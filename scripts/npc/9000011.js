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
			cm.sendNext("你好，我是#p" + cm.getNpc() + "#k，如果你有空的话...可以跟我一起吗？我听说有些人在附近组织 #r活动#k ，但我不想一个人去...那么，你愿意和我一起去看看吗？");
		} else if (status == 1) {	
			cm.sendSimple("嗯？都有哪些活动？嗯，是这样的...\r\n#L0##e1.#n#b这是什么样的活动？#k#l\r\n#L1##e2.#n#b请为我详细说明活动内容。#k#l\r\n#L2##e3.#n#b好的，我们入场吧！#k#l\r\n#L3##e4.#n#b使用连胜证明书交换道具。#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendNext("本月MapleStory Global（枫之谷全球服）的三周年庆典正在进行！GM会在整个活动期间举办令人惊喜的GM活动，所以时刻注意系统提示，保证至少能参加一次活动来赢取奖励！");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendSimple("活动拥有多种游戏内容。在参与到游戏中之前了解游戏玩法是很有帮助的。选择一种你想要了解的游戏吧！#b\r\n#L0#上楼~上楼~#l\r\n#L1#向高地#l\r\n#L2#雪球赛#l\r\n#L3#椰子比赛#l\r\n#L4#OX问答#l\r\n#L5#寻宝游戏#l#k");
			} else if (selection == 2) {
				var marr = cm.getQuestRecord(100295);
				if (marr.getCustomData() == null) {
					marr.setCustomData("0");
				}
				var dat = parseInt(marr.getCustomData());
				if (dat + 3600000 >= cm.getCurrentTime()) {
					cm.sendNext("你在过去的1小时内参加过活动了。");
				} else if (!cm.canHold(4031019)) {
					cm.sendNext("请腾出背包空间。");
				} else if (cm.getChannelServer().getEvent() > -1 && !cm.haveItem(4031019)) {
					cm.getPlayer().saveLocation("EVENT");
					cm.getPlayer().setChalkboard(null);
					marr.setCustomData("" + cm.getCurrentTime());
					cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
				} else {
					cm.sendNext("可能是活动目前尚未开始、已持有#b恶魔文件#k，或在24小时内参加过活动，因而无法入场。请稍后再试。");
				}
				cm.dispose();
			} else if (selection == 3) {
				var selStr = "你想用哪种连胜证明书兑换道具？";
				for (var i = 0; i < quantities.length; i++) {
					selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# 交换(" + quantities[i] + ")#l";
				}
				cm.sendSimple(selStr);
				status = 9;
			}
		} else if (status == 3) {
			if (selection == 0) {
				cm.sendNext("#b[上楼~上楼~]#k中，参与者需要使用爬梯抵达最高层。向上爬，在众多传送点与梯子之中选择正确的入口去往下一层。\r\n\r\n游戏地图分为三层，时间限制为#b6分钟#k。在[上楼~上楼~]活动中。#b无法进行跳跃、使用快速移动和轻功，也不能使用道具增加移动速度#k。另外会有错误的入口将玩家送往奇怪的地方。所以请留意它们。");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendNext("#b[向高地]是一场障碍赛#k，和忍苦森林有异曲同工之妙。在时间限制内越过各种各样的障碍达到终点即可获胜。\r\n\r\n活动包含四个关卡，时间限制为 #b15分钟#k。在[向高地]活动中，无法使用快速移动和轻功技能。");
				cm.dispose();
			} else if (selection == 2) {
				cm.sendNext("#b[雪球赛]#k中，玩家将分为Maple队和Story队两支队伍展开较量，比拼哪一队#b在时间限制内雪球滚出的距离更远、体积更大者#k。如果在规定时间内两队都没有将雪球推到终点，则推得较远的一队获胜。\r\n\r\n若要使雪球滚动，请按#bCtrl键#k攻击雪球。所有远程攻击与技能攻击在地图中均会失效，#b只有近程普通攻击能够起效#k。\r\n\r\n如果一名角色碰到雪球，他/她将会被送回起点。攻击出发点附近的雪人可阻碍对方的雪球滚动。玩家们需要精心策划战略，决定好攻击雪球与雪人之间的队员分工。");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendNext("#b[椰子比赛]#k中，玩家将分为Maple队和Story队两支队伍展开较量，以#b收集更多椰子的队伍#k为胜。时间限制为#b5分钟#k。如果比赛出现平局，则加时2分钟来决出胜者。若分数仍然持平，比赛将以平局告终。\r\n\r\n所有远程攻击与技能攻击在地图中均会失效，#b只有近程普通攻击能够起效#k。如果没有携带一件近战武器，可以通过活动地图中的NPC购买。无论角色拥有怎样的等级、武器或技能，所造成的伤害不会有任何区别。\r\n\r\n请小心地图中的障碍与陷阱。如果角色在活动地图中死亡，将被传送出图。在椰子掉落前进行最后一次攻击的玩家会赢得这枚椰子的分数。只有完全落地的椰子才会计分，也就是说没有从树上脱落，或突然消失的椰子不会被计分。地图底部有一枚贝壳上存在隐藏的传送点，请合理利用它。");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendNext("#b[OX问答]#k是快速辨别冒险岛知识对错的游戏。参加游戏的玩家需要查看按下#bM#k时看到的小地图来确认X和O的位置。题目总共有#r10道#k，答对所有问题的玩家将会获胜。\r\n\r\n一旦GM给出题目，玩家需要在X和O中选择正确选项并站上台阶。没有选择答案以及在达到时间限制时仍然犹豫不定的玩家也将视为给出了错误答案，同样会被传送出图。请在屏幕出现[正确]字样之前保持站立在台阶上，不要进行移动。为了防止任何形式的作弊，在OX问答期间将会禁用所有种类的频道聊天。");
				cm.dispose();
			} else if (selection == 5) {
				cm.sendNext("#b[寻宝游戏]#k是#b在10分钟内#k以寻找隐藏在各地图内的#b藏宝图#k为目标的游戏。每个房间都藏有神秘的藏宝箱，一旦敲开他们，就有机会获得各种道具。你需要从这些道具中找到藏宝图。\r\n宝箱可以被#b普通攻击#k所破坏，一旦获得藏宝图，就可以通过负责交易道具的NPC交换恶魔文件。交易NPC会在寻宝游戏地图上现身，不过你也可以在明珠港的#b贝干#k那里交换。\r\n\r\n在活动中，地图里有隐藏的入口和传送点。想使用它们的话，只要在对应地点按#b[↑[键#k，就可以传送到另一处。试着到处跳跳，也有可能发现隐藏的梯子或绳子。也有些宝箱在被打开后会将你传送到隐藏地图，有些隐藏宝箱只有通过暗门后才能发现，请仔细搜索。\r\n\r\n在寻宝游戏中，一切攻击技能都将被#r禁用#k，所以只能使用普通攻击打开宝箱。");
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