function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("���κ��̽ϳ�������ڱ��ػ�������Ҫ���������ϴ�ǰ����ȷ��Ҫ��˱��κ����𣿱��κ��̽ϳ�������ڱ��ػ�������Ҫ���������ϴ�ǰ����ȷ��Ҫ��˱��ξ��麽����");
        } else {
            cm.sendOk("���麽�༴����ɡ��ܱ�Ǹ����ȴ���һ�κ��ࡣ������Ʊ����ѯ����ʱ���");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ���Ѿ�����ȥ�����ﰲ�صĴ�Ʊ����������ı�����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı������⣬��ʱ�����ҡ�");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000152);
        cm.gainItem(4031576, -1);
    } else {
        cm.sendOk("���麽�༴����ɡ��ܱ�Ǹ����ȴ���һ�κ��ࡣ������Ʊ����ѯ����ʱ���");
    }
    
    cm.dispose();
}