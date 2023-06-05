/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Rien");
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
			cm.sendNext("好吧，等你改变主意了，随时来找我。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b 里恩 (800 金币)#k";
                        }
                        cm.sendSimple("你确定要离开#b明珠港#b吗? 这艘船是从 #b明珠港#k 出发，去往 #b里恩#k。 需要支付 #b800#k 金币。 \r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("额。。。你不够 #b800#k 金币。我无法帮到你。");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090060);
                                cm.dispose();
                        }
                }
        }
}