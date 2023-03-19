var sText;
var typeIdx;
var mapIdx;

// ����
var towns = Array(
    Array("�����г�", 910000000, 0),
    Array("�ϸ�", 60000, 0),
    Array("�ʺ��", 1000000, 0),
    Array("�����", 104000000, 0),
    Array("���ִ�", 100000000, 0),
    Array("ħ������", 101000000, 0),
    Array("��ʿ����", 102000000, 0),
    Array("��������", 103000000, 0),
    Array("����֮��", 105040300, 0),
    Array("�ƽ�̲", 110000000, 0),
    Array("ŵ����˹����ͷ", 120000000, 0),
    Array("ʥ��", 130000000, 0),
    Array("���", 140000000, 0),
    Array("���֮��", 200000000, 0),
    Array("�Ҹ���", 209000000, 0),
    Array("����ѩ��", 211000000, 0),
    Array("��߳�", 220000000, 0),
    Array("ˮ������", 230000000, 0),
    Array("��ľ��", 240000000, 0),
    Array("����", 250000000, 0),
    Array("�ٲ���", 251000000, 0),
    Array("�����������", 221000000, 0),
    Array("ͯ����", 222000000, 0),
    Array("����̩Ӫ��", 300000000, 0),
    Array("��Ҷ��", 600000000, 0),
    Array("�Ѻʹ�", 801000000, 0),
    Array("�Ŵ�����", 800000000, 0),
    Array("���ﰲ��", 260000000, 0),
    Array("�������", 261000000, 0),
    Array("�¼���", 540000000, 0),
    Array("������ͷ��", 541000000, 0),
    Array("��������", 551000000, 0),
    Array("�����", 680000000, 0),
    Array("ʱ�����", 270000100, 0),
    Array("�϶��㳡", 103040000, 0),
    Array("����Ͽ��", 240070000, 0),
    Array("Ģ����", 106020000, 0)
);

// ����
var exps = Array(
    Array("����ѵ����1", 104040000, 0),
    Array("����ѵ����2", 104040001, 0),
    Array("test", 1010300, 0)
);

// Ұ��BOSS
var wilds = Array(
    Array("��ţ��", 104000400, 0),
    Array("������", 101030404, 0),
    Array("���", 107000300, 0),
    Array("Ģ����", 100000005, 0),
    Array("test", 211040401, 0)
);

// npc
var npcs = Array(
    Array("��˹", 101000003, 0),
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
        var text = "#e#kС˯ð�յ����ͷ���#k\r\n\r\n #L0##e#d�����ͼ����#l \r\n #L1#������ͼ����#l \r\n #L2#Ұ��BOSS����#l \r\n ";
        text += "#L3#NPC����#l"
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
            cm.message("���δ��ͻ���: " + cost + " ���");
            cm.warp(mapId);
        }
    }
}

