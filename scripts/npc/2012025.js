function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("本次航程较长，如果在本地还有事务要处理，请在上船前处理。确定要搭乘本次航班吗？本次航程较长，如果在本地还有事务要处理，请在上船前处理。确定要搭乘本次精灵航班吗？");
        } else {
            cm.sendOk("精灵航班即将起飞。很抱歉，请等待下一次航班。可向售票处咨询航班时间表。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确定已经购买去往阿里安特的船票了吗？请检查你的背包。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变了主意，随时来找我。");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000152);
        cm.gainItem(4031576, -1);
    } else {
        cm.sendOk("精灵航班即将起飞。很抱歉，请等待下一次航班。可向售票处咨询航班时间表。");
    }
    
    cm.dispose();
}