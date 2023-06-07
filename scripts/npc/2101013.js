/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0) {
		cm.sendNext("哎...你是恐快还是恐高啊？在怀疑我的飞行技巧吗？相信我，我读过使用指南了！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if(status == 0){
		cm.sendNext("我不知道你是怎么找到这儿来的，但你来对地方了！我一刻不停地为那些在尼哈沙漠里徘徊又思乡心切的人们提供前往金银岛的直飞航班。别担心这架飞艇———也就掉下来过一两回！再说了，坐那么小的飞船长途旅行，不会幽闭恐惧症发作吗？ ");
	} else if(status == 1){
		cm.sendYesNo("记住两件事。第一，这其实是条远洋运输航线，所以 #rI我也不知道你会在哪个城镇落地#k。第二，既然要上这趟特殊航班，收费就要高一些。服务费是 #e#b10,000 金币#n#k。航班就要起飞了，有兴趣登上这次直达航班吗？");
	} else if(status == 2){
		cm.sendNext("好，准备起飞了~");
	} else if(status == 3){
		if(cm.getMeso() >= 10000){
			cm.gainMeso(-10000);
			cm.warp(towns[Math.floor(Math.random() * towns.length)]);
		} else{
			cm.sendNextPrev("嘿，你钱不够吗？都说过了，至少有 #b10,000#k 金币才能坐上来。");
			cm.dispose();
			}
		}
	}
}