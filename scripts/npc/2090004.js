/* @author aaroncsn <MapleSea Like>
 * @author Ronan
	NPC Name: 		Mr. Do
	Map(s): 		Mu Lung: Mu Lung(2500000000)
	Description: 		Potion Creator
 */
importPackage(Packages.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var matMeso;
var rewdSet;
var makeQty = 1;

var itemSet;
var matSet;
var matQtySet;
var matQtyMeso;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
                cm.sendOk("ร��������Ҫ����������ʲô�������ҶԻ��������ں�æ��");
		cm.dispose();
                return;
	}

	if (status == 0) {
		if (cm.isQuestActive(3821) && !cm.haveItem(4031554) && !cm.haveItem(4161030) && cm.isQuestCompleted(3830)) {
                        //player lost his book, help him complete quest anyways
                    
                        if(cm.canHold(4031554)) {
                                cm.sendOk("ร���̫��Ҫ�����ȡһ��#t4031554#��û���⣬�һ�Ƿ��һ�������ء��͵�ʱ����������͵��ǻ��������飬֪���ɣ�");
                                cm.gainItem(4031554, 1);
                                cm.dispose();
                                return;
                        }
                        else {
                                cm.sendOk("ร���̫��Ҫ�����ȡһ��#t4031554#�������������ڳ�1��ռ�ɡ�");
                                cm.dispose();
                                return;
                        }
		}
		var selStr = "�ҿ���˵�Ƕ�Ŷ��ա������ң�����Ҫ����ʲô��#b"
				var options = new Array("����ҩƷ","��������","����ҩ��");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}

		cm.sendSimple(selStr);
	} else if (status == 1) {
		selectedType = selection;
		var selStr;
		if (selectedType == 0){ //Make a medicine
                        itemSet = new Array(2022145,2022146,2022147,2022148,2022149,2022150,2050004,4031554);
                        matSet = new Array(2022116,2022116,new Array(4000281,4000293),new Array(4000276,2002005),new Array(4000288,4000292),4000295,new Array(2022131,2022132),new Array(4000286,4000287,4000293));
			matQtySet = new Array(3,3,new Array(10,10),new Array(20,1),new Array(20,20),10,new Array(1,1),new Array(20,20,20));
                        matQtyMeso = new Array(0,0,910,950,1940,600,700,1000);
                    
                        if(!cm.haveItem(4161030)) {
                                cm.sendNext("��Ҫ��ҩ���͵��ȶ�ҩ������顣û������ѧϰ��������ҩƷ��Σ�ղ����ˡ�");
                                cm.dispose();
                                return;
                        }
			
                        selStr = "��������ʲôҩƷ��#b";
			
                        for (var i = 0; i < itemSet.length; i++){
                                selStr += "\r\n#L" + i + "# #v" + itemSet[i] + "# #t" + itemSet[i] + "##l";
                        }
                        selStr += "#k";
		} 
		else if(selectedType == 1){ //Make a scroll
                        status++;
                    
			selStr = "��������ʲô���᣿#b";
			itemSet = new Array("���ֽ���������", "���ָ���������", "���ֶ�����������",
					"�̽���������","����ħ������","����ħ������",
					"˫�ֽ���������","˫�ָ���������","˫�ֶ�����������",
					"ǹ��������","ì��������","����������","�󹥻�����",
					"ȭ�׹�������","ȭ�׹�������","��ǹ��������#k");

                        for (var i = 0; i < itemSet.length; i++){
                                selStr += "\r\n#L" + i + "# " + itemSet[i] + "#l";
                        }
		} 
		else {//Donate medicine ingredients
                        status++;
                    
			selStr = "�������һЩҩ�ģ����Ǹ�����Ϣ���һ���ÿ#b100#k��Ϊһ����ܾ����������߿��Եõ����������������ˮ�����������������Ʒ��#b";
			itemSet = new Array(4000276,4000277,4000278,4000279,4000280,4000291,4000292,4000286,4000287,4000293,4000294,4000298,4000284,4000288,4000285,4000282,4000295,4000289,4000296,4000297);
                                        
                        for (var i = 0; i < itemSet.length; i++){
                                selStr += "\r\n#L" + i + "# #v" + itemSet[i] + "# #t" + itemSet[i] + "##l";
                        }
		}
		
		cm.sendSimple(selStr);
	}
        else if (status == 2) {
                selectedItem = selection;
                cm.sendGetText("������������#b#t" + itemSet[selectedItem] + "��");
        }
	else if (status == 3) {
		if(selectedType == 0) { //Medicines
			var text = cm.getText();
                        makeQty = parseInt(text);
                        if(isNaN(makeQty)) makeQty = 1;
                        
                        item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
                        matMeso = matQtyMeso[selectedItem];
                        
			if (mats instanceof Array){
				for(var i = 0; i < mats.length; i++){
					prompt += "\r\n#i"+mats[i]+"# " + matQty[i]*makeQty + " #t" + mats[i] + "#";
				}
			}
                        else prompt += "\r\n#i"+mats+"# " + matQty*makeQty + " #t" + mats + "#";
                        
                        if (matMeso > 0)
                                prompt += "\r\n#i4031138# " + matMeso*makeqty + " ���";
                        
                        cm.sendYesNo(prompt);
                }
                
		else if (selectedType == 1){ //Scrolls
                        selectedItem = selection;
                    
			itemSet = new Array(2043000,2043100,2043200,2043300,2043700,2043800,2044000,2044100,2044200,2044300,2044400,2044500,2044600,2044700,2044800,2044900);
			matSet = new Array(new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),
					new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),
					new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001),new Array(4001124,4010001));
			matQtySet = new Array(new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),
					new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),new Array(100, 10),
					new Array(100, 10));
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			var prompt = "��������#b#t" + item + "##k��Ҫ���� #t" + item +"# ��Ҫ���²��ϣ�";
			if (mats instanceof Array){
				for(var i = 0; i < mats.length; i++){
					prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
				}
			}
                        else {
                                prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
                        }
                        
                        cm.sendYesNo(prompt);
		} 
		else if(selectedType == 2){
                        selectedItem = selection;
                    
			itemSet = new Array(4000276,4000277,4000278,4000279,4000280,4000291,4000292,4000286,4000287,4000293,4000294,4000298,4000284,4000288,4000285,4000282,4000295,4000289,4000296,4000297);
                        rewdSet = new Array(7,7,new Array(7,8),10,11,8,new Array(7,8),new Array(7,9),new Array(7,8),9,10,new Array(10,11),11,new Array(11,12),13,13,14,15,new Array(15,16),17);
                        
			item = itemSet[selectedItem];
			var prompt = "ȷ��Ҫ���� #b100�� #t " + item + "##k��";
			cm.sendYesNo(prompt);
		}
	}
        else if (status == 4) {
                if(selectedType == 0) {
                        var complete = true;
			if (mats instanceof Array) {
				for(var i = 0; i < mats.length; i++) {
                                        if(!cm.haveItem(mats[i], matQty[i]*makeQty)) complete = false;
				}
			}
                        else {
                                if(!cm.haveItem(mats, matQty*makeQty)) complete = false;
                        }
                        
                        if(cm.getMeso() < matMeso*makeQty) complete = false;

			if (!complete || !cm.canHold(item, makeQty))
				cm.sendOk("��ȷ����Ĳ����㹻�����ұ��������������㹻�Ŀռ䡣");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i]*makeQty);
					}
				}
                                else {
                                    cm.gainItem(mats, -matQty*makeQty);
                                }

                                if(matMeso > 0) cm.gainMeso(-matMeso*makeQty);
				cm.gainItem(item,makeQty);
			}

			cm.dispose();
                }
		else if(selectedType == 1) {
			var complete = true;
			if (mats instanceof Array) {
				for(var i = 0; i < mats.length; i++) {
                                        if(!cm.haveItem(mats[i], matQty[i]))
                                                complete = false;
				}
			}
			else {
                                if(!cm.haveItem(mats, matQty))
                                        complete = false;
			}
                        
                        if(Math.random() >= 0.9) //A lucky find! Scroll 60%
                            item += 1;

			if (!complete || !cm.canHold(item, 1))
				cm.sendOk("��ȷ����Ĳ����㹻�����ұ��������������㹻�Ŀռ䡣");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i]);
					}
				}
				else
					cm.gainItem(mats, -matQty);

				cm.gainItem(item, 1);
			}

			cm.dispose();
		}
                else if(selectedType == 2) {
                        var complete = true;
                        
                        if(!cm.haveItem(item, 100))
                                complete = false;
			    
                        if(!complete) {
                                cm.sendOk("��ȷ����Ĳ����㹻�����ұ��������������㹻�Ŀռ䡣");
                                cm.dispose();
                                return;
                        }
                            
                        var reward;
                        if (rewdSet[selectedItem] instanceof Array) {
                                var length = rewdSet[selectedItem][1] - rewdSet[selectedItem][0];
                                reward = rewdSet[selectedItem][0] + Math.round(Math.random() * length);
                        }
                        else reward = rewdSet[selectedItem];

			if (!cm.canHold(4001124, reward))
				cm.sendOk("��ȷ����Ĳ����㹻�����ұ��������������㹻�Ŀռ䡣");
			else {
                cm.gainItem(item, -100);
				cm.gainItem(4001124, reward);
			}

			cm.dispose();
                }
	}
}
