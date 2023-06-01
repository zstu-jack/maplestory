/* @author RonanLana */

function enter(pi) {
        var stage = ((Math.floor(pi.getMapId() / 100)) % 10) - 1;
        var em = pi.getEventManager("TD_Battle" + stage);
        if(em == null) {
                pi.playerMessage(5, "TD Battle " + stage + " 发生了意料之外的错误，目前无法进入。");
                return false;
        }

        if (pi.getParty() == null) {
                pi.playerMessage(5, "组成队伍后方可入场挑战。");
                return false;
        } else if(!pi.isLeader()) {
                pi.playerMessage(5, "队长进入地图后，队员方可进入。");
                return false;
        } else {
                var eli = em.getEligibleParty(pi.getParty());
                if(eli.size() > 0) {
                        if(!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                                pi.playerMessage(5, "里面的战斗已经开始了，目前无法进入。");
                                return false;
                        }
                }
                else {
                        pi.playerMessage(5, "组队中至少有2名成员方可尝试挑战。");
                        return false;
                }

                pi.playPortalSound();
                return true;
        }
}
