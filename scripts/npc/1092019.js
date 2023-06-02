/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
    Cody (Cyndicate)
-- Totally Recreated by --
    Moogra
-- And Quest Script by --
    Ronan
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/

var status;

var seagullProgress;
var seagullIdx = -1;
var seagullQuestion = ["有一天，我去海边捉了62只章鱼做晚餐。又有路过的小孩子送给我10只章鱼。那么我当时一共拥有多少只章鱼呢？"];
var seagullAnswer = ["72"];
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {    // missing script for skill test found thanks to Jade鈩?
                        if (!cm.isQuestStarted(6400)) {
                                cm.sendOk("有事吗？如果只是无聊，去找其他人搭话吧。");
                                cm.dispose();
                        } else {
                                seagullProgress = cm.getQuestProgressInt(6400, 1);
                            
                                if (seagullProgress == 0) {
                                        seagullIdx = Math.floor(Math.random() * seagullQuestion.length);
                                        
                                        // string visibility thanks to ProXAIMeRx & Glvelturall
                                        cm.sendNext("好，我要给你出第一道题了。你要做好心理准备，这道题非常难。就算是海鸥们也会觉得它异常困难，难以解答。");
                                } else if (seagullProgress == 1) {
                                        cm.sendNext("现在~我们来看看下一题。这道题真的很难。我得请巴特来协助一下.你认识他，对吧？");
                                } else {
                                        cm.sendNext("哦哦哦哦！这可真是令人惊叹。我以前觉得这些测试非常困难，你不太可能通过...你确实是海盗们不可或缺的一员，海鸥们的好朋友。我们现在将被一生一世的友谊紧密联结在一起！最重要的是，朋友之间会在危难之际互相伸出援手。如果你身处危险之中，就呼叫海鸥朋友吧。");
                                }
                        }
                } else if (status == 1) {
                        if (seagullProgress == 0) {
                                cm.sendGetText(seagullQuestion[seagullIdx]);
                        } else if (seagullProgress == 1) {
                                cm.sendNextPrev("我会送你去诺特勒斯号上的一个空房间。你会在那里看到9个巴特。哈哈哈~他们当然不会是多胞胎了。我只是用了一点小小的障眼法来测试你的意志力。");
                        } else {
                                cm.sendNextPrev("提醒我们使用地毯式空袭，我们就会帮助你拜托困境，这就是朋友之间该做的。\r\n\r\n  #s5221003#    #b#q5221003##k");
                        }
                } else if (status == 2) {
                        if (seagullIdx > -1) {
                                var answer = cm.getText();
                                if (answer == seagullAnswer[seagullIdx]) {
                                        cm.sendNext("天啊，我真是无法想象你有多聪明，难以置信！在海鸥的世界里，这样的智力足够拿下博士学位，甚至更多的荣誉。你真是太棒了...无法相信...我是在做梦吗？");
                                        cm.setQuestProgress(6400, 1, 1);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("嗯，我记得好像不是这么多，再试试吧。");
                                        cm.dispose();
                                }
                        } else if (seagullProgress != 2) {
                                cm.sendNextPrev("总之，9个巴特中只有一个是真的。你也知道，海盗们以互相之间坚定不移的友谊与羁绊而闻名于世。如果你是个真正的海盗，就应该能够轻松找到你的同伴。那么，我会送你去巴特所在的房间。");
                        } else {
                                //cm.gainExp(1000000);
                                //cm.teachSkill(5221003, 0, 10, -1);
                                //cm.forceCompleteQuest(6400);

                                cm.sendNextPrev("你通过了我所有的测验，做得很好！");//怎么把地毯式空袭奖励给取消了，这个端做过技改吗？
                                cm.dispose();
                        }
                } else if (status == 3) {
                        var em = cm.getEventManager("4jaerial");
                        if(!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("本频道已经有其他玩家正在进行挑战。请等待其完成挑战或切换至其它频道。");
                        }
                        
                        cm.dispose();
                }
        }
}