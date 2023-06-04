/*
NPC-武术教练
位置-102000003
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

        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入战士的殿堂#k 吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入战士的殿堂。";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想成为一名 #r战士#k 吗？你需要满足要求才行。#b 必须达到10级，并且拥有至少 " + cm.getFirstJobStatRequirement(jobType) + "#k。让我看看...");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("你安全回来了！我就知道你会轻松通过的。不得不说你是一位强大的战士。那么，我会让你变得比现在更强大。但在这之前，你需要从三条道路中选择其一。这并不容易，所以如果你有问题，请随时提问。");
            else if (cm.haveItem(4031008)) {
                cm.sendOk("去见见 #b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("你的进步之大令人惊讶。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你终于来了。几天前，神秘岛的 #b#p2020008##k 对我提起过你。所以我想测试一下你的力量。蚂蚁洞附近有一条秘密通道，只有你能进入。进入后，你会遇到我的分身。打败他，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请带着 #b#t4031059##k 回来见我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得漂亮！你已经打败了我的分身，并把 #b#t4031059##k 安全地带了回来。在力量方面，你已经证明了你拥有3转的实力。现在你需要把这串项链带给神秘岛的 #b#p2020008##k 继续下一步的测试。祝你好运！");
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
                    cm.sendOk("抱歉，你没有足够的金币，无法加入战士的殿堂。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，战士的殿堂已经满员了。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
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
                cm.sendOk("多加训练。当你达到职业基础要求时，我会告诉你成为 #r战士#k 的方法。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("从现在开始，你踏上了战士之路。前途坎坷，但如果对自己的身体和技能充满信心并严格训练，你就会克服道路上的任何困难。加油，年轻的战士。");
            } else {
                cm.sendNext("确保你的背包有足够的空间后，再来和我对话吧。");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强了。此外，你的每一个背包都增加了一排空格。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，打开右下角的 #b技能#k 菜单，就能看到你能学习并使用的所有技能。不过你无法将它们的等级同时提升。你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("请记住，一旦你做出了选择，你就不能再选择另一条道路了。出发吧，做一名自豪的战士。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("好的，当你下定决心要做出选择，就点击下方的 [我现在要选择我的二转职业] 选项。#b\r\n#L0#请向我解释什么是剑客。\r\n#L1#请向我解释什么是准骑士。\r\n#L2#请向我解释什么是枪战士。\r\n#L3#我现在要选择我的二转职业！");
            else {
                cm.sendNext("明智的选择。你看起来很强大，但仍需要通过测试来证明有相符的实力。这对你来说应该并不困难，放轻松。来，拿着这封信...可千万别弄丢了。");
                if (!cm.isQuestStarted(100003)) cm.startQuest(100003);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072000##k ，他在勇士部落附近的 #b#m102020300##k。把信交给他，他会作为教官代替我测试你。祝你好运。");
                } else {
                    cm.sendNext("请确保其他栏至少有1格空位。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //剑客
                        cm.sendNext("擅长使用 #r剑与斧#k 的战士。\r\n\r\n#r剑客#k 可以习得 #b愤怒之火#k，能够提升全队10点物理攻击。在所有二转技能中，它的效果称得上是非常强大，能够免费地、不占用消耗栏地提升每位团队成员（除法师外）的伤害几百点之多。就算是有一点小小的副作用（无伤大雅地减少10点物理防御力）也不算什么了。相较之下，其它职业虽然也可以提升攻击力，但大部分是需要消耗物品来实现的。 #r剑客#k 还可以习得 #b伤害反击#k 来减少40%的触碰伤害，并将它们反馈给怪物。它能够大量节约药水消耗，这就是 #r剑客#k 总是看上去独来独往的原因。");
                    } else if (selection == 1) {    //准骑士
                        cm.sendNext("擅长使用 #r剑与钝器#k 的战士。\r\n\r\n#r准骑士#k 可以习得 #b压制术#k，能够降低怪物们的物理防御力和物理攻击力各20点。通常被用来降低怪物对你造成的伤害。 #r准骑士#k 还可以习得 #b伤害反击#k 来减少40%的触碰伤害，并将它们反馈给怪物。它能够大量节约药水消耗，这就是 #r剑客#k 总是看上去独来独往的原因。当然，不断地击退和 #b寒冰之剑/寒冰钝器#k 也是他们能够独来独往的重要原因。");
                    } else {    //枪战士
                        cm.sendNext("擅长使用 #r枪与矛#k 的战士。\r\n\r\n#r枪战士#k 可以习得  #b神圣之火#k，能够提升你和你的队友60%的最大HP与MP。这个技能可以大幅度地提升队伍中飞侠、弓箭手和法师们面对强大敌人时的生存概率。他们还拥有 #b极限防御#k ，能够在300秒内提升全队20点的物理防御力和魔法防御力。这个技能差不多算是牧师的祝福弱化版，它不提供命中率和回避率，但持续时间却多出100秒。就算加满它，也仍然不能与伤害反击相提并论。这也是枪战士及其后续职业黑骑士不被看好作为独行职业的原因。");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("你下定决心了吗？请选择你的二转职业。 #b\r\n#L0#剑客\r\n#L1#准骑士\r\n#L2#枪战士");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以想要选择 " + (job == 110 ? "#b剑客#k" : job == 120 ? "#b准骑士#k" : "#b枪战士#k") + " 作为你的二转职业吗？你已经知道一旦决定了转职，就无法再选择其他职业了吧？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100005);

            if (job == 110) cm.sendNext("好的，你现在已经成为了一名 #b剑客#k。作为一名剑客要努力成为强者中的强者，不停战斗。永远不要失去战斗的意志，勇往直前。我会一直帮助你变得比现在更强大。");
            else if (job == 120) cm.sendNext("好的，你现在已经成为了一名 #b准骑士#k。准骑士兼具高超的智慧与勇气，希望你能在今后的旅途中将它们运用得当。我会一直帮助你变得比现在更强大。");
            else cm.sendNext("好的，你现在已经成为了一名 #b枪战士#k。枪战士总是身处暗影中，用黑暗的力量消灭敌人。。。在你的旅程中，请相信你自己，以及这份令人敬畏的力量。我会一直帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚赋予了你作为一个 " + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + " 应该掌握的技能。此外，你背包的其他栏扩展了一行，最大HP、最大MP也得到了增加。");
        else if (status == 5)
            cm.sendNextPrev("我同时也为你提升了1点的 #b技能点#k。请打开右下角的 #b技能菜单#k 进行查看。你可以用它来提升你的二转技能等级。但需要提醒你一下，你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "，意味着更强的实力。但请记住，不要滥用你的能力去欺凌弱小。要将它们用于正途，因为对你来说坚守初心比继续变强要难得多。当你变得更强大时再来找我，我会在这里等你。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("我的分身相当厉害。他会使用许多特殊技能，而你只能单独和他作战，可以想象这会是一场艰难的战斗。注意，你不能在秘密通道里呆太久，所以尽快打败他很重要。好...祝你好运，我很期待你带着#b#t4031059###k回来见我。");
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