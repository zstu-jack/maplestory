function enter(pi) {
    try {
        var elevator = pi.getEventManager("Elevator");
        if (elevator == null) {
            pi.getPlayer().dropMessage(5, "��������ά���С�");
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("false")) {
            pi.playPortalSound(); pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
            return true;
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("true")) {
            pi.getPlayer().dropMessage(5, "�������������У����Ժ�");
        }
        else pi.getPlayer().dropMessage(5, "���ͼ����ϵGM�ύ���ϡ�");
    } catch(e) {
        pi.getPlayer().dropMessage(5, "����" + e);
    }
	return false;
}