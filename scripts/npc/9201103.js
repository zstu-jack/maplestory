/**
 *9201103 - Sage
 *@author Ronan
 */
 
function start() {
    if(cm.getLevel() >= 100) cm.sendOk("像你这样的冒险家们应该在绯红要塞中探险。各种各样的人们在城堡里团结协作，解决难题，击倒强大的敌人，并最终获得奖励，凯旋而归。想要了解更多信息，就进入右上角的房间吧。");
    else cm.sendOk("要塞中，100级以上的冒险家可以组成队伍执行绯红要塞组队任务。你看起来还不够资格，去多多磨炼自己之后再来这里吧。");
    cm.dispose();
}
