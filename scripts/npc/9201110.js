/* @Author SharpAceX
*/

function start() {
	switch(cm.getPlayer().getMapId()) {
		case 610030500:
        		cm.sendOk("ÿһλ��������֪��������Ĺ�����Զ���������벻���ķ�λ��������ר������ܺõ�ڹ������һ�㣬���������Ҫ��ƽ̨��ᵵ֮����ת��Ų�����ٵִ�ȫ��֮�����ڴ����ö̵�����ȭ���������ǡ��ȵ�ȫ��֮�۾�������󣬿����������񣬴���ȡ��ԭ��֮צ��ף����ˡ�");
			break;
		case 610030000:
			cm.sendOk("����ʦһ�ȱ���Ϊ��Ӱ���ߡ������ܹ����ö̵�����צ����սʱ����ٶ���������ż������Զ���ӵľ���ȴ�����������룬�������ױȵ��������������������������Ĵ�˵����糺�ħ�����ս�дﵽ�˶��壬�ⳡս���У�糺�֮��Х���ų��Թ�����Ȼ��������������ȴֻ�Ƕ��ſ���ͽ���޹��ػ�ȭ���ѡ���������Щ���벻�ҵ�ͬ�ţ���Ҳ�����������Ԯ�֡�");
			break;
		case 610030530:
			if (cm.isAllReactorState(6108004, 1)) {
                                var eim = cm.getEventInstance();
                                var stgStatus = eim.getIntProperty("glpq5_room");
                                var jobNiche = cm.getPlayer().getJob().getJobNiche();

                                if ((stgStatus >> jobNiche) % 2 == 0) {
                                        if(cm.canHold(4001256, 1)) {
                                                cm.gainItem(4001256, 1);
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
				cm.sendOk("ȥ�ɣ����������������֣��ݻ�����ȫ��֮�ۡ�");
			}
			break;
	}
	cm.dispose();
}