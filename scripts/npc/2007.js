function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendNext("祝你旅途愉快。");
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("祝你旅途愉快。");
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("你想直接跳过教程直接前往 #b明珠港#k 吗？");
        } else if (status == 1) {
            cm.warp(104000000, 0);
            cm.dispose();
        }
    }
}