
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
        var text = "#e#k物品图鉴#k\r\n\r\n"
        // 新手-1 所有 0 战士：1  法师：2  弓箭手：4  盗贼：8 海盗：16
        text += "#L1##e#d全屏杀怪药水(2022359)，给我100个#l \r\n"
        text += "#L2#全屏拣取药水(2022361)，给我100个#l \r\n"
        text += "#L3#超级药水(2000019)，给我100个#l \r\n"
        text += "#L4#万能疗伤药(02050004)，给我100个#l \r\n"
        text += "#L10#输入物品名字模糊查询#l \r\n"
        cm.sendSimple(text);
    } else if (status === 1) {
        if(selection == 1){
            cm.executeGM("@item 2022359 100");
            cm.message("@item 2022359 100， 全屏杀怪药水100瓶到账");
            cm.dispose();
        }else if(selection == 2){
            cm.executeGM("@item 2022361 100");
            cm.message("@item 2022361 100， 全屏拣取药水100瓶到账");
            cm.dispose();
        }else if(selection == 3){
            cm.executeGM("@item 2000019 100");
            cm.message("@item 2000019 100， 超级药水100瓶到账");
            cm.dispose();
        }else if(selection == 4){
            cm.executeGM("@item 02050004 100");
            cm.message("@item 02050004 100， 万能疗伤药100瓶到账");
            cm.dispose();
        }else if(selection == 10){
            cm.sendGetText("输入道具名字");
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
            cm.message("送你1个咯");
        }else if(selection < 10){
            cm.executeGM("@item " + selectItem.toString()+ " " + (selection * 100).toString());
            cm.message("送你好多咯");
            cm.dispose();
        }else{
            cm.message("去刷装备把，本次传送白嫖");
            cm.warp(selection);
        }
    }
}

