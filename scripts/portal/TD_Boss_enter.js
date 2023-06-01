/* @author RonanLana */

function enter(pi) {
        var stage = ((Math.floor(pi.getMapId() / 100)) % 10) - 1;
        var em = pi.getEventManager("TD_Battle" + stage);
        if(em == null) {
                pi.playerMessage(5, "TD Battle " + stage + " ����������֮��Ĵ���Ŀǰ�޷����롣");
                return false;
        }

        if (pi.getParty() == null) {
                pi.playerMessage(5, "��ɶ���󷽿��볡��ս��");
                return false;
        } else if(!pi.isLeader()) {
                pi.playerMessage(5, "�ӳ������ͼ�󣬶�Ա���ɽ��롣");
                return false;
        } else {
                var eli = em.getEligibleParty(pi.getParty());
                if(eli.size() > 0) {
                        if(!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                                pi.playerMessage(5, "�����ս���Ѿ���ʼ�ˣ�Ŀǰ�޷����롣");
                                return false;
                        }
                }
                else {
                        pi.playerMessage(5, "�����������2����Ա���ɳ�����ս��");
                        return false;
                }

                pi.playPortalSound();
                return true;
        }
}
