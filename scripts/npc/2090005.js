/**
-- Odin JavaScript --------------------------------------------------------------------------------
    Hak - Cabin <To Mu Lung>(200000141) / Mu Lung Temple(250000100) / Herb Town(251000000)
-- By ---------------------------------------------------------------------------------------------
    Information
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Text and statement fix [Information]
    1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var menu = new Array("Mu Lung","Orbis","Herb Town","Mu Lung");
var cost = new Array(1500,1500,500,1500);
var hak;
var slct;
var display = "";
var btwmsg;
var method;


function start() {
    status = -1;
    hak = cm.getEventManager("Hak");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
        return;
    } else {
        if(mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if(mode == 0) {
            cm.sendNext("好的，如果你改变主意，记得告诉我。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 金币)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 金币)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b天空之城#k 前往 #b武陵#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#b武陵#k 前往 #b天空之城#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("你好。最近的旅途还顺利吗？我曾经载着一位像你一样的旅行者快速抵达#b"+menu[3]+"#k那么你呢...你有没有兴趣？可能不像坐船那么平稳，所以最好抓紧包袱。但我可以比船更快地将你送到目的地。只要你支付 #b"+cost[2]+" 金币，我就送你一程#k。");
                status++;
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("你好。最近的旅途还顺利吗？我知道比起像我这样可以征服蓝天的动物而言，只靠两条腿很难踏遍这片土地。我曾经载着一位像你一样的旅行者快速抵达其它地区，那么你呢...你有没有兴趣？如果你愿意，就选一个你想去的城镇吧。\r\n"+display);
            } else {
                cm.sendSimple("你好。最近的旅途还顺利吗？我曾经载着一位像你一样的旅行者快速抵达其它地区，那么你呢...你有没有兴趣？如果你愿意，就选一个你想去的城镇吧。\r\n"+display);
            }
        } else if(status == 1) {
            slct = selection;
            cm.sendYesNo("你想现在前往 #b"+menu[selection]+"#k 吗？如果你有 #b"+cost[selection]+" 金币#k，我就载你出发去那里。");

        } else if(status == 2) {
            if(slct == 2) {
                if(cm.getMeso() < cost[2]) {
                    cm.sendNext("你确定自己带够了金币吗？");
                    cm.dispose();
                } else {
                    cm.gainMeso(-cost[2]);
                    cm.warp(251000000, 0);
                    cm.dispose();
                }
            }
            
            else {
                if(cm.getMeso() < cost[slct]) {
                        cm.sendNext("你确定自己带够了金币吗？");
                        cm.dispose();
                } else {
                        if(cm.getPlayer().getMapId() == 251000000) {
                            cm.gainMeso(-cost[2]);
                            cm.warp(250000100, 0);
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Hak");
                            if (!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("嗯...我们现在接到太多冒险者的运输申请了...请稍微等一下再来。");
                                cm.dispose();
                                return;
                            }
                            
                            cm.gainMeso(-cost[slct]);
                            cm.dispose();
                        }
                }
            }
        }
    }
}  