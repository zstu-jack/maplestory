/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>
    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
* @Author: Moogra, XxOsirisxX, Ronan
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.config);
importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_on_inventory;
var belt_points;

var status = -1;
var selectedMenu = -1;
var dojoWarp = 0;

function start() {
    if (disabled) {
        cm.sendOk("ʦ��������Ŀǰ����#r�չ�#k�������Ҳ��ܷ����ȥ��");
        cm.dispose();
        return;
    }
    
    belt_points = YamlConfig.config.server.USE_FAST_DOJO_UPGRADE ? Array(10, 90, 200, 460, 850) : Array(200, 1800, 4000, 9200, 17000);
    
    belt_on_inventory = new Array();
    for (var i = 0; i < belts.length; i++) {
        belt_on_inventory.push(cm.haveItemWithId(belts[i], true));
    }
                            
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.getPlayer().setDojoStage(dojoWarp);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        
        if(status == 0) {
            if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                var text = "�����ߵ����������˾��ȣ����������ľ�û��ô���ˡ���Ҫ������ս��\r\n\r\n#b#L0#���������ս#l\r\n#L1#�����뿪#l\r\n";
                if (!GameConstants.isDojoPartyArea(cm.getPlayer().getMapId())) {
                    text += "#L2#�������ڼ�¼ĿǰΪֹ�ĵ÷�#l";
                }
                cm.sendSimple(text);
            } else if (cm.getPlayer().getLevel() >= 25) {
                if (cm.getPlayer().getMap().getId() == 925020001) {
                    cm.sendSimple("�ҵ�ʦ����������ǿ�Ĵ��ڣ�����Ҫ��ս���𣿺ܺã�������ܿ�ͻ����ˡ� \r\n\r\n#b#L0#�����뵥����ս���������.#l\r\n#L1#���������ս���������#l\r\n\r\n#L2#����һ�����������#l\r\n#L3#���������ҵĵ���������#l\r\n#L4#������ȡ����ѫ�¡�#l\r\n#L5#���������ʲô��#l");
                } else {
                    cm.sendYesNo("��ô����Ҫ�����ˣ��Ϳ쵽��һ���ˣ����Ҫ������ս�����뿪��");
                }
            } else {
                cm.sendOk("�٣������Ʋ����ҵ�ʦ��������Ϊ��Ҫ��ս����˭������Ц��������ҲҪ��#b25#k��������ս����");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getPlayer().getMap().getId() == 925020001) {
                if (mode >= 0) {
                    if (status == 1)
                        selectedMenu = selection;
                    if (selectedMenu == 0) { //I want to challenge him alone.
                        if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                            if (status == 1) {
                                cm.sendYesNo("�٣��Ǳ���λ��������ͷһ�����ɣ��ţ���ʦ�������׺��κ��˼��棬����æ�ġ����ҿ�������ӣ��ҿɲ��������������㡣��������������������...�����㣬������ܴ���ң��Ҿ�������ȥ������ʦ������������ΰ���");
                            } else if (status == 2) {
                                if (mode == 0) {
                                    cm.sendNext("�������������⸱�����Ͱ͵�ģ���ֺ�˭��\r\n���Ķ������Ķ�ȥ�ɣ�");
                                    cm.dispose();
                                    return;
                                } else {
                                    var avDojo = cm.getClient().getChannelServer().ingressDojo(true, 0);

                                    if(avDojo < 0) {
                                        if(avDojo == -1) cm.sendOk("���е���������ʹ���С���һ����������԰ɡ�");
                                        else cm.sendOk("��������Ķ���������ս�������ֻ�������Ķ���ʹ�õ�����ʱ����δ�����������ǽ���������ܽ�ȥ��");
                                    }
                                    else {
                                        cm.getClient().getChannelServer().getMapFactory().getMap(925020010 + avDojo).resetMapObjects();
                                        
                                        cm.resetDojoEnergy();
                                        cm.warp(925020010 + avDojo, 0);
                                    }

                                    cm.dispose();
                                    return;
                                }
                            }
                        } else if (cm.getPlayer().getDojoStage() > 0) {
                            dojoWarp = cm.getPlayer().getDojoStage();
                            cm.getPlayer().setDojoStage(0);
                            
                            var stageWarp = ((dojoWarp / 6) | 0) * 5;
                            cm.sendYesNo("��һ�ε�����ս����ʱ����ִ��˵� #b" + stageWarp + "#k �㡣�����ҿ���ֱ������ȥ�������ȥ�� (ѡ�� #r��#k �Ļ����ü�¼���������)");
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(false, dojoWarp);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("���е���������ʹ���С���һ����������԰ɡ�");
                                else cm.sendOk("��������Ķ���������ս�������ֻ�������Ķ���ʹ�õ�����ʱ����δ�����������ǽ���������ܽ�ȥ��");
                                
                                cm.getPlayer().setDojoStage(dojoWarp);
                            } else {
                                var warpDojoMap = 925020000 + (dojoWarp + 1) * 100 + avDojo;
                                cm.getClient().getChannelServer().resetDojoMap(warpDojoMap);
                                
                                cm.resetDojoEnergy();
                                cm.warp(warpDojoMap, 0);
                            }

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 1) { //I want to challenge him with a party.
                        var party = cm.getPlayer().getParty();
                        if (party == null) {
                            cm.sendNext("����Ϊ����ȥ�Ķ������������ӳ������ǣ�����Ķӳ�������˵��");
                            cm.dispose();
                            return;
                        }
                        
                        if (party.getLeader().getId() != cm.getPlayer().getId()) {
                            cm.sendNext("����Ϊ����ȥ�Ķ������������ӳ������ǣ�����Ķӳ�������˵��");
                            cm.dispose();
                            return;
                        }

                        //else if (party.getMembers().size() == 1) {
                        //    cm.sendNext("You're going to take on the challenge as a one-man party?");
                        //}

                        else if (!isBetween(party, 30)) {
                            cm.sendNext("��Ķ���ȼ����̫��û����ȥ�����ж�Ա�ĵȼ���ñ����� #r30��#k ���ڡ�");
                            cm.dispose();
                            return;
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(true, cm.getParty(), 0);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("���е���������ʹ���С���һ����������԰ɡ�");
                                else cm.sendOk("��������Ķ���������ս�������ֻ�������Ķ���ʹ�õ�����ʱ����δ�����������ǽ���������ܽ�ȥ��");
                            } else {
                                cm.getClient().getChannelServer().resetDojoMap(925030100 + avDojo);
                                
                                cm.resetPartyDojoEnergy();
                                cm.warpParty(925030100 + avDojo);
                            }

                            cm.dispose();
                            return;
                        }

                    } else if (selectedMenu == 2) { //I want to receive a belt.
                        if (!cm.canHold(belts[0])) {
                            cm.sendNext("�����װ�������ڳ���λ�����ܻ�õ���������");
                            cm.dispose();
                            return;
                        }
                        if (mode < 1) {
                            cm.dispose();
                            return;
                        }
                        if (status == 1) {
                            var selStr = "���� #b" + cm.getPlayer().getDojoPoints() + "#k �����������ʦ���������츳�����ļһ������г��ڵĵ����������Ϳ��Ը��ݾ���õ��յ�һ������������\r\n";
                            for (var i = 0; i < belts.length; i++) {
                                if (belt_on_inventory[i]) {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "# (�ѳ���)";
                                } else
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                            }
                            cm.sendSimple(selStr);
                        } else if (status == 2) {
                            var belt = belts[selection];
                            var level = belt_level[selection];
                            var points = belt_points[selection];
                            
                            var oldbelt = (selection > 0) ? belts[selection - 1] : -1;
                            var haveOldbelt = (oldbelt == -1 || cm.haveItemWithId(oldbelt, false));
                            
                            if (selection > 0 && !belt_on_inventory[selection - 1]) {
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else if (cm.getPlayer().getDojoPoints() >= points) {
                                if (selection > 0 && !haveOldbelt) {
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                                } else if (cm.getPlayer().getLevel() > level) {
                                    if(selection > 0) cm.gainItem(oldbelt, -1);
                                    cm.gainItem(belt, 1);
                                    cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - points);
                                    cm.sendNext("���� #i" + belt + "# #b#t" + belt + "##k�����ڵ����е�Ӣ���������Ƕ�����������ò���");
                                } else
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 3) { //I want to reset my training points.
                        if (status == 1) {
                            cm.sendYesNo("������õ������������͹����ˣ������װɣ�������Ҳ����ȫ�ǻ��¡�Ҫ���������ú������ռ����������������ٻ��ͬ���������ˡ�����Ҫ���õ���������");
                        } else if (status == 2) {
                            if (mode == 0) {
                                cm.sendNext("������Ҫ����һ�»���������ȥ����͸͸���ٻ������Ұɡ�");
                            } else {
                                cm.getPlayer().setDojoPoints(0);
                                cm.sendNext("���ˣ���ĵ��������Ѿ������ˡ�������Ϊһ������㣬Ŭ�����аɣ�");
                            }
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 4) { //I want to receive a medal.
                        if (status == 1 && cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.sendYesNo("�㻹û�ﵽ��ȡ���µ�Ҫ�󰡣�������������ͬһ�����˴�#b100��#k������ȡ #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k�������û�д�� #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k 100��... �벻�����Ŵ��#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k��");
                        } else if (status == 2 || cm.getPlayer().getVanquisherStage() > 0) {
                            if (mode == 0) {
                                cm.sendNext("û������뷨���Ǿ����ˡ�");
                            } else {
                                if (cm.getPlayer().getDojoStage() > 37) {
                                    cm.sendNext("���������л�����ս��");
                                } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                                    cm.sendNext("���� #b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k �β�����ȡ #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k���ټӰѾ�������ס��ֻ��ʦ��������������ٻ��Ĺ�����������������뿪ÿһ��֮ǰ�������еĹ��#rҪ��û���������ͽ�����һ�㣬�ǾͲ���һ��ʤ����#k.");
                                else if (cm.getPlayer().getVanquisherStage() <= 0) {
                                    cm.getPlayer().setVanquisherStage(1);
                                } else {
                                    cm.sendNext("You have obtained #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                                    cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                                    cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                                    cm.getPlayer().setVanquisherKills(0);
                                }
                            }

                            cm.dispose();
                            return;
                        } else {
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                        cm.sendNext("�ҵ�ʦ����������ǿ�Ĵ��ڡ������������������һ�ִ����ģ������� #r38��#k ��ô�ߣ������һ��һ�������ȥ�������Լ�����Ȼ�ˣ���Ҫ�Ƕ��ɲ�̫���ס�");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.dispose();
                    return;
                }
            } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                if (selectedMenu == -1)
                    selectedMenu = selection;
                
                if (selectedMenu == 0) {
                    var hasParty = (cm.getParty() != null);
                    
                    var firstEnter = false;
                    var avDojo = cm.getClient().getChannelServer().lookupPartyDojo(cm.getParty());
                    if(avDojo < 0) {
                        if(hasParty) {
                            if(!cm.isPartyLeader()) {
                                cm.sendOk("���ֲ��Ƕӳ����������ս��������Ķӳ�������˵��");
                                cm.dispose();
                                return;
                            }
                            
                            if(!isBetween(cm.getParty(), 35)) {
                                cm.sendOk("��Ķ���ȼ����̫��û����ȥ�����ж�Ա�ĵȼ���ñ����� #r35��#k ���ڡ�");
                                cm.dispose();
                                return;
                            }
                        }
                        
                        avDojo = cm.getClient().getChannelServer().ingressDojo(hasParty, cm.getParty(), Math.floor((cm.getPlayer().getMap().getId()) / 100) % 100);
                        firstEnter = true;
                    }

                    if(avDojo < 0) {
                        if(avDojo == -1) cm.sendOk("���е���������ʹ���С���һ����������԰ɡ�");
                        else cm.sendOk("��Ķ����Ѿ��ڵ����Ǽ��ˡ��ȵǼ�ʱ���ȥ���볡�ɡ�");
                    } else {
                        var baseStg = hasParty ? 925030000 : 925020000;
                        var nextStg = Math.floor((cm.getPlayer().getMap().getId() + 100) / 100) % 100;

                        var dojoWarpMap = baseStg + (nextStg * 100) + avDojo;
                        if(firstEnter) {
                            cm.getClient().getChannelServer().resetDojoMap(dojoWarpMap);
                        }
                        
                        //non-leader party members can progress whilst having the record saved if they don't command to enter the next stage
                        cm.getPlayer().setDojoStage(0);
                        
                        if(!hasParty || !cm.isLeader()) cm.warp(dojoWarpMap, 0);
                        else cm.warpParty(dojoWarpMap, 0);
                    }

                    cm.dispose();
                    return;
                } else if (selectedMenu == 1) { //I want to leave
                    if (status == 1) {
                        cm.sendYesNo("��ô����Ҫ�����ˣ����Ҫ�˳���");
                    } else {
                        if (mode == 1) {
                            cm.warp(925020002, "st00");
                        }
                        cm.dispose();
                        return;
                    }
                } else if (selectedMenu == 2) { //�������ڼ�¼ĿǰΪֹ�ĵ÷�
                    if (status == 1) {
                        cm.sendYesNo("�����¼ĿǰΪֹ�ĵ÷֣��Ϳ��Դ��ϴ��뿪�ĵط�������ս������ɣ������¼���ڵĵ÷���");
                    } else {
                        if (mode == 0) {
                            cm.sendNext("������Լ����ܸ���һ����������");//�����Good luck����������Լ�����һ��Ŀ�������������Щ����ģ�����ף�����Ҳ�е���ʽ��������˼ģ���Ĺ�������ˡ�
                        } else if (cm.getPlayer().getDojoStage() == Math.floor(cm.getMapId() / 100) % 100) {
                            cm.sendOk("��ĵ÷��Ѿ��Ǻ��ˡ��´�������ս����ʱ���Ϳ��Իص������");
                        } else {
                            cm.sendNext("�Ҽ�������ĵ÷֡��´�����ȥ��ʱ������ң���Ϳ��Դ��뿪��λ�ÿ�ʼ��ս���Ǻ��ˣ����ѡ��#b������ս�������#k��#r��¼�ͻ���ʧ#k��ѡ��ʱ��С�ĵ㡣");
                            cm.getPlayer().setDojoStage(Math.floor(cm.getMapId() / 100) % 100);
                        }
                        cm.dispose();
                        return;
                    }
                }
            } else {
                if (mode == 0) {
                    cm.sendNext("����ԥ�����ˣ��ܿ���ͻ�������һ�����");
                } else if (mode == 1) {
                    var dojoMapId = cm.getPlayer().getMap().getId();
                    
                    cm.warp(925020002, 0);
                    cm.getPlayer().message("���ܲ����ö����Ⱑ��");
                    
                    cm.getClient().getChannelServer().freeDojoSectionIfEmpty(dojoMapId);
                }
                cm.dispose();
            }
        }
    }
}

function sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points) {
    var beltReqStr = (oldbelt != -1) ? " ����������� #i" + oldbelt + "# ������" : "";
    
    var pointsLeftStr = (points - cm.getPlayer().getDojoPoints() > 0) ? " ��Ҫ #r" + (points - cm.getPlayer().getDojoPoints()) + "#k ��������" : "";
    var beltLeftStr = (!haveOldbelt) ? " ������������δװ��������" : "";
    var conjStr = (pointsLeftStr.length > 0 && beltLeftStr.length > 0) ? " ��" : "";
        
    cm.sendNext("���� #i" + belt + "# #b#t" + belt + "##k��" + beltReqStr + " Ҫ�ﵽ #b" + level + "#k������������ӵ�� #b" + points + " ��������#k��\r\n\r\n�������������" + beltLeftStr + conjStr + pointsLeftStr + "��");
}

function isRestingSpot(id) {
    return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}

function isBetween(party, range) {
    var lowest = cm.getPlayer().getLevel();
    var highest = lowest;
    for (var x = 0; x < party.getMembers().size(); x++) {
        var lvl = party.getMembers().get(x).getLevel();
        if (lvl > highest)
            highest = lvl;
        else if (lvl < lowest)
            lowest = lvl;
    }
    return (highest - lowest) <= range;
}
