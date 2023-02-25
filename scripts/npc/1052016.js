var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 120000000];
var cost = [1000, 1000, 1000, 800, 800];
var selectedMap = -1;
var mesos;

function start() {
    cm.sendNext("你好，我们是城镇巴士，如果你想安全、快速的从一座城市到达另一座城市，乘坐巴士是你最好的选择。我们很乐意以实惠的价格带您到达目的地。");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("这座城市也有很多可看的，当你需要去另一个城镇时，回来找我们。");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0) {
                selStr += "我们对新人打9折";
            }
            selStr += "选择您的目的地，费用会因地点而异。#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " 金币)#l";
            }
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你在这里没有别的事可做，是吗？你真的想去 #b#m" + maps[selection] + "##k？此次旅程将花费 #b" + (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " 金币#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
                mesos = cost[selectedMap] / 10;
            } else {
                mesos = cost[selectedMap];
            }

            if (cm.getMeso() < mesos) {
                cm.sendNext("你没有足够的金币。很抱歉这么说，但如果没有他们，你将无法乘坐出租车。");
                cm.dispose();
                return;
            }

            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}