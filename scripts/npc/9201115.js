var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
        var eim = cm.getEventInstance();
        if (eim != null && eim.getIntProperty("glpq6") == 3) {
                cm.sendOk("...���úá����ǵ�ʵ���Ѿ���Խ�˶������ʦ�ǡ��������ȴ���ȥ��ȡ�����ɡ�");
                cm.dispose();
                return;
        }
        
        if (!cm.isEventLeader()) {
                cm.sendNext("������Ķӳ������ҶԻ���");
                cm.dispose();
                return;
        }
    
        if (mode == 1) {
                status++;
        } else {
                status--;
        }

        if (eim != null) {
                if (eim.getIntProperty("glpq6") == 0) {
                        if (status == 0) {
                                cm.sendNext("��ӭ������ʦ�ǵĻ�������������������д�����...");
                        } else if (status == 1) {
                                cm.sendNext("�������ǽ�������һ����ð�ռ�...����...");
                        } else if (status == 2) {
                                cm.sendNext("�����ܹ���ѵ����ʦ����������ǰɣ�");
                                cm.mapMessage(6, "С���ˣ���ʦ�����ӽ��ˣ�");
                                for (var i = 0; i < 10; i++) {
                                        var mob = eim.getMonster(9400594);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                for (var i = 0; i < 20; i++) {
                                        var mob = eim.getMonster(9400582);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                eim.setIntProperty("glpq6", 1);
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 1) {
                        if (cm.getMap().countMonsters() == 0) {
                                if (status == 0) {
                                        cm.sendOk("�š���ô���£����Ǵ����������");
                                } else if (status == 1) {
                                        cm.sendNext("��������ν���������ʦ�ǻ�ӭ���ǵĵ�����");
                                        cm.mapMessage(6, "�������ʦ�ǽӽ��ˣ�");

                                        //Margana
                                        var mob = eim.getMonster(9400590);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-22, 1));

                                        //Red Nirg
                                        var mob2 = eim.getMonster(9400591);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-22, 276));

                                        //Hsalf
                                        var mob4 = eim.getMonster(9400593);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob4, new java.awt.Point(496, 276));

                                        //Rellik
                                        var mob3 = eim.getMonster(9400592);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob3, new java.awt.Point(-496, 276));

                                        eim.setIntProperty("glpq6", 2);
                                        cm.dispose();
                                }
                        } else {
                                cm.sendOk("�����������ϰ׷ѹ����ˣ���ʦ�����ǻ��д���ġ�");
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 2) {
                        if (cm.getMap().countMonsters() == 0) {
                                cm.sendOk("ʲô����...��ô�ᷢ���������顣");
                                cm.mapMessage(5, "ͨ����һ�׶εĴ������Ѿ�������");
                                eim.setIntProperty("glpq6", 3);
                                
                                eim.showClearEffect(true);
                                eim.giveEventPlayersStageReward(6);
                                
                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                cm.sendOk("�����������ϰ׷ѹ����ˣ��������ʦ�ǻ��д���ġ�");
                                cm.dispose();
                        }
                } else {
                        cm.sendOk("...���úá����ǵ�ʵ���Ѿ���Խ�˶������ʦ�ǡ��������ȴ���ȥ��ȡ�����ɡ�");
                        cm.dispose();
                }
        } else {
                cm.dispose();
        }
}