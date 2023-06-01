var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0){
                        if(cm.getEventInstance().isEventCleared()) {
                                cm.sendOk("喔！居然打败了蝙蝠魔.");
                        } else if(cm.getPlayer().getMap().getCharacters().size() > 1) {
                                cm.sendYesNo("你和你的伙伴都会离开，确定要放弃吗?");
                        } else {
                                cm.sendYesNo("危险，如果你害怕的话，请远离此处。");
                        }
                } else if(status == 1){
                        if(cm.getEventInstance().isEventCleared()) {
                                cm.warp(cm.getMapId() == 105100300 ? 105100301 : 105100401, 0);
                        } else {
                                cm.warp(105100100);
                        }

                        cm.dispose();
                }
        }
}
