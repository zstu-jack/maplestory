/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
* @Author: Moogra, XxOsirisxX
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);

/* var belt_points = Array(200, 1800, 4000, 9200, 17000); */
var belt_points = Array(5, 45, 100, 230, 425); /* Watered down version */

var status = -1;
var selectedMenu = -1;

function start() {
	if(disabled) {
		cm.sendOk("ʦ��������Ŀǰ����#r�չ�#k�������Ҳ��ܷ����ȥ��");
		cm.dispose();
		return;
	}
	
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        var text = "���ߵ����������˾��ȣ����������ľ�û��ô���ˡ���Ҫ������ս��\r\n\r\n#b#L0#���������ս#l\r\n#L1#�����뿪#l\r\n";
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
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001) {
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("�٣��Ǳ���λ��������ͷһ�����ɣ��ţ���ʦ�������׺��κ��˼��棬����æ�ġ����ҿ�������ӣ��ҿɲ��������������㡣��������������������...�����㣬������ܴ���ң��Ҿ�������ȥ������ʦ������������ΰ���");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("�������������⸱�����Ͱ͵�ģ���ֺ�˭��\r\n���Ķ������Ķ�ȥ�ɣ�");
                        } else {
                           if(cm.getClient().getChannelServer().getMapFactory().getMap(925020010).getCharacters().size() > 0) {
                                cm.sendOk("Someone is already in Dojo.");
                                cm.dispose();
                                return;
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("The last time you took the challenge by yourself, you went up to level " + cm.getPlayer().getDojoStage() + ". I can take you there right now. Do you want to go there?");
                    } else {
                        cm.warp(mode == 1 ? 925020000 + cm.getPlayer().getDojoStage() * 100 : 925020100, 0);
                        cm.dispose();
                    }
                } else {
					for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
						if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
							cm.sendOk("Someone is already in the Dojo." + i);
							cm.dispose();
							return;
						}
					}
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
                if (party == null) {
                    cm.sendNext("����Ϊ����ȥ�Ķ������������ӳ������ǣ�����Ķӳ�������˵��");
                    cm.dispose();
                    return;
                }
                var lowest = cm.getPlayer().getLevel();
                var highest = lowest;
                for (var x = 0; x < party.getMembers().size(); x++) {
                    var lvl = party.getMembers().get(x).getLevel();
                    if (lvl > highest)
                        highest = lvl;
                    else if (lvl < lowest)
                        lowest = lvl;
                }
                var isBetween30 = highest - lowest < 30;
                if (party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("����Ϊ����ȥ�Ķ������������ӳ������ǣ�����Ķӳ�������˵��");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendNext("You're going to take on the challenge as a one-man party?");
                } else if (!isBetween30) {
                    cm.sendNext("��Ķ���ȼ����̫��û����ȥ�����ж�Ա�ĵȼ���ñ����� #r30��#k ���ڡ�");
                } else {
                    for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
                            if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("Someone is already in the Dojo.");
                                    cm.dispose();
                                    return;
                            }
                    }
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "���� #b" + cm.getPlayer().getDojoPoints() + "#k �����������ʦ���������츳�����ļһ������г��ڵĵ����������Ϳ��Ը��ݾ���õ��յ�һ������������\r\n";
                    for (var i = 0; i < belts.length; i++) {
                        if (cm.haveItemWithId(belts[i], true)) {
                            selStr += "\r\n     #i" + belts[i] + "# #t" + belts[i] + "#(Obtain)";
                        } else
                            selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#l";
                    }
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    if (cm.getPlayer().getDojoPoints() > points) {
                        if (cm.getPlayer().getLevel() > level)
                            cm.gainItem(belt, 1);
                        else
                            cm.sendNext("In order to receive #i" + belt + "# #b#t" + belt + "##k, you have to be at least over level #b" + level + "#k and you need to have earned at least #b" + points + " training points#k.\r\n\r\nIf you want to obtain this belt, you need #r" + (points - cm.getPlayer().getDojoPoints()) + "#k more training points.");
                    } else
                        cm.sendNext("In order to receive #i" + belt + "# #b#t" + belt + "##k, you have to be at least over level #b" + level + "#k and you need to have earned at least #b" + points + " training points#k.\r\n\r\nIf you want to obtain this belt, you need #r" + (points - cm.getPlayer().getDojoPoints()) + "#k more training points.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("������õ������������͹����ˣ������װɣ�������Ҳ����ȫ�ǻ��¡�Ҫ���������ú������ռ����������������ٻ��ͬ���������ˡ�����Ҫ���õ���������");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("������Ҫ����һ�»���������ȥ����͸͸���ٻ������Ұɡ�");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("���ˣ���ĵ��������Ѿ������ˡ�������Ϊһ������㣬Ŭ�����аɣ�");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0 && cm.getPlayer().getVanquisherStage() <= 0) {
                    cm.sendYesNo("�㻹û�ﵽ��ȡ���µ�Ҫ�󰡣�������������ͬһ�����˴�#b100��#k������ȡ #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k�������û�д�� #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k 100��... �벻�����Ŵ��#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k��");
                } else if (status == 1 || cm.getPlayer().getVanquisherStage() > 0) {
                    if (mode == 0) {
                        cm.sendNext("û������뷨���Ǿ����ˡ�");
                        cm.dispose();
                    } else {
                        if (cm.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("You have complete all medals challenges.");
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
                }
            } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                cm.sendNext("Our master is the strongest person in Mu Lung. The place he built is called the Mu Lung Dojo, a building that is 38 stories tall! You can train yourself as you go up each level. Of course, it'll be hard for someone at your level to reach the top.");
                cm.dispose();
            }
        } else
            cm.dispose();
    } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        if (selectedMenu == -1)
            selectedMenu = selection;
        status++;
        if (selectedMenu == 0) {
            cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
            cm.dispose();
        } else if (selectedMenu == 1) { //I want to leave
            if (status == 0) {
                cm.sendAcceptDecline("��ô����Ҫ�����ˣ����Ҫ�˳���");
            } else {
                if (mode == 1) {
                    cm.warp(925020002, "st00");
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //�������ڼ�¼ĿǰΪֹ�ĵ÷�
            if (status == 0) {
                cm.sendYesNo("�����¼ĿǰΪֹ�ĵ÷֣��Ϳ��Դ��ϴ��뿪�ĵط�������ս������ɣ������¼���ڵĵ÷���");
            } else {
                if (mode == 0) {
                    cm.sendNext("������Լ����ܸ���һ����������");
                } else if (925020000 + cm.getPlayer().getDojoStage() * 100 == cm.getMapId()) {
                    cm.sendOk("��ĵ÷��Ѿ��Ǻ��ˡ��´�������ս���������ܻص����");
                } else {
                    cm.sendNext("I recorded your score. If you tell me the next time you go up, you'll be able to start where you left off.");
                    cm.getPlayer().setDojoStage((cm.getMapId() - 925020000) / 100);
                }
                cm.dispose();
            }
        }
    } else {
        if (mode == 0) {
            cm.sendNext("����ԥ�����ˣ��ܿ���ͻ�������һ�����");
        } else if (mode == 1) {
            cm.warp(925020002, 0);
            cm.getPlayer().message("���ܲ����ö����Ⱑ��");
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
