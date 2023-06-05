var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(cm.haveItemWithId(1902016, true)) {
        cm.warp(140010210, 0);
    } else {
        cm.sendOk("你是什么怪物？别浪费我的时间，在我面前消失!");
    }
    
    cm.dispose();
}