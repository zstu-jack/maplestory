/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendAcceptDecline("如果拥有女神的镜子，我就可以重新召唤黑魔法师了！\r\n等等！不对劲！为什么没有召唤成功？等等，这股力量是？我感受到的是...全然不同于黑魔法师的存在啊啊啊啊啊啊!!!!! \r\n\r\n #b(把一只手放在奇拉的肩膀上。)");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.removeNpc(270050100, 2141000);
	cm.forceStartReactor(270050100, 2709000);
    }
    cm.dispose();

// If accepted, = summon PB + Kriston Disappear + 1 hour timer
// If deny = NoTHING HAPPEN
}