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

        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r�����������빭���ֵĵ���#k ��";
        if (spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ����������빭���ֵĵ��á�";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("���Ѿ�����Ҫ��Ϊһ�� #r������#k�����ڴ�֮ǰ����Щ������Ҫ���㡣#b��ĵȼ�����ﵽ10��������ӵ������ " + cm.getFirstJobStatRequirement(jobType) + "#k�����ҿ���...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�㰲ȫ�����ˣ��Ҿ�֪���������ͨ���ġ����ò�˵����һλǿ��Ĺ����֡���ô���һ������ñ����ڸ�ǿ�󡣵�����֮ǰ������Ҫ��������·��ѡ����һ���Ⲣ�����ף���������������⣬����ʱ���ʡ�");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("ȥ���� #b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("����ϴμ���ʱ�ɳ��˺ܶࡣ�ҿ�������ǰ���������������ڿ���������һ���������ˡ���ô���������ø�ǿ��ͨ����Ϊ��׼����һ���򵥵Ĳ��ԣ���ȷ������ô����");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("���������ˡ�����ǰ�����ص��� #b#p2020010##k ����������㡣��֪����Թ����ֵ�����תְ����Ȥ������Ҫ�������Ƿ�ӵ�н��е�����תְ��ʵ�����ڽ�������ɭ���Թ�����һ����ڣ��������������һ������ͨ�����������������ҵķ������������ #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("����� #b#t4031059##k �������ҡ�");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020009##k ������һ���Ĳ��ԡ�ף����ˣ�");
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
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ң��޷����빭���ֵĵ��á�");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ�������ֵĵ����Ѿ���Ա�ˡ�");
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
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("���ѡ��������Ҫ������������ְҵ���޷��ٱ����");
            } else {
                cm.sendOk("���ѵ��������ﵽְҵ����Ҫ��ʱ���һ�������Ϊ #r������#k �ķ�����");
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
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ����⣬���ÿһ��������������һ�ſո񡣸Ͽ�鿴һ�°ɡ�\n���⣬�Ҹ�����һЩ #b���ܵ�#k����������½ǵ� #b����#k �˵������ܿ�������ѧϰ��ʹ�õ����м��ܡ��������޷������ǵĵȼ�ͬʱ�������㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("���ס��һ����������ѡ����Ͳ�����ѡ����һ����·�ˡ������ɣ���һ���Ժ��Ĺ����֡�");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("�õģ������¶�����Ҫ����ѡ�񣬾͵���·��� [������Ҫѡ���ҵĶ�תְҵ] ѡ�#b\r\n#L0#P�����ҽ���ʲô�����ˡ�\r\n#L1#�����ҽ���ʲô�����֡�\r\n#L3#������Ҫѡ���ҵĶ�תְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ�����������˵Ӧ�ò������ѣ������ɡ��������������...��ǧ���Ū���ˡ�");
                if (!cm.isQuestStarted(100000)) cm.startQuest(100000);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031010)) {
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072002##k ���������ִ帽���� #b#m106010000##k�����Ž�������������Ϊ�̹ٴ����Ҳ����㡣ף����ˡ�");
                    cm.dispose();
                } else {
                    cm.sendNext("��ȷ��������������1���λ��");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //hunter
                        cm.sendNext("�ó�ʹ�� #r��# �Ĺ����֡�\r\n\r\n#b����#k �����ڽ׶ε��˺�/����������ߣ������ٶȸ��죬�����������֡� #b����#k ����ϰ�� #r��ը��#k����Ȼ����������ʮ��ǿ�󣬵�ȴ����ѣ�ζ��6�����ˡ�");
                    } else if (selection == 1) {    //crossbowman
                        cm.sendNext("�ó�ʹ�� #r��# �Ĺ����֡�\r\n\r\n#b����# ��������ȣ���ȼ��ɳ�ʱ�����εĹ����˺�����ߡ� #b����#k ����ϰ�� #r��͸��#k��һ�ָ�ǿ�Ĺ������ܣ�����׷�ٵ��ˣ������Դ���ǽ�ڡ�");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���¶�����������ѡ����Ķ�תְҵ�� #b\r\n#L0#����\r\n#L1#����");
            }
        } else if (status == 2) {
            job += selection * 10;
            cm.sendYesNo("������Ҫѡ�� " + (job == 310 ? "#b����#k" : "#b����#k") + " ��Ϊ��Ķ�תְҵ�����Ѿ�֪��һ��������תְ�����޷���ѡ������ְҵ�˰ɣ�");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);

            cm.sendNext("�õģ��������Ѿ���Ϊ��һ�� " + (job == 310 ? "#b����#k" : "#b����#k") + "��" + (job == 310 ? "#b����#k" : "#b����#k") + " ��һ��ӵ�и�������Ұ��ְҵ�������ܹ�����׾ٵػ�ɱ���ֹ����ÿ��Ŭ��ѵ���Լ����һ�һֱ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո���������Ϊһ�� " + (job == 310 ? "#b����#k" : "#b����#k") + " Ӧ�����յļ��ܡ����⣬�㱳������������չ��һ�У����HP�����MPҲ�õ������ӡ�");
        else if (status == 5)
            cm.sendNextPrev("ͬʱҲΪ��������1��� #b���ܵ�#k��������½ǵ� #b���ܲ˵�#k ���в鿴�������������������Ķ�ת���ܵȼ�������Ҫ������һ�£��㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "#b����#k" : "#b����#k") + "����ζ�Ÿ�ǿ��ʵ���������ס����Ҫ�����������ȥ������С��Ҫ������������;����Ϊ������˵���س��ıȼ�����ǿҪ�ѵöࡣ�����ø�ǿ��ʱ�������ң��һ���������㡣");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�ҵķ����൱����������ʹ��������⼼�ܣ�����ֻ�ܵ���������ս��ע�⣬�㲻��������ͨ�����̫�ã����Ծ�����������Ҫ����...ף����ˣ��Һ��ڴ������#b#t4031059##k�������ҡ�");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
