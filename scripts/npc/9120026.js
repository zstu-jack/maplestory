
/*
	Crysta; - Kamuma (Neo Tokyo Teleporter)
*/

function start() {
    switch (cm.getMapId()) {
        case 800040000:
            cm.warp(802000100, 0);
            cm.dispose();
            break;
        case 802000211:
            if (cm.getQuestStatus(4686) == 2) {
                //cm.gainItem(4032181, 100);
                cm.warp(802000212, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);
                cm.forceCompleteQuest(4686);
            }
            cm.dispose();
            break;
        case 802000313:
            if (cm.getQuestStatus(4689) == 2) {
                //cm.gainItem(4032181, 50);
                cm.warp(802000312, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 50);
                cm.forceCompleteQuest(4689);
            }
            cm.dispose();
            break;
        case 802000411:
            if (cm.getQuestStatus(4693) == 2) {
                //cm.gainItem(4032181, 100);
                cm.warp(802000412, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);
                cm.forceCompleteQuest(4693);
            }
            cm.dispose();
            break;
        case 802000611:
            if (cm.getQuestStatus(4696) == 2) {
                //cm.gainItem(4032181, 100);
                cm.warp(802000612, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);
                cm.forceCompleteQuest(4696);
            }
            cm.dispose();
            break;
        case 802000111:
            if (cm.getQuestStatus(4698) == 2) {
                //cm.gainItem(4032181, 100);
                cm.warp(802000112, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);
                cm.forceCompleteQuest(4698);
            }
            cm.dispose();
            break;
        case 802000711:
            if (cm.getQuestStatus(50003) == 2) {
                //cm.gainItem(4032181, 100);
                cm.warp(802000712, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);
                cm.forceCompleteQuest(50003);
            }
            cm.dispose();
            break;
        case 802000821:
            if (cm.getQuestStatus(50016) == 2) {
                //cm.gainItem(4032181, 100);
                cm.gainItem(4032361, 1);
                cm.warp(802000820, 0);
            } else {
                cm.showEffect(false, "quest/party/clear");
                cm.playSound(false, "Party1/Clear");
                //cm.gainItem(4032181, 100);

                cm.forceCompleteQuest(50016);
            }
            cm.dispose();
            break;
        default:
		var texx = ""
		texx += "嗨~ 我是水晶，需要我帮忙(从#b#m800040000##k可以进入逆奥之城)？ \r\n";
		texx += "#b#L0##m802000200##l \r\n";
		texx += "#b#L1##m802000300##l \r\n";
		texx += "#b#L2##m802000500##l \r\n";
		texx += "#b#L3##m802000600##l \r\n";
		texx += "#b#L5##m802000700##l \r\n";
		texx += "#b#L7##m802000820##l \r\n";
		//texx += "#b#L6##m800040000##l \r\n";
		//texx += "#b#L17##m800040401##l \r\n";
            cm.sendSimple(texx);
            break;
    }
}

function action(mode, type, selection) {
    if (selection != 6 && selection!= 17) {

        var questid = true,
            mapid = 0,
            portal = 0;

        switch (selection) {
            case 0:
                questid = cm.getQuestStatus(4682) == 2;
                mapid = 802000200;
                portal = 2;
                break;
            case 1:
                questid = cm.getQuestStatus(4687) == 2;
                mapid = 802000300;
                portal = 0;
                break;
            case 2:
                questid = cm.getQuestStatus(4690) == 2;
                mapid = 802000500;
                portal = 0;
                break;
            case 3:
                questid = cm.getQuestStatus(4694) == 2;
                mapid = 802000600;
                portal = 0;
                break;
            case 5:
                questid = cm.haveItem(1142103);
                mapid = 802000700;
                portal = 0;
                break;
            case 7:
                questid = cm.haveItem(1142103);
                mapid = 802000820;
                portal = 0;
                break;
        }
        if (questid && mapid > 0) {
            cm.warp(mapid, portal);
        } else {
            cm.sendOk("你无法穿越此处强大的力场。");
        }
    }else {
		if( selection == 17){
			if(cm.getPlayer().getMeso() < 1000000){
				cm.sendOk("需要费用100万,请检查背包。");
			} else {
				cm.gainMeso(-1000000);
				cm.warp(800040401);
			}
		}else if( selection == 6){
			cm.warp(800040000,0);
		}
    }

    cm.dispose();
}