
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

    // TODO�� items.js: ��ߣ���Ҷ������
    if (status === 0) {
        var text = "#e#kѡһ����ϲ���ĵȼ���ְҵ����ȡװ���ɣ�#k\r\n\r\n"
        // ����-1 ���� 0 սʿ��1  ��ʦ��2  �����֣�4  ������8 ������16
        text += "#L0##e#d����#l #L1#С��Ϸ����#l #L2#��Ҷ#l #L3#ѩ��#l\r\n"
        for (var index = 1; index <= 10; index++) {
            choose = index * 100
            leftLevel = ((index-1)*10).toString()
            rightLevel = (index*10).toString()
            if(leftLevel == "0"){
                leftLevel == "00"
            }
            text += "#L" +  choose.toString() + "#" + leftLevel + "-" + rightLevel  + "#l #L" + 
                (choose+1).toString() + "#սʿ#l #L" +
                (choose+2).toString() + "#��ʦ#l #L" + 
                (choose+4).toString() + "#������#l #L" + 
                (choose+8).toString() + "#����#l #L" + 
                (choose+16).toString() + "#����#l \r\n";    
        }
        text += "#L1100#100-200#l #L1101#սʿ#l #L1102#��ʦ#l #L1104#������#l #L1108#����#l #L1116#����#l\r\n";    
        // L10x: [0-10)
        // L100x:[90,100)
        // L110x:[100,200]
        // if choose == 0
        // if choose & job

        // 116 % 100 = job ְҵ  
        // 116 / 100 = level �ȼ� , [(level-1)*10, level*10)
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        cm.executeEquipChoose(selection);
    } else if (status === 2) {
        selectItem = selection;
        cm.executeEquipDropMob(selectItem);
    } else if(status === 3){
        if(selection === 0){
            cm.executeGM("@item " + selectItem.toString() + " 1");
            cm.message("�͸��㿩");
        }else if(selection == 1){
            cm.executeGM("@item 4080100 1");
            cm.executeGM("@item 4080000 1");
            cm.executeGM("@item 4080001 1");
            cm.executeGM("@item 4080002 1");
            cm.executeGM("@item 4080003 1");
            cm.executeGM("@item 4080004 1");
            cm.executeGM("@item 4080005 1");
            cm.message("������������������̺ͼ������");
            cm.dispose();
        }else{
            cm.message("ȥˢװ���ѣ����δ��Ͱ���");
            cm.warp(selection);
        }
    }
}

