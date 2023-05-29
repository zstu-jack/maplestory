/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*//*
status = -1;


var travelFrom = [777777777, 541000000];
var travelFee = [3000, 10000];

var travelMap = [800000000, 550000000];
var travelPlace = ["Mushroom Shrine of Japan", "Trend Zone of Malaysia"];
var travelPlaceShort = ["Mushroom Shrine", "Metropolis"];
var travelPlaceCountry = ["Japan", "Malaysia"];
var travelAgent = ["I", "#r#p9201135##k"];

var travelDescription = ["If you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times.",
                        "If you desire to feel the heat of the tropics on an upbeat environment, the residents of Malaysia are eager to welcome you. Also, the metropolis itself is the heart of the local economy, that place is known to always offer something to do or to visit around."];

var travelDescription2 = ["Check out the female shaman serving the Mushroom God, and I strongly recommend trying Takoyaki, Yakisoba, and other delocious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one.",
                        "Once there, I strongly suggest you to schedule a visit to Kampung Village. Why? Surely you've come to know about the fantasy theme park Spooky World? No? It's simply put the greatest theme park around there, it's worth a visit! Now, let's head over to the #bTrend Zone of Malaysia#k.";
var travelType;
var travelStatus;
var maps =[	[550000000,"吉隆大都市"],
			[551000000,"甘榜村"],
			[540000000,"中心商务区"],
			[541000000,"驳船码头城"],
			[800000000,"古代神社"],
			[801000000,"昭和村"],
			[200000000,"天空之城"],
			[211000000,"冰峰雪域"],
			[230000000,"水下世界"],
			[251000000,"百草堂"],
			[250000000,"武陵"],
			[260000000,"阿里安特"],
			[261000000,"玛加提亚"],
			[240000000,"神木村"],
			[220000000,"玩具城"],
			[222000000,"童话村"],
			[221000000,"地球防御本部"],
			[140000000,"里恩"],
			[270000000,"时间神殿·三个门"],
			[1000000,"彩虹村"],
			[130000000,"圣地"],
			[600000000,"新叶城"],
			[682000000,"闹鬼宅邸外部"],
			[610020006,"守护者的要塞"],
			[103040000,"废都广场大厅"],
			[103000000,"废弃都市"],
			[104000000,"明珠港"],
			[100000000,"射手村"],
			[101000000,"魔法密林"],
			[102000000,"勇士部落"],
			[120000000,"诺特勒斯码头"],
			[110000000,"黄金海滩"],
			[105040300,"林中之城"]
			];*/
var maps=[[1000000,0,0],
[130000000,0,0],
[140000000,0,0],
[104000000,0,0],
[100000000,0,0],
[101000000,0,0],
[102000000,0,0],
[103000000,0,0],
[120000000,0,0],
[105040300,0,0],
[110000000,0,0],
[200000000,0,0],
[211000000,0,0],
[230000000,0,0],
[220000000,0,0],
[222000000,0,0],
[240000000,0,0],
[251000000,0,0],
[250000000,0,0],
[260000000,0,0],
[261000000,0,0],
[221000000,0,0],
[270000000,0,0],
	[550000000,3000,300],
[551000000,3000,300],
[540000000,3000,300],
[541000000,3000,300],
[682000000,3000,300],
[800000000,3000,300],
[600000000,3000,300],
[801000000,3000,300],
[610020006,3000,300],
[103040000,3000,300],
];
var status = 0;
var selectedMap = -1;
var cost = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if ((status <= 2 && mode == 0) || (status == 5 && mode == 1)){
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (cm.getChar().getMapId() != 500000000 && cm.getChar().getMapId() != 702000000 && cm.getChar().getMapId() != 800000000 && cm.getChar().getMapId() != 600000000 && cm.getChar().getMapId() != 540000000 && cm.getChar().getMapId() != 550000000 && cm.getChar().getMapId() != 541000000) {
		if (status == 0) {
			status = 1;
			if (cm.getJob() == 0) {
				cm.sendNext("为了从繁忙的日常中解脱，去享受一趟旅游怎么样？不仅可以体验新颖的异国文化，还能学到不少东西的机会！我们冒险岛旅游公司为您准备了，丰富有趣的#b世界旅游#k套餐。谁说环游世界很贵？请放一万个心。我们的#b冒险岛世界旅游套餐#k只需要#b2900金币#k就可以享受全程。");
			} else {
				cm.sendNext("为了从繁忙的日常中解脱，去享受一趟旅游怎么样？不仅可以体验新颖的异国文化，还能学到不少东西的机会！我们冒险岛旅游公司为您准备了，丰富有趣的#b世界旅游#k套餐。谁说环游世界很贵？请放一万个心。我们的#b冒险岛世界旅游套餐#k只需要#b3000金币#k就可以享受全程。");
			}
		} else if (status == 1) {
			cm.sendSimple("现在就可以去往 #b泰国的水上市场,少林寺,日本古代神社#k游览一番。在各旅游地我都会为大家提供满意热诚的服务。那么请准备好，新手可以9折优惠。\r\n#b#L0#查看旅游线路.#k#l");
		} else if (status == 2) {
var selStr = "现在就可以去往 #b泰国的水上市场,少林寺,日本古代神社#k游览一番。在各旅游地我都会为大家提供满意热诚的服务。那么请准备好，新手可以9折优惠。#b";
				if (cm.getJob() == 0) {
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i][0] + "# ("+maps[i][2]+"金币)#l";
					}
				}else{
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i][0] + "# ("+maps[i][1]+"金币)#l";
					}
				}
				cm.sendSimple(selStr);
		} else if (status == 3) {
			selectedMap = selection;
			if (cm.getJob() == 0) {
				cost = maps[selectedMap][2];
			} else {
				cost = maps[selectedMap][1];
			}
			cm.sendYesNo("你已经决定好，确定要去 #b#m" + maps[selectedMap][0] + "##k吗？那么你将要付给我 #b" + cost +"金币#k. 你真的想去？");
		} else if (status == 4) {
			if (cm.getMeso() < cost) {
				cm.sendPrev("天啦,你钱不够! 这实在是太恐怖了!我不能带你去.");
			} else {
				cm.gainMeso(-cost);
				//cm.saveLocation("WORLDTOUR");
				cm.warp(maps[selectedMap][0]);
				cm.dispose();
			}
		}	
	} else if (cm.getChar().getMapId() == 500000000 || cm.getChar().getMapId() == 702000000 || cm.getChar().getMapId() == 800000000 || cm.getChar().getMapId() == 600000000 || cm.getChar().getMapId() == 540000000 || cm.getChar().getMapId() == 550000000 || cm.getChar().getMapId() == 551000000 || cm.getChar().getMapId() == 541000000 || cm.getChar().getMapId() == 220000000 || cm.getChar().getMapId() == 240000000) {
		if (status == 0) {
			cm.sendSimple ("世界旅游怎么样？很有趣吧。\r\n#L0##b返回 #k#l\r\n#L1##b继续观光#k#l");
		} else if (status == 1) {
			if (selection == 0) {
				cm.sendOk("好的，如果需要到别的地方旅游请记的告诉我。");
			} else if (selection == 1) {
				cm.sendOk("不想回去就再到处看看吧。等你想回去的时候再来告诉我。");
				cm.dispose();
			} 
		} else if (status == 2) {
			var map = -1;
			if (map == -1) {
				map = 100000000;
			}
			cm.warp(map);
			cm.dispose();
			}
		}
	}
}