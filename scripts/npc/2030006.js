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
        ["在冒险岛，从1级升到2级需要多少经验？", ["20", "15", "4", "12", "16"], 1],
        ["在第一次转职中，哪一项是错误的转职要求？", ["魔法师 - 8级", "海盗 - 20以上的敏捷", "弓箭手 - 25以上的敏捷", "飞侠 - 20以上的运气", "战士 - 35以上的力量"], 3],
        ["当你被怪物攻击时，以下哪一项解释不是完全正确的？", ["封印 - 不能使用技能", "不死 - 转化为不死族且减半来自药水的恢复值", "虚弱 - 移动速度降低", "诅咒 - 减少经验获取", "昏迷 - 不能移动"], 2],
        ["在第一次转职中，哪一项职业要求是完全正确的？", ["海盗 - 25运气", "魔法师 - 10级", "飞侠 - 25运气", "战士 - 30力量", "弓箭手 - 25敏捷"], 4],

        //Questions Related to ITEMS
        ["以下哪个怪物与掉落物的对应是正确的？", ["仙人掌爸爸 - 刺针", "原始野猪 - 野猪尖牙", "红小丑 - 黄小丑的帽子", "松松 - 坚果", "蝙蝠 - 蝙蝠翅膀"], 4],//原始野猪，艾琳森林
        ["以下哪个怪物与掉落物的对应是错误的？", ["怀旧歌曲CD - 怀旧歌曲CD", "黑食人花 - 食人花的叶子", "古木妖 - 苗木", "小海象 - 海象尖牙", "矿山僵尸 - 僵尸丢失的臼齿"], 1],
        //["In GM Event, how many FRUIT CAKE you can get as reward?", ["20", "200", "5", "25", "100"], 2],
        ["以下哪种药水的信息是正确的？", ["战士药水 - 攻击力+5，持续3分钟", "矿泉水 - 恢复700MP", "蛋糕 - 恢复150HP和MP", "沙拉 - 恢复300MP", "披萨 - 恢复400HP"], 4],
        ["以下哪种药水的信息是错误的？", ["活力神水 - 恢复300MP", "补药 - 恢复虚弱状态", "苹果 - 恢复30HP", "清晨之露 - 恢复3000MP", "拉面 - 恢复1000HP"], 3],

        //Questions Related to MONSTERS
        ["木妖、蓝水灵、斧木妖、三眼章鱼、绿蘑菇，哪个的等级最高？", ["木妖", "蓝水灵", "斧木妖", "三眼章鱼", "绿蘑菇"], 2],
        ["乘坐飞船前往魔法密林的旅途中会遇到哪种怪物？", ["狼人", "绿水灵", "蝙蝠魔", "扎昆", "星光精灵"], 2],
        ["彩虹岛没有以下哪种怪物？", ["蘑菇仔", "蓝蜗牛", "绿水灵", "红蜗牛", "猪猪"], 4],
        ["林中之城没有以下哪种怪物？", ["火独眼兽ne", "石球", "蝙蝠怪", "古木妖", "蜗牛"], 1],
        ["冰峰雪域没有以下哪种怪物？", ["黑雪人", "黑鳄鱼", "企鹅王与白雪人", "火焰猎犬", "僵尸"], 1],
        ["以下哪种怪物能飞？", ["巫婆", "鳄鱼", "冰独眼兽", "丁满", "阿丽莎乐"], 0],
        ["以下哪种怪物你在神秘岛上遇不到？", ["月光精灵", "黄独角狮", "红独角狮", "黑鳄鱼", "野狼"], 3],
        ["以下哪种怪物在彩虹岛里没有出现？", ["蜗牛", "蘑菇仔", "火独眼兽", "花蘑菇", "蓝蜗牛"], 2],

        //Questions Related to QUESTS
        ["以下哪种材料不是用来觉醒英雄战剑的?", ["火焰羽毛", "旧战剑", "冰块", "上古卷轴", "妖精之翼"], 4],
        ["以下哪项任务可以重复完成？", ["闹拉医院的秘密", "正确的捐赠文化", "幽灵在哪里", "艾温的玻璃鞋", "玛亚和奇怪的药"], 3],//在国服的名字是合法的捐赠文化，但感觉按剧情来说正确更适合，因此保留
        ["以下哪项不是二转职业？", ["法师", "牧师", "刺客", "火枪手", "剑客"], 0],
        ["以下哪项是等级最高的任务？", ["丘比特的信使", "大海的遇难者", "阿尔卡斯特和黑暗水晶", "打鼓兔子的恢复", "嗙嗙的战斗"], 2],//昭和村任务，是一个很幼稚有趣的小游戏

        //Questions Related to TOWN/NPC
        ["以下哪个城镇不在金银岛？", ["黄金海滩 或 诺特勒斯", "彩虹村 或 南港", "废弃都市 与 废都广场", "勇士部落 或 魔法密林", "林中之城"], 1],
        ["你在彩虹岛遇到的第一个NPC是谁？", ["莎丽", "希娜", "路卡斯", "罗杰", "桑克斯"], 1],
        ["你在冰峰雪域看不到以下哪个NPC？", ["伯坚", "索非亚", "费德罗", "珀斯上尉", "卢米"], 1],
        ["你在冰峰雪域的雪原看不到以下哪个NPC？", ["秘密木桩子", "格里巴", "杰夫", "神圣的石头", "保姆珥玛"], 4],//虽然很违背常识，但CMS的图标和名字都是秘密木桩子
        ["你在勇士部落看不到以下哪个NPC？", ["伊安", "索菲亚", "史密斯", "易德", "麦吉"], 3],
        ["你在射手村看不到以下哪个NPC？", ["特奥", "比休斯", "米雅", "科尔", "凯茜"], 0],
        ["你在魔法密林看不到以下哪个NPC？", ["朴先生", "妖精 玛丽", "露尔", "丽雅", "赛恩"], 2],
        ["你在废弃都市看不到以下哪个NPC？", ["铭仁", "马龙", "欧文", "鲁克", "内拉"], 3],
        ["以下哪个NPC与宠物不相关？", ["科尔", "比休斯", "帕特里沙", "威巴", "科洛伊"], 1],
        ["谁是废弃都市阿勒斯的父亲，那个离家出走的孩子？", ["长老斯坦", "后街吉姆", "铭仁", "比休斯", "鲁克"], 0],//Alex
        ["以下哪个NPC不属于阿尔法部队联络网的队员？", ["查理中士", "巴伯下士", "伊吉上等兵", "珀斯上尉", "彼特"], 4],
        ["将30枚黑珠交给2转职业教官后，教官给了你什么？", ["老戒指", "记忆之粉", "妖精之粉", "英雄证书", "恶魔文件"], 3],//这里的答案是4031012，汉化时请注意全名是The Proof of a Hero
        ["为了治疗住在射手村的玛亚的怪病，你交给了她什么物品？", ["苹果", "超级药水", "奇怪的药", "野菊花", "橙汁"], 2],
        ["哪位NPC与物品合成/精炼无关？", ["奈巴", "士林", "赛恩", "易德", "后街吉姆"], 2],
        ["在彩虹岛上看不到哪位NPC？", ["白瑞德", "特奥", "皮奥", "赛德", "玛丽亚"], 1],
        ["诺特勒斯号的航海室里，显示器上正在与凯琳通话的是谁？", ["路卡斯", "金博士", "长老斯坦", "斯卡德", "狐智教授"], 1],
        ["你知道住在射手村的赫丽娜吗？她的眼睛是什么颜色？", ["蓝色", "绿色", "褐色", "红色", "黑色"], 1],
        ["武术教练的帽子上有多少根羽毛？", ["7", "8", "3", "13", "16"], 3],
        ["居住在魔法密林的汉斯手中的圆球是什么颜色？", ["白", "橙色", "蓝色", "紫色", "绿色"], 2]
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
                        cm.sendNext("在接受这个试炼之前，请确保背包的其他栏拥有一个空位。");
                        cm.dispose();
                    } else {
                        cm.sendNext("好的...我将会在这里测试你的智慧。正确地回答所有问题，你就可以通过测试。但只要你答错一回，就必须从头来过。好的，让我们开始吧。");
                    }
                } else {
                    cm.sendNext("给我一块 #b#t4005004##k ，测试才能继续。");
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
                cm.sendNext("这道题答错了。");
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
                cm.sendNext("这道题答错了。");
                cm.dispose();
                return;
            }
            
            cm.sendOk("好的，你答对了所有问题。你的智慧得到了证实。\r\n带着这串项链回去吧。");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("意外的对话分支（报错）");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    return "这是第 " + (status) + (status == 1 ? "个" : status == 2 ? "个" : status == 3 ? "个" : "th") + " 问题。 ";
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