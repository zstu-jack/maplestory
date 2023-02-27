var status = 0;
var imaps = [104000000, 102000000, 100000000, 101000000, 103000000, 120000000, 105040300];
var maps = [102000000, 100000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var townText = [
    ["你所处的地方叫明珠港，让我来跟你介绍更多关于 #b明珠港#k 的信息。这里是你乘坐飞船抵达金银岛的第一站，也是大多新人离开彩虹岛后，进行冒险旅程的起点。", "这是一个安静的小镇，背后有广阔的水域，这要归功于港口位于岛的西端。这里的大多数人都是渔民，或者曾经是渔民，所以他们看起来很吓人，但如果你与他们交谈，他们会对你很友好。", "小镇周围是一片美丽的大草原。那里的大多数怪物都是弱小而温和的，非常适合新人。如果你还没有选择职业，这里是提升你等级的好地方。"],

    ["让我来告诉你更多关于 #b勇士部落#k 的信息。是一个坐落于金银岛最北部，被岩石山脉环绕的勇士小镇。那你气氛不太友好，只有强者才能在那生存。", "在高地周围，你能看到十分细小的树木和满是野猪跑的地方，还有生活在岛任何地方的猴子。那儿还有深谷，一旦你踏入，你会发现一条巨龙，他的力量绝对和他的体型相匹配。你最好不要去那，如果要去你就要非常小心！", "如果你想变成一名 #b战士#k，你可以去找勇士部落找 #r武术教官#k。如果你已经达到10级或者更高，再加上一个很好的力量属性，他可能会让你成为一名战士。如果不是，最好继续训练自己，直到达到这个水平。"],

    ["让我来告诉你更多关于#b射手村#k的信息。这是一个位于岛屿最南端的小镇，建立在草原中的平原上。 那里天气不错，小镇周围的一切都十分和平，非常适合长期居住。", "周围有许多弱小的怪物，例如蜗牛蘑菇仔啥的。 不过据说在某处难以让人寻找到的地方，有一只巨大的蘑菇王，相当可怕。", "如果你想成为 #b弓箭手#k,并且等级到达10级以上，你可以去射手村找 #r赫丽娜#k 看看. "],

    ["让我来告诉你更多关于 #b魔法密林#k的信息。是一个坐落于金银岛远东，到处都是高大神秘树木的魔法师小镇。你也会在那里发现一些精灵。他们一般都不喜欢人类，所以你最好站在他们的一边，保持安静。", "在森林附近，你会发现绿色史莱姆、行走的蘑菇、猴子和僵尸猴子都居住在那。深入森林，你会看到女巫拿着扫帚在空中飞行。一句警告：除非你真的很强壮，否则我建议你不要靠近它们。", "如果你想成为一名 #b魔法师#k，找到 #r汉斯#k。只要你的等级达到8级，并且智力属性满足条件，他就会让你成为一名魔法师。如果你还不满足条件，可能需要更多的狩猎，并训练自己才能到达那里。"],

    ["好吧，我可以向你解释更多关于#b废弃都市的消息#k. 这是一个位于岛屿北部的盗贼小镇，那里的建筑周围有一种奇怪的感觉。大部分都被乌云覆盖，但如果你能登上一个非常高的地方，你就能在那里看到非常美丽的日落。", "从废弃都市，你可以进入几个地方探险。你可以去鳄鱼和蛇出没的沼泽地，或者撞上充满鬼魂和蝙蝠的地铁。在地下最深处，你会发现一个恐怖的生物，他和龙一样大，一样危险。", "如果你想成为#b飞侠#k, 就去寻找 #b达鲁克#k,他那里是废弃都市的中心。如果你达到或超过10级，并且拥有大量的DEX，他很可能会让你成为小偷。如果没有，就去打猎，训练自己到达那里。"],

    ["这里有一点关于#b诺特勒斯号码头#k的信息。这是一艘潜艇，目前停泊在小岛的东南方向。这艘潜艇是众多海盗的家园。你可以在那里看到和在明珠港一样美丽的海洋景色。", "你在城里遇到的所有海盗都很合群，也很友好。", "如果你真的想成为一名#b海盗#k，那么你最好见见船长#r凯琳#k。如果你超过了10级，20DEX，那么她可能会让你成为一名海盗。"], 

    ["危险！别去！这不是你这个新手能去到的地方！推荐你还是去其他城市转职锻炼后再去#b林中之城#k吧！那里太危险太危险了，就连经验丰富的老冒险家都不敢轻易涉足。","什么？你还是想去？那我就告诉你吧，那里有非常恐怖的石头人和蚂蚁，有着可怕到极点的牛魔王，甚至在那地底深处，还有一只怎么杀都杀不死的巨大#r蝙蝠魔#k……","你真的想去送死我也不会带你去的，还是听我一句劝吧，先去其他地方转职，把自己训练的足够强大了，再去探索#r林中之城#k吧。"]
];
var selectedMap = -1;
var town = false;

function start() {
    cm.sendNext("你想前往别的城镇吗？只要花点钱，我就能帮你做到。可能会有点小贵，但我对新人打9折哦！");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if ((mode == 0 && !town) || mode == -1) {
            if (type == 1 && mode != -1) {
                cm.sendNext("这座城市也有很多可看的。如果你想去别的地方，请告诉我。");
            }
            cm.dispose();
            return;
        } else {
            status -= 2;
            if (status < 1) {
                cm.dispose();
                return;
            }
        }

    }
    if (status == 1) {
        cm.sendSimple("如果你是第一次来这，不难理解你可能对这个地方有很多困惑。如果你有什么问题，请讲。\r\n#L0##b金银岛是一个什么样的城镇？#l\r\n#L1#请带我去别的地方。#k#l");
    } else if (status == 2) {
        if (selection == 0) {
            town = true;
            var text = "在金银岛有7个大型城镇，你更想了解哪一个呢？#b";
            for (var i = 0; i < imaps.length; i++) {
                text += "\r\n#L" + i + "##m" + imaps[i] + "##l";
            }
            cm.sendSimple(text);
        } else if (selection == 1) {
            var selStr = cm.getJobId() == 0 ? "你是新手所以你有90%的折扣\r\n请问你想去哪??#b" : "哦，你不是一个新手，是吧？我怕我可能会向您收取全价。你想去哪？#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cost[i] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币)#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (town) {
        if (selectedMap == -1) {
            selectedMap = selection;
        }
        if (status == 3) {
            cm.sendNext(townText[selectedMap][status - 3]);
        } else {
            townText[selectedMap][status - 3] == undefined ? cm.dispose() : cm.sendNextPrev(townText[selectedMap][status - 3]);
        }
    } else if (status == 3) {
        selectedMap = selection;
        cm.sendYesNo("我猜你不想待这里。你真的想要移动到 #b#m" + maps[selection] + "##k? 我将相你收取 #b" + (cost[selection] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币#k. 你怎么看??");
    } else if (status == 4) {
        if (cm.getMeso() < (cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1))) {
            cm.sendNext("你没有足够的金币我不能帮助你!!");
        } else {
            cm.gainMeso(-(cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1)));
            cm.warp(maps[selectedMap]);
        }
        cm.dispose();
    }
}