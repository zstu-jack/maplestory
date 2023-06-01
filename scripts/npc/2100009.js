/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Aldin
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Ariant Plastic Surgery

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var beauty = 0;
var mface_r = Array(20001, 20003, 20009, 20010, 20025, 20031);
var fface_r = Array(21002, 21009, 21011, 21013, 21016, 21029, 21030);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
                if (type == 7) {
			cm.sendNext("我知道了...那么再会，如果你改变了主意，就来跟我说。");
		}
            
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
                    
                if (status == 0) {
                        cm.sendSimple("你好，我是这里的面部整形医生。给我 #b#t5152029##k 或者 #b#t5152048##k的话，我就可以让它们物尽其用。啊...不过，手术后你的脸会变成什么样子，就连我自己也不知道。那么，你想要的服务是？\r\n#L1#改变脸型：#i5152029##t5152029##l\r\n#L2#改变瞳色：#i5152048##t5152048##l");
                } else if (status == 1) {
                        if (selection == 1) {
                                beauty = 0;
                            
                                facenew = Array();
                                if (cm.getChar().getGender() == 0) {
                                        for(var i = 0; i < mface_r.length; i++) {
                                                pushIfItemExists(facenew, mface_r[i] + cm.getChar().getFace()
                                                 % 1000 - (cm.getChar().getFace()
                                                 % 100));
                                        }
                                }
                                if (cm.getChar().getGender() == 1) {
                                        for(var i = 0; i < fface_r.length; i++) {
                                                pushIfItemExists(facenew, fface_r[i] + cm.getChar().getFace()
                                                 % 1000 - (cm.getChar().getFace()
                                                 % 100));
                                        }
                                }
                                cm.sendYesNo("如果使用普通会员卡，你的脸型将会#r随机#k改变。确定要使用 #b#t5152029##k?");
                        } else if (selection == 2) {
                                beauty = 1;
                                if (cm.getPlayer().getGender() == 0) {
                                        var current = cm.getPlayer().getFace()
                                        % 100 + 20000;
                                }
                                if (cm.getPlayer().getGender() == 1) {
                                        var current = cm.getPlayer().getFace()
                                        % 100 + 21000;
                                }
                                colors = Array();
                                pushIfItemsExists(colors, [current , current + 100, current + 300, current + 600, current + 700]);
                                cm.sendYesNo("如果使用普通会员卡，你的瞳色将会#r随机#k改变。确定要使用 #b#t5152048##k 来改变你的瞳色吗？");
                        }
                } else if (status == 2){	
			cm.dispose();
                        
                        if (beauty == 0) {
                                if (cm.haveItem(5152029) == true){
                                        cm.gainItem(5152029, -1);
                                        cm.setFace(facenew[Math.floor(Math.random() * facenew.length)]);
                                        cm.sendOk("好了，让朋友们赞叹你的新脸型吧！");
                                } else {
                                        cm.sendNext("很抱歉，如果没有整形会员卡的话，我无法为你服务。");
                                }
                        } else if (beauty == 1) {
                                if (cm.haveItem(5152048)){
                                        cm.gainItem(5152048, -1);
                                        cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                                        cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                                } else {
                                       cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
                                }
                        }
		}
	}
}