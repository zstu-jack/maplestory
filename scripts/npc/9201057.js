function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("���� " + (cm.c.getPlayer().getMapId() == 103000100 ? "��Ҷ��" : "��������") + " �г�������ÿ���Ӷ������������Ϊ #b5,000 ���k��ȷ��Ҫ���� #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k��");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("Ҫ���г�����ǰ�³��𣿳�Ʊ���޷��˿");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
	var item = 4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000);

        if(!cm.canHold(item)) {
            cm.sendNext("������û���㹻�ռ䡣");
	}
	else if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(item, 1);
            cm.sendNext("���պó�Ʊ��");
        }else
            cm.sendNext("��Ľ�Ҳ�����");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}