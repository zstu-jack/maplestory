/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Joko <Crimsonwood Exchange Quest> - Phantom Forest: Dead Man's Gorge(610010004)
-- By ---------------------------------------------------------------------------------------------
	Ronan Lana
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Ronan Lana
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var eQuestChoices = new Array (4032007, 4032006, 4032009, 4032008, 4032007, 4032006, 4032009, 4032008);

var eQuestPrizes = new Array();

eQuestPrizes[0] = new Array ([1002801,1],  // Raven Ninja Bandana
    [1462052,1],	// Raven's Eye
    [1462006,1], 	// Silver Crow
    [1462009,1],	// Gross Jaeger
    [1452012,1],	// Marine Arund
    [1472031,1],        // Black Mamba
    [2044701,1],        // Claw for ATT 60%
    [2044501,1],        // Bow for ATT 60%
    [3010041,1],        // Skull Throne
    [0, 750000]);       // Mesos
    
eQuestPrizes[1] = new Array ([1332077,1],  // Raven's Beak
    [1322062,1],	// Crushed Skull
    [1302068,1], 	// Onyx Blade
    [4032016,1],        // Tao of Sight
    [2043001,1],        // One Handed Sword for Att 60%
    [2043201,1],        // One Handed BW for Att 60%
    [2044401,1],        // Polearm for Att 60%
    [2044301,1],        // Spear for Att 60%
    [3010041,1],        // Skull Throne
    [0,1250000]);       // Mesos
    
eQuestPrizes[2] = new Array ([1472072,1],   //Raven's Claw
    [1332077,1],	// Raven's Beak
    [1402048,1], 	// Raven's Wing
    [1302068,1],        // Onyx Blade
    [4032017,1],        // Tao of Harmony
    [4032015,1],        // Tao of Shadows
    [2043023,1],        // One-Handed Sword for Att 100%[2]
    [2043101,1],        // One-Handed Axe for Att 60%
    [2043301,1],        // Dagger for Att 60%
    [3010040,1],        // The Stirge Seat
    [0,2500000]);       // Mesos
    
eQuestPrizes[3] = new Array ([1002801,1],   //Raven Ninja Bandana
    [1382008,1],	// Kage
    [1382006,1], 	// Thorns
    [4032016,1],        // Tao of Sight
    [4032015,1],        // Tao of Shadows
    [2043701,1],        // Wand for Magic Att 60%
    [2043801,1],        // Staff for Magic Att 60%
    [3010040,1],        // The Stirge Seat
    [0,1750000]);       // Mesos

eQuestPrizes[4] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[5] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[6] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[7] = new Array ([0,3500000]);	// Mesos

var requiredItem  = 0;
var lastSelection = 0;
var prizeItem     = 0;
var prizeQuantity = 0;
var itemSet;
var qnt;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("嗯……这笔交易对你来说可不算吃亏。找个合适的机会来我这里看看，你可能会买到更好的东西。总之，如果你想买东西了就来找我吧。");
	cm.dispose();
	return;
    }
    
    status++;
    if (status == 0) { // first interaction with NPC
        if(cm.getQuestStatus(8225) != 2) {
            cm.sendNext("喂，我可不是强盗啊。");
            cm.dispose();
            return;
        }
        
	cm.sendNext("嘿，有空吗？我负责在这边收集物品倒卖，但这些日子里怪物们变得越来越难缠，都收不到什么好货了……你呢？你身上有什么好东西可以交易吗？");
    } else if (status == 1) {
	cm.sendYesNo("交易很简单。你拿来我需要的东西，我们就各取所需。不过我得事先说明，我每天都要和许多人打交道，所以用来交易的货物也会随之改变。你觉得如何，还要交易吗？");
    } else if (status == 2) {
	var eQuestChoice = makeChoices(eQuestChoices);
	cm.sendSimple(eQuestChoice);
    } else if (status == 3){
	lastSelection = selection;
	requiredItem = eQuestChoices[selection];
        
        if(selection < 4) qnt = 50;
        else qnt = 25;
        
	cm.sendYesNo("我看看……你想用#b" + qnt + "个 #t" + requiredItem + "##k交换道具对不对？那么在交易之前，要确认自己包裹里有足够的空位可供交换。你想现在交易吗？");
    }else if (status == 4){
	itemSet = (Math.floor(Math.random() * eQuestPrizes[lastSelection].length));
	reward = eQuestPrizes[lastSelection];
	prizeItem = reward[itemSet][0];
	prizeQuantity = reward[itemSet][1];
	if(!cm.haveItem(requiredItem,qnt)){
	    cm.sendOk("你确定包裹里有#b" + qnt + " #t" + requiredItem + "##k吗？不过也可能是你包裹满了，自己看看吧。");
	} else if(prizeItem == 0) {
            cm.gainItem(requiredItem,-qnt);
            cm.gainMeso(prizeQuantity);
            cm.sendOk("用你的#b" + qnt + "个 #t" + requiredItem + "##k，交换了#b" + prizeQuantity + " 金币#k。你觉得怎么样？这笔交易还挺合算的吧。我准备在这里呆一段时间，不管你拿来多少道具，我这边都可以交易...");
        } else if(!cm.canHold(prizeItem)){
	    cm.sendOk("你的包裹满了，没法完成交易。清理一下吧。");
	} else {
	    cm.gainItem(requiredItem,-qnt);
	    cm.gainItem(prizeItem, prizeQuantity);
	    cm.sendOk("用你的#b" + qnt + "个 #t" + requiredItem + "##k，交换了#b" + prizeQuantity + "个 #t" + prizeItem + "##k。你觉得怎么样？这笔交易还挺合算的吧。我准备在这里呆一段时间，不管你拿来多少道具，我这边都可以交易...");
	}
	cm.dispose();
    }
}

function makeChoices(a){
    var result  = "好！那么首先选择一下你要交易的东西吧。你拿来的东西越稀有，我提供的货物成色也就越好。\r\n";
    var qnty = [50, 25];
    
    for (var x = 0; x< a.length; x++){
	result += " #L" + x + "##v" + a[x] + "#  #b#t" + a[x] + "# #kx " + qnty[Math.floor(x/4)] + "#l\r\n";
    }
    return result;
}