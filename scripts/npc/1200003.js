/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200003 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Lith Harboor");
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
                                display += "\r\n#L"+i+"##b 明珠港 (800 金币)#k";
                        }			
                        cm.sendSimple("要离开#b里恩#k了吗? 这艘船能带你离开 #b里恩#k 前往 #b明珠港#k 。 只需要支付 #b800#k 金币。 你现在就要出发吗? \r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("额。。。你身上好像不够 #b800#k 金币。无法前往。");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090070);
                                cm.dispose();
                        }
				
                }
        }
}