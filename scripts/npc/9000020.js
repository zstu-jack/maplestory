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
*/
status = -1;


var travelFrom = [777777777, 541000000];
var travelFee = [3000, 10000];

var travelMap = [800000000, 550000000];
var travelPlace = ["古代神社 - 日本", "吉隆大都市 - 马来西亚"];
var travelPlaceShort = ["古代神社", "吉隆大都市"];
var travelPlaceCountry = ["日本", "马来西亚"];
var travelAgent = ["我", "#r#p9201135##k"];

var travelDescription = ["如果你想感受日本文化的精髓，参观神社是再好不过的选择了，它是日本文化的大熔炉。而古代神社是一处传说中自古以来就供奉着蘑菇之神的胜地。",
                        "如果想去富有活力的地方感受热带风情，马来西亚的居民会热切地招待你。另外，吉隆大都市本身就是当地的经济中心，那里有许多机遇与风景等待游客去邂逅。"];

var travelDescription2 = ["在那里可以近距离接触侍奉蘑菇之神的巫女，另外我强烈推荐尝一尝在日本街头出售的美食，如章鱼烧、炒面等。现在，让我们前往#b古代神社#k，一处神话般的地方。",
                        "抵达那里时，我强烈建议你拨出时间去参观一下甘榜村。为什么？你一定知道那个有名的梦幻主题公园，阴森世界吧？不知道吗？它是那里最大的主题公园了，值得一游！现在，让我们前往#b马来西亚的吉隆大都市#k吧。"];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1,0,0);
}

function getTravelingStatus(mapid) {
    for(var i = 0; i < travelMap.length; i++) {
        if(mapid == travelMap[i]) {
            return i;
        }
    }
    
    return -1;
}

function getTravelType(mapid) {
    for(var i = 0; i < travelFrom.length; i++) {
        if(mapid == travelFrom[i]) {
            return i;
        }
    }
    
    return 0;
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    
    if (travelStatus != -1) {
        if (status == 0) 
            cm.sendSimple("这次旅行怎样？乐在其中吗？#b\r\n#L0#是的，在这里玩得很尽兴。我想返回#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#。\r\n#L1#不，我还想在这里继续探索一段时间。");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("好的，我会带你回到游览日本之前的出发地点。如果今后还想再次旅行，请告诉我。");
            } else if (selection == 1) {
                cm.sendOk("好的，如果你改变主意，记得告诉我。");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) map = 104000000;
            
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("如果你厌倦了单调乏味的日常生活，就从中脱身换个口味怎么样？吸收新的文化，无时无刻不在学习新知识，简直不能更棒了！你是时候来一场旅行了。我们枫叶旅行社推荐你进行#b世界旅游#k！你是在担心旅费吗？大可不必！我们#b枫叶旅行社#k已经精心制定了旅行计划，费用只需#b" + cm.numberWithCommas(travelFee[travelType]) + "金币#k！");
        } else if (status == 1) {
            cm.sendSimple("我们目前为您提供以下地区的旅行休闲服务：#b" + travelPlace[travelType] + "#k。" + travelAgent[travelType] + "会在那里作为导游为您服务。请放心，目的地的数量会随着时间推移不断增加。现在，你想前往" + travelPlaceShort[travelType] + "吗？#b\r\n#L0#是的，请送我去" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            cm.sendNext("你想要去#b" + travelPlace[travelType] + "#k旅行吗？ " + travelDescription[travelType]);
        } else if (status == 3) {
            if(cm.getMeso() < travelFee[travelType]){
                cm.sendNext("你没有足够的金币去旅行。");
                cm.dispose();
                return;
            }
            cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 4) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}