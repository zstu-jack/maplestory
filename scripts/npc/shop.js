function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
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
        var text = "#e#kС˯ð�յ�����̵�#k\r\n\r\n #L0##e#d�����̵�#l \r\n #L1#�����̵�#l \r\n #L2#�ֿ����Ա#l \r\n ";
        cm.sendSimple(text);
    } else if (status === 1) {
        if (selection === 0) {
            cm.openShopNPC(1011100);
        } else if (selection === 1) {
            cm.sendOk("�ݲ����ţ���ȴ��������");
            cm.dispose();
        } else if (selection === 2) {
            cm.openNpc(1012009);
        }

    }
}//�о�����ű���������ť��ָ�򣬲�ȷ���ٿ���