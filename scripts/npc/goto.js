var sText;
var typeIdx;
var mapIdx;

var jumps = Array(
    Array("�̿�����1", 101000100, 0),
    Array("�̿�����2", 101000101, 0),
    Array("�̿�����3", 101000102, 0),
    Array("�̿�����4", 101000103, 0),
    Array("�̿�����5", 101000104, 0),
    Array("���﹫԰",        100000202, 0),
    Array("��߳ǳ���ѵ����", 220000006, 0),
    Array("������һ�ŵ���B1", 103000900, 0),
    Array("������һ�ŵ���B2", 103000901, 0),
    Array("������1�ų���", 103000902, 0),
    Array("�����߶��ŵ���B1", 103000903, 0),
    Array("�����߶��ŵ���B2", 103000904, 0),
    Array("������2�ų���", 103000905, 0),
    Array("���������ŵ���B1", 103000906, 0),
    Array("���������ŵ���B2", 103000907, 0),
    Array("���������ŵ���B3", 103000908, 0),
    Array("������3�ų���", 103000909, 0),
    Array("��˯ɭ��1", 105040310, 0),
    Array("��˯ɭ��2", 105040311, 0),
    Array("��˯ɭ��3", 105040312, 0),
    Array("��˯ɭ��4", 105040313, 0),
    Array("��˯ɭ��5", 105040314, 0),
    Array("��˯ɭ��6", 105040315, 0),
    Array("��˯ɭ��7", 105040316, 0),
    Array("��߹���1-1", 280020000, 0),
    Array("��߹���1-2", 280020100, 0),
    Array("��߹���1-3", 280020200, 0),
    Array("��߹����Ǹɹ���1", 280020300, 0),
    Array("��߹���1-5", 280020400, 0),
    Array("��߹���1-6", 280020500, 0),
    Array("��߹�������", 280020600, 0),
    Array("��߹���2-1", 280030000, 0),
    Array("��߹���2-2", 280030100, 0),
    Array("��߹����Ǹɹ���2", 280030200, 0),
    Array("��߹���2-4", 280030300, 0),
    Array("��߹���2-5", 280030400, 0),
    Array("��߹������ĵ���", 922000000, 0)
)

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
    Array("test", 200000000, 0)
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
    Array("������", 100000201, 0),
    Array("��������", 102000003, 0),
    Array("���³", 103000003, 0),
    Array("����", 120000101, 0),
    Array("��ת�̹�", 211000001, 0),
    Array("��ת�̹�", 240010501, 0),
    Array("test", 220010900, 0)
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
        var text = "#e#kС˯ð�յ����ͷ���#k\r\n\r\n #L0##e#d�����ͼ����#l \r\n #L1#������ͼ����#l \r\n #L2#Ұ��BOSS����#l \r\n";
        text += "#L3#NPC����#l \r\n #L4#������ͼ����#l \r\n #L5#ģ��������ͼ����#l";
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
        }else if(selection === 4){
            sText = "#b";
            for (i = 0; i < jumps.length; i++) {
                sText += "#L" + i + "#" + jumps[i][0] + "\r\n";
            }
            cm.sendSimple(sText);
        }else if(selection === 5){
            cm.sendGetText("ģ����ѯ��ͼ");
        } else{
            cm.dispose();
        }
    } else if (status === 2) {
        if(typeIdx === 5){
            var input = cm.getText();
            cm.executeSendFilteredMap(input);
            return 
        }
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
        } else if (typeIdx === 4){
            cost = jumps[mapIdx][2];
            mapId = jumps[mapIdx][1];
        }
        if (cm.getMeso() >= cost) {
            cm.gainMeso(-cost);
            cm.message("���δ��ͻ���: " + cost + " ���");
            cm.warp(mapId);
        }
    }else if(status === 3){
        if(typeIdx === 5){
            if(selection == 999999){
                cm.dispose();
                return ;
            }
            cm.executeGoMapIndex(selection);
            cm.dispose();
        }
    }
}

