/**
 *9201100 - Taggrin
 *@author Ronan
 */
 
function start() {
    if(cm.getQuestStatus(8224) == 2) {
        cm.sendOk("�һᣬ�ҵ��ֵܡ��������Ҫ���ǵİ�����������֮�е�ĳ�˶Ի��Ϳ����ˡ�");
    } else {
        cm.sendOk("��ã�İ���ˡ���Ҳ����˵�����ǡ���һ֧�������ͽ����ˣ�ѻצ���塣���Ҿ������ǵ����졣");
    }
    
    cm.dispose();
}
