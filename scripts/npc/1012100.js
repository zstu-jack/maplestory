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

        var sendStr = "你已经走了很长的路才能获得今天的力量、智慧和勇气。现在你可以获得 #r用你当前的照片作为名人堂的一名NPC#k，你愿意尝试一下吗？";
        if (spawnPnpcFee > 0) {
            sendStr += " 如果你愿意花费 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币，我就能帮你完成。#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你已经决定要成为一名 #r弓箭手#k了吗？在此之前，有些条件需要满足。#b你等等级必须达到10级，并且属性至少拥有 " + cm.getFirstJobStatRequirement(jobType) + "#k。让我看看。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("哈哈，我就知道你会轻而易举地通过考试。我承认，你是个很棒的弓箭手。我会让你变得更强。在此之前，你需要选择2个方向。这对你来说将是一个艰难的决定，但是，如果有什么问题要问，请提出你的想法。");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("去见见 #b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("你比上次见你，成长了很多。我看不到以前看到的羸弱，现在看起来更像一个弓箭手了。怎么样，你想变得更强吗，通过我为你准备的一个简单的测试，你确定想这么做吗？");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("几天前，冰封雪域的 #b#p2020010##k 向我提到过你。我看到你对弓箭手第三次转职感兴趣。为了实现这个目标，我必须测试你的实力，看看你是否值得晋升。在金银岛的深处从林中有一个开口，它将引导你进入一条秘密通道。一旦进入，你将面对我的克隆人。你的任务是击败他，然后把 #b#t4031059##k 带回来。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请把 #b#t4031059##k 带回给我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得好，你已经打败了我的克隆体，并安全的吧 #b#t4031059##k 带了回来。你在物理方面证明了你值得第3次转职。现在，你需要把这条项链带给冰封雪域的 #b#p2020011##k，然后进行第2部分测试。祝你好运！");
        } else {
            cm.sendOk("明智的选择");
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
                    cm.sendOk("对不起，你没有足够的金币来购买你在名人堂的位置。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("给你！希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起，名人堂的位置已经满了。。。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道这别无选择");
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
                cm.sendNextPrev("这是一个重要的最终选择，你将无法回头。");
            } else {
                cm.sendOk("再训练一点，直到你达到基本要求，我会指引你成为一名 #r弓箭手#k.");
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
            cm.sendNextPrev("你现在变得更强了。此外，你的每一个背包都增加了插槽。确切地说，整整一排。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，它会展示你能学习并使用的所有技能。值得注意的是: 你无法一下子把它全部加满。还有一些技能，你必须先学会一些技能才能获得。");
        else if (status == 3)
            cm.sendNextPrev("提醒一下，一旦你做出了选择，就不能改变主意再尝试另一条路。现在就去吧，做一个骄傲的弓箭手。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("当你做好了选择，点击 [我已经选定了我职业] 选项。#b\r\n#L0#P请向我介绍 猎人 相关的知识\r\n#L1#请向我介绍 弩手 相关的知识\r\n#L3#我已经选定了我职业！");
            else {
                cm.sendNext("明智的选择，你看起来很强大，但我需要看看你是否真的足够强大，能够通过测试。这不是一个困难的测试，所以你会做得很好。现在，带着我信，请确保不会丢失！");
                if (!cm.isQuestStarted(100000)) cm.startQuest(100000);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031010)) {
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072002##k 他在射手村附近的 #b#m106010000##k。她代替我担任本次任务的教官。把信交给她，她会代替我测试你。祝你好运。");
                    cm.dispose();
                } else {
                    cm.sendNext("确保你的背包存在空槽");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //hunter
                        cm.sendNext("关于 #r猎人#。\r\n\r\n#b猎人#k 在早期阶段的伤害/分钟输出更高，攻击速度更快，但略弱于弩手。 #b猎人#k 能使用 #r爆炸箭#k，一种稍弱的攻击，可以导致多达6个敌人被眩晕。");
                    } else if (selection == 1) {    //crossbowman
                        cm.sendNext("关于 #r弩手#。\r\n\r\n#b弩手# 与猎人相比，等级越高，越能获得更高的攻击力。 #b弩手#k 能使用 #r穿透箭#k，一种更强的攻击，不会追踪敌人，但可以穿过墙壁。");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("现在，你有自己的主意了吗？请选择2转的职业: #b\r\n#L0#猎人\r\n#L1#弩手");
            }
        } else if (status == 2) {
            job += selection * 10;
            cm.sendYesNo("你选择的2转职业为: " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + "。你已经清楚了，一旦决定了转职，就无法再选择其他职业了，对吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);

            cm.sendNext("好的，现在你已经是一名 " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + "。" + (job == 310 ? "#b猎人#k" : "#b弩手#k") + " 是一群有着令人难以置信的视力的聪明人吗？他们能够轻而易举地将箭穿过怪物的心脏。请每天训练自己。我会帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我给了你一本关于 " + (job == 310 ? "#b猎人#k" : "#b弩手#k") + "需要的技能书，你的背包其他栏必须有位置存放它。你的HP和MP的最大值已经提升，检查一下你自己的状态把。");
        else if (status == 5)
            cm.sendNextPrev("我给了你一些 #b技能点#k，打开左下角的 #b技能菜单#k，你将能够提升新获得的2转技能。不过，还是要提醒一下。你不可能一下子把它们都提高，有些技能只有在你学习了其他技能后才能使用，一定要记住这一点。");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "#b猎人#k" : "#b弩手#k") + " 需要变得更强。但请记住，你不能滥用这种权力，把它用在弱者身上。请以正确的方式使用你的巨大力量，因为对你来说，用正确的方式，这比变得更强壮要硬得多。请在你取得更大进步后找到我，我会等你的。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("既然他是我的克隆人，你可以预料到前方会有一场艰苦的战斗。他使用了许多你从未见过的特殊攻击技能，你的任务是成功地一对一地击败他。秘密通道有时间限制，所以在时间限制内击败他是至关重要的。祝你好运，我希望你能把 #b#t4031059##k 带回来");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
