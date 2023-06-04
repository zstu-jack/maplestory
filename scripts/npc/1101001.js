 /* 
	NPC Name: 		Divine Bird
	Map(s): 		Erev
	Description: 		3rd job KoC Buff
*/
importPackage(Packages.constants.game);

function start() {
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("为保护冒险岛的勇士祈祷。");
    } else {
        cm.sendOk("冒险岛的世界，需要你不断变强的身躯来守护，期待你成长为这个世界的守护者，加油。");
    }
    
    cm.dispose();
}