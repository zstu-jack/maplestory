
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

    // TODO： items.js: 玩具，枫叶，滑板
    if (status === 0) {
        var text = "#e#k怪物等级#k\r\n\r\n"
        // 新手-1 所有 0 战士：1  法师：2  弓箭手：4  盗贼：8 海盗：16
        text += "#L1000#输入怪物id查询 \r\n"
        text += "#L2000#输入怪物名字模糊查询 \r\n"
        text += "#L101##e#dBOSS第一批#l \t #L102##e#dBOSS第二批#l #L103##e#dBOSS第三批#l\r\n"
        for (var index = 1; index <= 10; index++) {
            choose = index
            leftLevel = ((index-1)*10).toString()
            rightLevel = (index*10).toString()
            text += "#L" +  choose.toString() + "#等级：" + leftLevel + "-" + rightLevel  + "#l\r\n"; 
        }
        text += "#L111#等级：100-200第一批#l \r\n"
        text += "#L112#等级：100-200第二批#l \r\n"
        // choose=1: [0-10)
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if(selection === 1000){
            cm.sendGetText("输入怪物id.");
            return ;
        }
        if(selection === 2000){
            cm.sendGetText("输入怪物名字");
            return ;
        }
        cm.executeMobChoose(selection);
    } else if (status === 2) {
        if(mobNameInput === -1){
            if(selectType === 1000){
                var monsterIdStr = cm.getText();
                var text = "你的怪物： \r\n"
                text += "#L"+ monsterIdStr + "##fMob/"+ monsterIdStr + ".img/stand/0#‘#o" + monsterIdStr + "#’"
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
            cm.message("给你召唤了一个小玩具！");
            cm.dispose();
        }else{
            cm.message("(mob)本次传送白嫖");
            cm.warp(selection);
        }
    }
}

