var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("Hey, I did not see you on the field during the battle in the arena! What are you doing here?");
        cm.dispose();
        return;
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("真差劲，你一个宝石也没拿到啊。");
                cm.dispose();
            } else {
                cm.sendNext("好，我看看...你干得不错，弄来了 #b" + copns + "#k 枚我喜欢的宝石。既然你完成了比赛，我就奖励你 #b" + arena.getAriantRewardTier(cm.getPlayer()) + " 点竞技大会积分#k。要是你还想知道更多有关竞技大会积分的事情，就去找#b#p2101015##k 问吧。");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);
            
            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("好了！下次给我带来更多宝石！哦呵呵呵呵呵！"); 
            cm.dispose();
        }
    }
}