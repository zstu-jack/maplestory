function enter(pi) {
    if (pi.getEventInstance().getIntProperty("glpq1") == 0) {
        pi.getEventInstance().dropMessage(5, "����Ŀǰ��һ���������赲���޷����롣");
        return false;
        
    } else {
        pi.playPortalSound(); pi.warp(610030200, 0);
        return true;
    }
}

