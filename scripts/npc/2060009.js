var status = 0;
var menu;
var payment = false;
var atHerbTown = false;

function start() {
    if(cm.getPlayer().getMap().getId() == 251000100) atHerbTown = true;
	
    if (cm.haveItem(4031242)){
		if(atHerbTown)
			menu = "#L0##b我要使用 #t4031242##k 前往 #b#m230030200##k。#l\r\n#L1#支付 #b10,000金币#k 前往 #b#m230000000##k。#l";
		else
			menu = "#L0##b我要使用 #t4031242##k 前往 #b#m230030200##k。#l\r\n#L1#支付 #b10,000金币#k 前往 #b#m251000000##k。#l";
    }else {
		if(atHerbTown)
			menu = "#L0#支付 #b10,000金币#k 前往 #b#m230030200##k。#l\r\n#L1#支付 #b10,000金币#k 前往 #b#m230000000##k。#l";
		else
			menu = "#L0#支付 #b10,000金币#k 前往 #b#m230030200##k。#l\r\n#L1#支付 #b10,000金币#k 前往 #b#m251000000##k。#l";
        payment = true;
    }
    cm.sendSimple ("海洋连接着每一个人。无法步行前往的地方，却可以通过海洋轻易到达。今天要乘坐 #b海豚的士#k ，与我们一同出行吗？\r\n"+menu);
}

function action(mode, type, selection) {
    if (mode < 1) 
        cm.dispose();
    else {
        if (selection == 0) {
            if(payment) {
                if(cm.getPlayer().getMeso() < 1000) {
                    cm.sendOk("你的金币不足...");
                    cm.dispose();
                } else
                    cm.gainMeso(-1000);
            } else
                cm.gainItem(4031242,-1);
            cm.warp(230030200, 2);
            cm.dispose();
            return;
        } else if (selection == 1) {
			 if (cm.getPlayer().getMeso() < 10000) {
				cm.sendOk("你的金币不足...");
				cm.dispose();
				return;
			}else{
				cm.gainMeso(-10000);
				cm.warp(atHerbTown ? 230000000 : 251000100);
			}
		}
        cm.dispose();
    }
}