
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
        var text = "#e#kС˯ð�յ���Ǯ����#k\r\n\r\n #L0##e#d��Ҫ���(@givems)#l \r\n #L1#��Ҫ��ȯ(@givenx)#l \r\n #L2#��Ҫ������λ(@setslot)#l \r\n ";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if (selection === 0) {
            cm.sendGetNumber("��Ҫ���ٽ��", 500000, 500000, 50000000);
        } else if (selection === 1) {
            cm.sendGetNumber("��Ҫ���ٵ�ȯ", 100000, 100000, 10000000);
        } else if (selection === 2) {
            cm.sendGetNumber("��Ҫ����Ϊ������λ", 100, 100, 1000);
        }
    } else if (status === 2) {
        if (selectType === 0) {
            cm.executeGM("@givems " + selection);
            cm.sendOk("OK, ���+" + selection);
        } else if (selectType === 1) {
            cm.executeGM("@givenx " + selection);
            cm.sendOk("OK, ��ȯ+" + selection);
        }else if (selectType === 2) {
            cm.executeGM("@setslot " + selection);
            cm.sendOk("OK, ��λ=" + selection);
        }
        cm.dispose();
    }
}

