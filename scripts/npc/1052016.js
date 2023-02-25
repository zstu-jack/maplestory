var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 120000000];
var cost = [1000, 1000, 1000, 800, 800];
var selectedMap = -1;
var mesos;

function start() {
    cm.sendNext("��ã������ǳ����ʿ��������밲ȫ�����ٵĴ�һ�����е�����һ�����У�������ʿ������õ�ѡ�����Ǻ�������ʵ�ݵļ۸��������Ŀ�ĵء�");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("��������Ҳ�кܶ�ɿ��ģ�������Ҫȥ��һ������ʱ�����������ǡ�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0) {
                selStr += "���Ƕ����˴�9��";
            }
            selStr += "ѡ������Ŀ�ĵأ����û���ص���졣#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " ���)#l";
            }
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("��������û�б���¿����������������ȥ #b#m" + maps[selection] + "##k���˴��ó̽����� #b" + (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " ���#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
                mesos = cost[selectedMap] / 10;
            } else {
                mesos = cost[selectedMap];
            }

            if (cm.getMeso() < mesos) {
                cm.sendNext("��û���㹻�Ľ�ҡ��ܱ�Ǹ��ô˵�������û�����ǣ��㽫�޷��������⳵��");
                cm.dispose();
                return;
            }

            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}