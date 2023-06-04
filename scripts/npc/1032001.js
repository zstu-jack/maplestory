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

        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r������������ħ��ʦ�ĵ���#k ��";
        if (spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ�����������ħ��ʦ�ĵ��á�";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("�����Ϊһ�� #rħ��ʦ#k �𣿲���ÿһ���˶����Գ�Ϊħ��ʦ����Ҫ�����׼���С�#b ����ﵽ10��������ӵ������ " + cm.getFirstJobStatRequirement(jobType) + "#k�����ҿ���...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�ҿ����ˣ������úܺá��ҽ��������������ĵ�·�ϸ���һ����");
            else if (cm.haveItem(4031009)) {
                cm.sendOk("ȥ���� #b#p1072001##k ��");
                cm.dispose();
            } else
                cm.sendNext("��Ľ���֮�����˾��ȡ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("���������ˡ�����ǰ�����ص��� #b#p2020009##k ����������㡣��֪�����ħ��ʦ������תְ����Ȥ������Ҫ�������Ƿ�ӵ�н��е�����תְ��ʵ�����ڽ�������һƬ�����а��ɭ��������һ����ڣ��������������һ������ͨ�����������������ҵķ������������ #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("��������� #b#t4031059##k ���������ҡ�������ɭ��II�Ϳ����ҵ�����");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020010##k ������һ���Ĳ��ԡ�ף����ˣ�");
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
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ң��޷�����ħ��ʦ�ĵ��á�");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ��ħ��ʦ�ĵ����Ѿ���Ա�ˡ�");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("ѡ��ְҵ���޷��ٴθ��ġ�");
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
                cm.sendYesNo("�㿴��������Թ��ʸ��Ϊ���ǵ�һԱ����ô�������Ϊħ��ʦ��");
            } else {
                cm.sendOk("���ѵ��������ﵽְҵ����Ҫ��ʱ���һ�������Ϊ #rħ��ʦ#k �ķ�����");
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
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ����⣬���ÿһ��������������һ�ſո񡣸Ͽ�鿴һ�°ɡ�\n���⣬�Ҹ�����һЩ #b���ܵ�#k����������½ǵ� #b����#k �˵������ܿ�������ѧϰ��ʹ�õ����м��ܡ��������޷������ǵĵȼ�ͬʱ�������㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("���ס�����ܲ���ȫ������Ϊһ��ħ��ʦ��������Ա������ļ�����ƥ�䡣ħ��ʦ��ͨ����������Ϊ�����ԣ�������Ϊ�����ԡ��������üӵ���鷳��Ҳ����ʹ�� #b�Զ�����#k");
        else if (status == 4)
            cm.sendNextPrev("��������Ҫע����ǣ����������������ս����ʧ�ܣ��ͻ���ʧһ���־���ֵ�������Ѫ�������ʱ�����Ҫ����ע���ˡ�");
        else if (status == 5)
            cm.sendNextPrev("��������̸ܽ�������ж����ˣ�ף���ڽ���������;��һ��˳���������ħ��ʦ��");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("�õģ������¶�����Ҫ����ѡ�񣬾͵���·��� [������Ҫѡ���ҵĶ�תְҵ] ѡ�#b\r\n#L0#�����ҽ���ʲô����ʦ(��/��)��\r\n#L1#�����ҽ���ʲô����ʦ(��/��)��\r\n#L2#�����ҽ���ʲô����ʦ��\r\n#L3#������Ҫѡ���ҵĶ�תְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ�����������˵Ӧ�ò������ѣ������ɡ��������������...��ǧ���Ū���ˡ�");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072001##k������ħ�����ָ����� #b#m101020000##k�����Ž�������������Ϊ�̹ٴ����Ҳ����㡣ף����ˡ�");
                } else {
                    cm.sendNext("��ȷ��������������1���λ��");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("�ó�ʹ�� #r��ϵ�붾��ϵħ��#k ����ʦ��\r\n\r\n����һ���ͷ�ħ�������Ԫ���˺���ְҵ����Щ����ʹ�����ڶԿ����Ա����Ƶĵ���ʱ�����������ơ�ͨ�����ǵļ��� #r������#k and #r������#k��#b��ʦ#k �ܹ��������ǵ�ħ�������������Ͷ��ֵĻ����ԡ�#b��/����ʦ#k ӵ��ǿ��Ļ���������Ͷ��ع�����");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("�ó�ʹ�� #r��ϵ����ϵħ��#k ����ʦ��\r\n\r\n����һ���ͷ�ħ�������Ԫ���˺���ְҵ����Щ����ʹ�����ڶԿ����Ա����Ƶĵ���ʱ�����������ơ�ͨ�����ǵļ��� #r������#k and #r������#k��#b��ʦ#k �ܹ��������ǵ�ħ�������������Ͷ��ֵĻ����ԡ�#b��/����ʦ#k ӵ�б���Ч���ı�ϵ�������׵繥����");    //i/l mage
                    } else {
                        cm.sendNext("�ó�ʹ�� #r��ʥħ��#k ����ʦ��\r\n\r\n#b��ʦ#k ��һ��ǿ��ĸ�����ְҵ��ʮ�������ҵ����顣��Ϊ����ӵ�� #r����#k �Լ��Ͷ��ѵ�ǿ��������ʹ�� #rף��#k ���ܣ�#b��ʦ#k ������ǿ���Բ������ܵ����˺����������ú������棬���ְҵ�ǳ��ʺ��㡣#b��ʦ#k �ر���Ʋ������");    //cleric
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���¶�����������ѡ����Ķ�תְҵ�� #b\r\n#L0#��ʦ(��/��)\r\n#L1#��ʦ(��/��)\r\n#L2#��ʦ");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("������Ҫѡ�� " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + " ��Ϊ��Ķ�תְҵ�����Ѿ�����ˣ�һ��������תְ�����޷���ѡ������ְҵ�ˣ�����");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("�õģ��������Ѿ���һ�� " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + " �ˡ���ʦ����ʦ���ʴ�ӱ������ӵ�������������ŵ�ħ���������ܹ�����׾ٵ���������˼ά������ṹ�����������Լ����һ�һֱ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո���������Ϊһ�� " + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + "  Ӧ�����յļ��ܡ����⣬�㱳������������չ��һ�У����HP�����MPҲ�õ������ӡ�");
        else if (status == 5)
            cm.sendNextPrev("ͬʱҲΪ��������1��� #b���ܵ�#k��������½ǵ� #b���ܲ˵�#k ���в鿴�������������������Ķ�ת���ܵȼ�������Ҫ������һ�£��㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 6)
            cm.sendNextPrev("��Ϊһ��" + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + "����ζ�Ÿ�ǿ��ʵ���������ס����Ҫ�����������ȥ������С��Ҫ������������;����Ϊ������˵���س��ıȼ�����ǿҪ�ѵöࡣ�����ø�ǿ��ʱ�������ң��һ���������㡣");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�ҵķ����൱����������ʹ��������⼼�ܣ�����ֻ�ܵ���������ս���������������һ�����ѵ�ս����ע�⣬�㲻��������ͨ�����̫�ã����Ծ�����������Ҫ����...ף����ˣ��Һ��ڴ������#b#t4031059##k�������ҡ�");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}