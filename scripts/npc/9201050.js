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
/* Icebyrd Slimm
	Masteria: New Leaf City (600000000)
	Handles the quiz quest. (4900)
 */

var minlevel = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestCompleted(4911)) {
                cm.sendNext("干得漂亮！你已经正确回答了我所有有关新叶城的问题。祝你旅途愉快！");
                cm.dispose();
            } else if (cm.isQuestCompleted(4900) || cm.isQuestStarted(4900)) {  // thanks imbee for pointing out the quiz leak
                cm.sendNext("嘿，注意了亲爱的，我要问下一个问题了！");
                cm.dispose();
            } else {
                var selStr = "你好！我是艾斯拜德·斯利姆，新叶城的市长。感谢你受邀前来游览新叶城。那么，我能为您做些什么呢？#b"
                var info = new Array("这里是什么地方?","狐智教授是谁?","什么是狐智门?","内部齿轮装置在哪里?","什么是克兰卡丛林?","什么是齿轮入口?","这些路标代表什么?","蒙面杰克是谁?","莉塔·罗莉丝看起来像块硬骨头,她的过去是怎样的?","这座城市中的新地区何时会开放?","我想参加新叶城知识问答!");
                for (var i = 0; i < info.length; i++)
                    selStr += "\r\n#L" + i + "# " + info[i] + "#l";
                cm.sendSimple(selStr);
            }
        } else if(status == 1) {
            switch (selection) {
                case 0:
                    cm.sendNext("我一直想要建起一座城市。不能是一座普通的城市，而是一座对所有人开放的城市。我以前住在废弃都市，这也是我这样做的原因。完善计划的过程中，我遇到了很多人，其中一些已经可以作为朋友相处了。就像狐智教授一样，他是我们新叶城的天才，我曾经把他从几株食人花中救了出来。蒙面杰克是一位来自婚礼村的老猎手，他说话太圆滑了，给人留下的印象不太好。莉塔和我是老朋友了，我们一起从废弃都市来到这里，她的武力好几次帮助我化险为夷，所以我觉得她是警长的完美人选。虽然很是费了一番功夫说服，但她已经开始相信这里就是她命运中的归属了。另外就是我们的探险家，巴里凯德兄弟，他们似乎是来找什么东西的，他已经同意把找到的东西捐赠给市博物馆了。当我还在废弃都市的时候，我就听说过他们两兄弟的故事。还有埃尔帕姆...好吧，我只能说他不是这里的原住民，完全不是。我们之前谈过，他似乎没有什么恶意，所以我允许他留在新叶城...我才意识到刚才闲聊了那么多！还有什么想要问的吗？");
                    status -= 2;
                    break;
                case 1:
                    cm.sendNext("一位活力充沛的97岁老人。他是个时间旅行者，有天我在市郊闲逛的时候和他偶遇了。这老东西好像和一群丛林生物模样的东西闹了点矛盾，它们想要吃掉他。我救下了他，作为救命之恩的回报，他同意为新叶城建造一座时间博物馆。我觉得他来这里还有其它原因，因为他不止一次提到新叶城在未来会发生有趣的事情。也许你以后会慢慢发现的...");
                    status -= 2;
                    break;
                case 2:
                    cm.sendNext("呵呵，看着教授制造它们时，我也问了同样的问题。它们是折跃奇点，也就是我们常说的传送点。站在门内按下[↑]键会将你传送到另一个位置。我建议你快些掌握它的使用方法，这是我们城市的便捷运输系统。");
                    status -= 2;
                    break;
                case 3:
                    cm.sendNext("内部齿轮装置位于大笨钟地底。那里是巴里凯德发的一处怪物聚集区。那里似乎是独立于塔体的一片区域，如果要我评价的话，我也觉得很奇怪。我听说他需要人帮忙探索那片区域，你应该去见见他。不过要小心，那里的机械蜘蛛可不是吃素的。");
                    status -= 2;
                    break;
                case 4:
                    cm.sendNext("啊...克兰卡丛林位于新叶城的郊区。许多从未见过的强大生物在这片地区游荡。如果你要前往那里，最好做好战斗的准备。从新叶城向右走就能到达。传说那片丛林的尽头有一座失落之城，但我们目前还没有找到任何线索。");
                    status -= 2;
                    break;
                case 5:
                    cm.sendNext("Well, when John found himself in the MesoGears portion of Bigger Ben, he stood on one and went to another location. However, he could only head back and forth-they don't cycle through like the Foxwit Door. Ancient tech for you.");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("Well, you'll see them just about everywhere. They're areas under construction. The Red lights mean it's not finished, but the Green lights mean it's open. Check back often, we're always building!");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("Ah, Jack. You know those guys that are too cool for school? The ones who always seem to get away with everything? AND get the girl? Well, that's Jack, but without the girl. He thinks he blew his chance, and began wearing that mask to hide his true identity. My lips are sealed about who he is, but he's from Amoria. He might tell you a bit more if you ask him.");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("I've known Lita for a while, though we've just recently rekindled our friendship. I didn't see her for quite a bit, but I understand why. She trained for a very, very long time as a Thief. Matter of fact, that's how we first met! I was besieged by a group of wayward Mushrooms, and she jumped in to help. When it was time to pick a sheriff, it was a no-brainer. She's made a promise to help others in their training and protect the city, so if you're interested in a bit of civic duty, speak with her.");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("Soon, my friend. Even though you can't see them, the city developers are hard at work. When they're ready, we'll open them. I know you're looking forward to it and so am I!");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("No problem. I'll give you something nice if you answer them correctly!");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("Eager, are we? How about you explore a bit more before I let you take the quiz?");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}