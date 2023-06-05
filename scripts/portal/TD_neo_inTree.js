function enter(pi) {
    var nex = pi.getEventManager("GuardianNex");
    if(nex == null) {
        pi.message("ʱ���ػ���Ŭ��˹��ս������һ������Ŀǰ�޷�ʹ�á�");
        return false;
    }
    
    var quests = [3719, 3724, 3730, 3736, 3742, 3748];
    var mobs = [7120100, 7120101, 7120102, 8120100, 8120101, 8140510];
    
    for(var i = 0; i < quests.length; i++) {
        if (pi.isQuestActive(quests[i])) {
            if(pi.getQuestProgressInt(quests[i], mobs[i]) != 0) {
                pi.message("����ǰ�ľ���ʱ���ػ���Ŭ��˹���������ʹ���ɡ�");
                return false;
            }
            
            if(!nex.startInstance( i, pi.getPlayer())) {
                pi.message("�Ѿ�������볡��սʱ���ػ���Ŭ��˹�ˡ���ȴ����������ս���ٳ��Խ��롣");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    }
    
    pi.message("һ�����ص�������ֹ����������");
    return false;
}