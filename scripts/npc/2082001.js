function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("��Ҫ�Ǵ���");
        } else {
            cm.sendOk("���໹δ�ִ���Ժ�������");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ���Ѿ�����ȥ�����֮�ǵĴ�Ʊ�������ٴμ�鱳����");
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
        cm.warp(240000111);
        cm.gainItem(4031045, -1);
    } else {
        cm.sendOk("���໹δ�ִ���Ժ�������");
    }
    cm.dispose();
}