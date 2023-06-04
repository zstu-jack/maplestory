/*
NPC-赫丽娜
位置-100000201
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

        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入弓箭手的殿堂#k 吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入弓箭手的殿堂。";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你已经决定要成为一名 #r弓箭手#k了吗？在此之前，有些条件需要满足。#b你的等级必须达到10级，并且拥有至少 " + cm.getFirstJobStatRequirement(jobType) + "#k。让我看看...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("你安全回来了！我就知道你会轻松通过的。不得不说你是一位强大的弓箭手。那么，我会让你变得比现在更强大。但在这之前，你需要从两条道路中选择其一。这并不容易，所以如果你有问题，请随时提问。");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("去见见 #b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("你比上次见面时成长了很多。我看不到以前看到的羸弱，现在看起来更像一个弓箭手了。怎么样，你想变得更强吗，通过我为你准备的一个简单的测试，你确定想这么做吗？");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你终于来了。几天前，神秘岛的 #b#p2020010##k 向我提起过你。我知道你对弓箭手第三次转职感兴趣，所以要测试你是否拥有进行第三次转职的实力。在金银岛的森林迷宫中有一个入口，它将引导你进入一条秘密通道。进入后，你会遇到我的分身。打败她，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请带着 #b#t4031059##k 回来见我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得漂亮！你已经打败了我的分身，并把 #b#t4031059##k 安全地带了回来。在力量方面，你已经证明了你拥有3转的实力。现在你需要把这串项链带给神秘岛的 #b#p2020009##k 继续下一步的测试。祝你好运！");
        } else {
            cm.sendOk("明智的选择。");
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
                    cm.sendOk("抱歉，你没有足够的金币，无法加入弓箭手的殿堂。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，弓箭手的殿堂已经满员了。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("选择职业后无法再次更改。");
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
                cm.sendNextPrev("这个选择至关重要，做出决定后，职业将无法再变更。");
            } else {
                cm.sendOk("多加训练。当你达到职业基础要求时，我会告诉你成为 #r弓箭手#k 的方法。");
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
                cm.sendNext("从此刻开始，你已经是我们的一份子了。前路漫漫，但只要保持耐心，你很快就能达到更高的水平。好了，说了这么多，让我传授你一些我的能力把。HAAAHHH!!!(一串咒语)");
            } else {
                cm.sendNext("确保你的背包腾出一些空间后，再来和我对话吧");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强了。此外，你的每一个背包都增加了一排空格。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，就能看到你能学习并使用的所有技能。不过你无法将它们的等级同时提升。你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("请记住，一旦你做出了选择，你就不能再选择另一条道路了。出发吧，做一名自豪的弓箭手。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("好的，当你下定决心要做出选择，就点击下方的 [我现在要选择我的二转职业] 选项。#b\r\n#L0#P请向我解释什么是猎人。\r\n#L1#请向我解释什么是弩手。\r\n#L3#我现在要选择我的二转职业！");
            else {
                cm.sendNext("明智的选择。你看起来很强大，但仍需要通过测试来证明有相符的实力。这对你来说应该并不困难，放轻松。来，拿着这封信...可千万别弄丢了。");
                if (!cm.isQuestStarted(100000)) cm.startQuest(100000);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031010)) {
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072002##k ，她在射手村附近的 #b#m106010000##k。把信交给她，她会作为教官代替我测试你。祝你好运。");
                    cm.dispose();
                } else {
                    cm.sendNext("请确保其他栏至少有1格空位。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //hunter
                        cm.sendNext("擅长使用 #r弓# 的弓箭手。\r\n\r\n#b猎人#k 在早期阶段的伤害/分钟输出更高，攻击速度更快，但略弱于弩手。 #b猎人#k 可以习得 #r爆炸箭#k，虽然攻击力并不十分强大，但却可以眩晕多达6个敌人。");
                    } else if (selection == 1) {    //crossbowman
                        cm.sendNext("擅长使用 #r弩# 的弓箭手。\r\n\r\n#b弩手# 与猎人相比，随等级成长时，单次的攻击伤害会更高。 #b弩手#k 可以习得 #r穿透箭#k，一种更强的攻击技能，不会追踪敌人，但可以穿过墙壁。");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("你下定决心了吗？请选择你的二转职业。 #b\r\n#L0#猎人\r\n#L1#弩手");
            }
        } else if (status == 2) {
            job += selection * 10;
            cm.sendYesNo("所以想要选择 " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + " 作为你的二转职业吗？你已经知道一旦决定了转职，就无法再选择其他职业了吧？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);

            cm.sendNext("好的，你现在已经成为了一名 " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + "。" + (job == 310 ? "#b猎人#k" : "#b弩手#k") + " 是一种拥有更广阔视野的职业。他们能够轻而易举地击杀各种怪物。请每天努力训练自己，我会一直帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚赋予了你作为一个 " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + " 应该掌握的技能。此外，你背包的其他栏扩展了一行，最大HP、最大MP也得到了增加。");
        else if (status == 5)
            cm.sendNextPrev("同时也为你提升了1点的 #b技能点#k。请打开右下角的 #b技能菜单#k 进行查看。你可以用它来提升你的二转技能等级。但需要提醒你一下，你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "#b猎人#k" : "#b弩手#k") + "，意味着更强的实力。但请记住，不要滥用你的能力去欺凌弱小。要将它们用于正途，因为对你来说坚守初心比继续变强要难得多。当你变得更强大时再来找我，我会在这里等你。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("我的分身相当厉害。她会使用许多特殊技能，而你只能单独和她作战。注意，你不能在秘密通道里呆太久，所以尽快打败她很重要。好...祝你好运，我很期待你带着#b#t4031059##k回来见我。");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
