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
    cm.sendSimple("欢迎你来到这里！在开始冒险之前还有什么疑问尽管问吧。\r\n#b#L0#基本移动方法？#l\r\n#L1#狩猎怪物的方法？#l\r\n#L2#拾取物品的方法？#l\r\n#L3#死掉了怎么办？#l\r\n#L4#什么时候能转职？#l\r\n#L5#请告诉我这个岛的信息#l\r\n#L6#如何成为一名战士？#l\r\n#L7#如何成为一名弓箭手？#l\r\n#L8#如何成为一名魔法师？#l\r\n#L9#如何成为一名飞侠？#l\r\n#L10#如何成为一名海盗？\r\n#L11#如何提升人物的能力值？ (S)#l\r\n#L12#如何确认我拣取的道具？#l\r\n#L13#如何装备道具？#l\r\n#L14#如何确认正在装备的物品？#l\r\n#L15#如何学习人物技能？ (K) (K)#l\r\n#L16#怎么去金银岛？#l\r\n#L17#金币是什么？#l#k");
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
            cm.sendNext("关于基本的移动方法：用#b左右键#k可以在平地或斜坡上行走，用#b Alt键#k可以跳跃。有些鞋子可以增加你的移动速度或跳跃能力。");
        } else if (sel == 1) {
            cm.sendNext("关于狩猎怪物的方法：每种怪物都有固定的生命值，用物理攻击或魔法攻击都可以狩猎怪物。当然，有些怪物很厉害，非常难以狩猎。");
        } else if (sel == 2) {
            cm.sendNext("关于拾取物品的方法：打退怪物后战利品会在掉在地上，这时候站在物品前按#b Z键#k或#b数字0 键#k，就可以拣取物品。");
        } else if (sel == 3) {
            cm.sendNext("想知道你死掉后会发生什么？与怪物战斗中体力值下降为0时，你就会变成幽灵。在死去的位置会出现墓碑，除了可以说话，其它操作都不能进行。");
        } else if (sel == 4) {
            cm.sendNext("想知道什么时候能转职？哈哈~！你真性急。每个职业都有固有的转职条件。一般8~10级你就可以选择职业。所以请努力升级。");
        } else if (sel == 5) {
            cm.sendNext("想知道这个岛的情况？这里是叫彩虹岛的空中浮岛。从远古就在天空上飞行了，因此这里很少出现凶猛的怪物。所以是相对安全的岛，是新手练习的好地方。");
        } else if (sel == 6) {
            cm.sendNext("你想成为一名 #b战士#k 吗？嗯，那么你得去金银岛，找到那个在群山之中隐居的 #r勇士部落#k ，与 #b武术教练#k 进行严肃的对话。他会教导你如何成为真正的战士。哦，还有一件非常重要的事情：你需要至少达到10级才能成为一名战士。");
        } else if (sel == 7) {
            cm.sendNext("你想成为一名 #b弓箭手#k 吗？你得去金银岛才能转职。找到那个名为 #r射手村#k 的村子，与美丽的 #b赫丽娜#k 交谈，了解有关于弓箭手的一切。哦，还有一件非常重要的事情：你需要至少达到10级才能成为弓箭手。");
        } else if (sel == 8) {
            cm.sendNext("你想成为一名 #b魔法师#k 吗？你得前往金银岛。抵达位于东部 #r魔法密林#k ，在密林最顶端的魔法图书馆中，你会遇到老魔法师 #b汉斯#k ，他会教导你如何成为魔法师。");
        } else if (sel == 9) {
            cm.sendNext("你想成为一名 #b飞侠#k 吗？你必须前往金银岛西部的 #r废弃都市#k ，找到飞侠的藏身处。在那里，你会遇到 #b达克鲁#k，他会教你成为一名飞侠。哦，还有一件非常重要的事情：你至少要达到10级才能成为飞侠。");
        } else if (sel == 10) {
            cm.sendNext("想成为#b海盗#k吗？想要转职的话，必须到金银岛去。在#r诺特勒斯#k的航海室里，可以见到#b凯琳#。她会指引你成为一名海盗。哦，还有一件非常重要的事情：你至少要达到10级才能成为飞侠。");
        } else if (sel == 11) {
            cm.sendNext("你想知道如何提高角色的能力？首先按 #bS#k 键查看功能窗口。每次升级，你将获得5个能力点（AP）。将这些AP分配给你选择的能力。就这么简单。");
        } else if (sel == 12) {
            cm.sendNext("你想知道在哪里可以确认拣取的道具？按下Z键可以拣取地上的物品，获得的物品会进入道具背包。按下#bI#k键可以确认背包的内容。");
        } else if (sel == 13) {
            cm.sendNext("你想装备道具吗？按 #bI#k 查看背包。将光标停在一件装备上面，然后双击来装备它。如果你发现自己无法穿戴该物品，你的角色可能不符合等级和状态要求。你还可以通过打开装备栏（#bE#k）并将物品拖到其中来装备它。");
        } else if (sel == 14) {
            cm.sendNext("你想确认现在装备的道具吗？按 #bE#k 键打开装备栏，在那里你就可以确认你当前的装备。要脱下装备，就双击它。那样的话，装备将被放回到背包。");
        } else if (sel == 15) {
            cm.sendNext("转职后你可以学习更多的技能，你可以设定快捷键，以便使用它们。按下 #bK#k 键打开技能手册来确认你可以学习或使用的技能。");
        } else if (sel == 16) {
            cm.sendNext("怎么去金银岛？你可以前往彩虹岛东边的南港，在那里，你能看到一艘船。站在船的前面那位桑克斯就是船长。");
        } else if (sel == 17) {
            cm.sendNext("金币是冒险岛的货币。用金币你可以购买各种道具。打猎怪物、在商店出售道具或完成任务都可以获得金币。");
        } else if (status == 1) {
            if (sel == 0) {
                cm.sendNextPrev("为了攻击怪物，你需要装备武器。装备后，按 #bCtrl#k 键使用武器。只要掌握了窍门，就可以更容易地狩猎怪物。");
            } else if (sel == 1) {
                cm.sendNextPrev("一旦你获得了转职，你将获得不同种类的技能，你可以将它们放到快捷键，以方便使用。如果这是一种攻击技能，你不需要按Ctrl键进行攻击，只需按下指定的快捷键按钮即可。");
            } else if (sel == 2) {
                cm.sendNextPrev("不过，请记住，如果您的背包已满，你就没法继续拾取道具了。所以，如果你有一件你不需要的道具，就把它卖掉，这样你就可以赚取金币，腾出背包空间。随着转职的进行，背包空间可能会增加。");
            } else if (sel == 3) {
                cm.sendNextPrev("在新手时期，你死掉的时候，不会掉落任何东西。然而转职后情况就不同了，当你死亡时，你会失去一部分经验。届时请尽可能避免死亡。");
            } else if (sel == 4) {
                cm.sendNextPrev("然而，等级并不是变强的唯一要素。你还需要根据职业提升特定能力的数值。例如，要成为一名战士，你的力量必须超过35点，你知道我的意思吧？确保提升你的能力点是对你的职业有用的。");
            } else if (sel == 5) {
                cm.sendNextPrev("但是，如果你想成为一名强大的玩家，最好不要在这里呆太久。在这里无法进行转职，彩虹岛的下面有一座巨大的岛屿叫做金银岛，那儿比这里大得多。");
            } else if (sel == 8) {
                cm.sendNextPrev("哦，顺便说一句，与其他职业不同，要成为魔法师，你只需要达到8级。提前转职的同时也伴随着更多问题，那就是成为一个真正强大的法师需要很多时间。在选择你的道路之前要仔细思考。");
            } else if (sel == 10) {
                cm.sendNextPrev("将鼠标光标放在所有能力点的上面，可以查看简要说明。例如，力量是战士、拳手的主属性，敏捷是弓箭手、枪手的主属性，智力是魔法师的主属性，运气则是飞侠的主属性。你需要仔细地思考如何通过分配能力点（AP）来发挥角色的优势。");
            } else if (sel == 15) {
                cm.sendNextPrev("哦，是的！离开之前的最后一条提示。如果你不确定自己在哪里，就按下 #bW#k 键。弹出的世界地图上会显示你所在的位置。不用担心迷路。");
            } else {
                start();
            }
        } else {
            start();
        }
    }
}