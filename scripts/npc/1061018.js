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
                                cm.sendOk("哇哦，居然打败了蝙蝠怪。");//之前说过这里是蝙蝠怪
                        } else if(cm.getPlayer().getMap().getCharacters().size() > 1) {
                                cm.sendYesNo("确定要离开这场战斗，丢下你的同伴独自面对吗？");//Are you really going to leave this battle and leave your fellow travelers to die?
                        } else {
                                cm.sendYesNo("如果你是个胆小鬼，就从这里出去吧。");//If you're a coward, you will leave.
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
