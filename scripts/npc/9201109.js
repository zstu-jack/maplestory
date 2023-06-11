/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("瑞德里是一位强大的高阶法师。也因此，他深知智慧的价值所在，这可以说是衡量一位法师最客观的标准。因此，法师专精房间是一组扭曲的迷宫，其中遍布难以理解的构造——而在这处空间中，唯一可用的移动手段就是#b快速移动#k。至于击碎雕像所需的技能也只有一个，#b魔法双击#k。除此之外，每通过一部分迷宫，还需要除掉许多怪物。当你通过了所有迷宫，并击溃全部敌人后，需要依靠自己的智慧推断出哪座法师雕像中藏有起源之杖。祝你好运！");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("拉斐尔这个名字应该被人们永远铭记。他是一位技巧娴熟的巫师，对诸如意念传输、心灵感应等多种精神巫术了如指掌。除此之外，他还是一位精通所有元素法术的高阶法师。人们最后一次见到拉斐尔时，他正为抵御克拉齐亚军队的入侵寻找着“元素圣殿”。然而在那之后，他就人间蒸发了...");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030521) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001257, 1)) {
                                        cm.gainItem(4001257, 1);
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
                        cm.sendOk("消灭所有怪物。");
                }
                cm.dispose();
        } /* else if (cm.getPlayer().getMapId() == 610030522) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        cm.warp(610030522,0);
                } else {
                        cm.sendOk("消灭所有怪物。");
                }
                cm.dispose();
        }
        */
}