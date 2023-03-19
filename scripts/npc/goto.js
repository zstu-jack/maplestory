var sText;
var typeIdx;
var mapIdx;

// 城镇
var towns = Array(
    Array("自由市场", 910000000, 0),
    Array("南港", 60000, 0),
    Array("彩虹村", 1000000, 0),
    Array("明珠港", 104000000, 0),
    Array("射手村", 100000000, 0),
    Array("魔法密林", 101000000, 0),
    Array("勇士部落", 102000000, 0),
    Array("废弃都市", 103000000, 0),
    Array("林中之城", 105040300, 0),
    Array("黄金海滩", 110000000, 0),
    Array("诺特勒斯号码头", 120000000, 0),
    Array("圣地", 130000000, 0),
    Array("里恩", 140000000, 0),
    Array("天空之城", 200000000, 0),
    Array("幸福村", 209000000, 0),
    Array("冰峰雪域", 211000000, 0),
    Array("玩具城", 220000000, 0),
    Array("水下世界", 230000000, 0),
    Array("神木村", 240000000, 0),
    Array("武陵", 250000000, 0),
    Array("百草堂", 251000000, 0),
    Array("地球防御本部", 221000000, 0),
    Array("童话村", 222000000, 0),
    Array("阿尔泰营地", 300000000, 0),
    Array("新叶城", 600000000, 0),
    Array("昭和村", 801000000, 0),
    Array("古代神社", 800000000, 0),
    Array("阿里安特", 260000000, 0),
    Array("玛加提亚", 261000000, 0),
    Array("新加坡", 540000000, 0),
    Array("驳船码头城", 541000000, 0),
    Array("马来西亚", 551000000, 0),
    Array("婚礼村", 680000000, 0),
    Array("时间神殿", 270000100, 0),
    Array("废都广场", 103040000, 0),
    Array("大海兽峡谷", 240070000, 0),
    Array("蘑菇城", 106020000, 0)
);

// 练级
var exps = Array(
    Array("射手训练场1", 104040000, 0),
    Array("射手训练场2", 104040001, 0),
    Array("test", 1010300, 0)
);

// 野外BOSS
var wilds = Array(
    Array("蜗牛王", 104000400, 0),
    Array("树妖王", 101030404, 0),
    Array("多尔", 107000300, 0),
    Array("蘑菇王", 100000005, 0),
    Array("test", 211040401, 0)
);

// npc
var npcs = Array(
    Array("汉斯", 101000003, 0),
    Array("test", 211040401, 0)
);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (status >= 0 && mode === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        var text = "#e#k小睡冒险岛传送服务#k\r\n\r\n #L0##e#d城镇地图传送#l \r\n #L1#练级地图传送#l \r\n #L2#野外BOSS传送#l \r\n ";
        text += "#L3#NPC传送#l"
        cm.sendSimple(text);
    } else if (status === 1) {
        typeIdx = selection;
        var i = 0;
        if (selection === 0) {
            sText = "#b";
            for (i = 0; i < towns.length; i++) {
                sText += "#L" + i + "#" + towns[i][0] + "\r\n";
            }
            cm.sendSimple(sText);
        } else if (selection === 1) {
            sText = "#b";
            for (i = 0; i < exps.length; i++) {
                sText += "#L" + i + "#" + exps[i][0] + "\r\n";
            }
            cm.sendSimple(sText);
        } else if (selection === 2) {
            sText = "#b";
            for (i = 0; i < wilds.length; i++) {
                sText += "#L" + i + "#" + wilds[i][0] + "\r\n";
            }
            cm.sendSimple(sText);
        } else if (selection === 3) {
            sText = "#b";
            for (i = 0; i < npcs.length; i++) {
                sText += "#L" + i + "#" + npcs[i][0] + "\r\n";
            }
            cm.sendSimple(sText);
        } else {
            cm.dispose();
        }
    } else if (status === 2) {
        mapIdx = selection;
        var cost;
        var mapId;
        if (typeIdx === 0) {
            cost = towns[mapIdx][2];
            mapId = towns[mapIdx][1];
        } else if (typeIdx === 1) {
            cost = exps[mapIdx][2];
            mapId = exps[mapIdx][1];
        } else if (typeIdx === 2) {
            cost = wilds[mapIdx][2];
            mapId = wilds[mapIdx][1];
        } else if (typeIdx === 3) {
            cost = npcs[mapIdx][2];
            mapId = npcs[mapIdx][1];
        }
        if (cm.getMeso() >= cost) {
            cm.gainMeso(-cost);
            cm.message("本次传送花费: " + cost + " 金币");
            cm.warp(mapId);
        }
    }
}

