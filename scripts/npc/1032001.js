/*
NPC-汉斯
位置-101000003
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

        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入魔法师的殿堂#k 吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入魔法师的殿堂。";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想成为一名 #r魔法师#k 吗？不是每一个人都可以成为魔法师，在此之前有一些标准需要满足。首先，你至少要达到 #b8级#k。其次，你的属性点 " + cm.getFirstJobStatRequirement(jobType) + " 也是必要的。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("我看你做得很好。我将允许你在漫长的道路上迈出下一步。");
            else if (cm.haveItem(4031009)) {
                cm.sendOk("去找 #b#p1072001##k 进行下一步把。");
                cm.dispose();
            } else
                cm.sendNext("你所取得的进步是惊人的。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("几天前，冰封雪域的 #b#p2020009##k 向我提到过你。我看到你对魔法师第三次转职感兴趣。为了实现这个目标，我必须测试你们的实力，看看你们是否值得晋升。在金银岛的一片深邃的邪恶森林中央有一个开口，它将引导你进入一条秘密通道。首次进入，你会遇到一个我的克隆体。你的任务是击败他，然后把 #b#t4031059##k 带回来。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("把 #b#t4031059##k 从我的克隆体中带回后，再与我对话。在深邃的邪恶森林就可以找到他。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得好，你击败了我的克隆体，并把 #b#t4031059##k 安全的带回来了。你现在已经从力量的角度证明了自己值得第三次转职。现在，你可以把这个项链 #b#p2020011##k 带回冰封雪域，继续第二项训练。祝你好运！");
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
                    cm.sendOk("抱歉，你没有足够的金币，无法加入魔法师的殿堂。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，魔法师的殿堂已经满员了。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("选择职业后无法再次更改。");
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
                cm.sendYesNo("你看起来像一个绝对可以成为我们一部分的人，那么，你想成为魔术师吗？");
            } else {
                cm.sendOk("再训练一点，直到你达到基本要求，我可以向你展示成为 #r魔法师#k 的道路。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1372043)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
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
            cm.sendNextPrev("请记住，技能不是全部。作为一名魔法师，你的属性必须和你的技能相匹配。魔法师们通常把智力作为主属性，运气作为副属性。如果你觉得加点很麻烦，也可以使用 #b自动分配#k");
        else if (status == 4)
            cm.sendNextPrev("现在你需要注意的是，如果你在战斗中失败，你会损失一部分经验值。当你的血量不足的时候，你就要提起注意了。");
        else if (status == 5)
            cm.sendNextPrev("这就是我能教给你的所有东西了，祝你在接下来的旅途中一切顺利，年轻的魔法师。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("当你做好了选择，点击 [我已经选定了我职业] 选项。#b\r\n#L0#请向我介绍 巫师(火/毒) 相关的知识\r\n#L1#请向我介绍 巫师(冰/雷) 相关的知识\r\n#L2#请向我介绍 牧师 相关的知识\r\n#L3#我已经选定了我职业！");
            else {
                cm.sendNext("明智的选择，你看起来很强大，但我需要看看你是否真的足够强大，能够通过测试。这不是一个困难的测试，所以你会做得很好。现在，带着我信，请确保不会丢失！");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072001##k，他在魔法密林附近的 #b#m101020000##k。他代替我担任本次考核的导师。把信交给他，他会代替我测试你。祝你好运。");
                } else {
                    cm.sendNext("确保你的背包存在空槽");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("关于 #r火/毒#k 巫师。\r\n\r\n这是一个主动释放魔法，造成元素伤害的职业。这些能力使他们在对抗对自己不利的敌人时具有显著优势。通过他们的技能 #r精神力#k and #r缓速术#k，#b巫师#k 能够提升他们的魔法攻击，并降低对手的机动性。#b火/毒巫师#k 拥有强大的火焰箭攻击和毒药攻击。");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("关于 #r冰/雷#k 巫师。\r\n\r\n这是一个主动释放魔法，造成元素伤害的职业。这些能力使他们在对抗对自己不利的敌人时具有显著优势。通过他们的技能 #r精神力#k and #r缓速术#k，#b巫师#k 能够提升他们的魔法攻击，并降低对手的机动性。#b冰/雷巫师#k 有冰冻的冰攻击和惊人的闪电攻击。");    //i/l mage
                    } else {
                        cm.sendNext("关于 #r牧师#k。\r\n\r\n#b牧师#k 是一个强大的辅助类职业，一定会被所有队伍所接受。因为他们能为自己和队友提供强大的 #r治愈#k 能力。使用 #r祝福#k 技能，#b牧师#k 可以增强属性并减少受到的伤害。如果你觉得很难生存，这种类型的职业就非常适合你。#b牧师#k 特别克制不死怪物。");    //cleric
                    }

                    status -= 2;
                } else
                    cm.sendSimple("现在，你有自己的主意了吗？请选择2转的职业: #b\r\n#L0#巫师(火/毒)\r\n#L1#巫师(冰/雷)\r\n#L2#牧师");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("你选择的2转职业为: " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + "。你已经清楚了，一旦决定了转职，就无法再选择其他职业了，对吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("好的，现在你已经是一名 " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + " 了。巫师和牧师是一群聪明的人，他们拥有令人难以置信的魔法能力，能够轻而易举地刺穿怪物的思想和心理结构。继续锻炼自己，我会帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我给了你一本关于 " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + " 需要的技能书，你的背包其他栏必须有位置存放它。你的HP和MP的最大值已经提升，检查一下你自己的状态把。");
        else if (status == 5)
            cm.sendNextPrev("我给了你一些 #b技能点#k，打开左下角的 #b技能菜单#k，你将能够提升新获得的2转技能。不过，还是要提醒一下。你不可能一下子把它们都提高，有些技能只有在你学习了其他技能后才能使用，一定要记住这一点。");
        else if (status == 6)
            cm.sendNextPrev("成为一名" + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + " 需要变得更强。但请记住，你不能滥用这种权力，把它用在弱者身上。请以正确的方式使用你的巨大力量，因为对你来说，用正确的方式，这比变得更强壮要硬得多。请在你取得更大进步后找到我，我会等你的。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
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