
/*
 *@Author:     Moogra, Traitor, Ronan
 *@Map(s):     All Dojo fighting maps
 *@Function:   Spawns dojo monsters and handles time
*/


function start(ms) {
    ms.getPlayer().resetEnteredScript();
    var stage = Math.floor(ms.getMapId() / 100) % 100;
    var callBoss = false;
    
    if (stage % 6 == 0) {
        ms.getClient().getChannelServer().dismissDojoSchedule(ms.getMapId(), ms.getParty());
        ms.getClient().getChannelServer().setDojoProgress(ms.getMapId());
    } else {
        callBoss = ms.getClient().getChannelServer().setDojoProgress(ms.getMapId());
        
        var realstage = stage - ((stage / 6) | 0);
        var mob = ms.getMonsterLifeFactory(9300183 + realstage);
        if (callBoss && mob != null && ms.getPlayer().getMap().getMonsterById(9300216) == null) {
            mob.setBoss(false);
            ms.getPlayer().getMap().spawnDojoMonster(mob);
        }
    }
}