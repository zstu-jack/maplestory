var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
	    cm.sendNext("�㣬ע��������֮�������������ڵ��ˡ�", 1);//Dragon Master ����
	} else if (status == 1) {
	    cm.sendNextPrev("ȥ����������ְ��ɡ�����", 1);//����ְҵȺ�ű�����������
	} else if (status == 2) {
	    cm.warp(900090101, 0);
	    cm.dispose();
	}
}