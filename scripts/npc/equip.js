
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

    // TODO： items.js: 玩具，枫叶，滑板
    if (status === 0) {
        var text = "#e#k选一个你喜欢的等级，职业来获取装备吧！#k\r\n\r\n"
        // 新手-1 所有 0 战士：1  法师：2  弓箭手：4  盗贼：8 海盗：16
        text += "#L0##e#d新手#l #L1#小游戏道具#l #L2#枫叶#l #L3#雪板#l\r\n"
        for (var index = 1; index <= 10; index++) {
            choose = index * 100
            leftLevel = ((index-1)*10).toString()
            rightLevel = (index*10).toString()
            if(leftLevel == "0"){
                leftLevel == "00"
            }
            text += "#L" +  choose.toString() + "#" + leftLevel + "-" + rightLevel  + "#l #L" + 
                (choose+1).toString() + "#战士#l #L" +
                (choose+2).toString() + "#法师#l #L" + 
                (choose+4).toString() + "#弓箭手#l #L" + 
                (choose+8).toString() + "#盗贼#l #L" + 
                (choose+16).toString() + "#海盗#l \r\n";    
        }
        text += "#L1100#100-200#l #L1101#战士#l #L1102#法师#l #L1104#弓箭手#l #L1108#盗贼#l #L1116#海盗#l\r\n";    
        // L10x: [0-10)
        // L100x:[90,100)
        // L110x:[100,200]
        // if choose == 0
        // if choose & job

        // 116 % 100 = job 职业  
        // 116 / 100 = level 等级 , [(level-1)*10, level*10)
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
            cm.message("送给你咯");
        }else if(selection == 1){
            cm.executeGM("@item 4080100 1");
            cm.executeGM("@item 4080000 1");
            cm.executeGM("@item 4080001 1");
            cm.executeGM("@item 4080002 1");
            cm.executeGM("@item 4080003 1");
            cm.executeGM("@item 4080004 1");
            cm.executeGM("@item 4080005 1");
            cm.message("背包里多了五子棋棋盘和记忆大考验");
            cm.dispose();
        }else{
            cm.message("去刷装备把，本次传送白嫖");
            cm.warp(selection);
        }
    }
}

