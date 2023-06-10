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
//Boss Kitty

var status;
var questions;
var answers;
var correctAnswer;
var questionNum;

function start() {
    status = -1;
    questions = new Array("以下哪种道具不包含在火狸猫的掉落中？","以下哪名NPC负责接送旅行者往返于废弃都市和日本之间？","蘑菇神社出售的道具中，哪种可以提升攻击力？","以下哪种道具不包含在流氓们的掉落中？","以下哪种道具是不存在的？","商店街的菜店是谁开的？","以下哪种道具是真实存在的？","古代神社附近最强大的BOSS叫什么名字？","以下哪项道具与类别或等级描述不符？","蘑菇神社附近的元泰不卖哪种面？","以下哪名NPC没有站在昭和村影院前？")
    answers = new Array(new Array("狸猫柴火","独角狮硬角","红色砖头"),new Array("艾琳","妮妮","莎伦"),new Array("章鱼串","日本炒面","天妇罗"),new Array("流氓A的徽章","	流氓B的内衣","流氓C的项链"),new Array("冻冻鱼","团扇","苍蝇拍"),new Array("智美","嘉美","由美"),new Array("云狐牙齿","幽灵花篮","云狐尾巴"),new Array("天球","蓝蘑菇王","姬神"),new Array("木精灵枪 - 战士专用武器","橡皮榔头 - 单手剑","枫树杖 - 51级可装备"),new Array("日式拉面(猪排)	","日式拉面(海鲜)","蘑菇味噌拉面"),new Array("绘里香","黑泽","	阿利博士"));
    correctAnswer = new Array(1,1,0,1,2,2,2,0,0,2,2);
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestStarted(8012) && !cm.haveItem(4031064)){ //quest in progress
                cm.sendYesNo("找来炸鸡了吗？是不是准备好回答问题了？");
            }
            else { //quest not started or already completed
                //cm.sendOk("Meeeoooowww!");//lol what's this?
                cm.dispose();
            }
        }
        else if (status == 1 && mode == 1) {
            var hasChicken = true;
            if (!cm.haveItem(2020001,300)) hasChicken=false;
            if (!hasChicken) {
                cm.sendOk("什么？没门！300只，三，百，只。少一只也不行。想多给也没问题，但至少要有300只。我们可不像你，吃那么一点就能长到这么魁梧...");
                cm.dispose();
            }
            else {
                cm.gainItem(2020001, -300)
                cm.sendNext("嗯，干得不错。先等等...瞧啊！这里有吃的！您请自便...好吧好吧，现在我会问你一些问题。你知道的吧？记好了，如果你答错了一题，炸鸡和珠子就都没啦。要么赢，要么走人！");
            }
        }
        else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()){
                cm.sendNext("嗯...只要是人类，就都会犯错的。如果想重新来过，就带300只炸鸡来找我。")
                cm.dispose();
            }
            else {
                cm.sendNext("当~你答对了所有问题。正常来说我是不怎么喜欢人类的，但我更讨厌违背承诺。所以就像约好的那样，雨珠子给你。")
            }
        }
        else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            cm.sendOk("我们的生意做成了，非常感谢你。你可以走了！");
            cm.dispose();
        }
        else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()){
                    cm.sendNext("嗯...只要是人类，就都会犯错的。如果想重新来过，就带300只炸鸡来找我。")
                    cm.dispose();
                    cont = false;
                }
            }
            if (cont) {
                questionNum = Math.floor(Math.random() * questions.length);
                if (questionNum != (questions.length - 1)){
                    var temp;
                    temp = questions[questionNum];
                    questions[questionNum] = questions[questions.length - 1];
                    questions[questions.length - 1] = temp;
                    temp = answers[questionNum];
                    answers[questionNum] = answers[questions.length - 1];
                    answers[questions.length - 1] = temp;
                    temp = correctAnswer[questionNum];
                    correctAnswer[questionNum] = correctAnswer[questions.length - 1];
                    correctAnswer[questions.length - 1] = temp;
                }
                var question = questions.pop();
                var answer = answers.pop();
                var prompt = "第 " + (status - 1) + " 个问题：" + question;
                for (var i = 0; i < answer.length; i++)
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                cm.sendSimple(prompt);
            }
        }
    }
}