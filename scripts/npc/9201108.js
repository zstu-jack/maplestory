/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("一种传说中的生物正在前方等待着你，从前他们被称为宗师护卫。瑞德里曾经在这种绯红守护者身上做过试验，结果发现它只会被威力非凡的箭矢所伤，而其余的魔法、长枪、钝器攻击统统无效。身为弓箭手，是唯一能在这个房间里有所作为的人。请运用一切你能想到最为强力的攻击——无论是#b箭扫射#k，#b穿透箭#k又或者是#b暴风箭雨#k去摧毁这个强大的生物，前往弓箭手雕像所在之处，获取先祖之弓吧。祝你好运。");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("洛克伍德是唯一一位为世人所知的圣射手，同时也是绯红要塞最著名的英雄之一。特别值得一提的是他惯用的白金相间的箭头，据说曾被一位强大的女神所祝福。他能在极远的距离外精确的瞄准目标，并因他的绝技“起源之矢”和“破灭之凰”饱受敬畏。传说里，他在英雄谷中只出一箭就射落了六只提丰。");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030540) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001258, 1)) {
                                        cm.gainItem(4001258, 1);
                                        其他栏cm.sendOk("做得好。");
                                        
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