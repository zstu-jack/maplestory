var status = 0;
var imaps = [104000000, 102000000, 100000000, 101000000, 103000000, 120000000, 105040300];
var maps = [102000000, 100000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var townText = [
    ["你所处的地方叫南港，让我来跟你介绍更多关于 #b南港#k 的信息。这里是你乘坐飞船抵达金银岛的第一站，也是大多新人离开彩虹岛后，进行冒险旅程的起点。", "这是一个安静的小镇，背后有广阔的水域，这要归功于港口位于岛的西端。这里的大多数人都是渔民，或者曾经是渔民，所以他们看起来很吓人，但如果你与他们交谈，他们会对你很友好。", "小镇周围是一片美丽的大草原。那里的大多数怪物都是弱小而温和的，非常适合新人。如果你还没有选择职业，这里是提升你等级的好地方。"],
    ["让我来告诉你更多关于 #b勇士部落#k 的信息。是一个坐落于金银岛最北部，被岩石山脉环绕的勇士小镇。那你气氛不太友好，只有强者才能在那生存。", "在高地周围，你能看到十分细小的树木和满是野猪跑的地方，还有生活在岛任何地方的猴子。那儿还有深谷，一旦你踏入，你会发现一条巨龙，他的力量绝对和他的体型相匹配。你最好不要去那，如果要去你就要非常小心！", "如果你想变成一名 #b战士#k，你可以去找勇士部落找 #r武术教官#k。如果你已经达到10级或者更高，再加上一个很好的力量属性，他可能会让你成为一名战士。如果不是，最好继续训练自己，直到达到这个水平。"],
    ["让我来告诉你更多关于 #b魔法密林#k 的信息。是一个坐落于金银岛远东，到处都是高大神秘树木的魔法师小镇。你也会在那里发现一些精灵。他们一般都不喜欢人类，所以你最好站在他们的一边，保持安静。", "在森林附近，你会发现绿色史莱姆、行走的蘑菇、猴子和僵尸猴子都居住在那。深入森林，你会看到女巫拿着扫帚在空中飞行。一句警告：除非你真的很强壮，否则我建议你不要靠近它们。", "如果你想成为一名 #b魔法师#k，找到 #r汉斯#k。只要你的等级达到8级，并且智力属性满足条件，他就会让你成为一名魔法师。如果你还不满足条件，可能需要更多的狩猎，并训练自己才能到达那里。"],
    ["Alright I'll explain to you more about #bHenesys#k. It's a bowman-town located at the southernmost part of the island, made on a flatland in the midst of a deep forest and prairies. The weather's just right, and everything is plentiful around that town, perfect for living. Go check it out.", "Around the prairie you'll find weak monsters such as snails, mushrooms, and pigs. According to what I hear, though, in the deepest part of the Pig Park, which is connected to the town somewhere, you'll find a humongous, powerful mushroom called Mushmom every now and then.", "If you want to be a #bBowman#k, you need to go see #rAthena Pierce#k at Henesys. With a level at or above 10 and a decent amount of DEX, she may make you be one afterall. If not, go train yourself, make yourself stronger, then try again."], ["Alright I'll explain to you more about #bKerning City#k. It's a thief-town located at the northwest part of Victoria Island, and there are buildings up there that have just this strange feeling around them. It's mostly covered in black clouds, but if you can go up to a really high place, you'll be able to see a very beautiful sunset there.", "From Kerning City, you can go into several dungeons. You can go to a swamp where alligators and snakes are abound, or hit the subway full of ghosts and bats. At the deepest part of the underground, you'll find Lace, who is just as big and dangerous as a dragon.", "If you want to be a #bThief#k, seek #rDark Lord#k, the heart of darkness of Kerning City. He may well make you a thief if you're at or above level 10 with a good amount of DEX. If not, go hunt and train yourself to reach there."], ["Here's a little information on #b#m120000000##k. It's a submarine that's currently parked in between Ellinia and Henesys in Victoria Island. That submarine serves as home to numerous pirates. You can have just as beautiful a view of the ocean there as you do here in Lith Harbor.", "#m120000000# is parked in between Henesys and Ellinia, so if you step out just a bit, you'll be able to enjoy the view of both towns. All the pirates you'll meet in town are very gregarious and friendly as well.", "If you are serious about becoming a #bPirate#k, then you better meet the captain of #m120000000#, #r#p1090000##k. If you are over Level 10 with 20 DEX, then she may let you become one. If you aren't up to that level, then you'll need to train harder to get there!"], ["Alright I'll explain to you more about #bSleepywood#k. It's a forest town located at the southeast side of Victoria Island. It's pretty much in between Henesys and the ant-tunnel dungeon. There's a hotel there, so you can rest up after a long day at the dungeon ... it's a quiet town in general.", "In front of the hotel there's an old buddhist monk by the name of #rChrishrama#k. Nobody knows a thing about that monk. Apparently he collects materials from the travelers and create something, but I am not too sure about the details. If you have any business going around that area, please check that out for me.", "From Sleepywood, head east and you'll find the ant tunnel connected to the deepest part of the Victoria Island. Lots of nasty, powerful monsters abound so if you walk in thinking it's a walk in the park, you'll be coming out as a corpse. You need to fully prepare yourself for a rough ride before going in.", "And this is what I hear ... apparently, at Sleepywood there's a secret entrance leading you to an unknown place. Apparently, once you move in deep, you'll find a stack of black rocks that actually move around. I want to see that for myself in the near future ..."]];
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
            var selStr = cm.getJobId() == 0 ? "There's a special 90% discount for all beginners. Alright, where would you want to go?#b" : "Oh you aren't a beginner, huh? Then I'm afraid I may have to charge you full price. Where would you like to go?#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cost[i] / (cm.getJobId() == 0 ? 10 : 1)) + " mesos)#l";
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
        cm.sendYesNo("I guess you don't need to be here. Do you really want to move to #b#m" + maps[selection] + "##k? Well it'll cost you #b" + (cost[selection] / (cm.getJobId() == 0 ? 10 : 1)) + " mesos#k. What do you think?");
    } else if (status == 4) {
        if (cm.getMeso() < (cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1))) {
            cm.sendNext("You don't have enough mesos. With your abilities, you should have more than that!");
        } else {
            cm.gainMeso(-(cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1)));
            cm.warp(maps[selectedMap]);
        }
        cm.dispose();
    }
}