var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendNext("�ǿ�������������ǰ��˵�����������о���������Ϊ�������û�мǴ�Ļ��� ÿ��һ��ʱ�䣬а���ħ���ͻ���͸�����ֵ�����������������£���Щ��׮�������մ���а�������Ӫ�����ʣ������أ�#b������#k�Ḵ��, ���ǶԸ��������Ǻʹ�ׯ�����˼������в��");
            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
        qm.dispose();
}