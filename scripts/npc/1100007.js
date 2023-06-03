/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

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
			cm.sendNext("��Ȼ������Ȥ�����ټ��ɡ�");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b ʥ�� (1000 ���)#k";
                        }			
                        cm.sendSimple("��Ҫǰ��#rʥ��#k�� ��Ҫ֧�� #b1000#k ��ҡ�\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("��Ľ�Ҳ�����");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090030);
				cm.dispose();
				}
			}
		}
}