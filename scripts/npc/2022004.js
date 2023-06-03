function start() {
    cm.sendNext("你出色地完成了这里的任务。做得好，" + cm.getPlayer().getName() + "，现在我会将你传送回冰峰雪域。拿好吊坠，等到你认为自己准备好学习新技能了，就与我对话。");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000,"in01");
        cm.dispose();
    }
}