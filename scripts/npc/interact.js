
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
        var text = "#e#k������ѽ#k\r\n\r\n"
        text += "#L0##e#d�ٻ����#l \t #L1#�������#l \t #L2#��������#l \r\n ";
        text += "#L10#��������#l \t #L11#��������#l \t #L12#��������#l \r\n";
        text += "#L13#��������#l \t #L14#���ɵ���#l \t #L15#����Ʒ����#l \r\n";
        text += "#L20#ɱ�����й�#l \t #L21#����   #l \t #L30#���ʲ�ѯ#l \r\n";
        text += "#L31#���鱶��#l \t #L32#��ұ���#l \t #L33#���䱶��#l \t #L34#��������#l \r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        // �ٻ����ȥ
        if (selection === 0 || selection === 1) {
            cm.sendGetText("��ҽ�ɫ����");
        // ����
        } else if (selection === 2) {
            cm.executeGM("@xiguai");
            cm.dispose();
        // BOSS
        } else if (selection >= 10 && selection < 20) {
            if(selection === 10){
                cm.executeGM("@zakum");
            }else if(selection === 11){
                cm.executeGM("@horntail");
            }else if(selection === 12){
                cm.executeGM("@pianus");
            }else if(selection === 13){
                cm.executeGM("@pap");
            }else if(selection === 14){
                cm.executeGM("@cake");
            }else if(selection === 15){
                cm.executeGM("@pinkbean");
            }
            cm.dispose();    
        } else if (selection >= 20 && selection <= 30) {
            if(selection === 20){
                cm.executeGM("@killall");
            }else if(selection === 21){
                cm.executeGM("@hide");
            }else if(selection === 30){
                cm.executeGM("@rates");
            }
            cm.dispose();    
        } else if (selection >= 31 && selection < 40) {
            cm.sendGetNumber("���뱶��", 1, 1, 10000000);
        }
    } else if (status === 2) {
        if (selectType === 0) {
            var text = cm.getText();
            cm.executeGM("@summon " + text);
        } else if (selectType === 1) {
            var text = cm.getText();
            cm.executeGM("@follow " + text);
        }else if (selectType === 31) {
            cm.executeGM("@exprate " + selection);
        }else if(selectType === 32){
            cm.executeGM("@mesorate " + selection);
        }else if(selectType === 33){
            cm.executeGM("@bossdroprate " + selection);
            cm.executeGM("@droprate " + selection);
        }else if(selectType === 34){
            cm.executeGM("@travelrate " + selection);
        }
        cm.dispose();
    }
}

