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
            cm.sendNext("�õģ������ı������ˣ���������");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            var display = "";
            for (var i = 0; i < menu.length; i++) {
                display += "\r\n#L" + i + "##b ���֮�� #r(1000 ���)#k";
            }
            cm.sendSimple("�š����������棬���ֶ���ƽƽ������������뿪#b'���'#kȥ��ĵط��������Ҷ���ʻ��ңԶ����գ���ߵ������Ѿ�æ���ˣ������Ҫȥ#b���֮��#k���ҿ��������ȥ��\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("���û�� #b1000#k ��Ұ�? ����ϸ�����Ǯ����");
                cm.dispose();
            } else {
                cm.gainMeso(-1000);
                cm.warp(200090021);
                cm.dispose();
            }
        }
    }
}