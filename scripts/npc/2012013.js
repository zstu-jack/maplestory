function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("����ǰ����߳�?");
        } else {
            cm.sendOk("������߳ǵķɴ��Ѿ������ˡ������ĵȴ���һ��Ρ�");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ���Ѿ�����ȥ����߳ǵĴ�Ʊ�������ٴμ�鱳����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı������⣬��ʱ�����ҡ�");
        cm.dispose();
	return;
    } 
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("������߳ǵķɴ����������������ĵȴ���һ��Ρ�");
        cm.dispose();
    }
}