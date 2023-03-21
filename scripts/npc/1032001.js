/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
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

        var sendStr = "你已经走了很长的路才能获得今天的力量、智慧和勇气。现在你可以获得 #r用你当前的照片作为名人堂的一名NPC#k，你愿意尝试一下吗？";
        if (spawnPnpcFee > 0) {
            sendStr += " 如果你愿意花费 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币，我就能帮你完成。#k";
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
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道这别无选择");
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
                cm.sendNext("现在，你是我们的一份子了。前路漫漫，但只要保持耐心，你很快就能达到更高的水平。好了，说了这么多，让我传授一些我的能力把。");
            } else {
                cm.sendNext("确保你的背包腾出一些空间后，再来和我对话吧");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强了。此外，您的每一个库存都增加了插槽。确切地说，整整一排。赶快查看一下吧。\n另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，它会展示你能学习并使用的所有技能。值得注意的是: 你无法一下子把它全部加满。还有一些技能，你必须先学会一些技能才能获得。");
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
                cm.sendSimple("当你做好了选择，点击 [我已经选定了我职业] 选项。#b\r\n#L0#请向我展示 法师(火/毒) 相关的知识\r\n#L1#请向我展示 法师(冰/雷) 相关的知识\r\n#L2#请向我展示 牧师 相关的知识\r\n#L3#我已经选定了我职业！");
            else {
                cm.sendNext("明智的选择，你看起来很强大，但我需要看看你是否真的足够强大，能够通过测试。这不是一个困难的测试，所以你会做得很好。现在，带着我信，请确保不会丢失！");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("Please get this letter to #b#p1072001##k who's around #b#m101020000##k near Ellinia. He is taking care of the job of an instructor in place of me. Give him the letter and he'll test you in place of me. Best of luck to you.");
                } else {
                    cm.sendNext("Please, make some space in your inventory.");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("Magicians that master #rFire/Poison-based magic#k.\r\n\r\n#bWizards#k are a active class that deal magical, elemental damage. These abilities grants them a significant advantage against enemies weak to their element. With their skills #rMeditation#k and #rSlow#k, #bWizards#k can increase their magic attack and reduce the opponent's mobility. #bFire/Poison Wizards#k contains a powerful flame arrow attack and poison attack.");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("Magicians that master #rIce/Lightning-based magic#k.\r\n\r\n#bWizards#k are a active class that deal magical, elemental damage. These abilities grants them a significant advantage against enemies weak to their element. With their skills #rMeditation#k and #rSlow#k, #bWizards#k can increase their magic attack and reduce the opponent's mobility. #bIce/Lightning Wizards#k have a freezing ice attack and a striking lightning attack.");    //i/l mage
                    } else {
                        cm.sendNext("Magicians that master #rHoly magic#k.\r\n\r\n#bClerics#k are a powerful supportive class, bound to be accepted into any Party. That's because the have the power to #rHeal#k themselves and others in their party. Using #rBless#k, #bClerics#k can buff the attributes and reduce the amount of damage taken. This class is on worth going for if you find it hard to survive. #bClerics#k are especially effective against undead monsters.");    //cleric
                    }

                    status -= 2;
                } else
                    cm.sendSimple("Now... have you made up your mind? Please choose the job you'd like to select for your 2nd job advancement. #b\r\n#L0#Wizard (Fire / Poison)\r\n#L1#Wizard (Ice / Lighting)\r\n#L2#Cleric");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("So you want to make the second job advancement as the " + (job == 210 ? "#bWizard (Fire / Poison)#k" : job == 220 ? "#bWizard (Ice / Lighting)#k" : "#bCleric#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your desicion here, right?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("Alright, you're the " + (job == 210 ? "#bWizard (Fire / Poison)#k" : job == 220 ? "#bWizard (Ice / Lighting)#k" : "#bCleric#k") + " from here on out. Mages and wizards are the intelligent bunch with incredible magical prowess, able to pierce the mind and the psychological structure of the monsters with ease... please train yourself each and everyday. I'll help you become even stronger than you already are.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 210 ? "#bWizard (Fire / Poison)#k" : job == 220 ? "#bWizard (Ice / Lighting)#k" : "#bCleric#k") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure you remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 210 ? "Wizard (Fire / Poison)" : job == 220 ? "Wizard (Ice / Lighting)" : "Cleric") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("Since he is a clone of myself, you can expect a tough battle ahead. He uses a number of special attacking skills unlike any you have ever seen, and it is your task to successfully take him one on one. There is a time limit in the secret passage, so it is crucial that you defeat him within the time limit. I wish you the best of luck, and I hope you bring the #b#t4031059##k with you.");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}