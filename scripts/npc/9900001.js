function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode === 0) {
        cm.sendOk("��л��Ĺ��٣�");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        let text = " \t\t\t  #e��ӭ����#rС˯ð�յ�#k#n              \r\n";
        text += "\t\t\t ��ĵ�ȯ: " + cm.getPlayer().getCashShop().getCash(1) + " ����Ĵ���ȯ: " + cm.getPlayer().getCashShop().getCash(3) + " ";
        cm.sendSimple(text);
        cm.dispose();
    }
}