function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.sendOk("��л��Ĺ��٣�");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var text = " \t\t\t  #e��ӭ����#rС˯ð�յ�#k#n              \r\n"
        cm.sendSimple(text);
        cm.dispose();
    }
}