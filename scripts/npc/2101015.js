var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿，我在竞技场之前的战斗里没见过你！你是来做什么的？");
        cm.dispose();
        return;
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            menuStr = generateSelectionMenu(["我要查看我的竞技场积分！/ 我要交换1个椰子树沙滩椅", "我想了解更多更多有关于竞技场的事情。"]);
            cm.sendSimple("你好，有什么事吗？\r\n\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("你的竞技场积分是：#b" + apqpoints + "#k 点。需要拥有超过 #b100点#k 的积分才能从这里领取 #b椰子树沙滩椅#k。等到你拥有了足够的点数再来吧。");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("你的竞技场积分是：#b" + apqpoints + "#k 点。你满足积分要求了！去找我的妻子#p2101016#对话，然后再来找我。");
                    cm.dispose();
                } else {
                    cm.sendNext("哇，看你来积够 #b100#k 点了，要现在交换吗？");
                }
            } else if (selection == 1) {
                cm.sendOk("这场竞技大会的主要目标就是让玩家累积足够的积分，用来交换最终奖励： #b椰子树沙滩椅#k。在战斗中获得积分，然后与我对话领取奖励。每场战斗中，玩家都会根据最终拥有的宝石数量获得积分。但要注意，如果你的积分相比于其他玩家 #r高出太多#k，有可能白费功夫，最后只拿到 #r1点积分#k。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}