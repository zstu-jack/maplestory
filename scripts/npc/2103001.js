var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(cm.isQuestStarted(3927)) {
        cm.sendNext("�������һ��������һ�׹���...");
        cm.setQuestProgress(3927, 1);
    }
    
    cm.dispose();
}