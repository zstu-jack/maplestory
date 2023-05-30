/**
	Author: xQuasar
	NPC: Kyrin - Pirate Job Advancer
	Inside Test Room
**/

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            if (cm.getMapId() == 108000502) {
                if (!(cm.haveItem(4031856,15))) {
                    cm.sendSimple("你还没有收集到15个强大力量的结晶，我很期待你的表现。\r\n#b#L1#我想离开这里。#l");
                } else {
                    status++;
                    cm.sendNext("看来你已经收集到了足够多的 #b#t4031856##k。现在，我会将你传送出这里。");
                }
            } else if (cm.getMapId() == 108000501) {
                if (!(cm.haveItem(4031857,15))) {
                    cm.sendSimple("你还没有收集到15个强大风力的结晶，我很期待你的表现。\r\n#b#L1#我想离开这里。#l");
                } else {
                    status++;
                    cm.sendNext("看来你已经收集到了足够多的 #b#t4031857##k。现在，我会将你传送出这里。");
                }
            } else {
                cm.sendNext("发生了意料之外的错误，请稍后再进行尝试。");
                cm.dispose();
            }
        } else if (status == 1) {   // thanks Lame for noticing players getting stuck in area in certain scenarios
            cm.removeAll(4031856);
            cm.removeAll(4031857);
            cm.warp(120000101,0);
            cm.dispose();
        } else if (status == 2) {
            cm.warp(120000101,0);
            cm.dispose();
        }
    }
}
