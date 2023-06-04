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
            cm.sendNext("你想成为一名 #r魔法师#k 吗？不是每一个人都可以成为魔法师，需要满足标准才行。#b 必须达到10级，并且拥有至少 " + cm.getFirstJobStatRequirement(jobType) + "#k。让我看看...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("我看到了，你做得很好。我将允许你在漫长的道路上更进一步。");
            else if (cm.haveItem(4031009)) {
                cm.sendOk("去见见 #b#p1072001##k 。");
                cm.dispose();
            } else
                cm.sendNext("你的进步之大令人惊讶。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你终于来了。几天前，神秘岛的 #b#p2020009##k 向我提起过你。我知道你对魔法师第三次转职感兴趣，所以要测试你是否拥有进行第三次转职的实力。在金银岛的一片深邃的邪恶森林中央有一个入口，它将引导你进入一条秘密通道。进入后，你会遇到我的分身。打败他，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("打败他，把 #b#t4031059##k 带回来给我。在巫婆森林II就可以找到他。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得漂亮！你已经打败了我的分身，并把 #b#t4031059##k 安全地带了回来。在力量方面，你已经证明了你拥有3转的实力。现在你需要把这串项链带给神秘岛的 #b#p2020010##k 继续下一步的测试。祝你好运！");
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
                cm.sendYesNo("你看起来像绝对够资格成为我们的一员，那么，你想成为魔法师吗？");
            } else {
                cm.sendOk("多加训练。当你达到职业基础要求时，我会告诉你成为 #r魔法师#k 的方法。");
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
            cm.sendNextPrev("你现在变得更强了。此外，你的每一个背包都增加了一排空格。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，就能看到你能学习并使用的所有技能。不过你无法将它们的等级同时提升。你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("请记住，技能不是全部。作为一名魔法师，你的属性必须和你的技能相匹配。魔法师们通常把智力作为主属性，运气作为副属性。如果你觉得加点很麻烦，也可以使用 #b自动分配#k");
        else if (status == 4)
            cm.sendNextPrev("现在你需要注意的是，从现在起如果你在战斗中失败，就会损失一部分经验值。当你的血量不足的时候，你就要提起注意了。");
        else if (status == 5)
            cm.sendNextPrev("这就是我能教给你的所有东西了，祝你在接下来的旅途中一切顺利，年轻的魔法师。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("好的，当你下定决心要做出选择，就点击下方的 [我现在要选择我的二转职业] 选项。#b\r\n#L0#请向我解释什么是巫师(火/毒)。\r\n#L1#请向我解释什么是巫师(冰/雷)。\r\n#L2#请向我解释什么是牧师。\r\n#L3#我现在要选择我的二转职业！");
            else {
                cm.sendNext("明智的选择。你看起来很强大，但仍需要通过测试来证明有相符的实力。这对你来说应该并不困难，放轻松。来，拿着这封信...可千万别弄丢了。");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072001##k，他在魔法密林附近的 #b#m101020000##k。把信交给他，他会作为教官代替我测试你。祝你好运。");
                } else {
                    cm.sendNext("请确保其他栏至少有1格空位。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("擅长使用 #r火系与毒素系魔法#k 的巫师。\r\n\r\n这是一个释放魔法，造成元素伤害的职业。这些能力使他们在对抗属性被克制的敌人时具有显著优势。通过他们的技能 #r精神力#k and #r缓速术#k，#b巫师#k 能够提升他们的魔法攻击，并降低对手的机动性。#b火/毒巫师#k 拥有强大的火焰箭攻击和毒素攻击。");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("擅长使用 #r冰系与雷系魔法#k 的巫师。\r\n\r\n这是一个释放魔法，造成元素伤害的职业。这些能力使他们在对抗属性被克制的敌人时具有显著优势。通过他们的技能 #r精神力#k and #r缓速术#k，#b巫师#k 能够提升他们的魔法攻击，并降低对手的机动性。#b冰/雷巫师#k 拥有冰冻效果的冰系攻击和雷电攻击。");    //i/l mage
                    } else {
                        cm.sendNext("擅长使用 #r神圣魔法#k 的巫师。\r\n\r\n#b牧师#k 是一个强大的辅助类职业，十分容易找到队伍。因为他们拥有 #r治愈#k 自己和队友的强大能力。使用 #r祝福#k 技能，#b牧师#k 可以增强属性并减少受到的伤害。如果你觉得很难生存，这个职业非常适合你。#b牧师#k 特别克制不死怪物。");    //cleric
                    }

                    status -= 2;
                } else
                    cm.sendSimple("你下定决心了吗？请选择你的二转职业。 #b\r\n#L0#巫师(火/毒)\r\n#L1#巫师(冰/雷)\r\n#L2#牧师");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以想要选择 " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + " 作为你的二转职业吗？你已经清楚了，一旦决定了转职，就无法再选择其他职业了，对吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("好的，现在你已经是一名 " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + " 了。巫师和牧师天资聪颖，他们拥有令人难以置信的魔法能力，能够轻而易举地侵入怪物的思维和心理结构。继续锻炼自己，我会一直帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚赋予了你作为一个 " + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + "  应该掌握的技能。此外，你背包的其他栏扩展了一行，最大HP、最大MP也得到了增加。");
        else if (status == 5)
            cm.sendNextPrev("同时也为你提升了1点的 #b技能点#k。请打开右下角的 #b技能菜单#k 进行查看。你可以用它来提升你的二转技能等级。但需要提醒你一下，你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 6)
            cm.sendNextPrev("成为一名" + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + "，意味着更强的实力。但请记住，不要滥用你的能力去欺凌弱小。要将它们用于正途，因为对你来说坚守初心比继续变强要难得多。当你变得更强大时再来找我，我会在这里等你。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("我的分身相当厉害。他会使用许多特殊技能，而你只能单独和他作战，可以想象这会是一场艰难的战斗。注意，你不能在秘密通道里呆太久，所以尽快打败他很重要。好...祝你好运，我很期待你带着#b#t4031059##k回来见我。");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}