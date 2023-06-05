var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("冷静！！叔叔，我们正在前往#b金银岛#k，一旦到达那里，我们就会安全了。坚持住！");
    cm.dispose();
}