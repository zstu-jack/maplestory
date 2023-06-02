/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Victoria Island");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("既然你不感兴趣，那么再见吧。。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b 金银岛 #r(1000 金币)#k";
                        }			
                        cm.sendSimple("嗨，冒险者。你要离开'天渡'了嘛？如果是这样，那你来对地方了。我可以带你去#b 金银岛#k。。。支付#b1000#k 金币，我能送你到那儿去.\r\n"+display);
		} else if(status == 1) {
                        if(cm.getMeso() < 1000) {
				cm.sendNext("你好像没有 #b1000#k 金币。我无法送你过去。");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090031);
				cm.dispose();
                        }
                }
	}
}