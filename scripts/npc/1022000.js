/*
NPC-��������
λ��-102000003
 */

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 110;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 1;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r������������սʿ�ĵ���#k ��";
        if (spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ�����������սʿ�ĵ��á�";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("���Ϊһ�� #rսʿ#k ������Ҫ����Ҫ����С�#b ����ﵽ10��������ӵ������ " + cm.getFirstJobStatRequirement(jobType) + "#k�����ҿ���...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�㰲ȫ�����ˣ��Ҿ�֪���������ͨ���ġ����ò�˵����һλǿ���սʿ����ô���һ������ñ����ڸ�ǿ�󡣵�����֮ǰ������Ҫ��������·��ѡ����һ���Ⲣ�����ף���������������⣬����ʱ���ʡ�");
            else if (cm.haveItem(4031008)) {
                cm.sendOk("ȥ���� #b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("��Ľ���֮�����˾��ȡ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("���������ˡ�����ǰ�����ص��� #b#p2020008##k ����������㡣�����������һ��������������϶�������һ������ͨ����ֻ�����ܽ��롣�������������ҵķ������������ #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("����� #b#t4031059##k �������ҡ�");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020008##k ������һ���Ĳ��ԡ�ף����ˣ�");
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
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ң��޷�����սʿ�ĵ��á�");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ��սʿ�ĵ����Ѿ���Ա�ˡ�");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
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
                cm.sendOk("���ѵ��������ﵽְҵ����Ҫ��ʱ���һ�������Ϊ #rսʿ#k �ķ�����");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("�����ڿ�ʼ����̤����սʿ֮·��ǰ;��������������Լ�������ͼ��ܳ������Ĳ��ϸ�ѵ������ͻ�˷���·�ϵ��κ����ѡ����ͣ������սʿ��");
            } else {
                cm.sendNext("ȷ����ı������㹻�Ŀռ���������ҶԻ��ɡ�");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ����⣬���ÿһ��������������һ�ſո񡣸Ͽ�鿴һ�°ɡ�\n���⣬�Ҹ�����һЩ #b���ܵ�#k�������½ǵ� #b����#k �˵������ܿ�������ѧϰ��ʹ�õ����м��ܡ��������޷������ǵĵȼ�ͬʱ�������㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("���ס��һ����������ѡ����Ͳ�����ѡ����һ����·�ˡ������ɣ���һ���Ժ���սʿ��");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("�õģ������¶�����Ҫ����ѡ�񣬾͵���·��� [������Ҫѡ���ҵĶ�תְҵ] ѡ�#b\r\n#L0#�����ҽ���ʲô�ǽ��͡�\r\n#L1#�����ҽ���ʲô��׼��ʿ��\r\n#L2#�����ҽ���ʲô��ǹսʿ��\r\n#L3#������Ҫѡ���ҵĶ�תְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ�����������˵Ӧ�ò������ѣ������ɡ��������������...��ǧ���Ū���ˡ�");
                if (!cm.isQuestStarted(100003)) cm.startQuest(100003);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072000##k ��������ʿ���丽���� #b#m102020300##k�����Ž�������������Ϊ�̹ٴ����Ҳ����㡣ף����ˡ�");
                } else {
                    cm.sendNext("��ȷ��������������1���λ��");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //����
                        cm.sendNext("�ó�ʹ�� #r���븫#k ��սʿ��\r\n\r\n#r����#k ����ϰ�� #b��ŭ֮��#k���ܹ�����ȫ��10���������������ж�ת�����У�����Ч���Ƶ����Ƿǳ�ǿ���ܹ���ѵء���ռ��������������ÿλ�Ŷӳ�Ա������ʦ�⣩���˺����ٵ�֮�ࡣ��������һ��СС�ĸ����ã����˴��ŵؼ���10�������������Ҳ����ʲô�ˡ����֮�£�����ְҵ��ȻҲ�������������������󲿷�����Ҫ������Ʒ��ʵ�ֵġ� #r����#k ������ϰ�� #b�˺�����#k ������40%�Ĵ����˺����������Ƿ�����������ܹ�������Լҩˮ���ģ������ #r����#k ���ǿ���ȥ����������ԭ��");
                    } else if (selection == 1) {    //׼��ʿ
                        cm.sendNext("�ó�ʹ�� #r�������#k ��սʿ��\r\n\r\n#r׼��ʿ#k ����ϰ�� #bѹ����#k���ܹ����͹����ǵ����������������������20�㡣ͨ�����������͹��������ɵ��˺��� #r׼��ʿ#k ������ϰ�� #b�˺�����#k ������40%�Ĵ����˺����������Ƿ�����������ܹ�������Լҩˮ���ģ������ #r����#k ���ǿ���ȥ����������ԭ�򡣵�Ȼ�����ϵػ��˺� #b����֮��/��������#k Ҳ�������ܹ�������������Ҫԭ��");
                    } else {    //ǹսʿ
                        cm.sendNext("�ó�ʹ�� #rǹ��ì#k ��սʿ��\r\n\r\n#rǹսʿ#k ����ϰ��  #b��ʥ֮��#k���ܹ����������Ķ���60%�����HP��MP��������ܿ��Դ���ȵ����������з����������ֺͷ�ʦ�����ǿ�����ʱ��������ʡ����ǻ�ӵ�� #b���޷���#k ���ܹ���300��������ȫ��20��������������ħ����������������ܲ��������ʦ��ף�������棬�����ṩ�����ʺͻر��ʣ�������ʱ��ȴ���100�롣�����������Ҳ��Ȼ�������˺��������Ტ�ۡ���Ҳ��ǹսʿ�������ְҵ����ʿ����������Ϊ����ְҵ��ԭ��");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("���¶�����������ѡ����Ķ�תְҵ�� #b\r\n#L0#����\r\n#L1#׼��ʿ\r\n#L2#ǹսʿ");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("������Ҫѡ�� " + (job == 110 ? "#b����#k" : job == 120 ? "#b׼��ʿ#k" : "#bǹսʿ#k") + " ��Ϊ��Ķ�תְҵ�����Ѿ�֪��һ��������תְ�����޷���ѡ������ְҵ�˰ɣ�");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100005);

            if (job == 110) cm.sendNext("�õģ��������Ѿ���Ϊ��һ�� #b����#k����Ϊһ������ҪŬ����Ϊǿ���е�ǿ�ߣ���ͣս������Զ��Ҫʧȥս������־������ֱǰ���һ�һֱ�������ñ����ڸ�ǿ��");
            else if (job == 120) cm.sendNext("�õģ��������Ѿ���Ϊ��һ�� #b׼��ʿ#k��׼��ʿ��߸߳����ǻ���������ϣ�������ڽ�����;�н��������õõ����һ�һֱ�������ñ����ڸ�ǿ��");
            else cm.sendNext("�õģ��������Ѿ���Ϊ��һ�� #bǹսʿ#k��ǹսʿ��������Ӱ�У��úڰ�������������ˡ�����������ó��У����������Լ����Լ�������˾�η���������һ�һֱ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո���������Ϊһ�� " + (job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + " Ӧ�����յļ��ܡ����⣬�㱳������������չ��һ�У����HP�����MPҲ�õ������ӡ�");
        else if (status == 5)
            cm.sendNextPrev("��ͬʱҲΪ��������1��� #b���ܵ�#k��������½ǵ� #b���ܲ˵�#k ���в鿴�������������������Ķ�ת���ܵȼ�������Ҫ������һ�£��㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + "����ζ�Ÿ�ǿ��ʵ���������ס����Ҫ�����������ȥ������С��Ҫ������������;����Ϊ������˵���س��ıȼ�����ǿҪ�ѵöࡣ�����ø�ǿ��ʱ�������ң��һ���������㡣");
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

/* 3th Job Part
	PORTAL 20 MINUTES.
 */