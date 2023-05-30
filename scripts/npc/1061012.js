/*
	NPC Name: 		Insiginificant Being
	Map(s): 		Dungeon : Another Entrance
	Description: 		Takes you to another Dimension
*/

function start() {
	if (cm.getQuestStatus(6107) == 1 || cm.getQuestStatus(6108) == 1) {
		var ret = checkJob();
		if (ret == -1) {
			cm.sendOk("������Ӻ����ҽ�̸.");
		} else if (ret == 0) {
			cm.sendOk("��ȷ�϶�����2�����.");
		} else if (ret == 1) {
			cm.sendOk("�����ӳ�Ա����ĳ��ְҵ�������޷�����������.");
		} else if (ret == 2) {
			cm.sendOk("�����ӳ�Ա����ĳ��ְҵ�������޷�����������.");
		} else {
			var em = cm.getEventManager("s4aWorld");
			if (em == null) {
				cm.sendOk("��Ϊδ֪��ԭ�����ʧ��,���Ժ�����.");
			} else if (em.getProperty("started").equals("true")) {
				cm.sendOk("�Ѿ���������һ�����������г�����ս�������.");
			} else {
				var eli = em.getEligibleParty(cm.getParty());
				if (eli.size() > 0) {
					if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
						cm.sendOk("���Ķ���������ս��ͼ�еǼ�.");
					}
				} else {
					cm.sendOk("�����޷���ʼ����������.��Ϊ�����������,������ӳ�Ա�д��ڲ������ʸ�ĳ�Ա,�ֻ�����������ӳ�Աû�н���˵�ͼ.���ȱ����ӳ�Ա,�볢��ʹ�������������.");
				}
			}
		}
	} else {
		cm.sendOk("��Ϊδ֪��ԭ��,�޷�����������.");
	}

	cm.dispose();
}

function action(mode, type, selection) {
}

function checkJob() {
	var party = cm.getParty();

	if (party == null) {
		return -1;
	}
	//    if (party.getMembers().size() != 2) {
	//	return 0;
	//    }
	var it = party.getMembers().iterator();

	while (it.hasNext()) {
		var cPlayer = it.next();

		if (cPlayer.getJobId() == 312 || cPlayer.getJobId() == 322 || cPlayer.getJobId() == 900) {
			if (cPlayer.getLevel() < 120) {
				return 2;
			}
		} else {
			return 1;
		}
	}
	return 3;
}