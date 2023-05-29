var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("你好,我是码头服务员乔伊。你想离开金银城到天空之城去吗? 从这站到#b天空之城#k的飞船\r需要花费#b"+cost+" 金币#k 购买#b#t4031045##k 才可以启航.");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("我猜，你一定还有许多事情没做完，对吗?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("你确定带足了 #b"+cost+" 金币#k? 再仔细看看钱包。");
                cm.dispose();
            }
        }
    }
}
