var status = -1;
var sel;

var destinations = new Array("ħ������", "��߳�", "��ľ��", "����", "���ﰲ��", "ʥ��");
var boatType = new Array("�ɴ�", "�ɴ�", "��ͧ", "��", "����", "�ɴ�");

function start() {
	var message = "���֮�ǵ�վ̨��������̨���밴�����Ŀ�ĵؽ���ѡ������Ҫǰ�����\r\n";
	for(var i = 0; i < destinations.length; i++){
		message += "\r\n#L" + i + "##b���� " + boatType[i] + " ǰ�� " + destinations[i] + "��#l";
	}
	cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0){
        sel = selection;
        cm.sendNext("�õ�#h #���һ�����͵� #b#m" + (200000110 + (sel * 10)) + "##k.");
    }else if (status == 1) {
        cm.warp(200000110 + (sel * 10), "west00");
        cm.dispose();
    }
}