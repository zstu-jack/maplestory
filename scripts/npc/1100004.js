/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("好的，如果你改变主意了，请来找我");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            var display = "";
            for (var i = 0; i < menu.length; i++) {
                display += "\r\n#L" + i + "##b 天空之城 #r(1000 金币)#k";
            }
            cm.sendSimple("嗯…今天清风拂面，渡轮定会平平安安。你打算离开#b'天渡'#k去别的地方了吗？这艘渡轮驶向遥远的天空，这边的事务已经忙完了？如果你要去#b天空之城#k，我可以载你过去。\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("额，你没有 #b1000#k 金币吧? 再仔细检查下钱包。");
                cm.dispose();
            } else {
                cm.gainMeso(-1000);
                cm.warp(200090021);
                cm.dispose();
            }
        }
    }
}