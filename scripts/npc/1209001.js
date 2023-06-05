var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("#r黑魔法师#b军队正以势不可挡的速度逼近这里。。。我们现在别无选择，只能逃离这个地区，离开我们的家园。呜呜呜~~，悲剧！");
    cm.dispose();
}