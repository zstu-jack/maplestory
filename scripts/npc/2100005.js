/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Shati
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Assistant Hairdresser

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var beauty = 0;
var mhair_r = Array(30150, 30170, 30180, 30320, 30330, 30410, 30460, 30680, 30800, 30820, 30900);
var fhair_r = Array(31090, 31190, 31330, 31340, 31400, 31420, 31520, 31620, 31650, 31660, 34000);
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
                if (type == 7) {
                        cm.sendNext("看来你还没有下定决心改变自己。没关系，等到你改了主意，再来找我就好！");
                }
                
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("你好啊，我是夏特，玛扎拉的学徒。如果你有 #b阿里安特美发店普通会员卡#k 或 #b阿里安特染色普通会员卡#k 的话，让我来为你服务怎么样？\r\n#L0#更改发型：#i5150026##t5150026##l\r\n#L1#更改发色：#i5151021##t5151021##l");
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair_r.length; i++) {
						pushIfItemExists(hairnew, mhair_r[i] + parseInt(cm.getChar().getHair()
 % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair_r.length; i++) {
						pushIfItemExists(hairnew, fhair_r[i] + parseInt(cm.getChar().getHair()
 % 10));
					}
				}
				cm.sendYesNo("如果使用普通会员卡，你的发型将会改变为随机的全新形象。也有可能得到使用高级会员卡时无法获得的新发型。确定要使用 #b阿里安特美发店普通会员卡#k 来获得一个棒极了的新发型吗？");
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()
/10)*10;
				for(var i = 0; i < 8; i++) {
					pushIfItemExists(haircolor, current + i);
				}
				cm.sendYesNo("如果使用普通会员卡，你的发色将会随机改变，有可能变为全新风格。确定要使用 #b#t5151021##k 来改变你的发色吗？");
			}
		}
		else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150026) == true){
					cm.gainItem(5150026, -1);
					cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
					cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
				} else {
					cm.sendNext("只有使用我们的会员卡，我才能为你染发。你知道的吧？");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151021) == true){
					cm.gainItem(5151021, -1);
					cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
					cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
				} else {
					cm.sendNext("只有使用我们的会员卡，我才能为你染发。你知道的吧？");
				}
			}
		}
	}
}