importPackage(Packages.tools);

var leverSequenceExit = false;

function enterLeverSequence(pi) {
    var map = pi.getMap();
    
    var jailn = (pi.getMap().getId() / 10) % 10;
    var maxToggles = (jailn == 1) ? 7 : 6;

    var mapProp = pi.getEventInstance().getProperty("jail" + jailn);

    if(mapProp == null) {
        var seq = 0;

        for(var i = 1; i <= maxToggles; i++) {
            if(Math.random() < 0.5) seq += (1 << i);
        }

        pi.getEventInstance().setProperty("jail" + jailn, seq);
        mapProp = seq;
    }

    mapProp = Number(mapProp);
    if(mapProp != 0) {
        var countMiss = 0;
        for(var i = 1; i <= maxToggles; i++) {
            if(!(pi.getMap().getReactorByName("lever" + i).getState() == (mapProp >> i) % 2)) {
                countMiss++;
            }
        }

        if(countMiss > 0) {
            map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
            map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));

            pi.playerMessage(5, "所有拉杆处于正确的位置时，传送点就会开启。目前有 " + countMiss + " 支拉杆处于错误的位置。");
            return false;
        }

        map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
        map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
        pi.getEventInstance().setProperty("jail" + jailn, "0");
    }

    pi.playPortalSound(); pi.warp(pi.getMapId() + 2,0);
    return true;
}

function enterNoMobs(pi) {
    var map = pi.getMap();
    var mobcount = map.countMonster(9300044);

    if (mobcount > 0) {
        pi.playerMessage(5, "需要击败所有黑格里芬方可通过这里。");
        return false;
    } else {
        pi.playPortalSound(); pi.warp(pi.getMapId() + 2,0);
        return true;
    }
}

function enter(pi) {
    var ret;
    if (leverSequenceExit) {
        ret = enterLeverSequence(pi);
    } else {
        ret = enterNoMobs(pi);
    }

    return ret;
}