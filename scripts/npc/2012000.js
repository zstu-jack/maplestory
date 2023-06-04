var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var mapNames = new Array("������", "��߳�", "��ľ��", "���ﰲ��");
var mapName2 = new Array("ħ������", "��߳�", "���ɶ�ɭ��", "���ɳĮ");
var select;
var status = 0;

function start() {
    var where = "��ã��������֮����ƱԱ���������ȥ�����صĴ�Ʊ�����빺��ȥ����Ĵ�Ʊ��";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("���� " + mapName2[select] + " �ķɴ�������ÿ " + (select == 0 ? 15 : 10) + " ����һ��, ��Ʊ��Ҫ #b"+cost[select]+" ���#k�����빺�� #b#t"+ticket[select]+"##k��");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("��ȷ�������� #b"+cost[select]+" ���#k����ȷ�ϱ������������Ƿ���1����λ��");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
