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
			cm.sendNext("����ı������ˣ��������Ұɡ��ؼ���");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b ʥ�� (1000 ���)#k";
                        }			
                        cm.sendSimple("����ȥ#rʥ��#k�� ��֧�� #b1000#k ���\r\n"+display);

                } else if(status == 1) {
                        if(cm.getMeso() < 1000) {
                                cm.sendNext("��Ǹ����û�� #b1000#k ��ң�����ǰ���� ");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-1000);
                                cm.warp(200090020);
                                cm.dispose();
                        }
                }
        }
}