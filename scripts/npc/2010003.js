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

/* Neve
	Orbis: Orbis Park (200000200)
	
	Refining NPC: 
	* Gloves, level 70-80 all classes
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "��ã��������֮������һָ�����׽��ˡ���Ҫ�Ұ�������������#b"
        var options = new Array("����/����սʿ����","����/��������������","����/������ʦ����","����/������������");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //warrior glove
            var selStr = "����Ҫ��������սʿ���ף�#b";
            var gloves = new Array ("��ͭ��Ӱ����#k - սʿ �ȼ�.70#b","﮿�Ӱ����#k - սʿ �ȼ�.70#b","�ڰ�Ӱ����#k - սʿ �ȼ�.70#b",
                "���˹��ȭ��#k - սʿ �ȼ�.80#b","���˹��ȭ��#k - սʿ �ȼ�.80#b","���˹��ȭ��#k - սʿ �ȼ�.80#b","���˹��ȭ��#k - սʿ �ȼ�.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //bowman glove
            var selStr = "����Ҫ�������ֹ��������ף�#b";
            var gloves = new Array ("����������#k - ������ �ȼ�.70#b","�ƽ���������#k - ������ �ȼ�.70#b","����������#k - ������ �ȼ�.70#b",
                "����ʹ����#k - ������ �ȼ�.80#b","����ʹ����#k - ������ �ȼ�.80#b","����ʹ����#k - ������ �ȼ�.80#b","����ʹ����#k - ������ �ȼ�.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //mage glove
            var selStr = "����Ҫ�������ַ�ʦ���ף�#b";
            var gloves = new Array ("��ս������#k - ��ʦ �ȼ�.70#b","��ս������#k - ��ʦ �ȼ�.70#b","��ս������#k - ��ʦ �ȼ�.70#b",
                "ħ��������#k - ��ʦ �ȼ�.80#b","ħ��������#k - ��ʦ �ȼ�.80#b","ħ��������#k - ��ʦ �ȼ�.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //thief glove
            var selStr = "����Ҫ�������ַ������ף�#b";
            var gloves = new Array ("��ͭ��������#k - ���� �ȼ�.70#b","����������#k - ���� �ȼ�.70#b","�ƽ���������#k - ���� �ȼ�.70#b",
                "�¹���������#k - ���� �ȼ�.80#b","�¹���������#k - ���� �ȼ�.80#b","�¹���������#k - ���� �ȼ�.80#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0){ //warrior glove
            var itemSet = new Array(1082103,1082104,1082105,1082114,1082115,1082116,1082117,1082118);
            var matSet = new Array(new Array(4005000,4011000,4011006,4000030,4003000),new Array(1082103,4011002,4021006),new Array(1082103,4021006,4021008),new Array(4005000,4005002,4021005,4000030,4003000),new Array(1082114,4005000,4005002,4021003),new Array(1082114,4005002,4021000),new Array(1082114,4005000,4005002,4021008));
            var matQtySet = new Array(new Array(2,8,3,70,55),new Array(1,6,4),new Array(1,8,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,3,8),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //bowman glove
            var itemSet = new Array(1082106,1082107,1082108,1082109,1082110,1082111,1082112);
            var matSet = new Array(new Array(4005002,4021005,4011004,4000030,4003000),new Array(1082106,4021006,4011006),new Array(1082106,4021007,4021008),new Array(4005002,4005000,4021000,4000030,4003000),new Array(1082109,4005002,4005000,4021005),new Array(1082109,4005002,4005000,4021003),new Array(1082109,4005002,4005000,4021008));
            var matQtySet = new Array(new Array(2,8,3,70,55),new Array(1,5,3),new Array(1,2,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,1,1,7),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //mage glove
            var itemSet = new Array(1082098,1082099,1082100,1082121,1082122,1082123);
            var matSet = new Array(new Array(4005001,4011000,4011004,4000030,4003000),new Array(1082098,4021002,4021007),new Array(1082098,4021008,4011006),new Array(4005001,4005003,4021003,4000030,4003000),new Array(1082121,4005001,4005003,4021005),new Array(1082121,4005001,4005003,4021008));
            var matQtySet = new Array(new Array(2,6,6,70,55),new Array(1,6,2),new Array(1,3,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,2,1,4));
            var costSet = new Array(90000,90000,100000,100000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //thief glove
            var itemSet = new Array (1082095,1082096,1082097,1082118,1082119,1082120);
            var matSet = new Array(new Array(4005003,4011000,4011003,4000030,4003000),new Array(1082095,4011004,4021007),new Array(1082095,4021007,4011006),new Array(4005003,4005002,4011002,4000030,4003000),new Array(1082118,4005003,4005002,4021001),new Array(1082118,4005003,4005002,4021000));
            var matQtySet = new Array(new Array(2,6,6,70,55),new Array(1,6,2),new Array(1,3,3),new Array(2,1,8,90,60),new Array(1,1,1,7),new Array(1,2,1,8));
            var costSet = new Array(90000,90000,100000,100000,110000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "����Ҫ���� #t" + item + "# �������Ļ�������Ҫ������ϡ����⣬�뱣֤���㹻�İ����ռ䡣#b";

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
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }
			
        if (!complete)
            cm.sendOk("�����Ҫһ�����ʵ����ף��Ͳ���ʹ���������������");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
					
            cm.gainMeso(-cost);
            cm.gainItem(item, 1);
            cm.sendOk("����ˡ�����㻹��Ҫ�����Ķ������������Ҿͺá�");
        }
        cm.dispose();
    }
}