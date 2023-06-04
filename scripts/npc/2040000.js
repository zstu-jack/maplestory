var cost = 6000;
var status = 0;

function start() {
    cm.sendYesNo("你好，我负责出售开往天空之城的船票。前往天空之城的航班整点起每10分钟出发一班，每张需要#b"+cost+"金币#k。确定要购买#b#t4031045##k吗？");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        if(mode == 0) {
            cm.sendNext("你在这里还有些事情要处理，对吧？");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("你确定自己拥有#b"+cost+"金币#k吗？如果是这样，请检查你背包的其他栏是否已满。");
            cm.dispose();
        }
    }
}
