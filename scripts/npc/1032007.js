var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("���,������ͷ����Ա�����������뿪�����ǵ����֮��ȥ��? ����վ��#b���֮��#k�ķɴ�\r��Ҫ����#b"+cost+" ���#k ����#b#t4031045##k �ſ�������.");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("�Ҳ£���һ�������������û���꣬����?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("��ȷ�������� #b"+cost+" ���#k? ����ϸ����Ǯ����");
                cm.dispose();
            }
        }
    }
}
