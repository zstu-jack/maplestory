function enter(pi) {
    try {
        var elevator = pi.getEventManager("Elevator");
        if (elevator == null) {
            pi.getPlayer().dropMessage(5, "电梯正在维修中。");
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("false")) {
            pi.playPortalSound(); pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
            return true;
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("true")) {
            pi.getPlayer().dropMessage(5, "电梯正在运行中，请稍候。");
        }
        else pi.getPlayer().dropMessage(5, "请截图并联系GM提交故障。");
    } catch(e) {
        pi.getPlayer().dropMessage(5, "错误：" + e);
    }
	return false;
}