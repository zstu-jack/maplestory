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
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 5;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("Hi there.");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
        actionx["Mental"] = true;
    else if (cm.haveItem(4031057))
        actionx["Physical"] = true;
    cm.sendSimple("我有什么能帮你的？#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想要开启第3次转职任务。" : "") + "\r\n#L1#我想获得挑战扎昆任务的资格。");
}

function action(mode, type, selection){
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
        if (mode == 0 && type == 1)
            cm.sendNext("让你的潜力觉醒吧。");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]){
        if (status == 0)
            cm.sendNext("你在智慧测试中的表现不错。你巧妙地给出了每个问题的正确答案。不得不说，你的智慧水准确实令我印象深刻。在我们开始下一步之前，请先把项链递给我。");
        else if (status == 1)
            cm.sendYesNo("大功告成！你将会通过我转职成为远较之前强大的冒险家。不过在此之前，请确认你在70级之前获得的所有SP（技能点）都已经分配完毕，然后才能进行第3次转职。另外，你已经在第2次转职时选择了职业方向，因此在第3次转职中无法再次选择。现在确定要进行第3次转职吗？");
        else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("继续转职流程前，请分配70级前获得的所有SP（技能点）。");
                    cm.dispose();
                    return;
                }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }
            
            if(Math.floor(cm.getJobId() / 10) == 51) cm.sendNext("Great! You are now a #bMarauder#k. As a Marauder, you will learn some of the most sophisticated skills related to melee-based attacks. #bEnergy Charge#k is a skill that allows you to store your power and the damage you receive into a special form of energy. Once this ball of energy is charged, you may use #bEnergy Blast#k to apply maximum damage against your enemies, and also use #bEnergy Drain#k to steal your enemy's HP to recover your own. #bTransformation#k will allow you to transform into a superhuman being with devastating melee attacks, and while transformed, you can use #bShockwave#k to cause a mini-earthquake and inflict massive damage to your enemies.");
            else cm.sendNext("Great! You have now become an #bOutlaw#k. As an Outlaw, you will become a true pistolero, a master of every known Gun attack, as well as a few other skills to help you vanquish evil. #bBurst Fire#k is a more powerful version of Double Shot, shooting more bullets and causing more damage at the same time. You also now have the ability to summon a loyal #bOctopus#k and the swooping #bGaviota#k as your trusty allies, while attacking your enemies using #bBullseye#k. You can also use element-based attacks using #bFlamethrower#k 和 #bIce Splitter#k.");
        } else if (status == 3) {
            cm.sendNextPrev("另外，我为你提升了5点AP（能力点）和1点SP（技能点），来帮助你开启3转后的旅程。现在你是一位极其强大的海盗了。不过要记得，现实世界的前方仍然有更艰巨的困难需要去克服。当你感到训练的作用微乎其微，实力已经无法提升到更高的层次时，就再来找我吧。我会一直在这里等你。");
        }
    }else if (actionx["Physical"]){
        if (status == 0)
            cm.sendNext("你在力量测试中的表现不错，就知道你能做到的。现在你已经通过了前半部分的测试，接下来是后半部分。请先把项链给我。");
        else if (status == 1){
            if (cm.haveItem(4031057)){
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("这是测试的后半部分。这项测试将决定你是否拥有足够的智慧，能够踏出迈向伟大的下一步。在神秘岛的雪原中，有一处被雪覆盖的黑暗区域被称为雪原圣地，那里连怪物都无法到达。在雪原圣地的中心，矗立着一块巨大的石头，那就是圣石。你需要祭献一件特别的道具，而后圣石会当场测试你的智慧。");
        } else if (status == 2)
            cm.sendNextPrev("你要诚实地而坚定地回答每个问题。如果正确回答了所有问题，那么圣石会正式认可你，并把 #b#t4031058##k交给你。把项链拿回来，我会帮你更进一步。祝你好运。");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("去见 #b#p1090000##k，把 #b#t4031057##k 带回来给我。");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("与 #b#p2030006##k 交谈后，把 #b#t4031058##k 带回来给我。");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0){
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0){
                if (status == 0)
                    cm.sendYesNo("欢迎来到长老公馆，我是 #b#p2020013##k，海盗长老。我负责让所有接受指导的海盗展现出最强的实力。你看起来像是那种渴望进步，想要接受3转测试的【。然而太多pirates满怀期待想要一跃抵达新的高度，却总是摔得很惨。那么你又如何？做好准备接受3转测试了吗？");
                else if (status == 1){
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("很好，你即将接受力量与智慧测试来评定作为一名pirate的资质。我会先向你解释前半部分的力量测试要如何进行。还记得诺特勒斯号的 #b#p1090000##k 吗？去见她，她会指导你进行力量测试。完成任务后，带着 #b#t4031057##k 回来找我。 ");
                } else if (status == 2)
                    cm.sendNextPrev("只有在你通过了力量测试之后，才能开始智慧测试。#b#t4031057##k 将证明你确实通过了考试。在你到达那里之前，我会通知 #b#p1090000##k 你即将抵达，准备好一切。这份测验并不简单，但我对你有极大的信心。祝你好运。");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50){
            	cm.sendOk("看来你获得了长老们的 #b许可#k ，有资格成为 #r扎昆讨伐队#k 的一员，愿你在未来的道路上诸事顺利。");
                if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            }else
                cm.sendOk("你的实力还不满足成为 #r扎昆讨伐队#k 成员的标准。 至少到达 #b50级#k 后再来与我对话。");
            cm.dispose();
        }
    }
}