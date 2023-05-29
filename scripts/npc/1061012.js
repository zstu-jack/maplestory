/*
	NPC Name: 		Insiginificant Being
	Map(s): 		Dungeon : Another Entrance
	Description: 		Takes you to another Dimension
*/

function start() {
	if (cm.getQuestStatus(6107) == 1 || cm.getQuestStatus(6108) == 1) {
		var ret = checkJob();
		if (ret == -1) {
			cm.sendOk("请在组队后与我交谈.");
		} else if (ret == 0) {
			cm.sendOk("请确认队伍由2人组成.");
		} else if (ret == 1) {
			cm.sendOk("你的组队成员里有某人职业不符，无法进入异世界.");
		} else if (ret == 2) {
			cm.sendOk("你的组队成员里有某人职业不符，无法进入异世界.");
		} else {
			var em = cm.getEventManager("s4aWorld");
			if (em == null) {
				cm.sendOk("因为未知的原因进入失败,请稍后重试.");
			} else if (em.getProperty("started").equals("true")) {
				cm.sendOk("已经有人先行一步在异世界中尝试挑战蝙蝠怪了.");
			} else {
				var eli = em.getEligibleParty(cm.getParty());
				if (eli.size() > 0) {
					if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
						cm.sendOk("您的队伍已在挑战地图中登记.");
					}
				} else {
					cm.sendOk("您还无法开始这个组队任务.因为组队人数不对,或是组队成员中存在不符合资格的成员,又或者是尚有组队成员没有进入此地图.如果缺少组队成员,请尝试使用组队搜索功能.");
				}
			}
		}
	} else {
		cm.sendOk("因为未知的原因,无法进入异世界.");
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