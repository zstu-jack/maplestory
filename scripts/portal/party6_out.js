function enter(pi) {
        var eim = pi.getEventInstance();
    
        if (eim.isEventCleared()) {
                if(pi.isEventLeader()) {
                        pi.playPortalSound();
                        eim.warpEventTeam(930000800);
                        return true;
                } else {
                        pi.playerMessage(5, "�ӳ����봫�͵㷽��ͨ����");
                        return false;
                }
        } else {
                pi.playerMessage(5, "���������еľ綾ʯͷ�档");
                return false;
        }
}