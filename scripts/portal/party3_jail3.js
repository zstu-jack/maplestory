function enter(pi) {
    if(pi.getEventInstance().getIntProperty("statusStg8") == 1) {
        pi.playPortalSound(); pi.warp(920010930,0);
        return true;
    }
    else {
        pi.playerMessage(5, "�����������ȻӰ����ͨ������Ŀǰ�޷������⴦���ء�");
        return false;
    }
}