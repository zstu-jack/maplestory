
function start() {
    status = -1;
    action(1, 0, 0);
}

var selectType = -1;

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
        var text = "#e#k小睡冒险岛金钱服务#k\r\n\r\n #L0##e#d我要金币(@givems)#l \r\n #L1#我要点券(@givenx)#l \r\n #L2#我要背包栏位(@setslot)#l \r\n ";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if (selection === 0) {
            cm.sendGetNumber("需要多少金币", 500000, 500000, 50000000);
        } else if (selection === 1) {
            cm.sendGetNumber("需要多少点券", 100000, 100000, 10000000);
        } else if (selection === 2) {
            cm.sendGetNumber("需要设置为多少栏位", 100, 100, 1000);
        }
    } else if (status === 2) {
        if (selectType === 0) {
            cm.executeGM("@givems " + selection);
            cm.sendOk("OK, 金币+" + selection);
        } else if (selectType === 1) {
            cm.executeGM("@givenx " + selection);
            cm.sendOk("OK, 点券+" + selection);
        }else if (selectType === 2) {
            cm.executeGM("@setslot " + selection);
            cm.sendOk("OK, 栏位=" + selection);
        }
        cm.dispose();
    }
}

