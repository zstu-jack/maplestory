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
                cm.sendOk("����һ��������Ӣ��");
                cm.dispose();
            } else if (cm.isQuestCompleted(100006)) {
                cm.sendNext("�һὫ�㴫�ͽ�ȥ������������ռ�30�ź��飬Ȼ������������һλͬ�½�̸���������һ�� #bӢ�۵�֤��#k����֤ʵ���Ѿ�ͨ���˲��ԡ�ף����ˣ�");
                status = 4;
            } else if (cm.isQuestStarted(100006)) {
                cm.sendNext("�Զ��׼������������ #b�ϸ��ֵ¶�#k��������ǧ��������������μ�ħ��ʦ2ת���ԡ��õģ��һ�������Ͳ������ݡ���Ҫ̫����������û����ô���ӡ�");
            } else {
                cm.sendOk("һ����׼�����ˣ��ҿ��Ը�����������ݡ�");
                cm.dispose();
            }
        } else if (status == 1)
            cm.sendNextPrev("�ҽ�����㴫�ͽ�һ�����ص�ͼ����ῴ��ƽ���������Ĺ�����ǿ���������ͨ��һ������״̬��ȫ��ͬ�����ǼȲ��������ľ���ˮƽ��Ҳ����Ϊ���ṩ��Ʒ��");
        else if (status == 2)
            cm.sendNextPrev("���������Щ��������һ����Ϊ #b#t4031013##k ��ʯͷ������һ������Ĵ���ʯ�����������ա�а���˼���Ƴɡ��ռ����е�30����Ȼ��ȥ���ҵ�һ��ͬ��̸̸���������ͨ�����Եķ�ʽ��");
        else if (status == 3)
            cm.sendYesNo("һ�����ȥ�������������֮ǰ���㲻���뿪����������ˣ���ľ���ֵ���½������ԣ���������ó����׼�����ðɣ��������ھͽ�ȥ��");
        else if (status == 4) {
            cm.sendNext("�һὫ�㴫�ͽ�ȥ������������ռ�30�ź��飬Ȼ������������һλͬ�½�̸���������һ�� #bӢ�۵�֤��#k����֤ʵ���Ѿ�ͨ���˲��ԡ�ף����ˣ�");
            cm.completeQuest(100006);
            cm.startQuest(100007);
            cm.gainItem(4031009, -1);
        } else if (status == 5) {
            cm.warp(108000200, 0);
            cm.dispose();
        } else cm.dispose();
    }
}
