function enter(pi) {
    if(pi.isQuestStarted(21610) && pi.haveItem(4001193, 1) == 0) {
        var em = pi.getEventManager("Aran_2ndmount");
        if (em == null) {
            pi.message("��Ǹ���ڶ����������Ŀǰ��δ���š�");
            return false;
        }
        else {
            var em = pi.getEventManager("Aran_2ndmount");
            if (!em.startInstance(pi.getPlayer())) {
                pi.message("�Ѿ����������ڵ�ͼ�����ˣ����Ժ����ԡ�");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    } else {
        pi.playerMessage(5, "ֻ��ִ�еڶ�������������Ҳ��ܽ�����Ƭ����");
        return false;
    }
}