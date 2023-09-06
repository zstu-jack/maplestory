
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
        var text = "#e#k来交互呀#k\r\n\r\n"
        text += "#L0##e#d召唤玩家#l \t #L1#跟踪玩家#l \t #L2#开关吸怪#l \r\n ";
        text += "#L10#生成扎昆#l \t #L11#生成龙王#l \t #L12#生成鱼王#l \r\n";
        text += "#L13#生成闹钟#l \t #L14#生成蛋糕#l \t #L15#生成品克缤#l \r\n";
        text += "#L20#杀死所有怪#l \t #L21#隐身   #l \t #L30#倍率查询#l \r\n";
        text += "#L31#经验倍率#l \t #L32#金币倍率#l \t #L33#掉落倍率#l \t #L34#坐船倍率#l \r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        // 召唤或飞去
        if (selection === 0 || selection === 1) {
            cm.sendGetText("玩家角色名字");
        // 吸怪
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
            cm.sendGetNumber("输入倍率", 1, 1, 10000000);
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

