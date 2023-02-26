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

status = -1;
var job;
var sel;
actionx = {"Mental": false, "Physical": false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 2;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)) {
        if (cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }

        cm.sendNext("你好~");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058)) {
        actionx["Mental"] = true;
    } else if (cm.haveItem(4031057)) {
        actionx["Physical"] = true;
    }
    cm.sendSimple("你想从我这了解什么？#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想知道怎么进行3转" : "") + "\r\n#L1#我想获取扎昆任务的资格");
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3) {
        if (mode == 0 && type == 1)
            cm.sendNext("下定决心。");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]) {
        if (status == 0)
            cm.sendNext("智慧测试的部分做得很好，你明智且正确回答了所有问题。我必须说，我对你在那里展现的智慧水平印象深刻。在我们开始下一步之前，请先把项链递给我。");
        else if (status == 1)
            cm.sendYesNo("可以现在，你将通过我变成一个更强大的冒险家。但是，在执行此操作之前，请确保您的SP已被彻底使用，你至少需要使用70级之前获得的所有SP才能进行3转。哦，既然你2转时已经选择了你的职业方向，3转就无需再选择一次了。你做好准备进行3转了吗？");
        else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("请在继续之前分配所有SP。");
                    cm.dispose();
                    return;
                }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }

            if (Math.floor(cm.getJobId() / 10) == 21) cm.sendNext("从现在起，你就是 #b火/毒魔导士#k。The new skill book features new and improved fire and poison based spells, and skills such as #bElement Amplification#k (improved element-based spells) and #bSpell Booster#k (improves the overall speed of your attacking spells) will enable you to attack the monsters quickly and effectively. Defensive spells such as #bPartial Resistance#k (allows you to become stronger against certain elemental-based attacks) and #bSeal#k (seals up the monster) will help negate the one weakness Mages possess: lack of HP.");
            else if (Math.floor(cm.getJobId() / 10) == 22) cm.sendNext("You're the #bMage of Ice and Lightning#k from here on out. The new skill book features new and improved ice and lightning based spells, and skills such as #bElement Amplification#k (improved element-based spells) and #bSpell Booster#k (improves the overall speed of your attacking spells) will enable you to attack the monsters quickly and effectively. Defensive spells such as #bPartial Resistance#k (allows you to become stronger against certain elemental-based attacks) and #bSeal#k (seals up the monster) will help negate the one weakness Mages possess: lack of HP.");
            else cm.sendNext("You're #bPriest#k from here on out. The new skill book features new and improved holy spells such as #bShining Ray#k and #bSummon Dragon#k, and skills such as #bMystic Door#k (creates a door for the exit to the nearest town) and #bHoly Symbol#k (improves the EXP gained) can be vital to the party play. Off-beat spells such as #bDoom#k (turn monsters into snails) separates Priests from other jobs as the most different of all.");
        } else if (status == 3) {
            cm.sendNextPrev("I've also given you some SP and AP, which will help you get started. You have now become a powerful, powerful warrior, indeed. Remember, though, that the real world will be awaiting your arrival with even tougher obstacles to overcome. Once you feel like you cannot train yourself to reach a higher place, then, and only then, come see me. I'll be here waiting.");
        }
    } else if (actionx["Physical"]) {
        if (status == 0)
            cm.sendNext("力量测试的部分做得很好，我知道你能做到。现在你已经通过了前半部分的考试，下面是下半部分。请先把项链给我。");
        else if (status == 1) {
            if (cm.haveItem(4031057)) {
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("这是测试的后半部分。这项测试将决定你是否足够聪明，能够迈出迈向伟大的下一步。在神秘岛的雪原，有一个被雪覆盖的黑暗区域，称为雪原圣地，那里连怪物都无法到达。在雪原圣地的中间，有一块很大的石头叫做神圣的石头。你需要提供一个特殊的物品作为祭品，然后圣石会当场测试你的智慧。");
        } else if (status == 2)
            cm.sendNextPrev("你需要诚实和坚定地回答每个问题。如果你正确回答了所有问题，那么圣石会正式接受你并交给你 #b#t4031058##k。把项链拿回来，我会帮你迈出下一步。祝你好运！");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("去见 #b#p1032001##k，然后把 #b#t4031057##k 带给我");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("和 #b#p2030006##k 交谈后，把 #b#t4031058##k 带给我");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0) {
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
                if (status == 0)
                    cm.sendYesNo("你好，我是 #b#p2020009##k，是所有魔法的首领，乐意分享我的生活经验给那些愿意倾听的人。你似乎已经准备好向前迈进，迎接3转的挑战了。有很多魔法师来了又走，无法达到3转晋升的标准。你呢，你准备接受3转的测试了吗？");
                else if (status == 1) {
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("好的，你将在魔法师的两个重要方面接受测试: 力量和智慧。现在我将向你解释测试的物理部分。还记得魔法密林的 #b#p1032001##k 吗？去见他，他会告诉你考试前半部分的细节。完成任务后把 #b#t4031057##k 从 #b#p1032001# 带来");
                } else if (status == 2)
                    cm.sendNextPrev("只有在你通过了力量测试之后，才能开始智慧测试。#b#t4031057##k 将证明你确实通过了考试。在你到达那里之前，我会通知 #b#p1032001##k。所以做好准备，这不容易，但我对你有最大的信心。祝你好运！");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50) {
                cm.sendOk("酋长居住委员会授予你 #b许可证#k，你现在是 #r扎昆的反击队#k 的一员了。祝你旅途顺利。");
                if (!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            } else
                cm.sendOk("你太弱了，没有资格成为 #r扎昆反击队#k 的一员。至少 #b50级#k 后再来和我对话。");
            cm.dispose();
        }
    }
}