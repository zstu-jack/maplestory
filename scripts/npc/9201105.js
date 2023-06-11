/**
 *9201105 - Sage
 *@author Ronan
 */
 
function start() {
    if(cm.getMapId() == 610020005) cm.sendOk("绯红要塞就在前方不远处，来到这里的你完成了令人钦佩的成就，向你致敬。通过这片树林，就能看到绯红要塞的大门。");
    else cm.sendOk("成功抵达这里，做的不错。不过想要抵达城堡的话，你必须直面更加严酷的考验，加油。");
    cm.dispose();
}
