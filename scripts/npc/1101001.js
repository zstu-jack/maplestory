 /* 
	NPC Name: 		Divine Bird
	Map(s): 		Erev
	Description: 		3rd job KoC Buff
*/
importPackage(Packages.constants.game);

function start() {
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("Ϊ����ð�յ�����ʿ����");
    } else {
        cm.sendOk("ð�յ������磬��Ҫ�㲻�ϱ�ǿ���������ػ����ڴ���ɳ�Ϊ���������ػ��ߣ����͡�");
    }
    
    cm.dispose();
}