var cost = 6000;
var status = 0;

function start() {
    cm.sendYesNo("��ã��Ҹ�����ۿ������֮�ǵĴ�Ʊ��ǰ�����֮�ǵĺ���������ÿ10���ӳ���һ�࣬ÿ����Ҫ#b"+cost+"���#k��ȷ��Ҫ����#b#t4031045##k��");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        if(mode == 0) {
            cm.sendNext("�������ﻹ��Щ����Ҫ�����԰ɣ�");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("��ȷ���Լ�ӵ��#b"+cost+"���#k������������������㱳�����������Ƿ�������");
            cm.dispose();
        }
    }
}
