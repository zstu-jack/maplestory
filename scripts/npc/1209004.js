var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("希望这次旅行是安全的，我们能能在那里和平的生活。。。嘿，亲爱的，我们走吧。");
    cm.dispose();
}