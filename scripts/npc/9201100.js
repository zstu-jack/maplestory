/**
 *9201100 - Taggrin
 *@author Ronan
 */
 
function start() {
    if(cm.getQuestStatus(8224) == 2) {
        cm.sendOk("幸会，我的兄弟。如果你需要我们的帮助，和我们之中的某人对话就可以了。");
    } else {
        cm.sendOk("你好，陌生人。你也许听说过我们——一支有名的赏金猎人，鸦爪氏族。而我就是他们的首领。");
    }
    
    cm.dispose();
}
