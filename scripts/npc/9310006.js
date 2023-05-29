
/*
	NPC Name: 		June
	Map(s): 		Kerning Square : 7th Floor 
	Description: 	Entrance to Spirit of Rock
	Depart_topFloorEnter
	request for a new song (block the portal before the spirit)
	composition fee (block the portal before the spirit)
	Say "NO" to Plagiarism (now we can open the portal)
*/
var status = -1;

function start() {
    cm.sendSimple("վס!ǰ�������Σ��!#b\n\r\n#L0#������ս��� #l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
    	if (selection == 0) {
        		var em = cm.getEventManager("wugongBattle");
					if(em.getProperty("state") != null && em.getProperty("state").equals("1")){
						cm.sendOk("�����ս���ڽ��У������ĵȴ���");
					} else if (!em.startInstance(cm.getPlayer())) {
                            cm.sendOk("�����ս���ڽ��У������ĵȴ���");
                    } else {
						cm.sendOk("�뿪ʼ�����ս!");
					}
    			cm.dispose();
    			return;
    	}
    	cm.dispose();
    }
}