/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("�������һλǿ��ĸ߽׷�ʦ��Ҳ��ˣ�����֪�ǻ۵ļ�ֵ���ڣ������˵�Ǻ���һλ��ʦ��͹۵ı�׼����ˣ���ʦר��������һ��Ť�����Թ������б鲼�������Ĺ��졪�������⴦�ռ��У�Ψһ���õ��ƶ��ֶξ���#b�����ƶ�#k�����ڻ����������ļ���Ҳֻ��һ����#bħ��˫��#k������֮�⣬ÿͨ��һ�����Թ�������Ҫ�������������ͨ���������Թ���������ȫ�����˺���Ҫ�����Լ����ǻ��ƶϳ�������ʦ�����в�����Դ֮�ȡ�ף����ˣ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("��쳶��������Ӧ�ñ�������Զ���ǡ�����һλ����������ʦ������������䡢�����Ӧ�ȶ��־�����������ָ�ơ�����֮�⣬������һλ��ͨ����Ԫ�ط����ĸ߽׷�ʦ���������һ�μ�����쳶�ʱ������Ϊ�����������Ǿ��ӵ�����Ѱ���š�Ԫ��ʥ���Ȼ������֮�������˼�������...");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030521) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001257, 1)) {
                                        cm.gainItem(4001257, 1);
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
                        cm.sendOk("�������й��");
                }
                cm.dispose();
        } /* else if (cm.getPlayer().getMapId() == 610030522) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        cm.warp(610030522,0);
                } else {
                        cm.sendOk("�������й��");
                }
                cm.dispose();
        }
        */
}