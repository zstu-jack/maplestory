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
	NPC Name: 		Robin
	Map(s): 		Maple Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status;
var sel;

function start() {
    status = -1;
    sel = -1;
    cm.sendSimple("现在你可以问我一些关于旅行的过程中遇到的问题\r\n#L0##b怎么移动？#l\r\n#L1#怎么击败怪物#l\r\n#L2#怎么捡起物品？#l\r\n#L3#我死了会发生什么？#l\r\n#L4#什么时候能转职？#l\r\n#L5#告诉我这片大陆的信息？#l\r\n#L6#怎么样成为一名战士？#l\r\n#L7#怎么样成为一名弓箭手#l\r\n#L8#怎么样成为一名魔法师？#l\r\n#L9#怎么样成为一名飞侠？#l\r\n#L10#怎么样提升人物的能力值？ (S)#l\r\n#L11#怎么检查我捡起的物品？#l\r\n#L12#怎么穿上物品？#l\r\n#L13#怎么检查正在装备的物品？#l\r\n#L14#关于技能呢？ (K)#l\r\n#L15#怎么去金银岛？#l\r\n#L16#关于金币？#l#k");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == -1) {
            sel = selection;
        }
        if (sel == 0) {
            cm.sendNext("好的，关于怎么移动。用 #b← →#k 键在平坦和倾斜的道路上移动，按 #bAlt#k 键跳跃。一些增加能力值的鞋子能够提升你的速度和跳跃能力。");
        } else if (sel == 1) {
            cm.sendNext("关于怎么击败怪物，每个怪物都有自己的生命值，你可以通过武器或法术攻击将它们击倒。当然，他们越强大，就越难将他们击倒。");
        } else if (sel == 2) {
            cm.sendNext("关于怎么拾取物品，一旦你击败一个怪物，物品就会掉到地上。发生这种情况时，站在物品前面，按 #bZ#k 键或小键盘上的 #b0#k 键获取物品。");
        } else if (sel == 3) {
            cm.sendNext("想知道你死后会发生什么？当你的生命值达到0时，你会变成鬼魂。那个地方会有一个墓碑，你将无法移动，尽管你仍然可以聊天。");
        } else if (sel == 4) {
            cm.sendNext("你什么时候可以选择职业？哈哈哈，放松点，我的朋友。每项职业都有需要你满足的条件。通常等级在8到10之间就可以了，所以要努力升级。");
        } else if (sel == 5) {
            cm.sendNext("想知道这个岛吗？它叫做彩虹岛，漂浮在空中。它已经在空中漂浮了一段时间，所以不友好的怪物并没有真正出现。这是一个非常安静的岛屿，非常适合初学者！");
        } else if (sel == 6) {
            cm.sendNext("你想成为一名 #b战士#k 吗？嗯，那么我建议你去金银岛。去到一个名为 #r勇士部落#k 的小镇看看，与 #b武术教练#k 的对话。他会教你如何成为真正的战士。哦，还有一件非常重要的事情：你需要至少达到10级才能成为一名战士！！");
        } else if (sel == 7) {
            cm.sendNext("你想成为一名 #b弓箭手#k 吗？你需要去金银岛才能获得晋升。去到一个名为 #r射手村#k 的小镇，与美丽的 #b赫丽娜#k 交谈，了解弓箭手的内在和外在。哦，还有一件非常重要的事情：你需要至少达到10级才能成为弓箭手！！");
        } else if (sel == 8) {
            cm.sendNext("你想成为一名 #b魔法师#k 吗？要做到这一点，你必须前往金银岛。去到一个名为 #r魔法密林#k 的小镇，最顶端是魔法图书馆。在里面，你会遇到所有魔法师的首领，#b汉斯#k 会教你成为魔法师的一切。");
        } else if (sel == 9) {
            cm.sendNext("你想成为一名 #b飞侠#k 吗？你必须前往金银岛，去到一个名为 #r废弃都市#k 的小镇，在小镇的阴暗面，你会看到一个飞侠的藏身之处。在那里，你会遇到 #b达克鲁#k，他会教你做飞侠的一切。哦，还有一件非常重要的事情：你至少要达到10级才能成为飞侠！！");
        } else if (sel == 10) {
            cm.sendNext("你想知道如何提高角色的能力统计吗？首先按 #bS#k 键查看功能窗口。每次升级，你将获得5个能力点（AP）。将这些AP分配给您选择的能力。就这么简单。");
        } else if (sel == 11) {
            cm.sendNext("你想知道如何检查你捡到的物品吗？当你打败一个怪物时，它会将一个物品掉落在地上，你可以按 #bZ#k 键来拾取该物品。然后，该物品将存储在您的背包中，您只需按 #bI#k 键即可查看它。");
        } else if (sel == 12) {
            cm.sendNext("你想知道怎么穿这些衣服，对吧？按 #bI#k 查看物品库存。将鼠标光标放在一个装备的上面，然后双击它以将其放在角色上。如果你发现自己无法穿戴该物品，你的角色很可能不符合等级和状态要求。您还可以通过打开装备栏（#bE#k）并将装备拖到其中来放置项目。要取下装备，请双击装备栏的装备。");
        } else if (sel == 13) {
            cm.sendNext("你想检查一下装备的物品，对吗？按 #bE#k 键打开装备栏，在那里您可以准确地看到您当前的穿着。要脱下装备，请双击该项目。然后，该装备将被放回到背包。");
        } else if (sel == 14) {
            cm.sendNext("你升级后获得的特殊能力被称为技能。你将获得专门针对该职业的技能。你还没有到那个阶段，所以你还没有任何技能，但请记住，要检查你的技能，请按 #bK#k 键打开技能手册。它会帮助你前进。");
        } else if (sel == 15) {
            cm.sendNext("你怎么去金银岛？在这个岛的东面有一个港口，叫做桑克斯。在那里，你会发现一艘在空中飞行的船。船长站在船的前面。问问他。");
        } else if (sel == 16) {
            cm.sendNext("这是冒险岛中使用的货币。你可以通过金币购买物品。你可以打败怪物，在商店出售物品，或者完成任务来获得它们。。。");
        } else if (status == 1) {
            if (sel == 0) {
                cm.sendNextPrev("为了攻击怪物，你需要装备武器。装备后，按 #bCtrl#k 键使用武器。在正确的时机下，你将能够轻松击败怪物。");
            } else if (sel == 1) {
                cm.sendNextPrev("一旦你获得了转职，你将获得不同种类的技能，你可以将它们放到快捷键，以方便使用。如果这是一种攻击技能，你不需要按Ctrl键进行攻击，只需按下指定的快捷键按钮即可。");
            } else if (sel == 2) {
                cm.sendNextPrev("不过，请记住，如果您的物品库存已满，您将无法获得更多。所以，如果你有一件你不需要的东西，就把它卖掉，这样你就可以从中获得一些东西。随着你职业的提升，库存可能会增加。");
            } else if (sel == 3) {
                cm.sendNextPrev("如果你只是一个新手，那么当你死的时候，不会掉落任何东西。然而，一旦你转职后，情况就不同了。当你死亡时，你会失去一部分经验，所以确保你不惜一切代价避免危险和死亡。");
            } else if (sel == 4) {
                cm.sendNextPrev("然而，等级并不是提升的唯一要素。你还需要根据职业提升特定能力的水平。例如，要成为一名战士，你的力量必须超过35点，等等，你知道我在说什么吗？确保提升你的能力点是对你的职业有用的。");
            } else if (sel == 5) {
                cm.sendNextPrev("但是，如果你想成为一名强大的玩家，最好不要考虑在这里呆太久。你在这里无论如何都无法进行转职。在这个岛的下面有一个巨大的岛屿，叫做金银岛。那地方比这里大得多，我不是在开玩笑。");
            } else if (sel == 8) {
                cm.sendNextPrev("哦，顺便说一句，与其他工作不同，要成为魔法师，你只需要达到8级。提前晋升的同时也伴随着一个事实，那就是成为一个真正强大的法师需要很多时间。在选择你的道路之前要仔细思考。");
            } else if (sel == 10) {
                cm.sendNextPrev("将鼠标光标放在所有能力点的上面，以查看简要说明。例如，力量代表战士，敏捷代表弓箭手，智力代表魔术师，运气代表飞侠。这本身并不是你需要知道的一切，所以你需要长时间地思考如何通过分配分数来强调你的角色的优势。");
            } else if (sel == 15) {
                cm.sendNextPrev("哦，是的！离开之前最后一条信息。如果您不确定自己在哪里，请始终按 #bW#k 键。世界地图将弹出，定位器显示您的位置。你不用担心会迷路。");
            } else {
                start();
            }
        } else {
            start();
        }
    }
}