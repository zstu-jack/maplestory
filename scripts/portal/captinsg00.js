/* @author RonanLana */

function enter(pi) {
        if (!pi.haveItem(4000381)) {
                pi.playerMessage(5, "������û�а�ɫ�������޷��볡��");
                return false;
        } else {
                var em = pi.getEventManager("LatanicaBattle");

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
                        else {  //this should never appear
                                pi.playerMessage(5, "You cannot start this battle yet, because either your party is not in the range size, some of your party members are not eligible to attempt it or they are not in this map. If you're having trouble finding party members, try Party Search.");
                                return false;
                        }

                        pi.playPortalSound();
                        return true;
                }
        }
}