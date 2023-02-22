function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode === 0) {
        cm.sendOk("感谢你的光临！");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        let text = " \t\t\t  #e欢迎来到#r小睡冒险岛#k#n              \r\n";
        text += "\t\t\t 你的点券: " + cm.getPlayer().getCashShop().getCash(1) + " ，你的代金券: " + cm.getPlayer().getCashShop().getCash(3) + " ";
        cm.sendSimple(text);
        cm.dispose();
    }
}