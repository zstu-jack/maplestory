var status;

function playerNearby(chrpos, portalpos) {
    try {
        return Math.sqrt( Math.pow((portalpos.getX() - chrpos.getX()), 2) + Math.pow((portalpos.getY() - chrpos.getY()), 2) ) < 77;
    } catch(err) {
        return false;
    }
}

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
    
                if (status == 0) {
                        if (playerNearby(cm.getPlayer().getPosition(), cm.getMap().getPortal("chimney01").getPosition())) cm.sendOk("嘿，嘿~~可不要擅自偷偷溜进别人家里面来。你也不想今年在圣诞老人的礼物单上被标记成坏孩子，对吧？");
                        else cm.sendOk("吼吼吼~~祝你度过一个健康、充实、幸福的新年！");
                } else {
                        cm.dispose();
                }
        }
}