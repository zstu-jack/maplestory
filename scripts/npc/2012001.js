function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("����ǰ��ħ��������");
        else{
            cm.sendOk("����ħ�����ֵķɴ��Ѿ������ˡ������ĵȴ���һ��Ρ�");
            cm.dispose();
        }
    }else{
        cm.sendOk("ȷ���Ѿ�����ȥ��ħ�����ֵĴ�Ʊ�������ٴμ�鱳����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı������⣬��ʱ�����ҡ�");
	cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000112);
        cm.gainItem(4031047, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("����ħ�����ֵķɴ����������������ĵȴ���һ��Ρ�");
        cm.dispose();
    }
}