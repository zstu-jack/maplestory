/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Rydole
	Ludibrium : Toy Factory <Aparatus Room> (220020600)
	
	Refining NPC: 
	* Level 30-50 weapons - Stimulator allowed
*/
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var stimulator = false;
var stimID;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "���������ҵ��ˣ���һ���д󲿷ֵ�ʱ�ⶼ����Ϊ����������ð�ռ����������ϡ�����ʲô��Ҫ������#b"
        var options = new Array("��������ʲô��","����սʿ����","��������������","������ʦ����","������������",
        "ʹ�ø���������սʿ����","ʹ�ø�������������������","ʹ�ø�����������ʦ����","ʹ�ø�����������������");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        var selStr;
        var weapon;
        if (selectedType > 4)
        {
            stimulator = true;
            selectedType -= 4;
        }
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("��������һ���������ض���Ʒ������������ӵ�����ҩ�����������ṩ�������������Դ��¡������п��ܲ������仯��Ҳ�п���ʹ����Ʒ�ʱ�͡����⣬��10%�ĸ�������Ʒ��ʧ������������ѡ��ʹ�á�")
            cm.dispose();
        }
        else if (selectedType == 1){ //warrior weapon
            selStr = "����Ҫ��������սʿ������#b";
            weapon = new Array ("ս��#k - �ȼ�.30 ���ֽ�#b","�䵶#k - �ȼ�.35 ���ֽ�#b","��ɳ֮��#k - �ȼ�.40 ���ֽ�#b","����֮��#k - �ȼ�.50 ���ֽ�#b","�ห#k - �ȼ�.30 ���ָ�#b","��#k - �ȼ�.35 ���ָ�#b","��⸫#k - �ȼ�.40 ���ָ�#b","����֮��#k - �ȼ�.50 ���ָ�#b",
                "��ս����#k - �ȼ�.30 ���ֶ���#b","��ʿ��#k - �ȼ�.35 ���ֶ���#b","�ش�#k - �ȼ�.40 ���ֶ���#b","���紸#k - �ȼ�.50 ���ֶ���#b","��#k - �ȼ�.30 ˫�ֽ�#b","��ԭ֮��#k - �ȼ�.35 ˫�ֽ�#b","���¾޵�#k - �ȼ�.40 ˫�ֽ�#b","����#k - �ȼ�.50 ˫�ֽ�#b",
                "���;޸�#k - �ȼ�.30 ˫�ָ�#b","���ߵ�#k - �ȼ�.35 ˫�ָ�#b","�񶷸�#k - �ȼ�.40 ˫�ָ�#b","̫��֮��#k - �ȼ�.50 ˫�ָ�#b","﮿�#k - �ȼ�.30 ˫�ֶ���#b","��#k - �ȼ�.35 ˫�ֶ���#b","���˴�#k - �ȼ�.40 ˫�ֶ���#b","�ƽ�#k - �ȼ�.50 ˫�ֶ���#b",
                "��֧ǹ#k - �ȼ�.30 Spear#b","��ǹ#k - �ȼ�.35 Spear#b","˫���#k - �ȼ�.40 Spear#b","������ì#k - �ȼ�.50 Spear#b","﮿��#k - �ȼ�.30 ì#b","���#k - �ȼ�.35 ì#b","�����#k - �ȼ�.40 ì#b","������#k - �ȼ�.50 ì#b");
        }
        else if (selectedType == 2){ //bowman weapon
            selStr = "����Ҫ�������ֹ�����������#b";
            weapon = new Array ("�׵�n#k - �ȼ�.30 ��#b","����֮��#k - �ȼ�.35 ��#b","���繭#k - �ȼ�.40 ��#b","�칭#k - �ȼ�.50 ��#b","ӥ��#k - �� �ȼ�.32#b","˫����#k - �� �ȼ�.38#b","������#k - �� �ȼ�.42#b","����#k - �� �ȼ�.50#b");
        }
        else if (selectedType == 3){ //magician weapon
            selStr = "����Ҫ�������ַ�ʦ������#b";
            weapon = new Array ("﮿����#k - �ȼ�.28 ����#b","��ʦ����#k - �ȼ�.33 ����#b","��������#k - �ȼ�.38 ����#b","��ħ��ʦ����#k - �ȼ�.48 ����#b","��ʦ����#k - �ȼ�.25 ����#b","���鳤��#k - �ȼ�.45 ����#b","����֮��#k - �ȼ�.55 ����#b");
        }
        else if (selectedType == 4){ //thief weapon; claws vary depending if stimulator is being used
            selStr = "����Ҫ�������ַ���������#b";
            if (!stimulator)
                weapon = new Array ("ˮ����#k - �ȼ�.30 �̵����ˣ�#b","������#k - �ȼ�.30 �̵�������#b","��Ӱ��#k - �ȼ�.35 �̵����ˣ�#b","�̿Ͷ̵�#k - �ȼ�.40 �̵�������#b","���#k - �ȼ�.50 �̵�������#b","������#k - �ȼ�.50 �̵����ˣ�#b",
                    "������ȭ#k - �ȼ�.30 ȭ��#b","��ͭ�ػ�ȭ��#k - �ȼ�.35 ȭ��#b","��������#k - �ȼ�.40 ȭ��#b","�����ּ�#k - �ȼ�.50 ȭ��#b");
            else
                weapon = new Array ("ˮ����#k - �ȼ�.30 �̵����ˣ�#b","������#k - �ȼ�.30 �̵�������#b","��Ӱ��#k - �ȼ�.35 �̵����ˣ�#b","�̿Ͷ̵�#k - �ȼ�.40 �̵�������#b","���#k - �ȼ�.50 �̵�������#b","������#k - �ȼ�.50 �̵����ˣ�#b",
                    "﮿�ȭ#k - �ȼ�.30 ȭ��#b","���ȭ#k - �ȼ�.30 ȭ��#b","���ػ�ȭ��#k - �ȼ�.35 ȭ��#b","���ػ�ȭ��#k - �ȼ�.35 ȭ��#b","��커��#k - �ȼ�.40 ȭ��#b","�����#k - �ȼ�.40 ȭ��#b",
                    "�ڻ���#k - �ȼ�.40 ȭ��#b","����ּ�#k - �ȼ�.50 ȭ��#b","�����ּ�#k - �ȼ�.50 ȭ��#b","���ּ�#k - �ȼ�.50 ȭ��#b");
        }
		
        if (selectedType != 0)
        {
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 1){ //warrior weapon
            var itemSet = new Array(1302008,1302004,1302009,1302010,1312005,1312006,1312007,1312008,1322014,1322015,1322016,1322017,1402002,1402006,1402007,1402003,1412006,1412004,1412005,1412003,1422001,1422008,1422007,1422005,1432002,1432003,1432005,1432004,1442001,1442003,1442009,1442005);
            var matSet = new Array(new Array(4131000,4011001,4011004,4003000),new Array(4131000,4011006,4011001,4021006,4003000),new Array(4131000,4011006,4011001,4021000,4003000),new Array(4131000,4005000,4021008,4011006,4021003,4003000),
                new Array(4131001,4011001,4021000,4003000),new Array(4131001,4011001,4021000,4011004,4003000),new Array(4131001,4021005,4011001,4021001,4003000),new Array(4131001,4005000,4021008,4011004,4011001,4003000),
                new Array(4131002,4011001,4011000,4003000),new Array(4131002,4011001,4011000,4011003,4003000),new Array(4131002,4011003,4011001,4011004,4003000),new Array(4131002,4005000,4021008,4011006,4011001,4003000),
                new Array(4131003,4011001,4021000,4021004,4003000),new Array(4131003,4011006,4011001,4021004,4003000),new Array(4131003,4021003,4011000,4011001,4003000),new Array(4131003,4005000,4021007,4011006,4011001,4003000),
                new Array(4131004,4021005,4011001,4003001,4003000),new Array(4131004,4011004,4011000,4021003,4003000),new Array(4131004,4011006,4011004,4011001,4003000),new Array(4131004,4005000,4021007,4011006,4021006,4003000),
                new Array(4131005,4011001,4011004,4003000),new Array(4131005,4011001,4011000,4003001,4003000),new Array(4131005,4011001,4011004,4011006,4003000),new Array(4131005,4005000,4021008,4021006,4011006,4003000),
                new Array(4131006,4011000,4011004,4003000),new Array(4131006,4011001,4011002,4021000,4003000),new Array(4131006,4011004,4011001,4011000,4003000),new Array(4131006,4005000,4021008,4011000,4021000,4003000),
                new Array(4131007,4011000,4011002,4003000),new Array(4131007,4011001,4011002,4003000),new Array(4131007,4011006,4011002,4011001,4003000),new Array(4131007,4005000,4021007,4011001,4011002,4003000));
            var matQtySet = new Array(new Array(1,2,2,30),new Array(1,1,5,3,35),new Array(1,3,5,5,40),new Array(1,1,2,4,10,50),
                new Array(1,2,2,30),new Array(1,5,5,3,35),new Array(1,7,5,5,40),new Array(1,1,2,8,10,50),
                new Array(1,2,2,30),new Array(1,5,5,3,35),new Array(1,7,5,5,40),new Array(1,1,2,4,10,50),
                new Array(1,2,1,2,35),new Array(1,1,5,5,40),new Array(1,7,5,5,45),new Array(1,1,2,4,10,55),
                new Array(1,2,2,5,35),new Array(1,5,5,3,40),new Array(1,3,5,5,45),new Array(1,1,2,5,7,55),
                new Array(1,2,3,35),new Array(1,5,5,10,40),new Array(1,5,5,3,45),new Array(1,1,2,7,5,55),
                new Array(1,2,3,40),new Array(1,5,5,3,45),new Array(1,3,5,5,50),new Array(1,1,2,7,5,60),
                new Array(1,2,3,40),new Array(1,5,5,40),new Array(1,3,5,5,50),new Array(1,1,2,7,5,60));
            var costSet = new Array(18000,35000,70000,200000,18000,35000,70000,200000,18000,35000,70000,200000,20000,37000,72000,220000,20000,37000,72000,220000,20000,37000,72000,220000,22000,39000,74000,240000,22000,39000,74000,240000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //bowman weapon
            var itemSet = new Array(1452005,1452006,1452007,1452008,1462004,1462005,1462006,1462007);
            var matSet = new Array(new Array(4131010,4011001,4011006,4021003,4021006,4003000),new Array(4131010,4011004,4021000,4021004,4003000),new Array(4131010,4021008,4011001,4011006,4003000,4000112),new Array(4131010,4005002,4021008,4011001,4021005,4003000),
                new Array(4131011,4011001,4011005,4021006,4003001,4003000),new Array(4131011,4021008,4011001,4011006,4021006,4003000),new Array(4131011,4021008,4011004,4003001,4003000),new Array(4131011,4021008,4011006,4021006,4003001,4003000));
            var matQtySet = new Array(new Array(1,5,5,3,3,30),new Array(1,7,6,3,35),new Array(1,1,10,3,40,100),new Array(1,1,2,10,6,50),new Array(1,5,5,3,50,15),new Array(1,1,8,4,2,30),new Array(1,2,6,30,30),new Array(1,2,5,3,40,40));
            var costSet = new Array(15000,20000,40000,100000,15000,25000,41000,100000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //magician weapon
            var itemSet = new Array(1372003,1372001,1372000,1372007,1382002,1382001,1382006);
            var matSet = new Array(new Array(4131008,4011002,4021002,4003000),new Array(4131008,4021006,4011002,4011001,4003000),new Array(4131008,4021006,4021005,4021007,4003003,4003000),new Array(4131008,4011006,4021003,4021007,4021002,4003000),
                new Array(4131009,4021006,4021001,4011001,4003000),new Array(4131009,4011001,4021006,4021001,4021005,4003000),new Array(4131009,4005001,4021008,4011006,4011004,4003000));
            var matQtySet = new Array(new Array(1,3,1,10),new Array(1,5,3,1,15),new Array(1,5,5,1,1,20),new Array(1,4,3,2,1,30),new Array(1,2,1,1,15),new Array(1,8,5,5,5,30),new Array(1,2,2,5,10,40));
            var costSet = new Array(15000,30000,60000,100000,10000,80000,200000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //thief weapon; claws vary depending if stimulator is being used
            if (!stimulator){
                var itemSet = new Array(1332012,1332009,1332014,1332011,1332016,1332003,1472008,1472011,1472014,1472018);
                var matSet = new Array(new Array(4131012,4011002,4011001,4003000),new Array(4131012,4021005,4011001,4003000),new Array(4131012,4021005,4011001,4011002,4003000),new Array(4131012,4011001,4011006,4021006,4003000),new Array(4131012,4005003,4021008,4011004,4011001,4003000),new Array(4131012,4005003,4021007,4011006,4011001,4003000),
                    new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000021,4003000),new Array(4131013,4011000,4011001,4000030,4003000));
                var matQtySet = new Array(new Array(1,2,3,30),new Array(1,2,3,30),new Array(1,1,5,3,35),new Array(1,7,3,6,40),new Array(1,1,2,7,10,50),new Array(1,1,2,5,10,50),new Array(1,3,2,50,20),new Array(1,4,2,80,25),new Array(1,3,2,100,30),new Array(1,4,2,40,35));
                var costSet = new Array(20000,20000,33000,73000,230000,230000,15000,30000,40000,50000);
            }
            else{
                var itemSet = new Array(1332012,1332009,1332014,1332011,1332016,1332003,1472009,1472010,1472012,1472013,1472015,1472016,1472017,1472019,1472020,1472021);
                var matSet = new Array(new Array(4131012,4011002,4011001,4003000),new Array(4131012,4021005,4011001,4003000),new Array(4131012,4021005,4011001,4011002,4003000),new Array(4131012,4011001,4011006,4021006,4003000),new Array(4131012,4005003,4021008,4011004,4011001,4003000),new Array(4131012,4005003,4021007,4011006,4011001,4003000),
                    new Array(4131013,1472008,4011002),new Array(4131013,1472008,4011003),new Array(4131013,1472011,4011004),new Array(4131013,1472011,4021008),new Array(4131013,1472014,4021000),new Array(4131013,1472014,4011003),new Array(4131013,1472014,4021008),new Array(4131013,1472018,4021000),new Array(4131013,1472018,4021005),
                    new Array(4131013,1472018,4005003,4021008));
                var matQtySet = new Array(new Array(1,2,3,30),new Array(1,2,3,30),new Array(1,1,5,3,35),new Array(1,7,3,6,40),new Array(1,1,2,7,10,50),new Array(1,1,2,5,10,50),new Array(1,1,3),new Array(1,1,3),new Array(1,1,4),new Array(1,1,1),new Array(1,1,5),new Array(1,1,5),new Array(1,1,2),new Array(1,1,6),new Array(1,1,6),new Array(1,1,1,3));
                var costSet = new Array(20000,20000,33000,73000,230000,230000,10000,15000,20000,25000,30000,30000,35000,40000,40000,50000);
            }
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "����Ҫ���� #t" + item + "# �������Ļ�������Ҫ������ϡ����⣬�뱣֤���㹻�İ����ռ䡣#b";

        if(stimulator){
            stimID = mats[0] - 998; //stim ID for a weapon = manual ID for weapon - 998
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        }

        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " ���";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 3 && mode == 1) {
        var complete = true;
		    
        if(!cm.canHold(item, 1)) {
            cm.sendOk("���������Ʒ���Ƿ����㹻�ռ䡣");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost)
        {
            cm.sendOk("��Ҳ���Ļ������޷�Ϊ��������");
            cm.dispose();
            return;
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] * selection == 1) {
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {
                        if (!cm.haveItem(mats[i],matQty[i] * selection)) complete=false;
                    }
                }
            }
            else {
                if (!cm.haveItem(mats,matQty * selection)) complete=false;
            }
        }
			
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID))
            {
                complete = false;
            }
        }
			
        if (!complete)
            cm.sendOk("�ܱ�Ǹ��ÿһ�����϶�������������ġ��뱸�����������");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
					
            cm.gainMeso(-cost);
            if (stimulator){ //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0)
                {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("�����ˣ��������ô�����Ƶ����ǽ����ɣ�");
                }
                else
                {
                    cm.sendOk("...������С��������...�����Բ�����Щ����û����ԭ�ˡ�");
                }
            }
            else //just give basic item
            {
                cm.gainItem(item, 1);
                cm.sendOk("�����ˣ��������ô�����Ƶ����ǽ����ɣ�");
            }
        }
        cm.dispose();
    }
}