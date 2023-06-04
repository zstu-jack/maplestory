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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入飞侠的殿堂#k 吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入飞侠的殿堂。";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想不想成为一名 #r飞侠#k？但这是有前提的，并不是随便每一个人都能成为飞侠。#b你的等级至少需要到达10级，并且拥有 " + cm.getFirstJobStatRequirement(jobType) + "#k。让我看看你是不是满足标准。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("我看到了，你做得很好。我将允许你在飞侠之路上更进一步。");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("去见见 #b#p1072003##k.");
                cm.dispose();
            } else
                cm.sendNext("你的进步之大令人惊讶。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你终于来了。几天前，神秘岛的 #b#p2020011##k 和我提起过你。我知道你对飞侠第三次转职很感兴趣，所以要测试你是否拥有进行第三次转职的实力。在金银岛沼泽深处的中间有一个入口，它会把你带到一个秘密通道。进入后，你会遇到我的分身。打败他，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("获得这个 #b#t4031059##k 后，再来和我对话。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得漂亮！你已经打败了我的分身，并把 #b#t4031059##k 安全地带了回来。在武力方面，你已经证明了你拥有3转的实力。现在你需要把这串项链带给神秘岛的 #b#p2020011##k 继续下一步的测试。祝你好运！");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
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
                    cm.sendOk("抱歉，你没有足够的金币，无法加入飞侠的殿堂。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，飞侠的殿堂已经满员了。");
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
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType))
                cm.sendYesNo("哦，你看起来可以成为我们的一员，你确定要成为飞侠吗?");
            else {
                cm.sendOk("多加训练。当你达到职业基础要求时，我会告诉你成为 #r飞侠#k 的方法。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("好的，从今天开始，你成为了我们的一员。过上四海为家的生活，但如果你有耐心，总能过上好日子。那么，我会传授你一些技能。。。。");
            } else {
                cm.sendNext("给你的背包腾出点位置，然后再来找我对话。");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强了。我把新手飞侠的必备武器与暗器送给你，也给你的每一个背包都增加了一排空格，请检查一下。另外，我给了你一些 #b技能点#k，当你打开右下角的 #b技能#k 菜单，就能看到你能学习并使用的所有技能。不过你无法将它们的等级同时提升。你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("有一点要提醒你，一旦你做出了选择，将不可变更。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("好的,当你做出了决定,点击底部的 [我现在要选择我的二转职业].#b\r\n#L0#请向我解释什么是刺客。\r\n#L1#请向我解释什么是侠客。\r\n#L3#我现在要选择我的二转职业！");
            else {
                cm.sendNext("明智的选择。你看起来很强大，但仍需要通过测试来证明有相符的实力。这对你来说应该并不困难，放轻松。来，拿着这封信...可千万别弄丢了。");
                if (!cm.isQuestStarted(100009)) cm.startQuest(100009);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031011)) {
                    if (!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("请带着这封信去找 #b#p1072003##k，他就在废弃都市附近的 #b#m102040000##k。把信交给他，他会作为教官代替我测试你。祝你好运。");
                } else {
                    cm.sendNext("请确保其他栏至少有1格空位。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //assassin
                        cm.sendNext("擅长使用 #r拳套与飞镖#k 的飞侠.\r\n\r\n#b刺客#k 会进行远程攻击。他们能更高效地利用金钱，并具有强大的伤害，但冒险成本也比侠客更高。");
                    } else if (selection == 1) {    //bandit
                        cm.sendNext("擅长使用 #r短刀#k 的飞侠.\r\n\r\n#b侠客#k 以近身快速攻击敌人所闻名，在所有二转职业中相当强大。他们虽然不像刺客那样高效且可以远程攻击敌人，但他们强大的近战能力足以弥补这点缺陷。");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("你下定决心了吗？请选择你的二转职业。 #b\r\n#L0#刺客\r\n#L1#侠客");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031011)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你打算选择 " + (job == 410 ? "#b刺客#k" : "#b侠客#k") + "作为你的二转职业？你已经清楚了，一旦决定了转职，就无法再选择其他职业了，对吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100011);

            if (job == 410) cm.sendNext("好的，你现在已经正式成为了一名 #b刺客#k。刺客有着极快的攻击速度、长距离的攻击范围可以轻松制敌。继续训练，我会让你变得更强大。");
            else cm.sendNext("好的，你现在已经正式成为了一名 #b侠客#k。侠客们通常隐藏在黑暗中，等待时机成熟，突然迅速地将匕首刺入敌人身体。继续训练，我会让你变得更强大。");

            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚赋予了你作为一个 " + (job == 410 ? "刺客" : "侠客") + " 应该掌握的技能。此外，你背包的其他栏扩展了一行，最大HP、最大MP也得到了增加。");
        else if (status == 5)
            cm.sendNextPrev("同时也为你提升了1点的 #b技能点#k。请打开右下角的 #b技能菜单#k 进行查看。你可以用它来提升你的二转技能等级。但需要提醒你一下，你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "刺客" : "侠客") + "，意味着更强的实力。但请记住，不要滥用你的能力去欺凌弱小。要将它们用于正途，因为对你来说坚守初心比继续变强要难得多。当你变得更强大时再来找我，我会在这里等你。");
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