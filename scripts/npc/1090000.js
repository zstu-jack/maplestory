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
/* Kyrin
	Pirate Job Advancement
	
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "2ndjobT" : false, "3thJobI" : false, "3thJobC" : false};
job = 510;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 5;

var advQuest = 0;
function start() {
    if (cm.isQuestStarted(6330)) {
        if (cm.getEventInstance() != null) {    // missing script for skill test found thanks to Jade鈩?
            advQuest = 5;                       // string visibility thanks to iPunchEm & Glvelturall
            cm.sendNext("做得不错，我们去外面聊。");
        } else if (cm.getQuestProgressInt(6330, 6331) == 0) {
            advQuest = 1;
            cm.sendNext("你做好准备了吧？从现在起的2分钟内，你要努力抵御我的攻击...我可不会留手。祝你好运，因为接下来的时间里，运气对你而言至关重要。");
        } else {
            advQuest = 3;
            cm.teachSkill(5121003, 0, 10, -1);
            cm.forceCompleteQuest(6330);
            
            cm.sendNext("祝贺你通过了测试。接下来，我会传授你一个新的技能，它叫做 \"超级变身\".\r\n\r\n  #s5121003#    #b#q5121003##k");
        }
    } else if (cm.isQuestStarted(6370)) {
        if (cm.getEventInstance() != null) {
            advQuest = 6;
            cm.sendNext("做得不错，我们去外面聊。");
        } else if (cm.getQuestProgressInt(6370, 6371) == 0) {
            advQuest = 2;
            cm.sendNext("你做好准备了吧？从现在起的2分钟内，你要努力抵御我的攻击...我可不会留手。祝你好运，因为接下来的时间里，运气对你而言至关重要。");
        } else {
            advQuest = 4;
            cm.teachSkill(5221006, 0, 10, -1);
            cm.forceCompleteQuest(6370);
            
            cm.sendNext("祝贺你通过了测试。接下来，我会传授你一个新的技能，它叫做 \"武装\".\r\n\r\n  #s5221006#    #b#q5221006##k");
        }
    } else if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你历经千辛万苦才获得了今天的成就。想要 #r将你的形象加入海盗的殿堂#k 吗？";
        if(spawnPnpcFee > 0) {
            sendStr += "只要支付 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币#k，我就可以将你的形象加入海盗的殿堂。";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想不想成为一名#r海盗#k？但这是有前提的，并不是随便每一个人都能成为海盗。#b你的等级至少需要到达10级，并且拥有 " + cm.getFirstJobStatRequirement(jobType) + " 才行#k。让我看看你是不是满足标准。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 500) {
            actionx["2ndJob"] = true;
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendNext("你完成得很好，我看到了。我将允许你在海盗之路上更进一步。");
            else
                cm.sendNext("你的进步之大令人惊讶。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 5 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("你终于来了。几天前，神秘岛的 #b#p2020013##k 对我提起过你。我看到你对海盗的第3次转职很感兴趣，为了达到这个目标，我会对你的能力进行一个测试，看看你够不够格转职。在金银岛的蚂蚁洞里有一个入口，它会把你带到一个秘密通道。进入那里时，你会遇到我的一个分身。打败她，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("请带着 #b#t4031059##k 回来见我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("干得漂亮！你已经打败了我的分身，并把 #b#t4031059##k 安全地带了回来。在力量方面，你已经证明了你拥有3转的实力。现在你需要把这串项链带给神秘岛的 #b#p2020013##k 继续下一步的测试。祝你好运！");
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
    
    if (status == -1){
        start();
        return;
    } else {
        if (advQuest > 0) {
            if (advQuest < 3) {
                var em = cm.getEventManager(advQuest == 1 ? "4jship" : "4jsuper");
                if(!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("已经有人入场接受测试，请稍后再试。");
                }
            } else if (advQuest < 5) {
                if (advQuest == 3) {
                    cm.sendOk("这个技能和 '超人变形' 有一点点相似，但威力远超后者。再接再厉，期待与你再会。");
                } else {
                    cm.sendOk("这个技能不同于其它的海盗技能，是完全另类的一支。使用后，你可以乘坐 '战舰' 来攻击敌人。另外在登船期间，你的防御等级也会提高。祝你成为最棒的火枪手（船长）。");
                }
            } else {
                if (advQuest < 6) {
                    cm.setQuestProgress(6330, 6331, 2);
                } else {
                    cm.setQuestProgress(6370, 6371, 2);
                }

                cm.warp(120000101);
            }
            
            cm.dispose();
        } else if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("抱歉，你没有足够的金币。");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，海盗的殿堂已经满员了。");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("选择职业后无法再次更改。");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("哦，你看起来可以成为我们的一员，虽然还有点缺乏锻炼...你确定要成为海盗吗?");
            } else {
                cm.sendOk("去进行训练吧，到时候我可以告诉你如何成为 #r海盗#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(2070000) && cm.canHoldAll([1482000, 1492000])){
                if (cm.getJobId() == 0){
                    cm.changeJobById(500);
                    cm.gainItem(1492000, 1);
                    cm.gainItem(1482000, 1);
                    cm.gainItem(2330000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("好的，从今天开始，你成为了我们的一员。过上四海为家的生活，但如果你有耐心，总能过上好日子。那么，我会传授你一些技能。。。。");
            } else {
                cm.sendNext("给你的背包腾出点位置，然后再来找我对话。");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("你现在比之前强壮多了，我把新手海盗使用的武器送给你了，也给你的背包增加了一行，请检查一下。除此之外，我教给了你一些技能。你可以打开屏幕右下角的 #b技能#k 菜单查看, 你可以使用刚获得的SP学习技能，不过要注意：有一些技能需要学会前置技能后才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("有一点要提醒你，一旦你做出了选择，将不可变更。作为一名海盗，光荣地远航吧。");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendSimple("好的。当你做出了决定，就点击底部的 [我现在要选择我的二转职业]。#b\r\n#L0#请向我解释什么是拳手。\r\n#L1#请向我解释什么是火枪手。\r\n#L3#我要选择我的二转职业！");
            else
                cm.sendNext("不错的决定。你看起来很强大，但仍需要通过测试来证明有相符的实力。这对你来说应该并不困难，放轻松。");
        } else if (status == 1){
            if (!cm.isQuestCompleted(2191) && !cm.isQuestCompleted(2192)){
                // Pirate works differently from the other jobs. It warps you directly in.
                actionx["2ndJobT"] = true;
                cm.sendYesNo("现在开始测试吗？");
            } else {
                if (selection < 3) {
                    if(selection == 0) {    //brawler
                        cm.sendNext("拳手擅长使用 #r拳甲#k.\r\n\r\n#b拳手#k 是使用拳术近身战斗的斗士，拥有高HP并且能造成大量伤害。装备#r贯骨击#k后，你可以一次性对多个怪物造成大量伤害。#r橡木伪装#k 能帮助你规避高难度的战斗。");
                    } else if(selection == 1) {    //gunslinger
                        cm.sendNext("火枪手是擅长使用 #r手枪#k的海盗.\r\n\r\n#b火枪手#k 擅长进行远程快速攻击。使用 #r轻羽鞋#k，火枪手可以漂浮在空中，进行长距离，更久滞空时间的跳跃。#r迷惑射击#k 能帮助你一次性眩晕数个附近的敌人。");
                    }
                    
                    status -= 2;
                } else
                    cm.sendNextPrev("你还有很长的一段路要走，请抱有信心，海盗精神会指引你前进。");
            }
        } else if (status == 2){
            if (actionx["2ndJobT"]) {
                var map = 0;
				if(cm.isQuestStarted(2191))
					map = 108000502;
				else
					map = 108000501;
                if(cm.getPlayerCount(map) > 0) {
					cm.sendOk("所有训练地图都正在使用。请稍后再试。");
					cm.dispose();
				} else {
					cm.warp(map, 0);
					cm.dispose();
					return;
                }
            } else {
                if(cm.isQuestCompleted(2191) && cm.isQuestCompleted(2192))
                        job = (Math.random() < 0.5) ? 510 : 520;
                else if(cm.isQuestCompleted(2191))
                        job = 510;
                else if(cm.isQuestCompleted(2192))
                        job = 520;
					
                cm.sendYesNo("所以你打算选择 " + (job == 510 ? "#b拳手#k" : "#b火枪手#k") + "作为你的二转职业？要知道，一旦你选择过后，将无法再次改变职业。");
            }
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            
            if(job == 510) cm.sendNext("从现在起，你是一位 #b拳手#k了。拳手们倚靠一对铁拳打遍世界，他们不断锤炼自己肉体来做到这一点。继续训练，我会让你变得更强大。");
            else cm.sendNext("从现在起，你是一位 #b火枪手#k了。枪手们使用手枪作为武器，以精准的远程攻击而闻名于世。继续训练，我会让你变得更强大。");
            
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚赋予了你作为一个 " + (job == 510 ? "拳手" : "火枪手") + "应该掌握的技能。此外，你背包的其他栏扩展了一行，最大HP、最大MP也得到了增加。");
        else if (status == 5)
            cm.sendNextPrev("我同时也为你提升了1点的 #b技能点#k。请打开右下角的 #b技能菜单#k 进行查看。你可以用它来提升你的二转技能等级。但需要提醒你一下，你并不能同时提升所有技能的等级，因为有些技能需要习得前置技能后才可以学习。");
        else if (status == 6)
            cm.sendNextPrev((job == 510 ? "拳手" : "火枪手") + "，意味着更强的实力。但请记住，不要滥用你的力量，将这份力量用在正途上是一份意义高于继续变强的挑战。继续努力，当你更强大时再来找我。");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("她是我的分身, 你可以想象这会是一场艰难的战斗. 你得在规定时间内战胜她。打倒她，把 #b#t4031059##k 带回来给我。");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}