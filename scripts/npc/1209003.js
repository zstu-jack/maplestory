var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("我们将启程前金银岛。听说#r黑魔法师#k自己还不能去往那里，这要归功于#b铸造的印记#k。但如果命运不眷顾英雄们，至少我们到达金银岛大陆后会安全。");
    cm.dispose();
}