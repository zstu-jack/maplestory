
function start() {
    status = -1;
    action(1, 0, 0);
}

var selectType = -1;
var selectItem = -1;
var mobNameInput = -1;

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
        var text = "#e#k����ȼ�#k\r\n\r\n"
        // ����-1 ���� 0 սʿ��1  ��ʦ��2  �����֣�4  ������8 ������16
        text += "#L1000#�������id��ѯ \r\n"
        text += "#L2000#�����������ģ����ѯ \r\n"
        text += "#L101##e#dBOSS��һ��#l \t #L102##e#dBOSS�ڶ���#l #L103##e#dBOSS������#l\r\n"
        for (var index = 1; index <= 10; index++) {
            choose = index
            leftLevel = ((index-1)*10).toString()
            rightLevel = (index*10).toString()
            text += "#L" +  choose.toString() + "#�ȼ���" + leftLevel + "-" + rightLevel  + "#l\r\n"; 
        }
        text += "#L111#�ȼ���100-200��һ��#l \r\n"
        text += "#L112#�ȼ���100-200�ڶ���#l \r\n"
        // choose=1: [0-10)
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if(selection === 1000){
            cm.sendGetText("�������id.");
            return ;
        }
        if(selection === 2000){
            cm.sendGetText("�����������");
            return ;
        }
        cm.executeMobChoose(selection);
    } else if (status === 2) {
        if(mobNameInput === -1){
            if(selectType === 1000){
                var monsterIdStr = cm.getText();
                var text = "��Ĺ�� \r\n"
                text += "#L"+ monsterIdStr + "##fMob/"+ monsterIdStr + ".img/stand/0#��#o" + monsterIdStr + "#��"
                cm.sendOk(text);
                cm.dispose();
                return ;
            }
            if(selectType === 2000){
                var monsterStr = cm.getText();
                cm.executeMobSearch(monsterStr);
                mobNameInput = 1;
                status--;
                return ;
            }
        }
        selectMob = selection;
        cm.executeMobMaps(selectMob);
    } else if(status === 3){
        if(selection === 0){
            cm.executeGM("@spawn " + selectMob.toString() + " 1");
            cm.message("�����ٻ���һ��С��ߣ�");
            cm.dispose();
        }else{
            cm.message("(mob)���δ��Ͱ���");
            cm.warp(selection);
        }
    }
}

