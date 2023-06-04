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
        ["�ڵ�һ��תְ�У���һ���Ǵ����תְҪ��", ["ħ��ʦ - 8��", "���� - 20���ϵ�����", "������ - 25���ϵ�����", "���� - 20���ϵ�����", "սʿ - 35���ϵ�����"], 3],
        ["���㱻���﹥��ʱ��������һ����Ͳ�����ȫ��ȷ�ģ�", ["��ӡ - ����ʹ�ü���", "���� - ת��Ϊ�������Ҽ�������ҩˮ�Ļָ�ֵ", "���� - �ƶ��ٶȽ���", "���� - ���پ����ȡ", "���� - �����ƶ�"], 2],
        ["�ڵ�һ��תְ�У���һ��ְҵҪ������ȫ��ȷ�ģ�", ["���� - 25����", "ħ��ʦ - 10��", "���� - 25����", "սʿ - 30����", "������ - 25����"], 4],

        //Questions Related to ITEMS
        ["�����ĸ������������Ķ�Ӧ����ȷ�ģ�", ["�����ưְ� - ����", "ԭʼҰ�� - Ұ�����", "��С�� - ��С���ñ��", "���� - ���", "���� - ������"], 4],//ԭʼҰ������ɭ��
        ["�����ĸ������������Ķ�Ӧ�Ǵ���ģ�", ["���ɸ���CD - ���ɸ���CD", "��ʳ�˻� - ʳ�˻���Ҷ��", "��ľ�� - ��ľ", "С���� - �������", "��ɽ��ʬ - ��ʬ��ʧ�ľʳ�"], 1],
        //["In GM Event, how many FRUIT CAKE you can get as reward?", ["20", "200", "5", "25", "100"], 2],
        ["��������ҩˮ����Ϣ����ȷ�ģ�", ["սʿҩˮ - ������+5������3����", "��Ȫˮ - �ָ�700MP", "���� - �ָ�150HP��MP", "ɳ�� - �ָ�300MP", "���� - �ָ�400HP"], 4],
        ["��������ҩˮ����Ϣ�Ǵ���ģ�", ["������ˮ - �ָ�300MP", "��ҩ - �ָ�����״̬", "ƻ�� - �ָ�30HP", "�峿֮¶ - �ָ�3000MP", "���� - �ָ�1000HP"], 3],

        //Questions Related to MONSTERS
        ["ľ������ˮ�顢��ľ�����������㡢��Ģ�����ĸ��ĵȼ���ߣ�", ["ľ��", "��ˮ��", "��ľ��", "��������", "��Ģ��"], 2],
        ["�����ɴ�ǰ��ħ�����ֵ���;�л��������ֹ��", ["����", "��ˮ��", "����ħ", "����", "�ǹ⾫��"], 2],
        ["�ʺ絺û���������ֹ��", ["Ģ����", "����ţ", "��ˮ��", "����ţ", "����"], 4],
        ["����֮��û���������ֹ��", ["�������ne", "ʯ��", "�����", "��ľ��", "��ţ"], 1],
        ["����ѩ��û���������ֹ��", ["��ѩ��", "������", "��������ѩ��", "������Ȯ", "��ʬ"], 1],
        ["�������ֹ����ܷɣ�", ["����", "����", "��������", "����", "����ɯ��"], 0],
        ["�������ֹ����������ص�����������", ["�¹⾫��", "�ƶ���ʨ", "�����ʨ", "������", "Ұ��"], 3],
        ["�������ֹ����ڲʺ絺��û�г��֣�", ["��ţ", "Ģ����", "�������", "��Ģ��", "����ţ"], 2],

        //Questions Related to QUESTS
        ["�������ֲ��ϲ�����������Ӣ��ս����?", ["������ë", "��ս��", "����", "�Ϲž���", "����֮��"], 4],
        ["����������������ظ���ɣ�", ["����ҽԺ������", "��ȷ�ľ����Ļ�", "����������", "���µĲ���Ь", "���Ǻ���ֵ�ҩ"], 3],//�ڹ����������ǺϷ��ľ����Ļ������о���������˵��ȷ���ʺϣ���˱���
        ["��������Ƕ�תְҵ��", ["��ʦ", "��ʦ", "�̿�", "��ǹ��", "����"], 0],
        ["���������ǵȼ���ߵ�����", ["����ص���ʹ", "�󺣵�������", "������˹�غͺڰ�ˮ��", "������ӵĻָ�", "����ս��"], 2],//�Ѻʹ�������һ����������Ȥ��С��Ϸ

        //Questions Related to TOWN/NPC
        ["�����ĸ������ڽ�������", ["�ƽ�̲ �� ŵ����˹", "�ʺ�� �� �ϸ�", "�������� �� �϶��㳡", "��ʿ���� �� ħ������", "����֮��"], 1],
        ["���ڲʺ絺�����ĵ�һ��NPC��˭��", ["ɯ��", "ϣ��", "·��˹", "�޽�", "ɣ��˹"], 1],
        ["���ڱ���ѩ�򿴲��������ĸ�NPC��", ["����", "������", "�ѵ���", "��˹��ξ", "¬��"], 1],
        ["���ڱ���ѩ���ѩԭ�����������ĸ�NPC��", ["����ľ׮��", "�����", "�ܷ�", "��ʥ��ʯͷ", "��ķ����"], 4],//��Ȼ��Υ����ʶ����CMS��ͼ������ֶ�������ľ׮��
        ["������ʿ���俴���������ĸ�NPC��", ["����", "������", "ʷ��˹", "�׵�", "��"], 3],
        ["�������ִ忴���������ĸ�NPC��", ["�ذ�", "����˹", "����", "�ƶ�", "����"], 0],
        ["����ħ�����ֿ����������ĸ�NPC��", ["������", "���� ����", "¶��", "����", "����"], 2],
        ["���ڷ������п����������ĸ�NPC��", ["����", "����", "ŷ��", "³��", "����"], 3],
        ["�����ĸ�NPC����ﲻ��أ�", ["�ƶ�", "����˹", "������ɳ", "����", "������"], 1],
        ["˭�Ƿ������а���˹�ĸ��ף��Ǹ���ҳ��ߵĺ��ӣ�", ["����˹̹", "��ּ�ķ", "����", "����˹", "³��"], 0],//Alex
        ["�����ĸ�NPC�����ڰ����������������Ķ�Ա��", ["������ʿ", "�Ͳ���ʿ", "�����ϵȱ�", "��˹��ξ", "����"], 4],
        ["��30ö���齻��2תְҵ�̹ٺ󣬽̹ٸ�����ʲô��", ["�Ͻ�ָ", "����֮��", "����֮��", "Ӣ��֤��", "��ħ�ļ�"], 3],//����Ĵ���4031012������ʱ��ע��ȫ����The Proof of a Hero
        ["Ϊ������ס�����ִ�����ǵĹֲ����㽻������ʲô��Ʒ��", ["ƻ��", "����ҩˮ", "��ֵ�ҩ", "Ұ�ջ�", "��֭"], 2],
        ["��λNPC����Ʒ�ϳ�/�����޹أ�", ["�ΰ�", "ʿ��", "����", "�׵�", "��ּ�ķ"], 2],
        ["�ڲʺ絺�Ͽ�������λNPC��", ["�����", "�ذ�", "Ƥ��", "����", "������"], 1],
        ["ŵ����˹�ŵĺ��������ʾ���������뿭��ͨ������˭��", ["·��˹", "��ʿ", "����˹̹", "˹����", "���ǽ���"], 1],
        ["��֪��ס�����ִ�ĺ������������۾���ʲô��ɫ��", ["��ɫ", "��ɫ", "��ɫ", "��ɫ", "��ɫ"], 1],
        ["����������ñ�����ж��ٸ���ë��", ["7", "8", "3", "13", "16"], 3],
        ["��ס��ħ�����ֵĺ�˹���е�Բ����ʲô��ɫ��", ["��", "��ɫ", "��ɫ", "��ɫ", "��ɫ"], 2]
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
                        cm.sendNext("�ڽ����������֮ǰ����ȷ��������������ӵ��һ����λ��");
                        cm.dispose();
                    } else {
                        cm.sendNext("�õ�...�ҽ����������������ǻۡ���ȷ�ػش��������⣬��Ϳ���ͨ�����ԡ���ֻҪ����һ�أ��ͱ����ͷ�������õģ������ǿ�ʼ�ɡ�");
                    }
                } else {
                    cm.sendNext("����һ�� #b#t4005004##k �����Բ��ܼ�����");
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
                cm.sendNext("��������ˡ�");
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
                cm.sendNext("��������ˡ�");
                cm.dispose();
                return;
            }
            
            cm.sendOk("�õģ��������������⡣����ǻ۵õ���֤ʵ��\r\n�����⴮������ȥ�ɡ�");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("����ĶԻ���֧������");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    return "���ǵ� " + (status) + (status == 1 ? "��" : status == 2 ? "��" : status == 3 ? "��" : "th") + " ���⡣ ";
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