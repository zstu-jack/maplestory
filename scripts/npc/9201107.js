/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("�κ��˶�����ͨ�����������þ��˵���������������һλ������սʿ���ڲ�֮ͬ���������Ǹ��������־������ʤ���С�����Ƕ����ֵ��ף�ֱ��ʤ������������ǰ������ˣ�սʿר���������һ������֮·���������ԭ���ͻ�ʹսʿ�������⣬������˵���л������ǿ���Ĺ��������ļ��ɰ��Ѹ���״̬���������еĹ��ǰ��սʿ��������֮������ȡ��ʦ֮���ɡ�ף����ˡ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("����������һ֧����Ӣ�ۼ��壬�����洴���˽ٷ������������Ѫ���Ǳ�Ѱ����ÿһλ���ᶼ��ȫ�̳��������ս�����ɡ�����������������Ϊ���������ϣ�����֮�ͣ��������ĺ����Ƕ�ӵ�н�������Ĺ����ֶΣ������ڻ�������ǲ��Է��棬û���κε�����ʤ������һ������κ�һ�������������֮�¶�����Ȼʧɫ��");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030510) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001259, 1)) {
                                        cm.gainItem(4001259, 1);
                                        cm.sendOk("���úá�");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("��Ҫ�ȿճ�һ����������");
                                }
                        } else {
                                cm.sendOk("��������е������Ѿ���ȡ���ˡ�");
                        }
                } else {
                        cm.sendOk("��������糺��ػ��ߡ�");
                }
                cm.dispose();
        }
}