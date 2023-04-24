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

        var sendStr = "���Ѿ����˺ܳ���·���ܻ�ý�����������ǻۺ���������������Ի�� #r���㵱ǰ����Ƭ��Ϊ�����õ�һ��NPC#k����Ը�Ⳣ��һ����";
        if (spawnPnpcFee > 0) {
            sendStr += " �����Ը�⻨�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ��ң��Ҿ��ܰ�����ɡ�#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("����ɹ�Ϊһ�� #rսʿ#k ������Ҫ����һЩ��׼����������һ�㡣#b ���ȣ������ﵽ10������Σ�������Ե� " + cm.getFirstJobStatRequirement(jobType) + "#k Ҳ�Ǳ�Ҫ�ġ�");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�㰲ȫ�����ˣ��Ҿ�֪���������ͨ���ġ��ҳ��ϣ�����һ��ǿ���սʿ���ðɣ��һ������Ϊһ�������ڸ�ǿ���սʿ�����ڴ�֮ǰ������Ҫ��������·��ѡ��һ�����Ⲣ�����ף���������������⣬����ʱ���ʡ�");
            else if (cm.haveItem(4031008)) {
                cm.sendOk("ȥ���� #b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("����ȡ�õĽ����Ǿ��˵ġ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("��һֱ�ڵ��㣬����ǰ������ѩ��� #b#p2020008##k ���������㡣�������һ������������������������һ������ͨ���������㣬û�����ܽ�������ͨ������������ͨ�������������һ���ң������������� #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("��� #b#t4031059##k ���ظ��ҡ�");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("���Ѿ���������һ���ң����ɹ��� #b#t4031059##k ���˻������ɵĺã�������֤�������ʵ�������������棬���Ѿ�֤������ֵ��3ת�������㱣֤���һ�� #b#t4031057##k ���㡣������������������ѩ��� #b#p2020008##k������ܽ���3ת�ĵڶ��β����ˡ�ף����ˣ�");
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
                    cm.sendOk("������˼�������õ�λ���Ѿ�����~");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("�������þ����Ժ���������");
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
                cm.sendNextPrev("����һ����Ҫ��ѡ���㽫�޷���ͷ��");
            } else {
                cm.sendOk("��ѵ��һ�㣬ֱ����ﵽ����Ҫ���ҿ�������չʾ��Ϊ #rսʿ#k �ĵ�·��");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("�����ڿ�ʼ���㽫ǰ��սʿ֮·���ⲻ��һ�����׵�ְҵ�����������Լ�������ͼ��ܳ������Ĳ��ϸ�ѵ������ͻ�˷���·�ϵ��κ����ѡ����ͣ������սʿ��");
            } else {
                cm.sendNext("ȷ����ı����ڳ�һЩ�ռ���������ҶԻ���");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("�����ڱ�ø�ǿ�ˡ����⣬���ÿһ�������������˲�ۡ�ȷ�е�˵������һ�š��Ͽ�鿴һ�°ɡ�\n���⣬�Ҹ�����һЩ #b���ܵ�#k����������½ǵ� #b����#k �˵�������չʾ����ѧϰ��ʹ�õ����м��ܡ�ֵ��ע�����: ���޷�һ���Ӱ���ȫ������������һЩ���ܣ��������ѧ��һЩ���ܲ��ܻ�á�");
        else if (status == 3)
            cm.sendNextPrev("���ס��һ����������ѡ����Ͳ�����ѡ����һ����·�ˡ������ɣ���һ���Ժ���սʿ��");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("����������ѡ�񣬵�� [���Ѿ�ѡ������ְҵ] ѡ�#b\r\n#L0#�����ҽ��� ���� ��ص�֪ʶ\r\n#L1#�����ҽ��� ׼��ʿ ��ص�֪ʶ\r\n#L2#�����ҽ��� ǹսʿ ��ص�֪ʶ\r\n#L3#���Ѿ�ѡ������ְҵ��");
            else {
                cm.sendNext("���ǵ�ѡ���㿴������ǿ�󣬵�����Ҫ�������Ƿ�����㹻ǿ���ܹ�ͨ�����ԡ��ⲻ��һ�����ѵĲ��ԣ�����������úܺá����ڣ��������ţ���ȷ�����ᶪʧ��");
                if (!cm.isQuestStarted(100003)) cm.startQuest(100003);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("�������Ŵ��� #b#p1072000##k ��ʿ���丽���� #b#m102020300##k���������ҵ��α��ο��˵ĵ�ʦ�����Ž���������������Ҳ����㡣ף����ˡ�");
                } else {
                    cm.sendNext("ȷ����ı������ڿղ�");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //����
                        cm.sendNext("սʿ�� #r����#k �Ĵ�ʦ��\r\n\r\n#r����#k ӵ�� #b��ŭ֮��#k��һ��ʹ���������������10�ļ��ܡ�During 2nd job this is strongly appreciated, as it is free (except for -10 wep def, which is not going to impact the damage you take much at all), takes no Use slots and increases each party member's damage (except Mages) by several hundreds. The other classes can give themselves a weapon attack boost as well, but need items to do so. #r����s#k also get #bPower Guard#k, reducing touch damage by 40% and deals it back to the monster. This is the main reason why #r����s#k are considered soloers is because this reduces pot costs immensely.");
                    } else if (selection == 1) {    //׼��ʿ
                        cm.sendNext("սʿ�� #r�������ȶ���#k �Ĵ�ʦ��\r\n\r\n#r׼��ʿs#k get #bThreaten#k, a skill that lowers the enemies' weapon defense and weapon attack by 20; this is mostly used to lower damage dealt to you. ׼��ʿs also get #bPower Guard#k, reducing touch damage by 40% and deals it back to the monster. This is one of the main reason why #b׼��ʿs/WKs#k are considered soloers, that's because this reduces pot costs immensely. Of course, constant KB and #bIce Charge#k helps also to the soloing factor.");
                    } else {    //ǹսʿ
                        cm.sendNext("սʿ�� #rì��ǹ#k �Ĵ�ʦ��\r\n\r\n#rǹսʿ#k get #bHyper Body#k, which boosts your max HP/MP and that of your party by 60% when maxed. This skill is particularly useful for helping partied Thieves, Archers, and Mages to survive more hits from enemies and/or PQ bosses. They also get #bIron Will#k which gives +20 wep def and +20 mag def for 300 sec. It is basically a nerfed Bless with 100 seconds more duration but gives no accuracy or avoidability bonus. Even with this skill maxed, it isn't even close to being in the same league as Power Guard and is why ǹսʿ/Dark Knights are not considered a soloing class.");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("Now... have you made up your mind? Please choose the job you'd like to select for your 2nd job advancement. #b\r\n#L0#����\r\n#L1#׼��ʿ\r\n#L2#ǹսʿ");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("So you want to make the second job advancement as the " + (job == 110 ? "#b����#k" : job == 120 ? "#b׼��ʿ#k" : "#bǹսʿ#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your desicion here, right? Are you sure about this?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100005);

            if (job == 110) cm.sendNext("Alright, you have now become the #b����#k. A ���� strives to become the strongest of the strong, and never stops fighting. Don't ever lose that will to fight, and push forward 24/7. I'll help you become even stronger than you already are.");
            else if (job == 120) cm.sendNext("Alright, you have now become a #b׼��ʿ#k! ׼��ʿs have high intelligence and bravery, which I hope you'll employ throughout your journey to the right path. I'll help you become much stronger than you already are.");
            else cm.sendNext("Alright, you have now become the #bǹսʿ#k. The ǹսʿ use the power of darkness to take out the enemies, always in shadows... Please believe in yourself and your awesome power as you go in your journey. I'll help you become much stronger than you are right now.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("My the other self is quite strong. He uses many special skills and you should fight with him 1 on 1. However, people cannot stay long in the secret passage, so it is important to beat him ASAP. Well... Good luck I will look forward to you bringing #b#t4031059##k to me.");
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