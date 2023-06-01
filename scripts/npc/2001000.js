/*
 *  Cliff - Happy Ville NPC
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status > 0) {
	    status--;
	} else {
	    cm.dispose();
	    return;
	}
    }
    if (status == 0) {
	cm.sendNext("你看到周围这些堆好的雪人了吗？去找它们中的一个谈谈，它会带你前往胜地观赏这儿有名的巨大圣诞树。大家用各种各样的装饰物装点那棵树。怎么样，很有趣吧？");
    } else if (status == 1) {
	cm.sendNextPrev("每次只有6名角色同时入场，在里面#b不能交易或开启个人商店#k。扔出的装饰物只能由本人捡起，所以完全不必担心你的装饰品遗失的问题。");
    } else if (status == 2) {
	cm.sendNextPrev("当然，在那里，丢在地上的物品永远不会消失。如果你通过雪人离开，所有的装饰物都会回到你的背包里。所以不必在离开地图前一件件将它们捡回背包。是不是很贴心？");
    } else if (status == 3) {
	cm.sendPrev("那么。去找 #p2002001#吧，买一些圣诞装饰物, 然后用它们装点圣诞树~ 棒极了！不过最大、最漂亮的装饰物是不能从他那里买到的。它们或许...被什么怪物拿走了...嗯...");
	cm.dispose();
    }
}