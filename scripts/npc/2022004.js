function start() {
    cm.sendNext("���ɫ�������������������úã�" + cm.getPlayer().getName() + "�������һὫ�㴫�ͻر���ѩ���úõ�׹���ȵ�����Ϊ�Լ�׼����ѧϰ�¼����ˣ������ҶԻ���");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000,"in01");
        cm.dispose();
    }
}