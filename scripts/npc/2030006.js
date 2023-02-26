/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* Holy Stone
	Holy Ground at the Snowfield (211040401)
	3rd job advancement - Question trial.
 */

var questionTree = [
        //Questions Related to CHARACTERS
        ["��ð�յ�����1������2����Ҫ���پ��飿", ["20", "15", "4", "12", "16"], 1],
        ["�ڵ�һ��תְ�У���һ���Ǵ����תְҪ��", ["ħ��ʦ - �ȼ�8", "���� - 20���ϵ�����", "������ - 25���ϵ�����", "���� - 20���ϵ�����", "սʿ - 35���ϵ�����"], 3],
        ["���㱻���﹥��ʱ��������һ����Ͳ�����ȫ��ȷ�ģ�", ["��ӡ - ����ʹ�ü���", "���� - �����Ҽ���Ļָ���", "���� - �ƶ��ٶȽ���", "���� - ���پ����ȡ", "���� - �����ƶ�"], 2],
        ["�ڵ�һ��תְ�У���һ��ְҵҪ������ȫ��ȷ�ģ�", ["���� - 25����", "ħ��ʦ - �ȼ�10", "���� - 25����", "սʿ - 30����", "������ - 25����"], 4],

        //Questions Related to ITEMS
        ["�����ĸ������������Ķ�Ӧ����ȷ�ģ�", ["�����ưְ� - ����", "Ұ�� - Ұ������", "��С�� - ��С���ñ��", "���� - ���", "�������� - ������"], 4],
        ["�����ĸ������������Ķ�Ӧ�Ǵ���ģ�", ["���ɸ���CD - ���ɸ���CD", "��ʳ�˻� - ʳ�˻���Ҷ��", "��ľ�� - ��ľ", "С���� - �������", "��ɽ��ʬ - ��ʬ��ʧ�ľʳ�"], 1],
        //["In GM Event, how many FRUIT CAKE you can get as reward?", ["20", "200", "5", "25", "100"], 2],
        ["��������ҩˮ����Ϣ����ȷ�ģ�", ["սʿҩˮ - ������+5������3����", "��Ȫˮ - �ָ�700MP", "���� - �ָ�150HP��MP", "ɳ�� - �ָ�300MP", "���� - �ָ�400HP"], 4],
        ["��������ҩˮ����Ϣ�Ǵ���ģ�", ["������ˮ - �ָ�300MP", "��ҩ - �ָ�����״̬", "ƻ�� - �ָ�30HP", "�峿֮¶ - �ָ�3000MP", "���� - �ָ�1000HP"], 3],

        //Questions Related to MONSTERS
        ["ľ������ˮ�顢��ľ�����������㡢��Ģ�����ĸ��ĵȼ���ߣ�", ["ľ��", "��ˮ��", "��ľ��", "��������", "��Ģ��"], 2],
        ["��ħ�����ֳ����ɴ�����;�л��������ֹ��", ["����", "����ճҺ", "����ħ", "����", "�ǹ⾫��"], 2],
        ["�ʺ絺û���������ֹ��", ["Ģ����", "����ţ", "��ˮ��", "����ţ", "С��"], 4],
        ["����֮��û���������ֹ��", ["�������", "ʯ��", "�����", "��ľ��", "��ţ"], 1],
        ["����ѩ��û���������ֹ��", ["��ѩ��", "������", "��������ѩ��", "���ǳ�", "��ʬ"], 1],
        ["�������ֹ����ܷɣ�", ["����", "����", "��������", "����", "����ɯ��"], 0],
        ["�������ֹ����������ص�����������", ["�¹⾫��", "�ƶ���ʨ", "�����ʨ", "������", "Ұ��"], 3],
        ["�������ֹ����ڲʺ絺��û�г��֣�", ["��ţ", "Ģ����", "�������", "��Ģ��", "����ţ"], 2],

        //Questions Related to QUESTS
        ["�������ֲ��ϲ�����������Ӣ��ս����?", ["������ë", "��ս��", "����", "�Ϲž���", "����֮��"], 4],
        ["����������������ظ���", ["����ҽԺ������", "��ȷ�ľ����Ļ�", "����������", "���µĲ���Ь", "���Ǻ���ֵ�ҩ"], 3],
        ["��������Ƕ�תְҵ��", ["��ʦ", "��ʦ", "�̿�", "��ǹ��", "����"], 0],
        ["���������ǵȼ���ߵ�����", ["����ص���ʹ", "�󺣵�������", "������˹�غͺڰ�ˮ��", "������ӵĻָ�", "����֮ս"], 2],

        //Questions Related to TOWN/NPC
        ["�����ĸ������ڽ�������", ["���ݺ�̲ �� ŵ����˹", "�ʺ�� �� �ϸ�", "�������� �� �϶��㳡", "��ʿ���� �� ħ������", "����֮��"], 1],
        ["���ڲʺ絺�����ĵ�һ��NPC��˭��", ["ɯ��", "ϣ��", "·��˹", "�޽�", "ɣ��˹"], 1],
        ["���ڱ���ѩ�򿴲��������ĸ�NPC��", ["����", "������", "�ѵ���", "��˹��ξ", "¬��"], 1],
        ["���ڱ���ѩ���ѩԭ�����������ĸ�NPC��", ["���ص���ʯ", "�����", "�ܷ�", "��ʥ��ʯͷ", "��ķ����"], 4],
        ["������ʿ���俴���������ĸ�NPC��", ["Ayan", "Sophia", "Mr. Smith", "Francois", "Manji"], 3],
        ["�������ִ忴���������ĸ�NPC��", ["Teo", "Vicious", "Mia", "Doofus", "Casey"], 0],
        ["����ħ�����ֿ����������ĸ�NPC��", ["Mr. Park", "Mar the Fairy", "Roel", "Ria", "Shane"], 2],
        ["���ڷ������п����������ĸ�NPC��", ["Dr. Faymus", "Mong from Kong", "Ervine", "Luke", "Nella"], 3],
        ["�����ĸ�NPC����ﲻ��أ�", ["Doofus", "Vicious", "Patricia", "Weaver", "Cloy"], 1],
        ["˭�Ƿ�������������˹�ĸ��ף��Ǹ���ҳ��ߵĺ��ӣ�", ["Chief Stan", "JM From tha Streetz", "Dr. Faymus", "Vicious", "Luke"], 0],
        ["�����ĸ�NPC�����ڰ����������������Ķ�Ա��", ["Staff Sergeant Charlie", "Sergeant Bravo", "Corporal Easy", "Master Sergeant Fox", "Peter"], 4],
        ["What do you receive in return from giving 30 Dark Marbles to the 2nd job advancement NPC?", ["Old Ring", "Memory Powder", "Fairy Dust", "Proof of Hero", "Scroll of Secrets"], 3],
        ["Which item you give Maya at Henesys in order to cure her sickness?", ["Apple", "Power Elixir", "Weird Medicine", "Chrysanthemum", "Orange Juice"], 2],
        ["Which of following NPC is not related to item synthesis/refine?", ["Neve", "Serryl", "Shane", "Francois", "JM From tha Streetz"], 2],
        ["Which NPC cannot be seen in Maple Island?", ["Bari", "Teo", "Pio", "Sid", "Maria"], 1],
        ["Who do you see in the monitor in the navigation room with Kyrin?", ["Lucas", "Dr. Kim", "Chief Stan", "Scadur", "Professor Foxwit"], 1],
        ["You know Athena Pierce in Henesys? What color are her eyes?", ["Blue", "Green", "Brown", "Red", "Black"], 1],
        ["How many feathers are there on Dances with Barlog's Hat?", ["7", "8", "3", "13", "16"], 3],
        ["What's the color of the marble Grendel the Really Old from Ellinia carries with him?", ["White", "Orange", "Blue", "Purple", "Green"], 2]
    ];
    
var status;
var question;

var questionPool;
var questionPoolCursor;

var questionAnswer;

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

        if(status == 0) {
            if(cm.getPlayer().gotPartyQuestItem("JBQ") && !cm.haveItem(4031058, 1)) {
                if(cm.haveItem(4005004, 1)) {
                    if(!cm.canHold(4031058)) {
                        cm.sendNext("Have a free ETC slot available before accepting this trial.");
                        cm.dispose();
                    } else {
                        cm.sendNext("Alright... I'll be testing out your wisdom here. Answer all the questions correctly, and you will pass the test BUT, if you even lie to me once, then you'll have to start over again ok, here we go.");
                    }
                } else {
                    cm.sendNext("Bring me a #b#t4005004##k to proceed with the trial.");
                    cm.dispose();
                }
            } else {
                cm.dispose();
            }
        } else if(status == 1) {
            cm.gainItem(4005004, -1);
            instantiateQuestionPool();
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status >= 2 && status <= 5) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("You have failed the question.");
                cm.dispose();
                return;
            }
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status == 6) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("You have failed the question.");
                cm.dispose();
                return;
            }
            
            cm.sendOk("Alright. All your answers have been proven as the truth. Your wisdom has been proven.\r\nTake this necklace and go back.");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("Unexpected branch.");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    return "Here's the " + (status) + (status == 1 ? "st" : status == 2 ? "nd" : status == 3 ? "rd" : "th") + " question. ";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function instantiateQuestionPool() {
    questionPool = [];
    
    for(var i = 0; i < questionTree.length; i++) {
        questionPool.push(i);
    }
    
    shuffleArray(questionPool);
    questionPoolCursor = 0;
}

function fetchNextQuestion() {
    var next = questionPool[questionPoolCursor];
    questionPoolCursor++;
    
    return next;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateSelectionMenu(array, answer) {
    var answerStr = array[answer], answerPos = -1;
    
    shuffle(array);
    
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
        if (answerStr == array[i]) {
            answerPos = i;
        }
    }
    return [menu, answerPos];
}