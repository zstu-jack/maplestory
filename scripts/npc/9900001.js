function start() {
    status = -1;
    action(1, 0, 0);
}

status1_select = -1

function action(mode, type, selection) {
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
        var text = " \t\t\t  #e欢迎来到#r小睡冒险岛#k#n              \r\n";
        // text += "\t\t你的点券: " + cm.getPlayer().getCashShop().getCash(1) + " ，你的代金券: " + cm.getPlayer().getCashShop().getCash(4) + " ，你的皇家点券: " + cm.getPlayer().getCashShop().getCash(2) + " \r\n\r\n";
        text += "#L0#快捷传送#l \t #L1#快捷商店#l \t";
        text += "#L2#我要变强#l \t #L4#娱乐交互#l \r\n\r\n";
        text += "#L5#装备图鉴#l \t #L6#怪物图鉴#l \t";
        text += "#L7#物品图鉴#l \t #L8#npc搜索#l \r\n\r\n";
        text += "#L9#美发沙龙#l \t #L10#在线玩家#l \t";
        cm.sendSimple(text);
    }
    
    if(status == 1){
        status1_select = selection
        if (selection === 0) {
            cm.openNpc(9900001, "goto");
        } else if (selection === 1) {
            cm.openNpc(9900001, "shop");
        } else if (selection === 2){
            cm.openNpc(9900001, "role");
        } else if (selection === 4){
            cm.openNpc(9900001, "interact");
        } else if (selection === 5){
            cm.openNpc(9900001, "equip");
        } else if(selection === 6){
            cm.openNpc(9900001, "mob");
        } else if(selection === 7){
            cm.openNpc(9900001, "item");
        } else if(selection === 8){
            cm.sendGetText("输入npc名字");
        } else if(selection === 9){
            cm.openNpc(9900001, "salon");
        } else if(selection === 10){
            cm.executeOnlinePlayers();
        } else {
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        }
    }

    if(status == 2){
        if(status1_select == 8){
            cm.executeSendNPCMap(cm.getText());
        }
        if(status1_select == 10){
            cm.message("(传送至玩家)本次传送白嫖");
            cm.warp(selection);
        }
    }

    if(status == 3){
        if(status1_select == 8){
            cm.message("(npc)本次传送白嫖");
            cm.warp(selection);
        }
    }
}