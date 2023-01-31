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
/* Author: Xterminator
 * Edited by XxOsirisxX

	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0)
            qm.sendNext("你好吗，" + (qm.getPlayer().getGender() == 0 ? "小哥哥" : "小姐姐") + "我是罗杰，一个可以教可爱的冒险家们很多有用信息的人。");
        else if (status == 1)
            qm.sendNextPrev("你问我是谁让我来做这些的？\r\n是我自己！我想这样做，只是对你们这些新来的冒险家友好一些。");
        else if (status == 2)
            qm.sendAcceptDecline("所以，让我们做一些有趣的事情吧！一串咒语。。。");
        else if (status == 3) {
            if (qm.getPlayer().getHp() >= 50) {
                qm.getPlayer().updateHp(25);
            }
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            qm.forceStartQuest();
            qm.sendNext("被吓到了吗？如果你的血条变成了0，那么你就遇到麻烦了。现在，我会给你一个 #r罗杰的苹果#k。请立刻使用它，然后你就会恢复健康。打开物品界面，然后双击使用。嘿，有一个更加简单打开物品界面的方法，那就是按下 #bI#k 键。");
        } else if (status == 4) {
            qm.sendPrev("请使用完我给你的所有苹果后，你就会看到血条正在恢复。当你的血条恢复到100%后再和我对话~");
        } else if (status == 5) {
            qm.showInfo("UI/tutorial.img/28");
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (qm.c.getPlayer().getHp() < 50) {
                qm.sendNext("嘿，你的血条还没有完全恢复，你确定你已经使用了我给你的所有的苹果吗？");
                qm.dispose();
            } else {
                qm.sendNext("使用物品是如此的简单，对吧？你可以设置 #b快捷键#k 在右下角的快捷栏里。哈哈，你是不是第一次听说？\r\n如果你是一个新手，你应该不知道的是，血条通常会随着时间的流逝自动恢复。好的，虽然花费了一些时间，但是这个新手们必须学会的一些知识。");
            }
        } else if (status == 1) {
            qm.sendNextPrev("好吧，现在你学到了很多，我将给你一份礼物。这是你在冒险岛世界旅行的必备物品，所以谢谢我吧！记住，请在紧急情况下使用！");
        } else if (status == 2) {
            qm.sendPrev("好吧，这就是我能教你的全部了。我知道这很难过，但是时候说再见了。保重，祝你好运，我的朋友！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 经验");
        } else if (status == 3) {
            if (qm.isQuestCompleted(1021)) {
                qm.dropMessage(1, "未知的错误");
            } else if (qm.canHold(2010000) && qm.canHold(2010009)) {
                qm.gainExp(10);
                qm.gainItem(2010000, 3);
                qm.gainItem(2010009, 3);
                qm.forceCompleteQuest();
            } else
                qm.dropMessage(1, "你的背包满了");
            qm.dispose();
        }
    }
}