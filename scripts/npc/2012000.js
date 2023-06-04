var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var mapNames = new Array("金银岛", "玩具城", "神木村", "阿里安特");
var mapName2 = new Array("魔法密林", "玩具城", "米纳尔森林", "尼哈沙漠");
var select;
var status = 0;

function start() {
    var where = "你好，我是天空之城售票员，负责出售去往各地的船票。你想购买去哪里的船票？";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("开往 " + mapName2[select] + " 的飞船整点起每 " + (select == 0 ? 15 : 10) + " 分钟一趟, 购票需要 #b"+cost[select]+" 金币#k。你想购买 #b#t"+ticket[select]+"##k？");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("你确定身上有 #b"+cost[select]+" 金币#k吗？请确认背包的其他栏是否有1个空位。");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
