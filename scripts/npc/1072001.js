/*
NPC-ħ��ʦתְ�̹�
λ��-101020000
 */
var status;

function start() {
    status = -1;
    action(1, 0, 0);
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

        if (status == 0) {
            if (cm.isQuestCompleted(100007)) {
                cm.sendOk("�����˲���ļһ");
                cm.dispose();
            } else if (cm.isQuestCompleted(100006)) {
                cm.sendNext("�õģ������������ڡ��������Ĺ��ﲢ�ռ�30�ź��飬Ȼ�������λ�������ͬ�ŶԻ���������� #bӢ��֤��#k ��Ϊͨ�����Ե�֤����ף����ˡ�");
                status = 4;
            } else if (cm.isQuestStarted(100006)) {
                cm.sendNext("������������� #b��˹#k���㽻���ҵġ���ô˵������������μ�ħ��ʦ2ת���Եİɡ��õģ��һ�������Ϳ������ݡ���̫���ţ����ݲ����㸴�ӡ�");
            } else {
                cm.sendOk("׼���ú������ҶԻ����һ�������Ϳ������ݡ�");
                cm.dispose();
            }
        } else if (status == 1)
            cm.sendNextPrev("�һ���㴫�ͽ�һ�����ص�ͼ���������һЩƽʱ�ѵ�һ���Ĺ�����ǿ���������ͨ�Ĺ���һ��������ȴ��ȫ��ͬ�����ǼȲ�����㾭�飬Ҳ���������ͨ��Ʒ��");
        else if (status == 2)
            cm.sendNextPrev("���������Щ����ʱ�������м��ʵ��� #b#t4031013##k������һ�֣��ɹ������������ɵ�����ʯ���ռ�30����ת���������������ͬ�ţ���Ϳ���ͨ�����ԡ�");
        else if (status == 3)
            cm.sendYesNo("һ����ȥ���������֮ǰ���޷��뿪���������������������ֵҲ�����...����������г�ֵ�׼��...��ô�����������볡��");
        else if (status == 4) {
            cm.sendNext("�õģ������������ڡ��������Ĺ��ﲢ�ռ�30�ź��飬Ȼ�������λ�������ͬ�ŶԻ���������� #bӢ��֤��#k ��Ϊͨ�����Ե�֤����ף����ˡ�");
            cm.completeQuest(100006);
            cm.startQuest(100007);
            cm.gainItem(4031009, -1);
        } else if (status == 5) {
            cm.warp(108000200, 0);
            cm.dispose();
        } else cm.dispose();
    }
}
