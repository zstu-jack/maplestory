

var status = 0;
var ticketSelection = -1;
var text = "�����Ǽ�Ʊ��.";
var hasTicket = false;
var NLC = false;
var em;

function start() {
	cm.sendSimple("��ѡ�����Ŀ�ĵ�.\n\r\n#L0##b�϶��㳡��������#l\n\n\r\n#L1#���빤��#l\r\n#L2#��Ҷ��#l");
}

function action(mode, type, selection) {
    em = cm.getEventManager("����");
    
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		var em = cm.getEventManager("KerningTrain");
                if (!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("�˿���������ȴ���һ���г���");
                }
                
        	cm.dispose();
        	return;
        } else if (selection == 1) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += "���ǳ�ŵ����Ѹ�ٰ�ȫ������Ŀ�ĵأ�����Ҫ��Ʊ��#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("�����û�г�Ʊ��");
            	cm.dispose();
            	return;
            }
        } else if (selection == 2) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("û�г�Ʊ���޷��˳�����ӱ���������Ʊ.");
	    		cm.dispose();
	    		return;
        	}
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("�����г����������㹻�Ŀռ䣬��׼�������ĳ�Ʊ���ó̿��ܻ���Щ��΢��Щ�����������ᰴʱ����Ŀ�ĵء���ô��������Ҫ�˳���");
            } else {
                cm.sendNext("�г�����һ�����ڳ����������ĵȴ���һ�೵������ǰһ���ӻ�׼ʱֹͣ��Ʊ����ʱ��׼ʱ��ˡ�");
                cm.dispose();
                return;
            }
        }
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(103000897 + (ticketSelection * 3), "st00");  // thanks IxianMace for noticing a few scripts having misplaced warp SP's
                hasTicket = false;
                cm.dispose();
                return;
            }
    	}
        
	if (cm.haveItem(4031711)) {
            if(em.getProperty("entry") == "false") {
                cm.sendNext("�г�����һ�����ڳ����������ĵȴ���һ�೵������ǰһ���ӻ�׼ʱֹͣ��Ʊ����ʱ��׼ʱ��ˡ�");
            }
            else {
                cm.gainItem(4031711, -1);
                cm.warp(600010004);
            }
            
            cm.dispose();
            return;
        }
    }
}