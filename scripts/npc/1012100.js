/*
NPC-������
λ��-100000201
 */

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 310;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 3;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "���Ѿ����˺ܳ���·���ܻ�ý�����������ǻۺ���������������Ի�� #r���㵱ǰ����Ƭ��Ϊ�����õ�һ��NPC#k����Ը�Ⳣ��һ����";
        if (spawnPnpcFee > 0) {
            sendStr += " �����Ը�⻨�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ��ң��Ҿ��ܰ�����ɡ�#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("���Ѿ�����Ҫ��Ϊһ�� #r������#k�����ڴ�֮ǰ����Щ������Ҫ���㡣#b��ȵȼ�����ﵽ10����������������ӵ�� " + cm.getFirstJobStatRequirement(jobType) + "#k�����ҿ�����");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�������Ҿ�֪���������׾ٵ�ͨ�����ԡ��ҳ��ϣ����Ǹ��ܰ��Ĺ����֡��һ������ø�ǿ���ڴ�֮ǰ������Ҫѡ��2�������������˵����һ�����ѵľ��������ǣ������ʲô����Ҫ�ʣ����������뷨��");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("ȥ���� #b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("����ϴμ��㣬�ɳ��˺ܶࡣ�ҿ�������ǰ���������������ڿ���������һ���������ˡ���ô���������ø�ǿ��ͨ����Ϊ��׼����һ���򵥵Ĳ��ԣ���ȷ������ô����");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("����ǰ������ѩ��� #b#p2020010##k �����ᵽ���㡣�ҿ�����Թ����ֵ�����תְ����Ȥ��Ϊ��ʵ�����Ŀ�꣬�ұ���������ʵ�����������Ƿ�ֵ�ý������ڽ����������������һ�����ڣ��������������һ������ͨ����һ�����룬�㽫����ҵĿ�¡�ˡ���������ǻ�������Ȼ��� #b#t4031059##k ��������");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("��� #b#t4031059##k ���ظ��ҡ�");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵúã����Ѿ�������ҵĿ�¡�壬����ȫ�İ� #b#t4031059##k ���˻���������������֤������ֵ�õ�3��תְ�����ڣ�����Ҫ������������������ѩ��� #b#p2020011##k��Ȼ����е�2���ֲ��ԡ�ף����ˣ�");
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
                    cm.sendOk("�Բ�����û���㹻�Ľ�����������������õ�λ�á�");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("���㣡ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("�Բ��������õ�λ���Ѿ����ˡ�����");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪�������ѡ��");
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("����һ����Ҫ������ѡ���㽫�޷���ͷ��");
            } else {
                cm.sendOk("��ѵ��һ�㣬ֱ����ﵽ����Ҫ���һ�ָ�����Ϊһ�� #r������#k.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1452051) && cm.canHold(2070000)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(300);
                    cm.gainItem(1452051, 1);
                    cm.gainItem(2060000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("�Ӵ˿̿�ʼ�����Ѿ������ǵ�һ�����ˡ�ǰ·��������ֻҪ�������ģ���ܿ���ܴﵽ���ߵ�ˮƽ�����ˣ�˵����ô�࣬���Ҵ�����һЩ�ҵ������ѡ�HAAAHHH!!!(һ������)");
            } else {
                cm.sendNext("ȷ����ı����ڳ�һЩ�ռ���������ҶԻ���");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ����⣬���ÿһ�������������˲�ۡ�ȷ�е�˵������һ�š��Ͽ�鿴һ�°ɡ�\n���⣬�Ҹ�����һЩ #b���ܵ�#k����������½ǵ� #b����#k �˵�������չʾ����ѧϰ��ʹ�õ����м��ܡ�ֵ��ע�����: ���޷�һ���Ӱ���ȫ������������һЩ���ܣ��������ѧ��һЩ���ܲ��ܻ�á�");
        else if (status == 3)
            cm.sendNextPrev("����һ�£�һ����������ѡ�񣬾Ͳ��ܸı������ٳ�����һ��·�����ھ�ȥ�ɣ���һ�������Ĺ����֡�");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("����������ѡ�񣬵�� [���Ѿ�ѡ������ְҵ] ѡ�#b\r\n#L0#P�����ҽ��� ���� ��ص�֪ʶ\r\n#L1#�����ҽ��� ���� ��ص�֪ʶ\r\n#L3#���Ѿ�ѡ������ְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫ�������Ƿ�����㹻ǿ���ܹ�ͨ�����ԡ��ⲻ��һ�����ѵĲ��ԣ�����������úܺá����ڣ��������ţ���ȷ�����ᶪʧ��");
                if (!cm.isQuestStarted(100000)) cm.startQuest(100000);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031010)) {
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072002##k �������ִ帽���� #b#m106010000##k���������ҵ��α�������Ľ̹١����Ž���������������Ҳ����㡣ף����ˡ�");
                    cm.dispose();
                } else {
                    cm.sendNext("ȷ����ı������ڿղ�");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //hunter
                        cm.sendNext("���� #r����#��\r\n\r\n#b����#k �����ڽ׶ε��˺�/����������ߣ������ٶȸ��죬�����������֡� #b����#k ��ʹ�� #r��ը��#k��һ�������Ĺ��������Ե��¶��6�����˱�ѣ�Ρ�");
                    } else if (selection == 1) {    //crossbowman
                        cm.sendNext("���� #r����#��\r\n\r\n#b����# ��������ȣ��ȼ�Խ�ߣ�Խ�ܻ�ø��ߵĹ������� #b����#k ��ʹ�� #r��͸��#k��һ�ָ�ǿ�Ĺ���������׷�ٵ��ˣ������Դ���ǽ�ڡ�");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���ڣ������Լ�������������ѡ��2ת��ְҵ: #b\r\n#L0#����\r\n#L1#����");
            }
        } else if (status == 2) {
            job += selection * 10;
            cm.sendYesNo("��ѡ���2תְҵΪ: " + (job == 310 ? "#b����#k" : "#b����#k") + "�����Ѿ�����ˣ�һ��������תְ�����޷���ѡ������ְҵ�ˣ�����");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);

            cm.sendNext("�õģ��������Ѿ���һ�� " + (job == 310 ? "#b����#k" : "#b����#k") + "��" + (job == 310 ? "#b����#k" : "#b����#k") + " ��һȺ���������������ŵ������Ĵ������������ܹ�����׾ٵؽ���������������ࡣ��ÿ��ѵ���Լ����һ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹ�����һ������ " + (job == 310 ? "#b����#k" : "#b����#k") + "��Ҫ�ļ����飬��ı���������������λ�ô���������HP��MP�����ֵ�Ѿ����������һ�����Լ���״̬�ѡ�");
        else if (status == 5)
            cm.sendNextPrev("�Ҹ�����һЩ #b���ܵ�#k�������½ǵ� #b���ܲ˵�#k���㽫�ܹ������»�õ�2ת���ܡ�����������Ҫ����һ�¡��㲻����һ���Ӱ����Ƕ���ߣ���Щ����ֻ������ѧϰ���������ܺ����ʹ�ã�һ��Ҫ��ס��һ�㡣");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "#b����#k" : "#b����#k") + " ��Ҫ��ø�ǿ�������ס���㲻����������Ȩ�������������������ϡ�������ȷ�ķ�ʽʹ����ľ޴���������Ϊ������˵������ȷ�ķ�ʽ����ȱ�ø�ǿ׳ҪӲ�öࡣ������ȡ�ø���������ҵ��ң��һ����ġ�");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("��Ȼ�����ҵĿ�¡�ˣ������Ԥ�ϵ�ǰ������һ������ս������ʹ����������δ���������⹥�����ܣ���������ǳɹ���һ��һ�ػ�����������ͨ����ʱ�����ƣ�������ʱ�������ڻ�������������Ҫ�ġ�ף����ˣ���ϣ�����ܰ� #b#t4031059##k ������");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
