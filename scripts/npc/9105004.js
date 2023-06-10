/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @Author Ronan
 * Snow Spirit
	Maplemas PQ coordinator
 */

importPackage(Packages.server.life);

var prizeTree = [[[2000002, 1002850], [20, 1]], [[2000006, 1012011], [20, 1]]];

var state;
var status;
var gift;
var pqType;
 
function start() {
        pqType = ((cm.getMapId() / 10) % 10) + 1;
        state = (cm.getMapId() % 10 > 0) ? 1 : 0;
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(state > 0) {
                    insidePqAction(mode, type, selection);
                } else {
                    recruitPqAction(mode, type, selection);
                }
        }
}

function recruitPqAction(mode, type, selection) {
        if (status == 0) {
                em = cm.getEventManager("HolidayPQ_" + pqType);
                if(em == null) {
                        cm.sendOk("��ѩ�����������" + pqType + "������һ������");
                        cm.dispose();
                } else if(cm.isUsingOldPqNpcStyle()) {
                        action(1, 0, 0);
                        return;
                }

                cm.sendSimple("#e#b<������񣺱�ѩ����>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n����ӳ�Աһ�����һ��������������������������ϰ������ѣ�ֻ�г�ɫ���ŶӺ������ܿ˷���һ�С�������볢����ս���������#b�ӳ�#k������˵����#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
        } else if (status == 1) {
                if (selection == 0) {
                        if (cm.getParty() == null) {
                                cm.sendOk("�������״̬ʱ������ִ���������");
                                cm.dispose();
                        } else if(!cm.isLeader()) {
                                cm.sendOk("�����ִ���������������Ķӳ������ҶԻ���");
                                cm.dispose();
                        } else {
                                var eli = em.getEligibleParty(cm.getParty());
                                if(eli.size() > 0) {
                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), pqType)) {
                                                cm.sendOk("��Ƶ���Ѿ��ж�������ִ�����������ȴ���������������л�������Ƶ����");
                                        }
                                }
                                else {
                                        cm.sendOk("Ŀǰ�޷�ִ���������ԭ��������������������Ҫ������д��ڲ������ʸ�ĳ�Ա����ӳ�Աû�н��뱾��ͼ֮һ�����ȱ����ӳ�Ա���볢������������ܡ�");
                                }

                                cm.dispose();
                        }
                } else if (selection == 1) {
                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                        cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                        cm.dispose();
                } else {
                        cm.sendOk("#e#b<������񣺱�ѩ����>#k#n\r\n\r\n��ɶ���󣬶���ѩ�ˣ��������Ҹ����������˹�����š��볡������Ķ����Ա�ռ�ѩ֮����Ϊѩ��ע�������������������");
                        cm.dispose();
                }
        }
}

function insidePqAction(mode, type, selection) {
        var eim = cm.getEventInstance();
        var difficulty = eim.getIntProperty("level");
        var stg = eim.getIntProperty("statusStg1");

        var mapobj = eim.getInstanceMap(889100001 + 10 * (difficulty - 1));

        if(status == 0) {
                if(stg == -1) {
                        cm.sendNext("#b#h0##k...������������������Ҹ���Ĵ�����һ���ѩ�˵ĵط���������˹���������ڽ�������춯���������ǵ���������ʱ�������ڱ���ѩ�˲�������˹���µĹ���������������˿���˹�����£����ǻ����һ�ֽ���ѩ֮�����ĵ��ߡ��ռ�ѩ֮������������ѩ�˸�����ѩ�˾ͻ�ɳ���һ��ѩ�˳ɳ����������ǵ����������ˡ���Щ����������ٵ�ѩ֮��������������ٵ�ѩ֮����ʱ��ѩ�˵��ڻ��ٶȻ��ƽʱҪ�졣ף���Ǻ��ˡ� ");
                } else if(stg == 0) {
                        if(cm.getMap().getMonsterById(9400321 + 5 * difficulty) == null) {
                                cm.sendNext("�����ˣ���ܿ���˹�����£���ѩ�˳��������Ļ�����˹�Ͳ��ò����������ˡ�");
                                cm.dispose();
                        } else {
                                cm.sendNext("�ɵ�Ư����������������������ǳɹ�����˿���˹�����¡�̫��л�����ˣ�(���ݵĳ�Ĭ...)��Ҳ�и�����Ϣ������˹���񲢲����ľ������������������Ѿ��������﷢�����������������Ҳ����˵...���ܿ�ͻ�����ˡ������ս�����ٴ�ף���Ǻ��ˡ�");
                        }
                } else {
                        if(!eim.isEventCleared()) {
                                cm.sendNext("���ܿ���˹���������Ǵ�ҵ�ʥ���ڣ�");
                                cm.dispose();
                        } else {
                                cm.sendNext("�ۣ������Ǵ���˿���˹��̫��л�����ˣ����ǳɹ��ػ���ʥ���ڰ�Ȼ����");
                        }
                }
        } else if(status == 1) {
                if(stg == -1) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("�������ǵĶӳ����ҽ�̸�����˽�����й���������ϸ�ڡ�");
                                cm.dispose();
                                return;
                        }

                        mapobj.allowSummonState(true);
                        var snowman = MapleLifeFactory.getMonster(9400317 + (5 * difficulty));
                        mapobj.spawnMonsterOnGroundBelow(snowman, new java.awt.Point(-180, 15));
                        eim.setIntProperty("snowmanLevel", 1);
                        eim.dropMessage(5, "ѩ�˳����ˣ���ʹ�����������������");

                        eim.setIntProperty("statusStg1", 0);
                        cm.dispose();
                        return;
                } else if(stg == 0) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("�������ǵĶӳ����ҽ�̸�����˽�����й���������ϸ�ڡ�");
                                cm.dispose();
                                return;
                        }

                        mapobj.broadcastStringMessage(5, "ѩ�˳ɳ������ʱ������˹���ڶ����ˣ�");
                        eim.getEm().getIv().invokeFunction("snowmanHeal", eim);

                        var boss = MapleLifeFactory.getMonster(9400318 + difficulty);
                        mapobj.spawnMonsterOnGroundBelow(boss, new java.awt.Point(-180, 15));
                        eim.setProperty("spawnedBoss", "true");

                        eim.setIntProperty("statusStg1", 1);
                        cm.dispose();
                } else {
                        gift = cm.haveItem(4032092, 1);
                        if(gift) {
                                var optStr = generateSelectionMenu(generatePrizeString());
                                cm.sendSimple("�~�����#b#t4032092##k�����Ǻܺã�������...�������ʥ���������ѡ��һ����ϲ���ģ�\r\n\r\n" + optStr);
                        } else if(eim.gridCheck(cm.getPlayer()) == -1) {
                                cm.sendNext("�������ʥ����������պ�~");
                        } else {
                                cm.sendOk("ʥ���ڿ��֣�");
                                cm.dispose();
                        }
                }

        } else if(status == 2) {
                if(gift) {
                        var selItems = prizeTree[selection];
                        if(cm.canHoldAll(selItems[0], selItems[1])) {
                                cm.gainItem(4032092, -1);
                                cm.gainItem(selItems[0][0], selItems[1][0]);

                                if(selection == 1) {
                                        var rnd = (Math.random() * 9) | 0;
                                        cm.gainItem(selItems[0][1] + rnd, selItems[1][1]);
                                } else {
                                        cm.gainItem(selItems[0][1], selItems[1][1]);
                                }
                        } else {
                                cm.sendOk("��ȷ��װ���������������㹻�Ŀռ䡣");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer(), difficulty)) {
                                eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                                cm.sendOk("��ȷ��װ�����������������������㹻�Ŀռ䡣");
                        }
                }

                cm.dispose();
        }
}

function generatePrizeString() {
        var strTree = [];
        
        for(var i = 0; i < prizeTree.length; i++) {
                var items = prizeTree[i][0];
                var qtys = prizeTree[i][1];

                var strSel = "";
                for(var j = 0; j < items.length; j++) {
                        strSel += ("#i" + items[j] + "# #t" + items[j] + "#" + (qtys[j] > 1 ? (" : " + qtys[j]) : ""));
                }

                strTree.push(strSel);
        }
        
        return strTree;
}

function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}