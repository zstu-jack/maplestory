/**
 * @author: Ronan
 * @npc: Chamberlain Eak
 * @map: Orbis - Tower of Goddess
 * @func: Orbis PQ
*/

var status = 0;
var em = null;

function isStatueComplete() {
    for(var i = 1; i <= 6; i++) {
        if(cm.getMap().getReactorByName("scar" + i).getState() < 1) return false;
    }
    
    return true;
}

function clearStage(stage, eim) {
    eim.setProperty("statusStg" + stage, "1");
    eim.showClearEffect(true);
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
    
        if (cm.getPlayer().getMapId() == 920011200) { //exit
            cm.warp(200080101);
            cm.dispose();
            return;
        }
        if (!cm.isEventLeader()) {
            if(cm.getPlayer().getMapId() == 920010000) {
                cm.warp(920010000, 2);
                cm.dispose();
                return;
            }

            cm.sendOk("���öӳ������ҶԻ���");
            cm.dispose();
            return;
        }

        var eim = cm.getEventInstance();

        switch(cm.getPlayer().getMapId()) {
            case 920010000:
                if(eim.getIntProperty("statusStg0") != 1) {
                    eim.warpEventTeamToMapSpawnPoint(920010000, 2);
                    eim.giveEventPlayersExp(3500);
                    clearStage(0, eim);

                    cm.sendNext("��Ⱦ�Ů��ɣ�����������������µĴ���Զ�ž����ӡ��...����Ů�������Ƭ�����˲�ͬ��λ�á����ǵð����е���Ƭ��λ��Ŷ...�����������ҽ��ܣ�����Ů�����Ĺܼң��׿ˡ����ŵ���Ů�����ʵ���ˡ�");
                } else {
                    cm.warp(920010000, 2);
                }
                cm.dispose();
                break;
            case 920010100:
                if (isStatueComplete()) {
                    if (eim.getIntProperty("statusStg7") == -1) {
                        eim.warpEventTeam(920010800);
                    } else if(eim.getIntProperty("statusStg8") == -1) {
                        cm.sendOk("ร���������#t4001055#����������ڵ���Ļ��������������ŵ���Ů��ɡ�");
                    } else {
                        cm.sendOk("��л���������ŵ���Ů��ȥ�����Ի���...");
                    }
                } else {
                    cm.sendOk("�����㣬�Ⱦ��ŵ��ȣ��ռ�Ů�����������Ƭ�������ǰ�Ů����ƴ������...Ȼ�����ҶԻ��������Ĺؿ�,ȡ�������ݡ�");
                } 
                break;
            case 920010200: //walkway
                if (!cm.haveItem(4001050,30)) {
                    cm.sendOk("����һ�׶εĹ��������ռ�30��Ů������Ƭ�������ң��һ������ƴ��һ���顣");
                } else {
                    cm.sendOk("һ�����٣����ţ�����Ů����ĵ�һ����Ƭ��");
                    cm.removeAll(4001050);
                    cm.gainItem(4001044,1); //first piece
                    eim.giveEventPlayersExp(3500);
                    clearStage(1, eim);
                }
                break;
            case 920010300: //storage
                if(eim.getIntProperty("statusStg2") != 1) {
                    if(cm.getMap().countMonsters() == 0 && cm.getMap().countItems() == 0) {
                        if(cm.canHold(4001045)) {
                            cm.sendOk("ร����ҵ���Ů����ĵڶ�����Ƭ�����㡣");
                            cm.gainItem(4001045, 1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(2, eim);
                            eim.setProperty("statusStg2", "1");
                        } else {
                            cm.sendOk("���ҵ���Ů����ĵڶ�����Ƭ�����ڱ������ڳ�����һ��λ������");
                        }
                    } else {
                        cm.sendOk("�ҵ����������������ĵڶ���Ů������Ƭ��");
                    }
                } else {
                    cm.sendOk("Well done. Go find the other statue pieces.");
                }
                
                break;
            case 920010400: //lobby
                if (eim.getIntProperty("statusStg3") == -1) {
                    cm.sendOk("���ҵ���Ů�������������ĳ�Ƭ�����������������ϡ�\r\n#v4001056# ������\r\n#v4001057# ����һ\r\n#v4001058# ���ڶ�\r\n#v4001059# ������\r\n#v4001060# ������\r\n#v4001061# ������\r\n#v4001062# ������\r\n");
                } else if (eim.getIntProperty("statusStg3") == 0) {
                    cm.getMap().getReactorByName("stone3").forceHitReactor(1);
                    cm.sendOk("�ۣ�������������...ȷʵ�ͽ���������ϡ��ɵ�Ư�������ǰ�����ֵ���������Ů�������Ƭ�ɡ�");
                    eim.giveEventPlayersExp(3500);
                    clearStage(3, eim);
                    eim.setProperty("statusStg3", "2");
                    
                } else {
                    cm.sendOk("�ǳ���л���ǣ�");
                }
                break;
            case 920010500: //sealed
                if (eim.getIntProperty("statusStg4") == -1) {
                    var total = 3;
                    for(var i = 0; i < 2; i++) {
                        var rnd = Math.round(Math.random() * total);
                        total -= rnd;
                        
                        eim.setProperty("stage4_" + i, rnd);
                    }
                    eim.setProperty("stage4_2", "" + total);
                    
                    eim.setProperty("statusStg4", "0");
                }
                if (eim.getIntProperty("statusStg4") == 0) {
                    var players = Array();
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var z = cm.getMap().getNumPlayersInArea(i);
                        players.push(z);
                        total += z;
                    }
                    if (total != 3) {
                        cm.sendOk("��Ҫ��3�����վ��̤�塣");
                    } else {
                        var num_correct = 0;
                        for (var i = 0; i < 3; i++) {
                            if (eim.getProperty("stage4_" + i).equals("" + players[i])) {
                                num_correct++;
                            }
                        }
                        if (num_correct == 3) {
                            cm.sendOk("�����ҵ�����ȷ����ϣ���ӵ�ͼ�������ֵ���������Ů�������Ƭ�ɡ�");
                            cm.getMap().getReactorByName("stone4").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(4, eim);
                        } else {
                            eim.showWrongEffect();
                            if (num_correct > 0) {
                                cm.sendOk("��һ�������վ����ȷ��̤���ϡ�");
                            } else {
                                cm.sendOk("������Ҷ�վ�ڴ����̤���ϡ�");
                            }
                        }
                    }
                } else {
                    cm.sendOk("�ɵ�Ư����ȥѰ��������Ƭ�����ŵ���Ů��ɣ�");
                }
                cm.dispose();
                break;
            case 920010600: //lounge
                if(eim.getIntProperty("statusStg5") == -1) {
                    if (!cm.haveItem(4001052,40)) {
                        cm.sendOk("����һ�׶εĹ��������ռ�40��Ů������Ƭ�������ң��һ������ƴ��һ���顣");
                    } else {
                        cm.sendOk("You got them all! Here, the 5th statue piece.");
                        cm.removeAll(4001052);
                        cm.gainItem(4001048,1); //fifth piece
                        eim.giveEventPlayersExp(3500);
                        clearStage(5, eim);
                        eim.setIntProperty("statusStg5", 1);
                    }
                } else {
                    cm.sendOk("һ�����٣����ţ�����Ů����ĵ������Ƭ��");
                }
                break;
            case 920010700: //on the way up
                if (eim.getIntProperty("statusStg6") == -1) {
                    var rnd1 = Math.floor(Math.random() * 5);
                    
                    var rnd2 = Math.floor(Math.random() * 5);
                    while(rnd2 == rnd1) {
                        rnd2 = Math.floor(Math.random() * 5);
                    }
                    
                    if(rnd1 > rnd2) {
                        rnd1 = rnd1 ^ rnd2;
                        rnd2 = rnd1 ^ rnd2;
                        rnd1 = rnd1 ^ rnd2;
                    }
                    
                    var comb = "";
                    for(var i = 0; i < rnd1; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd1 + 1; i < rnd2; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd2 + 1; i < 5; i++) comb += "0";
                    
                    eim.setProperty("stage6_c", "" + comb);
                    
                    eim.setProperty("statusStg6", "0");
                }
                
                var comb = eim.getProperty("stage6_c");
                
                if (eim.getIntProperty("statusStg6") == 0) {
                    var react = "";
                    var total = 0;
                    for(var i = 1; i <= 5; i++) {
                        if (cm.getMap().getReactorByName("" + i).getState() > 0) {
                            react += "1";
                            total += 1;
                        } else {
                            react += "0";
                        }
                    }
                    
                    if (total != 2) {
                        cm.sendOk("��Ҫ�ڵ�ͼ������������2�����ˡ�");
                    } else {
                        var num_correct = 0;
                        var psh_correct = 0;
                        for (var i = 0; i < 5; i++) {
                            if (react.charCodeAt(i) == comb.charCodeAt(i)) {
                                num_correct++;
                                if(react.charAt(i) == '1') psh_correct++;
                            }
                        }
                        if (num_correct == 5) {
                            cm.sendOk("You found the right combination! Retrieve the statue piece from inside it!");
                            cm.getMap().getReactorByName("stone6").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(6, eim);
                        } else {
                            eim.showWrongEffect();
                            if (psh_correct >= 1) {
                                cm.sendOk("��һ�������˴�����ȷ��λ�á�");
                            } else {
                                cm.sendOk("ֻ��һ�����˴�����ȷ��λ�á�");
                            }
                        }
                    }
                } else {
                    cm.sendOk("�ɵ�Ư����ȥѰ��������Ƭ�ɣ�");
                }
                break;
            case 920010800:
                cm.sendNext("�����Զ�ž��飡ʹ����ֵ������ֳ���ʳ�˻��󣬻�ɱ�����ܹ��ٻ�Զ�ž��顣���Զ�ž���֮���õõ����������������ŵ���Ů��ɣ�"); 
                break;
            case 920010900:
                if(eim.getProperty("statusStg8") == "1") {
                    cm.sendNext("������Ů�����ļ��������ǻ�������������ҵ�һЩ�ö�����������������Ҫ�����Ǿ����ܿ�ؽ⿪ǰ�������⡣");
                } else {
                    cm.sendNext("���������Ҳ����κ���Ƭ�ġ�������������ȥ����Ů���������Ĳ��֣�ȥ��ĵط����Ұɡ��ȵ����ǳɹ����Ů���ٻ���̽��Ҳ���١�");
                }
                break;
            case 920011000:
                if(cm.getMap().countMonsters() > 0) {
                    cm.sendNext("������Ů���������ط��䡣������������й�������ҽ�̸���һ�����ǰ������ֿ⡣");
                } else {
                    cm.warp(920011100, "st00");
                }
                break;
        }
        cm.dispose();
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}