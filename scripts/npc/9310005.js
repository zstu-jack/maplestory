/* ==================
 �ű�����: NPC    
 �ű���Ȩ��һ�ߺ��Ŷ�-ά��
 ��ϵ�ۿۣ�297870163
 =====================
 */
var wupdm = 4000194;//��Ʒ����
var wupsl = 50;//��Ʒ����
function start() {
    cm.sendYesNo("��ȷ����Ҫʹ��"+wupsl+"��#v"+wupdm+"##z"+wupdm+"#����#rͨ��#k��");
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.sendOk("��... �������㲢û��׼���á�");
	cm.dispose();
	} else if (!cm.haveItem(wupdm, wupsl)) {
       cm.sendOk("��û��"+wupsl+"��#v"+wupdm+"##z"+wupdm+"#!");
       cm.dispose();
	} else {
	cm.gainItem(wupdm, -wupsl);
    cm.warp(701010322, "sp");	
    cm.dispose();
    }
}