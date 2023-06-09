var status = -1;

function start() {
    action(1,0,0);
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
                    if(!cm.haveItem(4001163) || !cm.isEventLeader()) {
                        cm.sendYesNo("让你的队长把在这里得到的紫色魔力石交给我。\r\n\r\n#r你想要现在退场吗#k？现在离开意味着抛弃你的队友，请你记住。");
                    } else {
                        cm.sendNext("很好，你拿到了紫色魔力石。我会为你们开示 #b通往祭坛的道路#k，这边走。");
                    }                        
                } else if(status == 1) {
                        if (!cm.haveItem(4001163)) {
                                cm.warp(930000800, 0);
                        } else {
                                cm.getEventInstance().warpEventTeam(930000600);
                        }
                        
                        cm.dispose();
                }
        }
}