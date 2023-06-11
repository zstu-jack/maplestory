/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("任何人都可以通过锻炼自身获得惊人的体力与力量。但一位真正的战士与众不同之处在于他们钢铁般的意志。无论胜算多小，他们都会坚持到底，直到胜利的曙光出现在前方。因此，战士专精房间会是一条荆棘之路，这个房间原本就会使战士处处掣肘，更不必说其中还充斥着强力的怪物。活用你的技巧摆脱负面状态，击溃其中的怪物，前往战士雕像所在之处，获取宗师之剑吧。祝你好运。");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("弗里西安是一支传奇英雄家族，其先祖创立了劫风兵。这个家族的血脉非比寻常，每一位后裔都完全继承了先祖的战斗技巧。这与生俱来的能力为世人所公认，蒙天之赐，这个家族的后裔们都拥有近乎无穷的攻击手段，无论在机变亦或是策略方面，没有任何敌人能胜过他们一筹。当世任何一个家族与其相较之下都会黯然失色。");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030510) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001259, 1)) {
                                        cm.gainItem(4001259, 1);
                                        cm.sendOk("做得好。");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("需要先空出一格其他栏。");
                                }
                        } else {
                                cm.sendOk("这个房间中的武器已经被取走了。");
                        }
                } else {
                        cm.sendOk("消灭所有绯红守护者。");
                }
                cm.dispose();
        }
}