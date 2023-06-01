var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;

	if(status == 0){
                cm.sendGetText("将通行证插入后，门有了反应。#b请输入密码#k。");
	}
	else if(status == 1){
                if(cm.getText() == cm.getQuestProgress(3360)){
                        cm.setQuestProgress(3360, 1);
                        cm.getPlayer().announce(Packages.tools.MaplePacketCreator.playPortalSound());
                        cm.warp(261030000, "sp_" + ((cm.getMapId() == 261010000) ? "jenu" : "alca"));
                }
                else {
			cm.sendOk("#r密码错误。");
		}
                
                cm.dispose();
	}
}