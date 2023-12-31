/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100008 Kiru (Orbis Station)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
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
			cm.sendNext("等你改变主意了，再来找我吧。回见！");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b 圣地 (1000 金币)#k";
                        }			
                        cm.sendSimple("你想去#r圣地#k吗？ 请支付 #b1000#k 金币\r\n"+display);

                } else if(status == 1) {
                        if(cm.getMeso() < 1000) {
                                cm.sendNext("抱歉，你没有 #b1000#k 金币，不能前往。 ");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-1000);
                                cm.warp(200090020);
                                cm.dispose();
                        }
                }
        }
}