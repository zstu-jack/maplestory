

var status = 0;
var ticketSelection = -1;
var text = "这里是检票口.";
var hasTicket = false;
var NLC = false;
var em;

function start() {
	cm.sendSimple("请选择你的目的地.\n\r\n#L0##b废都广场购物中心#l\n\n\r\n#L1#进入工地#l\r\n#L2#新叶城#l");
}

function action(mode, type, selection) {
    em = cm.getEventManager("地铁");
    
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
                    cm.sendOk("乘客已满，请等待下一班列车。");
                }
                
        	cm.dispose();
        	return;
        } else if (selection == 1) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += "我们承诺将您迅速安全地运往目的地，现在要检票吗？#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("你好像没有车票？");
            	cm.dispose();
            	return;
            }
        } else if (selection == 2) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("没有车票，无法乘车。请从贝尔处购买车票.");
	    		cm.dispose();
	    		return;
        	}
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("这趟列车看起来有足够的空间，请准备好您的车票。旅程可能会有些稍微有些漫长，但您会按时到达目的地。怎么样？你想要乘车吗？");
            } else {
                cm.sendNext("列车将在一分钟内出发，请耐心等待下一班车。出发前一分钟会准时停止检票，届时请准时搭乘。");
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
                cm.sendNext("列车将在一分钟内出发，请耐心等待下一班车。出发前一分钟会准时停止检票，届时请准时搭乘。");
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