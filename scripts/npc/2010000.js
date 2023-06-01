/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Master Sergeant Fox <Orbis Exchange Quest> - Orbis(200000000)
-- By ---------------------------------------------------------------------------------------------
	Sean360
-- Version Info -----------------------------------------------------------------------------------
	1.2 - Clean-up
        1.1 - Official Text [Information]
	1.0 - First Version by Sean360
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var eQuestChoices = new Array (4000073,4000059,4000060,4000061,4000058,
    4000062,4000048,4000049,4000055,4000056,
    4000051,4000052,4000050,4000057,4000053,
    4000054,4000076,4000078,4000081,4000070,
    4000071,4000072,4000069,4000079,4000080);

var eQuestPrizes = new Array();

eQuestPrizes[0] = new Array ([2000001,20],  // Orange Potions
    [2010004,10],	// Lemons
    [2000003,15], 	// Blue Potions
    [4003001,15],	// Processed Wood
    [2020001,15],	// Fried Chickens
    [2030000,15]);	// Nearest Town Scroll
eQuestPrizes[1] = new Array ([2000003,20],	// Blue Potions
    [2000001,30],	// Orange Potions
    [2010001,40],	// Meats
    [4003001,20],	// Processed Wood
    [2040002,1]);	// 10% Helm Def
eQuestPrizes[2] = new Array ([2000002,25],	// White Potions
    [2000006,10],	// Mana Elixir
    [2022000,5],	// Pure Water
    [4000030,15],	// Dragon Skins
    [2040902,1]);	// 10% Shield Def
eQuestPrizes[3] = new Array ([2000002,30],	// White Potions
    [2000006,15],	// Mana Elixir
    [2020000,20],	// Salad
    [4003000,5],	// Screws
    [2041016,1]);	// 10% Cape Int
eQuestPrizes[4] = new Array ([2000002,15],	// White Potions
    [2010004,15],	// Lemons
    [2000003,25],	// Blue Potions
    [4003001,30],	// Processed Wood
    [2040302,1]);	// 10% Earring Int
eQuestPrizes[5] = new Array ([2000002,30],	// White Potions
    [2000006,15],	// Mana Elixir
    [2020000,20],	// Salad
    [4003000,5],	// Screws
    [2040402,1]);	// 10% Top Def
eQuestPrizes[6] = new Array ([2000002,30],	// White Potions
    [2020000,20],	// Salad
    [2000006,15],	// Mana Elixir
    [4003000,5],	// Screws
    [2040402,1]);	// 10% Top Def
eQuestPrizes[7] = new Array ([2000006,25],	// Mana Elixir
    [2020000,20],	// Salad
    [4020000,7],	// Garnet Ore
    [4020001,7],	// Amethyst Ore
    [4020002,3],	// Aquamarine Ore
    [4020007,2],	// Diamond Ore
    [2040708,1]);	// 10% Shoe Speed
eQuestPrizes[8] = new Array ([2020005,30],	// Hotdogs
    [2020006,15],	// Hotdog Supremes
    [2022001,30],	// Red Bean Soup
    [4003003,1],	// Fairy Wing
    [2040505,1]);	// 10% O/All Def
eQuestPrizes[9] = new Array ([2000006,25],	// Mana Elixir
    [4020005,7],	// Sapphire Ore
    [4020003,7],	// Emerald Ore
    [4020004,7],	// Opal Ore
    [4020008,2],	// Black Crystal Ore
    [2040802,1]);	// 10% Glove Dex
eQuestPrizes[10] = new Array   ([2002004,15],	// Warrior Potion
    [2002005,15],	// Sniper Potion
    [2002003,15],	// Wizard Potion
    [4001005,1],	// Ancient Scroll
    [2040502,1]);	// 10% O/All Dex
eQuestPrizes[11] = new Array   ([2000006,20],	// Mana Elixir
    [4010004,7],	// Silver Ore
    [4010003,7],	// Adamantium Ore
    [4010005,7],	// Orihalcon Ore
    [4003002,1],	// Piece of Ice
    [2040602,1]);	// 10% Bottom Def
eQuestPrizes[12] = new Array   ([2000006,20],	// Mana Elixir
    [4010002,7],	// Mithril Ore
    [4010001,7],	// Steel Ore
    [4010000,7],	// Bronze Ore
    [4010006,2],	// Gold Ore
    [4003000,5],	// Screwa
    [2040702,1]);	// 10% Shoe Dex
eQuestPrizes[13] = new Array   ([2000006,20],	// Mana Elixir
    [4010004,7],	// Silver Ore
    [4010005,7],	// Orihalcon Ore
    [4010006,3],	// Gold Ore
    [4020007,2],	// Diamond Ore
    [4020008,2],	// Black Crystal Ore
    [2040705,1]);	// 10% Shoe Jump
eQuestPrizes[14] = new Array   ([2000006,30],	// Mana Elixir
    [4020006,7],	// Topaz Ore
    [4020008,2],	// Black Crystal Ore
    [4020007,2],	// Diamond Ore
    [2070010,1],	// Icicle Stars
    [2040805,1]);   // 10% Glove Attack
eQuestPrizes[15] = new Array   ([2000006,30],   // Mana Elixir
    [4020006,7],	// Topaz Ore
    [4020008.2],	// Black Crystal Ore
    [4020007,2],	// Diamond Ore
    [2041020,1]);	// 10% Cape Dex
eQuestPrizes[16] = new Array   ([2000001,30],	// Orange Potions
    [2000003,20],	// Blue Potions
    [4003001,20],	// Processed Wood
    [2010001,40],	// Meats
    [2040002,1]);	// 10% Helm Def
eQuestPrizes[17] = new Array   ([2000002,15],	// White Potions
    [2000003,25],	// Blue Potions
    [2010004,15],	// Lemons
    [2050004,15],	// Divine Elixir
    [4003001,30],	// Processed Wood
    [2040302,1]);	// 10% Earring Int
eQuestPrizes[18] = new Array   ([2000006,25],	// Mana Elixir
    [2020006,25],	// Hotdog Supreme
    [4010004,8],	// Silver Ore
    [4010005,8],	// Orihalcon Ore
    [4010006,3],	// Gold Ore
    [4020007,2],	// Diamond Ore
    [4020008,2],	// Black Crystal Ore
    [2040705,1]);	// 10% Shoe Jump
eQuestPrizes[19] = new Array   ([2000002,30],	// White Potions
    [2020000,20],	// Salad
    [2000006,15],	// Mana Elixir
    [4003000,5],	// Screws
    [2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[20] = new Array   ([2000002,30],	// White Potions
    [2020000,20],	// Salad
    [2000006,15],	// Mana Elixir
    [4003000,5],	// Screws
    [2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[21] = new Array   ([2000002,30],	// White Potions
    [2020000,20],	// Salad
    [2000006,15],	// Mana Elixir
    [4003000,5],	// Screws
    [2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[22] = new Array   ([2000006,20],	// Mana Elixir
    [2020005,30],	// Hotdogs
    [2020006,15],	// Hotdog Supremes
    [2050004,20],	// Divine Elixirs
    [4003003,1],	// Fairy Wing
    [2041002,1]);	// 10% Cape Mag Def
eQuestPrizes[23] = new Array   ([2000006,25],	// Mana Elixir
    [2050004,50],	// Divine Elixir
    [2022001,35],	// Red Bean Soup
    [4020000,8],	// Garnet Ore
    [4020001,8],	// Amethyst Ore
    [4020002,8],	// Aquamarine Ore
    [4020007,2],	// Diamond Ore
    [2041023,1]);	// 10% Cape LUK
eQuestPrizes[24] = new Array   ([2000006,35],	// Mana Elixir
    [4020006,9],	// Topaz Ore
    [4010008,4],	// Black Crystal Ore
    [4020007,4],	// Diamond Ore
    [2041008,1]);   // 10% Cape HP
var requiredItem  = 0;
var lastSelection = 0;
var prizeItem     = 0;
var prizeQuantity = 0;
var itemSet;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("嗯...这对你来说应该是笔划算的交易。在合适的时间来找我交易，得到的道具或许会更好。不管怎么说，等你改变了主意，就来找我吧。");
	cm.dispose();
	return;
    }
    
    status++;
    if (status == 0) { // first interaction with NPC
	cm.sendNext("你想找我交换物品？好，我的工作就是在这里收集物品然后在其他地方出售，但是这些天怪物变得更加活跃，所以很难获得优质的道具...怎么样，你想要和我做生意吗？");
    } else if (status == 1) {
	cm.sendYesNo("交易流程很简单，我们各取所需。不过，由于我会和很多人做生意，所以每次提供用来交换的货物也各不相同。同意的话我们就开始吧。");
    } else if (status == 2) {
	var eQuestChoice = makeChoices(eQuestChoices);
	cm.sendSimple(eQuestChoice);
    } else if (status == 3){
	lastSelection = selection;
	requiredItem = eQuestChoices[selection];
	cm.sendYesNo("让我看看，你想要用你的 #b100个 #t" + requiredItem + "##k 来兑换物品吧？兑换前请确保你的消耗栏和其它栏各有至少1格空位。");
    }else if (status == 4){
	itemSet = (Math.floor(Math.random() * eQuestPrizes[lastSelection].length));
	reward = eQuestPrizes[lastSelection];
	prizeItem = reward[itemSet][0];
	prizeQuantity = reward[itemSet][1];
	if(!cm.haveItem(requiredItem,100)){
	    cm.sendOk("嗯... 你确定你有 #b100个 #t" + requiredItem + "##k吗？如果背包满了，也有可能无法交易。");
	} else if(!cm.canHold(prizeItem)){
	    cm.sendOk("你的消耗栏或其它栏已满。请清理背包后来找我交易。");
	} else {
	    cm.gainItem(requiredItem,-100);
	    cm.gainExp(500 * cm.getPlayer().getExpRate());
	    cm.gainItem(prizeItem, prizeQuantity);
	    cm.sendOk("我用#b"+prizeQuantity+" #t"+prizeItem+"##k来交换了你的 #b100个 #t"+requiredItem+"##k。怎么样，喜欢我的货物吗？\r\n如果觉得交易公道，欢迎下次光临。我会在这里等你。");
	}
	cm.dispose();
    }
}

function makeChoices(a){
    var result  = "好的！首先你需要选择用来交易的物品。物品质量越好，我也更有可能用更高价值的道具来交易。\r\n";
    for (var x = 0; x< a.length; x++){
	result += " #L" + x + "##v" + a[x] + "#  #t" + a[x] + "##l\r\n";
    }
    return result;
}