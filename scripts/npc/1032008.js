function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("��Ҫȥ���֮����?");
        else{
            cm.sendOk("���֮�ǵķɴ��Ѿ������������ĵȴ���һ�ˡ�");
            cm.dispose();
        }
    }else{
        cm.sendOk("��Ʊ����ɧ�����������������в�ͨ�ģ�������ȥ��Ʊ�ɡ�");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı����⣬�ͺ���̸̸��");
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
        cm.sendOk("���֮�ǵķɴ��Ѿ������������ĵȴ���һ�ˡ�");
        cm.dispose();
    }
}	