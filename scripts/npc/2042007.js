/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Jayd - translated CPQ contents to English
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var rnk = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("Alright then, I hope we can chat later next time.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if (cm.getPlayer().getMapId() == 980030010) {
            if (status == 0) {
                cm.sendNext("ϣ�����ڹ�����껪����ÿ��ģ�");
            } else if (status > 0) {
                cm.warp(980030000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("���ź�����Ȼ����ֳ��ڣ�������ȡ����ƽ�ֻ�����˱������´�Ŭ��ȡʤ�ɣ�\r\n\r\n#b��������ǣ�" + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("���ź�����Ȼ����ֲ���������ȡ����ƽ�ֻ�����˱������������΢Ŭ��һ�㣬ʤ���Ϳ��������㣡\r\n\r\n#b��������ǣ�" + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("���ź�����ȡ����ƽ�ֻ�����˱�����ʤ�����ڷ�ս���׵��ˡ����п������Ŭ����ʤ��������Բ���ң���ɼ�������Ŭ���ɣ�\r\n\r\n#b��������ǣ�" + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("���ź�����ȡ����ƽ�ֻ�����˱�������ı��ֺ��ܹ�˵�����⡣ϣ�����´θ���Ŭ����\r\n\r\n#b��������ǣ�" + shiu);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 10:
                        cm.warp(980030000, 0);
                        cm.gainExp(35000);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980030000, 0);
                        cm.gainExp(25000);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980030000, 0);
                        cm.gainExp(12500);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980030000, 0);
                        cm.gainExp(3500);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("��ϲ��ȡ����ʤ����Ӯ������Ư�����Է����޻���֮�������ڴ����´�Ҳ����ͬ����ɫ�ı��֣�\r\n\r\n#b��������ǣ�" + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("��ϲ��ȡ����ʤ����̫���ˣ����ڶԿ��б��ֵúܺã�����ٸ���һ��ʱ�䣬��һ����ε�ͷ��ģ��´�һ��û���⣡\r\n\r\n#b��������ǣ�" + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("��ϲ��ȡ����ʤ������Ҳ����һЩ���ף������Ⲣ����������ʤ�����ڴ����´����и��õı��֡�\r\n\r\n#b��������ǣ�" + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("��ϲ��ȡ����ʤ������Ȼ��ı��ֲ��䲻���ⳡʤ�����´ι�����껪��Ҫ���ֵø��ӻ�Ծ���У�\r\n\r\n#b��������ǣ�" + shi);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 1:
                        cm.warp(980030000, 0);
                        cm.gainExp(875000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980030000, 0);
                        cm.gainExp(700000);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980030000, 0);
                        cm.gainExp(555000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980030000, 0);
                        cm.gainExp(100000);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        }
    }
}  