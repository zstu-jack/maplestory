/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("һ�ִ�˵�е���������ǰ���ȴ����㣬��ǰ���Ǳ���Ϊ��ʦ���������������������糺��ػ��������������飬���������ֻ�ᱻ�����Ƿ��ļ�ʸ���ˣ��������ħ������ǹ����������ͳͳ��Ч����Ϊ�����֣���Ψһ�������������������Ϊ���ˡ�������һ�������뵽��Ϊǿ���Ĺ�������������#b��ɨ��#k��#b��͸��#k�ֻ�����#b�������#kȥ�ݻ����ǿ������ǰ�������ֵ�������֮������ȡ����֮���ɡ�ף����ˡ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("��������ΨһһλΪ������֪��ʥ���֣�ͬʱҲ��糺�Ҫ����������Ӣ��֮һ���ر�ֵ��һ����������õİ׽����ļ�ͷ����˵����һλǿ���Ů����ף���������ڼ�Զ�ľ����⾫ȷ����׼Ŀ�꣬�������ľ�������Դ֮ʸ���͡�����֮�ˡ����ܾ�η����˵�����Ӣ�۹���ֻ��һ������������ֻ��ᡣ");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030540) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001258, 1)) {
                                        cm.gainItem(4001258, 1);
                                        ������cm.sendOk("���úá�");
                                        
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