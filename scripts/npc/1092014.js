var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 103000000];
var cost = [1000, 1000, 1000, 800, 1000];
var selectedMap = -1;

function start() {
    cm.sendNext("��ã�������ŵ����˹�Ƴ̳����������Ҫ��ȫ��ݵ�ǰ���������򣬾�ʹ�����ǵķ���ɡ�֧�����Ѻ����ǻ�׼ʱ�����ʹ�Ŀ�ĵء�");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("���ﻹ�кܶ�ط����Թ䡣������Ҫȥ��ͬ�ĳ����ʱ�򣬻�ӭ��ʱ�����ҡ�");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "����ʹ��ʱ������90%�������ۿۡ�";
            selStr += "��ѡ��Ŀ�ĵأ����û����Ŀ�ĵصĲ�ͬ�������仯��#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " mesos)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("��������������Ѿ���������ǰ�� #b#m" + maps[selection] + "##k �Ļ��������� #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " ���#k��");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("��Ҳ��㣬�޷���˼Ƴ̳���");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}