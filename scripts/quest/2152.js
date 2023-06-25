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
            qm.sendNext("那棵树。。。我以前听说过，我甚至研究过它的行为！如果我没有记错的话， 每隔一段时间，邪恶的魔法就会渗透到肥沃的土壤里，在这种条件下，这些树桩，会吸收带有邪恶意念的营养物质，渐渐地，#b老树妖#k会复活, 它们对附近的人们和村庄构成了极大的威胁。");
            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
        qm.dispose();
}