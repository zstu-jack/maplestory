/*
 * NPC : Francis (Doll master)
 * Map : 910510200
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1 || mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
    	status++;
    } else {
    	status--;
    }
    if (status == 0) {
    	cm.sendNext("我是弗朗西斯，黑色之翼麾下的人偶师。你居然胆敢乱入我的操偶仪式... 这可真是把我惹火了，但这回我决定放过你。如果被我抓到你再这么做，我以黑魔法师之名起誓，绝对会让你付出代价。", 9);
    } else if (status == 1) {
    	cm.sendNextPrev("#b(黑色之翼？那是什么？这些事和黑魔法师又有什么关系？或许应该把这些事情报告给特鲁。)#k", 3);
    } else if (status == 2) {
        cm.completeQuest(21719);
        cm.warp(105040200, 10);//104000004 
        cm.dispose();
    }
}