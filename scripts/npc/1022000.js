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

        var sendStr = "你已经走了很长的路才能获得今天的力量、智慧和勇气。现在你可以获得 #r用你当前的照片作为名人堂的一名NPC#k，你愿意尝试一下吗？";
        if (spawnPnpcFee > 0) {
            sendStr += " 如果你愿意花费 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币，我就能帮你完成。#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想成功为一名 #r战士#k 吗？你需要满足一些标准才能做到这一点。#b 首先，你必须达到10级。其次，你的属性点 " + cm.getFirstJobStatRequirement(jobType) + "#k 也是必要的。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("你安全回来了！我就知道你会轻松通过的。我承认，你是一个强大的战士！好吧，我会让你成为一个比现在更强大的战士。但在此之前，你需要从三条道路中选择一条。这并不容易，所以如果你有问题，请随时提问。");
            else if (cm.haveItem(4031008)) {
                cm.sendOk("去见见 #b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("你所取得的进步是惊人的。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("我一直在等你，几天前，冰封雪域的 #b#p2020008##k 向我提起你。我想测试一下你的力量。蚂蚁隧道附近有一条秘密通道，除了你，没有人能进入那条通道。进入那条通道，你会遇见另一个我，击败他，并把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请把 #b#t4031059##k 带回给我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("你已经击败了另一个我，并成功把 #b#t4031059##k 带了回来，干的好！这无疑证明了你的实力。再力量方面，你已经证明了你值得3转。我向你保证，我会把 #b#t4031057##k 给你。把这条项链交给冰封雪域的 #b#p2020008##k，你就能进行3转的第二次测试了。祝你好运！");
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
                    cm.sendOk("不好意思，名人堂的位置已经满了~");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("当你做好决定以后再来见我");
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
                cm.sendNextPrev("这是一个重要的选择，你将无法回头。");
            } else {
                cm.sendOk("再训练一点，直到你达到基本要求，我可以向你展示成为 #r战士#k 的道路。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("从现在开始，你将前往战士之路。这不是一份容易的职业，但如果你对自己的身体和技能充满信心并严格训练，你就会克服道路上的任何困难。加油，年轻的战士！");
            } else {
                cm.sendNext("确保你的背包腾出一些空间后，再来和我对话吧");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强了。此外，你的每一个背包都增加了插槽。确切地说，整整一排。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，它会展示你能学习并使用的所有技能。值得注意的是: 你无法一下子把它全部加满。还有一些技能，你必须先学会一些技能才能获得。");
        else if (status == 3)
            cm.sendNextPrev("请记住，一旦你做出了选择，你就不能再选择另一条道路了。出发吧，做一名自豪的战士。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("当你做好了选择，点击 [我已经选定了我职业] 选项。#b\r\n#L0#请向我介绍 剑客 相关的知识\r\n#L1#请向我介绍 准骑士 相关的知识\r\n#L2#请向我介绍 枪战士 相关的知识\r\n#L3#我已经选定了我职业！");
            else {
                cm.sendNext("明智的选择，你看起来很强大，但我需要看看你是否真的足够强大，能够通过测试。这不是一个困难的测试，所以你会做得很好。现在，带着我信，请确保不会丢失！");
                if (!cm.isQuestStarted(100003)) cm.startQuest(100003);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("请把这封信带给 #b#p1072000##k 勇士部落附近的 #b#m102020300##k。他代替我担任本次考核的导师。把信交给他，他会代替我测试你。祝你好运。");
                } else {
                    cm.sendNext("确保你的背包存在空槽");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //剑客
                        cm.sendNext("战士中 #r剑或斧#k 的大师。\r\n\r\n#r剑客#k 拥有 #b愤怒之火#k，一个使你的武器攻击增加10的技能。During 2nd job this is strongly appreciated, as it is free (except for -10 wep def, which is not going to impact the damage you take much at all), takes no Use slots and increases each party member's damage (except Mages) by several hundreds. The other classes can give themselves a weapon attack boost as well, but need items to do so. #r剑客s#k also get #bPower Guard#k, reducing touch damage by 40% and deals it back to the monster. This is the main reason why #r剑客s#k are considered soloers is because this reduces pot costs immensely.");
                    } else if (selection == 1) {    //准骑士
                        cm.sendNext("战士中 #r剑、锤等钝器#k 的大师。\r\n\r\n#r准骑士s#k get #bThreaten#k, a skill that lowers the enemies' weapon defense and weapon attack by 20; this is mostly used to lower damage dealt to you. 准骑士s also get #bPower Guard#k, reducing touch damage by 40% and deals it back to the monster. This is one of the main reason why #b准骑士s/WKs#k are considered soloers, that's because this reduces pot costs immensely. Of course, constant KB and #bIce Charge#k helps also to the soloing factor.");
                    } else {    //枪战士
                        cm.sendNext("战士中 #r矛或枪#k 的大师。\r\n\r\n#r枪战士#k get #bHyper Body#k, which boosts your max HP/MP and that of your party by 60% when maxed. This skill is particularly useful for helping partied Thieves, Archers, and Mages to survive more hits from enemies and/or PQ bosses. They also get #bIron Will#k which gives +20 wep def and +20 mag def for 300 sec. It is basically a nerfed Bless with 100 seconds more duration but gives no accuracy or avoidability bonus. Even with this skill maxed, it isn't even close to being in the same league as Power Guard and is why 枪战士/Dark Knights are not considered a soloing class.");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("Now... have you made up your mind? Please choose the job you'd like to select for your 2nd job advancement. #b\r\n#L0#剑客\r\n#L1#准骑士\r\n#L2#枪战士");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("So you want to make the second job advancement as the " + (job == 110 ? "#b剑客#k" : job == 120 ? "#b准骑士#k" : "#b枪战士#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your desicion here, right? Are you sure about this?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100005);

            if (job == 110) cm.sendNext("Alright, you have now become the #b剑客#k. A 剑客 strives to become the strongest of the strong, and never stops fighting. Don't ever lose that will to fight, and push forward 24/7. I'll help you become even stronger than you already are.");
            else if (job == 120) cm.sendNext("Alright, you have now become a #b准骑士#k! 准骑士s have high intelligence and bravery, which I hope you'll employ throughout your journey to the right path. I'll help you become much stronger than you already are.");
            else cm.sendNext("Alright, you have now become the #b枪战士#k. The 枪战士 use the power of darkness to take out the enemies, always in shadows... Please believe in yourself and your awesome power as you go in your journey. I'll help you become much stronger than you are right now.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
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