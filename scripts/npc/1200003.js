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
			cm.sendNext("�ðɣ�����ı������ˣ���ʱ�����ҡ�");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b ����� (800 ���)#k";
                        }			
                        cm.sendSimple("Ҫ�뿪#b���#k����? ���Ҵ��ܴ����뿪 #b���#k ǰ�� #b�����#k �� ֻ��Ҫ֧�� #b800#k ��ҡ� �����ھ�Ҫ������? \r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("����������Ϻ��񲻹� #b800#k ��ҡ��޷�ǰ����");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090070);
                                cm.dispose();
                        }
				
                }
        }
}