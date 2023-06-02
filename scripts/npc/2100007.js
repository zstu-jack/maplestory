/* Author: aaroncsn <MapleSea Like, Incomplete, Needs skin id>
	NPC Name: 		Laila
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Skin Care Specialist
*/

var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("吼吼吼~欢迎，欢迎，欢迎。欢迎来到阿里安特护肤中心。你进入的是一家赫赫有名的护肤中心，就连女王本人也市场光顾。如果你有 #b阿里安特护肤中心会员卡#k 的话，剩下的事情就交给我们了。需要我们现在为你提供护肤服务吗？");
		} else if (status == 1) {
			cm.sendStyle("使用这里的特制医疗器械，可以预览术后效果。你喜欢哪种肤色？选择一款你喜欢的风格吧。", skin);
		} else if (status == 2){
			cm.dispose();
			if (cm.haveItem(5153007) == true){
				cm.gainItem(5153007, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("好了，让朋友们赞叹你的新肤色吧！");
			} else {
				cm.sendNext("很抱歉，如果没有护肤会员卡的话，我无法为你服务。");
			}
		}
	}
}