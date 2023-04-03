/*
NPC-��˹
λ��-101000003
 */

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 210;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 2;

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
            cm.sendNext("�����Ϊһ�� #rħ��ʦ#k �𣿲���ÿһ���˶����Գ�Ϊħ��ʦ���ڴ�֮ǰ��һЩ��׼��Ҫ���㡣���ȣ�������Ҫ�ﵽ #b8��#k����Σ�������Ե� " + cm.getFirstJobStatRequirement(jobType) + " Ҳ�Ǳ�Ҫ�ġ�");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�ҿ������úܺá��ҽ��������������ĵ�·��������һ����");
            else if (cm.haveItem(4031009)) {
                cm.sendOk("ȥ�� #b#p1072001##k ������һ���ѡ�");
                cm.dispose();
            } else
                cm.sendNext("����ȡ�õĽ����Ǿ��˵ġ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("����ǰ������ѩ��� #b#p2020009##k �����ᵽ���㡣�ҿ������ħ��ʦ������תְ����Ȥ��Ϊ��ʵ�����Ŀ�꣬�ұ���������ǵ�ʵ�������������Ƿ�ֵ�ý������ڽ�������һƬ�����а��ɭ��������һ�����ڣ��������������һ������ͨ�����״ν��룬�������һ���ҵĿ�¡�塣��������ǻ�������Ȼ��� #b#t4031059##k ��������");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("�� #b#t4031059##k ���ҵĿ�¡���д��غ������ҶԻ����������а��ɭ�־Ϳ����ҵ�����");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵúã���������ҵĿ�¡�壬���� #b#t4031059##k ��ȫ�Ĵ������ˡ��������Ѿ��������ĽǶ�֤�����Լ�ֵ�õ�����תְ�����ڣ�����԰�������� #b#p2020011##k ���ر���ѩ�򣬼����ڶ���ѵ����ף����ˣ�");
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
    } else if (mode == 0 && type == 0) {
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
                    cm.sendOk("������˼�������õ�λ���Ѿ�����~");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪�������ѡ��");
                if (!(mode == 0 && type == 0)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("�㿴������һ�����Կ��Գ�Ϊ����һ���ֵ��ˣ���ô�������Ϊħ��ʦ��");
            } else {
                cm.sendOk("��ѵ��һ�㣬ֱ����ﵽ����Ҫ���ҿ�������չʾ��Ϊ #rħ��ʦ#k �ĵ�·��");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1372043)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
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
            cm.sendNextPrev("���ס�����ܲ���ȫ������Ϊһ��ħ��ʦ��������Ա������ļ�����ƥ�䡣ħ��ʦ��ͨ����������Ϊ�����ԣ�������Ϊ�����ԡ��������üӵ���鷳��Ҳ����ʹ�� #b�Զ�����#k");
        else if (status == 4)
            cm.sendNextPrev("��������Ҫע����ǣ��������ս����ʧ�ܣ������ʧһ���־���ֵ�������Ѫ�������ʱ�����Ҫ����ע���ˡ�");
        else if (status == 5)
            cm.sendNextPrev("��������̸ܽ�������ж����ˣ�ף���ڽ���������;��һ��˳���������ħ��ʦ��");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("����������ѡ�񣬵�� [���Ѿ�ѡ������ְҵ] ѡ�#b\r\n#L0#�����ҽ��� ��ʦ(��/��) ��ص�֪ʶ\r\n#L1#�����ҽ��� ��ʦ(��/��) ��ص�֪ʶ\r\n#L2#�����ҽ��� ��ʦ ��ص�֪ʶ\r\n#L3#���Ѿ�ѡ������ְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫ�������Ƿ�����㹻ǿ���ܹ�ͨ�����ԡ��ⲻ��һ�����ѵĲ��ԣ�����������úܺá����ڣ��������ţ���ȷ�����ᶪʧ��");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072001##k ������ħ�����ָ����� #b#m101020000##k���������ҵ��α��ο��˵ĵ�ʦ�����Ž���������������Ҳ����㡣ף����ˡ�");
                } else {
                    cm.sendNext("ȷ����ı������ڿղ�");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("���� #r��/��#k ��ʦ��\r\n\r\n����һ�������ͷ�ħ�������Ԫ���˺���ְҵ����Щ����ʹ�����ڶԿ����Լ������ĵ���ʱ�����������ơ�ͨ�����ǵļ��� #r������#k and #r������#k��#b��ʦ#k �ܹ��������ǵ�ħ�������������Ͷ��ֵĻ����ԡ�#b��/����ʦ#k ӵ��ǿ��Ļ���������Ͷ�ҩ������");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("���� #r��/��#k ��ʦ��\r\n\r\n����һ�������ͷ�ħ�������Ԫ���˺���ְҵ����Щ����ʹ�����ڶԿ����Լ������ĵ���ʱ�����������ơ�ͨ�����ǵļ��� #r������#k and #r������#k��#b��ʦ#k �ܹ��������ǵ�ħ�������������Ͷ��ֵĻ����ԡ�#b��/����ʦ#k �б����ı������;��˵����繥����");    //i/l mage
                    } else {
                        cm.sendNext("���� #r��ʦ#k��\r\n\r\n#b��ʦ#k ��һ��ǿ��ĸ�����ְҵ��һ���ᱻ���ж��������ܡ���Ϊ������Ϊ�Լ��Ͷ����ṩǿ��� #r����#k ������ʹ�� #rף��#k ���ܣ�#b��ʦ#k ������ǿ���Բ������ܵ����˺����������ú������棬�������͵�ְҵ�ͷǳ��ʺ��㡣#b��ʦ#k �ر���Ʋ������");    //cleric
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���ڣ������Լ�������������ѡ��2ת��ְҵ: #b\r\n#L0#��ʦ(��/��)\r\n#L1#��ʦ(��/��)\r\n#L2#��ʦ");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("��ѡ���2תְҵΪ: " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + "�����Ѿ�����ˣ�һ��������תְ�����޷���ѡ������ְҵ�ˣ�����");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("�õģ��������Ѿ���һ�� " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + " �ˡ���ʦ����ʦ��һȺ�������ˣ�����ӵ�������������ŵ�ħ���������ܹ�����׾ٵش̴������˼�������ṹ�����������Լ����һ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹ�����һ������ " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + " ��Ҫ�ļ����飬��ı���������������λ�ô���������HP��MP�����ֵ�Ѿ����������һ�����Լ���״̬�ѡ�");
        else if (status == 5)
            cm.sendNextPrev("�Ҹ�����һЩ #b���ܵ�#k�������½ǵ� #b���ܲ˵�#k���㽫�ܹ������»�õ�2ת���ܡ�����������Ҫ����һ�¡��㲻����һ���Ӱ����Ƕ���ߣ���Щ����ֻ������ѧϰ���������ܺ����ʹ�ã�һ��Ҫ��ס��һ�㡣");
        else if (status == 6)
            cm.sendNextPrev("��Ϊһ��" + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + " ��Ҫ��ø�ǿ�������ס���㲻����������Ȩ�������������������ϡ�������ȷ�ķ�ʽʹ����ľ޴���������Ϊ������˵������ȷ�ķ�ʽ����ȱ�ø�ǿ׳ҪӲ�öࡣ������ȡ�ø���������ҵ��ң��һ����ġ�");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
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