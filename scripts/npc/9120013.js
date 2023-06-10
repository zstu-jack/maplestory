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
    questions = new Array("�������ֵ��߲������ڻ���è�ĵ����У�","��������NPC������������������ڷ������к��ձ�֮�䣿","Ģ��������۵ĵ����У����ֿ���������������","�������ֵ��߲���������å�ǵĵ����У�","�������ֵ����ǲ����ڵģ�","�̵�ֵĲ˵���˭���ģ�","�������ֵ�������ʵ���ڵģ�","�Ŵ����總����ǿ���BOSS��ʲô���֣�","�����������������ȼ�����������","Ģ�����總����Ԫ̩���������棿","��������NPCû��վ���Ѻʹ�ӰԺǰ��")
    answers = new Array(new Array("��è���","����ʨӲ��","��ɫשͷ"),new Array("����","����","ɯ��"),new Array("���㴮","�ձ�����","�츾��"),new Array("��åA�Ļ���","	��åB������","��åC������"),new Array("������","����","��Ӭ��"),new Array("����","����","����"),new Array("�ƺ�����","���黨��","�ƺ�β��"),new Array("����","��Ģ����","����"),new Array("ľ����ǹ - սʿר������","��Ƥ��ͷ - ���ֽ�","������ - 51����װ��"),new Array("��ʽ����(����)	","��ʽ����(����)","Ģ��ζ������"),new Array("������","����","	������ʿ"));
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
                cm.sendYesNo("����ը�������ǲ���׼���ûش������ˣ�");
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
                cm.sendOk("ʲô��û�ţ�300ֻ�������٣�ֻ����һֻҲ���С�����Ҳû���⣬������Ҫ��300ֻ�����ǿɲ����㣬����ôһ����ܳ�����ô����...");
                cm.dispose();
            }
            else {
                cm.gainItem(2020001, -300)
                cm.sendNext("�ţ��ɵò����ȵȵ�...�ư��������гԵģ������Ա�...�ðɺðɣ������һ�����һЩ���⡣��֪���İɣ��Ǻ��ˣ����������һ�⣬ը�������ӾͶ�û����ҪôӮ��Ҫô���ˣ�");
            }
        }
        else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()){
                cm.sendNext("��...ֻҪ�����࣬�Ͷ��᷸��ġ�����������������ʹ�300ֻը�������ҡ�")
                cm.dispose();
            }
            else {
                cm.sendNext("��~�������������⡣������˵���ǲ���ôϲ������ģ����Ҹ�����Υ����ŵ�����Ծ���Լ�õ������������Ӹ��㡣")
            }
        }
        else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            cm.sendOk("���ǵ����������ˣ��ǳ���л�㡣��������ˣ�");
            cm.dispose();
        }
        else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()){
                    cm.sendNext("��...ֻҪ�����࣬�Ͷ��᷸��ġ�����������������ʹ�300ֻը�������ҡ�")
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
                var prompt = "�� " + (status - 1) + " �����⣺" + question;
                for (var i = 0; i < answer.length; i++)
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                cm.sendSimple(prompt);
            }
        }
    }
}