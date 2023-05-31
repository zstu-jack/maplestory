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
                        cm.sendSimple("��ã���ӭ�������ﰲ������ҽԺ����Ҫ���������Ȼһ����ֻҪһ�� #b#t5152030##k �� #b#t5152047##k����Ϳ������ܸ����������ݷ���ӵ�������������ò��\r\n#L1#�ı����ͣ�#i5152030##t5152030##l\r\n#L2#�ı�ͫɫ��#i5152047##t5152047##l\r\n#L3#һ���������۾���#i5152101# (������ɫ)#l");
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
                                cm.sendStyle("���㱻��ɴ�ڱΣ���������ò�Ծɻ��������ƻ��ɳĮ���������⡣ѡ������Ҫ�����ͣ��һ��ó�ɫ�ļ�����Ϊ���硣", facenew);
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
                                cm.sendStyle("ƾ������ҫ��ɳĮ������Ƶĸ߳��ֶΣ����ǻ������ͫɫ�����֮ǰ�����������ԡ�ѡ������Ҫ��ͫɫ...", colors);
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
                                        cm.sendOk("��û�пɹ�ʹ�õ�һ���������۾���");
                                        cm.dispose();
                                        return;
                                }

                                cm.sendStyle("��ϲ������ͫɫ��ѡ��һ����ϲ���ķ��ɡ�", colors);
                        }
                } else if (status == 2){
			cm.dispose();
                        
                        if (beauty == 0) {
                                if (cm.haveItem(5152030) == true){
                                        cm.gainItem(5152030, -1);
                                        cm.setFace(facenew[selection]);
                                        cm.sendOk("���ˣ�����������̾��������Ͱɣ�");
                                } else {
                                        cm.sendNext("�ܱ�Ǹ�����û�����ݻ�Ա���Ļ������޷�Ϊ�����");
                                }
                        } else if (beauty == 1) {
                                if (cm.haveItem(5152047) == true){
                                        cm.gainItem(5152047, -1);
                                        cm.setFace(colors[selection]);
                                        cm.sendOk("���ˣ�����������̾�����ͫɫ�ɣ�");
                                } else {
                                        cm.sendOk("�ܱ�Ǹ�����û����ͫ��Ա���Ļ������޷�Ϊ�����");
                                }
                        } else if (beauty == 3){
                                var color = (colors[selection] / 100) % 100 | 0;

                                if (cm.haveItem(5152100 + color)){
                                        cm.gainItem(5152100 + color, -1);
                                        cm.setFace(colors[selection]);
                                        cm.sendOk("���ˣ�����������̾�����ͫɫ�ɣ�");
                                } else {
                                        cm.sendOk("�ܱ�Ǹ�����û����ͫ��Ա���Ļ������޷�Ϊ�����");
                                }
                        }
		}
	}
}