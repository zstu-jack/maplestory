
function start() {
    status = -1;
    action(1, 0, 0);
}

var selectType = -1;
var selectItem = -1;

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
        var text = "#e#k��Ʒͼ��#k\r\n\r\n"
        // ����-1 ���� 0 սʿ��1  ��ʦ��2  �����֣�4  ������8 ������16
        text += "#L1##e#dȫ��ɱ��ҩˮ(2022359)������100��#l \r\n"
        text += "#L2#ȫ����ȡҩˮ(2022361)������100��#l \r\n"
        text += "#L3#����ҩˮ(2000019)������100��#l \r\n"
        text += "#L4#��������ҩ(02050004)������100��#l \r\n"
        text += "#L10#������Ʒ����ģ����ѯ#l \r\n"
        cm.sendSimple(text);
    } else if (status === 1) {
        if(selection == 1){
            cm.executeGM("@item 2022359 100");
            cm.message("@item 2022359 100�� ȫ��ɱ��ҩˮ100ƿ����");
            cm.dispose();
        }else if(selection == 2){
            cm.executeGM("@item 2022361 100");
            cm.message("@item 2022361 100�� ȫ����ȡҩˮ100ƿ����");
            cm.dispose();
        }else if(selection == 3){
            cm.executeGM("@item 2000019 100");
            cm.message("@item 2000019 100�� ����ҩˮ100ƿ����");
            cm.dispose();
        }else if(selection == 4){
            cm.executeGM("@item 02050004 100");
            cm.message("@item 02050004 100�� ��������ҩ100ƿ����");
            cm.dispose();
        }else if(selection == 10){
            cm.sendGetText("�����������");
            return ;
        }
    } else if (status === 2) {
        cm.executeItemSearch(cm.getText());
        
    } else if(status === 3){
        selectItem = selection
        cm.executeItemSelection(selection);
    } else if(status === 4){
        if(selection === 0){
            cm.executeGM("@item " + selectItem.toString() + " 1");
            cm.message("����1����");
        }else if(selection < 10){
            cm.executeGM("@item " + selectItem.toString()+ " " + (selection * 100).toString());
            cm.message("����ö࿩");
            cm.dispose();
        }else{
            cm.message("ȥˢװ���ѣ����δ��Ͱ���");
            cm.warp(selection);
        }
    }
}

