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
        var text = " \t\t\t  #e欢迎来到#r小睡冒险岛#k#n              \r\n";
        text += "\t\t你的点券: " + cm.getPlayer().getCashShop().getCash(1) + " ，你的代金券: " + cm.getPlayer().getCashShop().getCash(4) + " ，你的皇家点券: " + cm.getPlayer().getCashShop().getCash(2) + " \r\n\r\n";
        text += "#L0#快捷传送#l"
        cm.sendSimple(text);
    } else if (selection === 0) {
        cm.openNpc(9900001, "goto");
    } else {
        cm.sendOk("暂不开放，请等待功能完成");
        cm.dispose();
    }
}