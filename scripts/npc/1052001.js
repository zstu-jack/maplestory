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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r����������������ĵ���#k ��";
        if (spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ���������������ĵ��á�";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("�벻���Ϊһ�� #r����#k����������ǰ��ģ����������ÿһ���˶��ܳ�Ϊ������#b��ĵȼ�������Ҫ����10��������ӵ�� " + cm.getFirstJobStatRequirement(jobType) + "#k�����ҿ������ǲ��������׼��");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�ҿ����ˣ������úܺá��ҽ��������ڷ���֮·�ϸ���һ����");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("ȥ���� #b#p1072003##k.");
                cm.dispose();
            } else
                cm.sendNext("��Ľ���֮�����˾��ȡ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("���������ˡ�����ǰ�����ص��� #b#p2020011##k ����������㡣��֪����Է���������תְ�ܸ���Ȥ������Ҫ�������Ƿ�ӵ�н��е�����תְ��ʵ�����ڽ�������������м���һ����ڣ�����������һ������ͨ�����������������ҵķ������������ #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("������ #b#t4031059##k ���������ҶԻ���");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020011##k ������һ���Ĳ��ԡ�ף����ˣ�");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
        } else {
            cm.sendOk("���ǵ�ѡ��");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ң��޷���������ĵ��á�");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ�������ĵ����Ѿ���Ա�ˡ�");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("ѡ��ְҵ���޷��ٴθ��ġ�");
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType))
                cm.sendYesNo("Ŷ���㿴�������Գ�Ϊ���ǵ�һԱ����ȷ��Ҫ��Ϊ������?");
            else {
                cm.sendOk("���ѵ��������ﵽְҵ����Ҫ��ʱ���һ�������Ϊ #r����#k �ķ�����");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("�õģ��ӽ��쿪ʼ�����Ϊ�����ǵ�һԱ�������ĺ�Ϊ�ҵ����������������ģ����ܹ��Ϻ����ӡ���ô���һᴫ����һЩ���ܡ�������");
            } else {
                cm.sendNext("����ı����ڳ���λ�ã�Ȼ���������ҶԻ���");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ��Ұ����ַ����ıر������밵���͸��㣬Ҳ�����ÿһ��������������һ�ſո�����һ�¡����⣬�Ҹ�����һЩ #b���ܵ�#k����������½ǵ� #b����#k �˵������ܿ�������ѧϰ��ʹ�õ����м��ܡ��������޷������ǵĵȼ�ͬʱ�������㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("��һ��Ҫ�����㣬һ����������ѡ�񣬽����ɱ����");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("�õ�,���������˾���,����ײ��� [������Ҫѡ���ҵĶ�תְҵ].#b\r\n#L0#�����ҽ���ʲô�Ǵ̿͡�\r\n#L1#�����ҽ���ʲô�����͡�\r\n#L3#������Ҫѡ���ҵĶ�תְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ�����������˵Ӧ�ò������ѣ������ɡ��������������...��ǧ���Ū���ˡ�");
                if (!cm.isQuestStarted(100009)) cm.startQuest(100009);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031011)) {
                    if (!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("����������ȥ�� #b#p1072003##k�������ڷ������и����� #b#m102040000##k�����Ž�������������Ϊ�̹ٴ����Ҳ����㡣ף����ˡ�");
                } else {
                    cm.sendNext("��ȷ��������������1���λ��");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //assassin
                        cm.sendNext("�ó�ʹ�� #rȭ�������#k �ķ���.\r\n\r\n#b�̿�#k �����Զ�̹����������ܸ���Ч�����ý�Ǯ��������ǿ����˺�����ð�ճɱ�Ҳ�����͸��ߡ�");
                    } else if (selection == 1) {    //bandit
                        cm.sendNext("�ó�ʹ�� #r�̵�#k �ķ���.\r\n\r\n#b����#k �Խ�����ٹ��������������������ж�תְҵ���൱ǿ��������Ȼ����̿�������Ч�ҿ���Զ�̹������ˣ�������ǿ��Ľ�ս���������ֲ����ȱ�ݡ�");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���¶�����������ѡ����Ķ�תְҵ�� #b\r\n#L0#�̿�\r\n#L1#����");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031011)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("���������ѡ�� " + (job == 410 ? "#b�̿�#k" : "#b����#k") + "��Ϊ��Ķ�תְҵ�����Ѿ�����ˣ�һ��������תְ�����޷���ѡ������ְҵ�ˣ�����");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100011);

            if (job == 410) cm.sendNext("�õģ��������Ѿ���ʽ��Ϊ��һ�� #b�̿�#k���̿����ż���Ĺ����ٶȡ�������Ĺ�����Χ���������ƵС�����ѵ�����һ������ø�ǿ��");
            else cm.sendNext("�õģ��������Ѿ���ʽ��Ϊ��һ�� #b����#k��������ͨ�������ںڰ��У��ȴ�ʱ�����죬ͻȻѸ�ٵؽ�ذ�״���������塣����ѵ�����һ������ø�ǿ��");

            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո���������Ϊһ�� " + (job == 410 ? "�̿�" : "����") + " Ӧ�����յļ��ܡ����⣬�㱳������������չ��һ�У����HP�����MPҲ�õ������ӡ�");
        else if (status == 5)
            cm.sendNextPrev("ͬʱҲΪ��������1��� #b���ܵ�#k��������½ǵ� #b���ܲ˵�#k ���в鿴�������������������Ķ�ת���ܵȼ�������Ҫ������һ�£��㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "�̿�" : "����") + "����ζ�Ÿ�ǿ��ʵ���������ס����Ҫ�����������ȥ������С��Ҫ������������;����Ϊ������˵���س��ıȼ�����ǿҪ�ѵöࡣ�����ø�ǿ��ʱ�������ң��һ���������㡣");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�ҵķ����൱����������ʹ��������⼼�ܣ�����ֻ�ܵ���������ս���������������һ�����ѵ�ս����ע�⣬�㲻��������ͨ�����̫�ã����Ծ�����������Ҫ����...ף����ˣ��Һ��ڴ������#b#t4031059###k�������ҡ�");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}