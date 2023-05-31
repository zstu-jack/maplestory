/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Vard
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Ariant Plastic Surgery

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var beauty = 0;
var mface_v = Array(20000, 20004, 20005, 20012, 20013, 20031);
var fface_v = Array(21000, 21003, 21006, 21009, 21012, 21024);
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
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
                    
                if (status == 0) {
                        cm.sendSimple("你好，欢迎来到阿里安特整形医院。想要让你的脸焕然一新吗？只要一张 #b#t5152030##k 或 #b#t5152047##k，你就可以享受高质量的美容服务，拥有梦寐以求的容貌。\r\n#L1#改变脸型：#i5152030##t5152030##l\r\n#L2#改变瞳色：#i5152047##t5152047##l\r\n#L3#一次性隐形眼镜：#i5152101# (任意颜色)#l");
                } else if (status == 1) {
                        if (selection == 1) {
                                beauty = 0;
                            
                                facenew = Array();
                                if (cm.getChar().getGender() == 0) {
                                        for(var i = 0; i < mface_v.length; i++) {
                                                pushIfItemExists(facenew, mface_v[i] + cm.getChar().getFace()
                                                 % 1000 - (cm.getChar().getFace()
                                                 % 100));
                                        }
                                }
                                if (cm.getChar().getGender() == 1) {
                                        for(var i = 0; i < fface.length; i++) {
                                                pushIfItemExists(facenew, fface[i] + cm.getChar().getFace()
                                                 % 1000 - (cm.getChar().getFace()
                                                 % 100));
                                        }
                                }
                                cm.sendStyle("即便被面纱遮蔽，美丽的容貌仍旧会在热情似火的沙漠中闪闪发光。选择你想要的脸型，我会用出色的技巧来为你打扮。", facenew);
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
                                cm.sendStyle("凭借与闪耀的沙漠明珠相称的高超手段，我们会让你的瞳色相较于之前更加熠熠生辉。选择你想要的瞳色...", colors);
                        } else if (selection == 3) {
                                beauty = 3;
                                if (cm.getPlayer().getGender() == 0) {
                                        var current = cm.getPlayer().getFace()
                                        % 100 + 20000;
                                }
                                if (cm.getPlayer().getGender() == 1) {
                                        var current = cm.getPlayer().getFace()
                                        % 100 + 21000;
                                }

                                colors = Array();
                                for (var i = 0; i < 8; i++) {
                                        if (cm.haveItem(5152100 + i)) {
                                               pushIfItemExists(colors, current + 100 * i);
                                        }
                                }

                                if (colors.length == 0) {
                                        cm.sendOk("你没有可供使用的一次性隐形眼镜。");
                                        cm.dispose();
                                        return;
                                }

                                cm.sendStyle("你喜欢哪种瞳色？选择一款你喜欢的风格吧。", colors);
                        }
                } else if (status == 2){
			cm.dispose();
                        
                        if (beauty == 0) {
                                if (cm.haveItem(5152030) == true){
                                        cm.gainItem(5152030, -1);
                                        cm.setFace(facenew[selection]);
                                        cm.sendOk("好了，让朋友们赞叹你的新脸型吧！");
                                } else {
                                        cm.sendNext("很抱歉，如果没有整容会员卡的话，我无法为你服务。");
                                }
                        } else if (beauty == 1) {
                                if (cm.haveItem(5152047) == true){
                                        cm.gainItem(5152047, -1);
                                        cm.setFace(colors[selection]);
                                        cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                                } else {
                                        cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
                                }
                        } else if (beauty == 3){
                                var color = (colors[selection] / 100) % 100 | 0;

                                if (cm.haveItem(5152100 + color)){
                                        cm.gainItem(5152100 + color, -1);
                                        cm.setFace(colors[selection]);
                                        cm.sendOk("好了，让朋友们赞叹你的新瞳色吧！");
                                } else {
                                        cm.sendOk("很抱歉，如果没有美瞳会员卡的话，我无法为你服务。");
                                }
                        }
		}
	}
}