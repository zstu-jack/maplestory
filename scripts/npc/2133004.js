var status = -1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if(status == 0) {
                    if(!cm.haveItem(4001163) || !cm.isEventLeader()) {
                        cm.sendYesNo("����Ķӳ���������õ�����ɫħ��ʯ�����ҡ�\r\n\r\n#r����Ҫ�����˳���#k�������뿪��ζ��������Ķ��ѣ������ס��");
                    } else {
                        cm.sendNext("�ܺã����õ�����ɫħ��ʯ���һ�Ϊ���ǿ�ʾ #bͨ����̳�ĵ�·#k������ߡ�");
                    }                        
                } else if(status == 1) {
                        if (!cm.haveItem(4001163)) {
                                cm.warp(930000800, 0);
                        } else {
                                cm.getEventInstance().warpEventTeam(930000600);
                        }
                        
                        cm.dispose();
                }
        }
}