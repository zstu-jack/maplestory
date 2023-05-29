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
var maps =[	[550000000,"��¡����"],
			[551000000,"�ʰ��"],
			[540000000,"����������"],
			[541000000,"������ͷ��"],
			[800000000,"�Ŵ�����"],
			[801000000,"�Ѻʹ�"],
			[200000000,"���֮��"],
			[211000000,"����ѩ��"],
			[230000000,"ˮ������"],
			[251000000,"�ٲ���"],
			[250000000,"����"],
			[260000000,"���ﰲ��"],
			[261000000,"�������"],
			[240000000,"��ľ��"],
			[220000000,"��߳�"],
			[222000000,"ͯ����"],
			[221000000,"�����������"],
			[140000000,"���"],
			[270000000,"ʱ����������"],
			[1000000,"�ʺ��"],
			[130000000,"ʥ��"],
			[600000000,"��Ҷ��"],
			[682000000,"�ֹ�լۡ�ⲿ"],
			[610020006,"�ػ��ߵ�Ҫ��"],
			[103040000,"�϶��㳡����"],
			[103000000,"��������"],
			[104000000,"�����"],
			[100000000,"���ִ�"],
			[101000000,"ħ������"],
			[102000000,"��ʿ����"],
			[120000000,"ŵ����˹��ͷ"],
			[110000000,"�ƽ�̲"],
			[105040300,"����֮��"]
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
				cm.sendNext("Ϊ�˴ӷ�æ���ճ��н��ѣ�ȥ����һ��������ô������������������ӱ������Ļ�������ѧ�����ٶ����Ļ��ᣡ����ð�յ����ι�˾Ϊ��׼���ˣ��ḻ��Ȥ��#b��������#k�ײ͡�˭˵��������ܹ����һ����ġ����ǵ�#bð�յ����������ײ�#kֻ��Ҫ#b2900���#k�Ϳ�������ȫ�̡�");
			} else {
				cm.sendNext("Ϊ�˴ӷ�æ���ճ��н��ѣ�ȥ����һ��������ô������������������ӱ������Ļ�������ѧ�����ٶ����Ļ��ᣡ����ð�յ����ι�˾Ϊ��׼���ˣ��ḻ��Ȥ��#b��������#k�ײ͡�˭˵��������ܹ����һ����ġ����ǵ�#bð�յ����������ײ�#kֻ��Ҫ#b3000���#k�Ϳ�������ȫ�̡�");
			}
		} else if (status == 1) {
			cm.sendSimple("���ھͿ���ȥ�� #b̩����ˮ���г�,������,�ձ��Ŵ�����#k����һ�����ڸ����ε��Ҷ���Ϊ����ṩ�����ȳϵķ�����ô��׼���ã����ֿ���9���Żݡ�\r\n#b#L0#�鿴������·.#k#l");
		} else if (status == 2) {
var selStr = "���ھͿ���ȥ�� #b̩����ˮ���г�,������,�ձ��Ŵ�����#k����һ�����ڸ����ε��Ҷ���Ϊ����ṩ�����ȳϵķ�����ô��׼���ã����ֿ���9���Żݡ�#b";
				if (cm.getJob() == 0) {
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i][0] + "# ("+maps[i][2]+"���)#l";
					}
				}else{
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i][0] + "# ("+maps[i][1]+"���)#l";
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
			cm.sendYesNo("���Ѿ������ã�ȷ��Ҫȥ #b#m" + maps[selectedMap][0] + "##k����ô�㽫Ҫ������ #b" + cost +"���#k. �������ȥ��");
		} else if (status == 4) {
			if (cm.getMeso() < cost) {
				cm.sendPrev("����,��Ǯ����! ��ʵ����̫�ֲ���!�Ҳ��ܴ���ȥ.");
			} else {
				cm.gainMeso(-cost);
				//cm.saveLocation("WORLDTOUR");
				cm.warp(maps[selectedMap][0]);
				cm.dispose();
			}
		}	
	} else if (cm.getChar().getMapId() == 500000000 || cm.getChar().getMapId() == 702000000 || cm.getChar().getMapId() == 800000000 || cm.getChar().getMapId() == 600000000 || cm.getChar().getMapId() == 540000000 || cm.getChar().getMapId() == 550000000 || cm.getChar().getMapId() == 551000000 || cm.getChar().getMapId() == 541000000 || cm.getChar().getMapId() == 220000000 || cm.getChar().getMapId() == 240000000) {
		if (status == 0) {
			cm.sendSimple ("����������ô��������Ȥ�ɡ�\r\n#L0##b���� #k#l\r\n#L1##b�����۹�#k#l");
		} else if (status == 1) {
			if (selection == 0) {
				cm.sendOk("�õģ������Ҫ����ĵط�������ǵĸ����ҡ�");
			} else if (selection == 1) {
				cm.sendOk("�����ȥ���ٵ��������ɡ��������ȥ��ʱ�����������ҡ�");
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