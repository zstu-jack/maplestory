function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("��Ҫ�˴�ǰ�����֮����?");
        else{
            cm.sendOk("�������֮�ǵķɴ��Ѿ������ˣ������ĵȴ���һ�ˡ�");
            cm.dispose();
        }
    }else{
        cm.sendOk("��Ҫ��Ʊ���ܵǴ�����ȷ����İ�����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�õģ������ı������������˵��");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("�������֮�ǵķɴ������𺽣���ȴ���һ�ˡ�");
        cm.dispose();
    }
}	