var status = 0;

var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var jobType = 21;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入名人堂#k 吗？";
        if(spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入名人堂。";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("看啊，里恩岛尊贵的英雄大人！那些坚韧顽强的心灵属于从很久之前就保护着我们的英勇战友。");//战神脚本，汉化了没意义
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("抱歉，你没有足够的金币，无法加入名人堂。");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，名人堂已经满员了。");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}