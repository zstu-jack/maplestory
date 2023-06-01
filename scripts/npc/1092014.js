var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 103000000];
var cost = [1000, 1000, 1000, 800, 1000];
var selectedMap = -1;

function start() {
    cm.sendNext("你好，这里是诺特勒斯计程车。如果您想要安全便捷地前往其它城镇，就使用我们的服务吧。支付车费后，我们会准时将您送达目的地。");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("这里还有很多地方可以逛。当你想要去不同的城镇的时候，欢迎随时来找我。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "新手使用时，享受90%的特殊折扣。";
            selStr += "请选择目的地，费用会根据目的地的不同而有所变化。#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " mesos)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你在这里的事情已经办完了吗？前往 #b#m" + maps[selection] + "##k 的话，将花费 #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " 金币#k。");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("金币不足，无法搭乘计程车。");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}