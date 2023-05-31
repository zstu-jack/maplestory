/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Mazra
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Hair Salon Owner

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var beauty = 0;
var mhair_v = Array(30150, 30170, 30180, 30320, 30330, 30410, 30460, 30820, 30900);
var fhair_v = Array(31040, 31090, 31190, 31330, 31340, 31400, 31420, 31620, 31660);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

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
			cm.sendSimple("哈哈哈...在沙漠中保持时髦的发型可不容易，是需要一些个人理解和天赋的。如果你有 #b阿里安特美发店高级会员卡#k 或 #阿里安特染色高级会员卡#k，我就能够让你的发型焕然一新。\r\n#L0#更改发型：#i5150027##t5150027##l\r\n#L1#更改发色：#i5151022##t5151022##l");
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair_v.length; i++) {
						pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getChar().getHair()
 % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair_v.length; i++) {
						pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getChar().getHair()
 % 10));
					}
				}
				cm.sendStyle("哈哈哈~只需要一张 #b阿里安特美发店高级会员卡#k ，你就可以选择喜欢的发型。来，认真挑选吧，剩下的交给我就好。", hairnew);
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()
/10)*10;
				for(var i = 0; i < 8; i++) {
					pushIfItemExists(haircolor, current + i);
				}
				cm.sendStyle("时不时改变一下形象有益于身心健康...也很有趣。请允许我，伟大的玛兹拉，为您染发。只要给我一张#b阿里安特染色高级会员卡#k，就可以选择你的新发色了。", haircolor);
			}
		}
		else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150027) == true){
					cm.gainItem(5150027, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
				} else {
					cm.sendNext("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151022) == true){
					cm.gainItem(5151022, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
				} else {
					cm.sendNext("看起来你没有我们的会员卡。恐怕我不能为你提供服务。");
				}
			}
		}
	}
}