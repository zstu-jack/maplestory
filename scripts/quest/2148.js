var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendNext("无论这棵树走到哪里，似乎都有一些蝙蝠陪伴着它。渗人~");
            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}
function end(mode, type, selection) {
        qm.dispose();
}