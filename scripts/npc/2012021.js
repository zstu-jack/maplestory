function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("����Ǵ���");
        } else {
            cm.sendOk("������ľ��Ĵ���û�е�����Ժ�������");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ���Ѿ�����ȥ����ľ��Ĵ�Ʊ����������ı�����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı������⣬��ʱ�����ҡ�");
        cm.dispose();
	return;
    }

    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("������ľ��Ĵ���û�е�����Ժ�������");
    }
    cm.dispose();
}