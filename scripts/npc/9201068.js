status = -1;
close = false;
oldSelection = -1;
var em;

function start() {
    em = cm.getEventManager("Subway");
    var text = "��������Ҷ�Ǽ�Ʊ�ڡ�";
	var hasTicket = false;
    if (cm.haveItem(4031713) && cm.getPlayer().getMapId() == 600010001){
        text += "\r\n#b#L0##t4031713#";
		hasTicket = true;
	}
	if(!hasTicket){
		cm.sendOk("�����û�г�Ʊ����ӱ���������Ʊ��");
		cm.dispose();
	}else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("�������ﻹ��Щ����Ҫ�����԰ɣ�");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(selection == 0){
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("�����г����������㹻�Ŀռ䣬��׼�������ĳ�Ʊ���ó̿��ܻ���Щ��΢��Щ�����������ᰴʱ����Ŀ�ĵء���ô��������Ҫ�˳���");
            else{
                cm.sendNext("�г�����һ�����ڳ����������ĵȴ���һ�೵������ǰһ���ӻ�׼ʱֹͣ��Ʊ����ʱ��׼ʱ��ˡ�");
                cm.dispose();
            }
        }
        oldSelection = selection;
    }else if(status == 1){
        if (oldSelection == 0 && cm.haveItem(4031713)) {
            if(em.getProperty("entry") == "true") {
                cm.gainItem(4031713, -1);
                cm.warp(600010002);
            }
            else {
                cm.sendNext("�г�����һ�����ڳ����������ĵȴ���һ�೵������ǰһ���ӻ�׼ʱֹͣ��Ʊ����ʱ��׼ʱ��ˡ�");
            }
        } else {
            cm.sendNext("û�г�Ʊ���޷��˳���");
	}
        
        cm.dispose();
    }
}