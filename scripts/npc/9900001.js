function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        var text = " \t\t\t  #e��ӭ����#rС˯ð�յ�#k#n              \r\n";
        text += "\t\t��ĵ�ȯ: " + cm.getPlayer().getCashShop().getCash(1) + " ����Ĵ���ȯ: " + cm.getPlayer().getCashShop().getCash(4) + " ����Ļʼҵ�ȯ: " + cm.getPlayer().getCashShop().getCash(2) + " \r\n\r\n";
        text += "#L0#��ݴ���#l"
        cm.sendSimple(text);
    } else if (selection === 0) {
        cm.openNpc(9900001, "goto");
    } else {
        cm.sendOk("�ݲ����ţ���ȴ��������");
        cm.dispose();
    }
}