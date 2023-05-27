/*
 * @Author - Sparrow
 * @NPC - 1012008 - Casey the Game Master
 * @Map - 100000203 - Henesys Game Park
 */

var status;
var current;
var omok =       [4080000, 4080001, 4080002, 4080003, 4080004, 4080005];
var omok1piece = [4030000, 4030000, 4030000, 4030010, 4030011, 4030011];
var omok2piece = [4030001, 4030010, 4030011, 4030001, 4030010, 4030001];
var omokamount = 99;
var text = "根据你想在游戏中使用什么样的棋子，套装也会有所不同。你想做哪一套？"

function start() {
    current = 0;
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if(mode == -1 && current > 0) {
        cm.dispose();
        return;
    } else {
        if(mode == 1) { 
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        cm.sendSimple("嘿！你好像打猎打累了？享受快乐生活是我的信念。怎么样？只要有几种道具，我就给你更换能玩小游戏的道具。嗯。。。帮你什么好呢？\r\n#b#L0#制作小游戏道具#l\r\n#b#L1#听听小游戏的说明#l");
      
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendSimple("请问想要做哪种小游戏呢？？\r\n\r\n#b#L4#五子棋#l#k\r\n#b#L5#记忆大考验#l#k");
        } else if (selection == 1) {
            cm.sendSimple("你要听哪种小游戏呢？？\r\n\r\n#b#L2#五子棋#l#k\r\n#b#L3#记忆大考验#l#k");
        }

    } else if (status == 2) {
        if (selection == 2) {
            current = 1;
            cm.sendNext("以下是五子棋的规则，请仔细听。五子棋是一种游戏，在这种游戏中，你和你的对手轮流在桌子上放置一块棋子，直到有人找到方法将连续5个棋子排成一行，无论是水平、对角还是垂直。对于初学者来说，只有拥有#b五子棋集合#k的玩家才能打开游戏室。");
        } else if (selection == 3) {
            current = 2;
            cm.sendNext("以下是记忆大考验的规则，请仔细听。顾名思义，在桌上摆放的卡片数量中找到一对匹配的卡片。当找到所有匹配的配对时，拥有更多匹配配对的人将赢得游戏。就像五子棋一样，你需要#b整套比赛卡#k才能打开游戏室。");

        } else if (selection == 4) {
            current = 3;
            cm.sendNext("你想玩#b五子棋#k吗？要开启它，需要五子棋集合。只有拥有该物品的人才能打开房间玩五子棋游戏，除了市场上的几个地方，你几乎可以在任何地方玩这个游戏。");

        } else if (selection == 5) {
            current = 4;
            if (cm.haveItem(4030012, 15)) {
                cm.gainItem(4030012, -15);
                cm.gainItem(4080100, 1);
            } else {
                cm.sendNext("你想要#b一套记忆牌#k吗？嗯……要制作一套记忆卡，你需要一些#b怪物卡#k。怪物卡可以在岛上打猎怪物来获得。收集15张怪物卡，你就可以制作一套记忆卡。"); //Lmfao a set of A set xD
                cm.dispose();
            }
        }

         
    } else if (status == 3) {
        if (current == 1) {
            cm.sendNextPrev("五子棋游戏的每一场比赛都会让你花费#100 金币#k。即使你没有#b五子棋集合#k，你也可以进入房间玩。然而，如果你没有100金币，那么你无法进入房间。打开游戏室的人还需要100金币才能打开游戏室（否则就没办法开始游戏）。如果你在游戏中输完了金币，那么你会被自动踢出房间！");
        } else if (current == 2) {
            cm.sendNextPrev("每一场记忆大考验都会花费你#100 金币#k。即使你没有#b记忆卡#k，你也可以进入房间玩。然而，如果你没有100金币，那么你无法进入房间。打开游戏室的人还需要100金币才能打开游戏室（否则就没办法开始游戏）。如果你在游戏中用完了金币，那么你会被自动踢出房间！");

        } else if (current == 3) {
            for (var i = 0; i < omok.length; i++)
                text += "\r\n#L"+i+"##b#t"+omok[i]+"##k#l";
            cm.sendSimple(text);
        }

    } else if (status == 4) {
        if (current == 1 || current == 2) {
            cm.sendNextPrev("进入房间，游戏开始，单击#b准备#k。\n" +"\n" +"一旦玩家点击#b准备#k，房间所有者就可以按#b开始#k开始游戏。如果一个不认识的人进来，而你不想和他一起玩，房间主人有权把来访者踢出房间。在那个人的右边会有一个写有x的方形方框。点击它，来一次冰冷的告别，好吗？"); //Oh yeah, because people WALK in Omok Rooms.
        }
        else if (current == 3) {
            if (cm.haveItem(omok1piece[selection], 99) && cm.haveItem(omok2piece[selection], 99) && cm.haveItem(4030009, 1)) {
                cm.gainItem(omok1piece[selection], -omokamount);
                cm.gainItem(omok2piece[selection], -omokamount);
                cm.gainItem(4030009, -1);
                cm.gainItem(omok[selection], 1);
                cm.dispose();
            } else {
                cm.sendNext("#b你是否要制作 #t" + omok[selection] + "##k? 给我对应的材料, 我才能制作。具体材料如下: #r" + omokamount + " #t" + omok1piece[selection] + "#, " + omokamount + " #t" + omok2piece[selection] + "#, 1 #t" + 4030009 + "##k. 怪物可能每隔一段时间就会掉落这些。。。.");
                cm.dispose();
            }
        }

    } else if (status == 5) {
        if (current == 1) {
            cm.sendNextPrev("当第一次开始时，#b房间的主人先去#k。在此之前，你会有一个时间限制，如果你不按时行动，你可能会失去轮到你的机会。通常情况下，3 x 3是不允许的，但如果有一点是绝对有必要把你的棋子放在那里，或者面对结束比赛，那么你可以把它放在那里。3 x 3被允许作为最后一道防线！哦，如果是#r6或7直#k，那就不算了。只有5个！");
        } else if (current == 2)  {
            cm.sendNextPrev("噢，与五子棋不同的是，当你创建记忆大考验游戏室时，你需要根据你在游戏中使用的牌的数量来设置你的游戏。有3种模式可用，3x4、4x5和5x6，分别需要12张、20张和30张卡。请记住，一旦房间打开，您就无法更改它，因此，如果您真的想更改它，您必须关闭该房间并打开另一个房间。");
        }

    } else if (status == 6) {
        if (current == 1) {
            cm.sendNextPrev("如果你下错了，你可以请求#b悔棋#k。如果对手接受了你的请求，那么你和对手的最后一步将被取消。如果你觉得有必要去洗手间，或者长时间休息，你可以申请#b暂停#k。如果对手接受请求，比赛将以平局结束。小贴士：这可能是保持友谊的好方法。");
        } else if (current == 2) {
            cm.sendNextPrev("当第一场比赛开始时，#b房主先走#k注意，你会受到时间限制，如果你不按时行动，你可能会失去轮到你的机会。当你在回合中找到一对匹配的牌时，只要你一直找到一对相匹配的牌，你就可以继续你的回合。运用你的记忆技巧来创造连胜。");
        }
        
    } else if (status == 7) {
        if (current == 1) {
            cm.sendPrev("当下一场比赛开始时，失败者将先上场。此外，任何人都不允许在比赛中途离开。如果你这样做，你可能会#b犯规而导致平局#k。（当然，如果你要求离开，你将输掉比赛。）如果你在比赛中间单击“离开”，你将在比赛结束之后立即离开房间。这将是一个更有用的离开方式。");
        } else if (current == 2) {
            cm.sendNextPrev("如果你和你的对手有相同数量的配对，那么谁的配对次数更长，谁就会获胜。如果你觉得有必要去洗手间，或者长时间休息，你可以申请#b暂停#k。如果对手接受请求，比赛将以平局结束。小贴士：这可能是保持友谊的好方法。");
        }
    } else if (status == 8) {
        if (current == 2) {
            cm.sendPrev("当下一场比赛开始时，失败者将先上场。此外，任何人都不允许在比赛中途离开。如果你这样做，你可能会#b犯规而导致平局#k。（当然，如果你要求离开，你将输掉比赛。）如果你在比赛中间单击“离开”，你将在比赛结束之后立即离开房间。这将是一个更有用的离开方式。");
        }
    }
}  