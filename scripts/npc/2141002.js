/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getEventInstance();
        if(!eim.isEventCleared()) {
            if (status == 0) {
                cm.sendYesNo("你想现在离开吗？");
            }
            else if (status == 1) {
                cm.warp(270050000, 0);
                cm.dispose();
            }
        
        } else {
            if (status == 0) {
                cm.sendYesNo("品克缤被打败了！你们真是这片大陆的救世主！不久之后，时间神殿将会像从前一样光辉灿烂，这都是你们的功绩！向我们的英雄欢呼！！你们准备现在离开这里吗？");
            }
            else if (status == 1) {
                if(eim.giveEventReward(cm.getPlayer(), 1)) {
                    cm.warp(270050000);
                }
                else {
                    cm.sendOk("请在装备栏、消耗栏、设置栏和其他栏腾出空间来接受副本奖励。");
                }
                
                cm.dispose();
            }
        }
    }
}