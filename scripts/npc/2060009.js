var status = 0;
var menu;
var payment = false;
var atHerbTown = false;

function start() {
    if(cm.getPlayer().getMap().getId() == 251000100) atHerbTown = true;
	
    if (cm.haveItem(4031242)){
		if(atHerbTown)
			menu = "#L0##b��Ҫʹ�� #t4031242##k ǰ�� #b#m230030200##k��#l\r\n#L1#֧�� #b10,000���#k ǰ�� #b#m230000000##k��#l";
		else
			menu = "#L0##b��Ҫʹ�� #t4031242##k ǰ�� #b#m230030200##k��#l\r\n#L1#֧�� #b10,000���#k ǰ�� #b#m251000000##k��#l";
    }else {
		if(atHerbTown)
			menu = "#L0#֧�� #b10,000���#k ǰ�� #b#m230030200##k��#l\r\n#L1#֧�� #b10,000���#k ǰ�� #b#m230000000##k��#l";
		else
			menu = "#L0#֧�� #b10,000���#k ǰ�� #b#m230030200##k��#l\r\n#L1#֧�� #b10,000���#k ǰ�� #b#m251000000##k��#l";
        payment = true;
    }
    cm.sendSimple ("����������ÿһ���ˡ��޷�����ǰ���ĵط���ȴ����ͨ���������׵������Ҫ���� #b�����ʿ#k ��������һͬ������\r\n"+menu);
}

function action(mode, type, selection) {
    if (mode < 1) 
        cm.dispose();
    else {
        if (selection == 0) {
            if(payment) {
                if(cm.getPlayer().getMeso() < 1000) {
                    cm.sendOk("��Ľ�Ҳ���...");
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
				cm.sendOk("��Ľ�Ҳ���...");
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