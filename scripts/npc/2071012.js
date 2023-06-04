/* A Familiar Lady
    Hidden Street : Gloomy Forest (922220000)
 */

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

            if(status == 0) {
                if(cm.getQuestProgressInt(23647, 1) != 0) {
                    cm.dispose();
                    return;
                }
                
                if(!cm.haveItem(4031793, 1)) {
                    cm.sendOk("嗯...嘿...你愿意你愿意帮忙找一找我丢在树林里的 #b九尾狐的尾巴#k 吗？我好需要它，好需要它，好~需~要~它~");
                    cm.dispose();
                    return;
                }
                
                cm.sendYesNo("嘿...嗯...你愿意帮忙找一找我丢在树林里的 #b九尾狐的尾巴#k 吗？我好需要它，好需要它，好~需~要~它...哇，你找到它了！你愿意把它给我吗？");
            } else if(status == 1) {
                cm.sendNext("嘻嘻~这是你从我这儿偷走它的奖励，和你很相配。");
                cm.gainItem(4031793, -1);
                cm.gainFame(-5);
                cm.setQuestProgress(23647, 1, 1);
                
                cm.dispose();
            }
        }
}