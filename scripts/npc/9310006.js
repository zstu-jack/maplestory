
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
    cm.sendSimple("站住!前面的蜈蚣很危险!#b\n\r\n#L0#我想挑战蜈蚣 #l");
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
						cm.sendOk("蜈蚣挑战正在进行，请耐心等待。");
					} else if (!em.startInstance(cm.getPlayer())) {
                            cm.sendOk("蜈蚣挑战正在进行，请耐心等待。");
                    } else {
						cm.sendOk("请开始你的挑战!");
					}
    			cm.dispose();
    			return;
    	}
    	cm.dispose();
    }
}