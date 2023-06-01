function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (status >= 0 && mode === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        var text = "#e#k小睡冒险岛快捷商店#k\r\n\r\n #L0##e#d道具商店#l \r\n #L1#武器商店#l \r\n #L2#仓库管理员#l \r\n ";
        cm.sendSimple(text);
    } else if (status === 1) {
        if (selection === 0) {
            cm.openShopNPC(1011100);
        } else if (selection === 1) {
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection === 2) {
            cm.openNpc(1012009);
        }

    }
}//感觉这个脚本是拍卖按钮的指向，不确定再看看