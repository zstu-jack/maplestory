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
			cm.sendNext("��Ȼ�㲻����Ȥ����ô�ټ��ɡ���");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b ������ #r(1000 ���)#k";
                        }			
                        cm.sendSimple("�ˣ�ð���ߡ���Ҫ�뿪'���'���������������������Եط��ˡ��ҿ��Դ���ȥ#b ������#k������֧��#b1000#k ��ң��������㵽�Ƕ�ȥ.\r\n"+display);
		} else if(status == 1) {
                        if(cm.getMeso() < 1000) {
				cm.sendNext("�����û�� #b1000#k ��ҡ����޷������ȥ��");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090031);
				cm.dispose();
                        }
                }
	}
}