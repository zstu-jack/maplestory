/* Author: aaroncsn <MapleSea Like, Incomplete, Needs skin id>
	NPC Name: 		Laila
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Skin Care Specialist
*/

var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("����~��ӭ����ӭ����ӭ����ӭ�������ﰲ�ػ������ġ���������һ�Һպ������Ļ������ģ�����Ů������Ҳ�г���ˡ�������� #b���ﰲ�ػ������Ļ�Ա��#k �Ļ���ʣ�µ�����ͽ��������ˡ���Ҫ��������Ϊ���ṩ����������");
		} else if (status == 1) {
			cm.sendStyle("ʹ�����������ҽ����е������Ԥ������Ч������ϲ�����ַ�ɫ��ѡ��һ����ϲ���ķ��ɡ�", skin);
		} else if (status == 2){
			cm.dispose();
			if (cm.haveItem(5153007) == true){
				cm.gainItem(5153007, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("���ˣ�����������̾����·�ɫ�ɣ�");
			} else {
				cm.sendNext("�ܱ�Ǹ�����û�л�����Ա���Ļ������޷�Ϊ�����");
			}
		}
	}
}