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

/* Vogen
	El Nath: El Nath Market (211000100)
	
	Refining NPC: 
	* Minerals
	* Jewels
	* Moon/Star Rocks
	* Crystals (including Dark)
	* Processed Wood/Screws
	* Arrows/Bronze Arrows/Steel Arrows
*/
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

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
        var selStr = "�ţ�����...Ŷ������˵���Ҹ߳��Ķ��켼���ˣ������Ļ����Һ�����Ϊ��ұ��һЩĸ��...ֻҪ֧�������Ѿͺá�#b"
        var options = new Array("ұ����ʯĸ��","ұ����ʯĸ��","ұ��ϡ�б�ʯ","ұ��ˮ��ĸ��","��������","������֧");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //mineral refine
            var selStr = "����Ҫұ�����ֿ�ʯĸ��#b";
            var minerals = new Array ("��ͭĸ��","����ĸ��","﮿�ʯĸ��","���ʯĸ��","����ĸ��","�Ͽ�ʯĸ��","�ƽ�ĸ��");
            for (var i = 0; i < minerals.length; i++){
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //jewel refine
            var selStr = "����Ҫұ�����ֱ�ʯĸ��#b";
            var jewels = new Array ("ʯ��ʯĸ��","��ˮ��ĸ��","����ʯĸ��","��ĸ��ĸ��","����ʯĸ��","����ʯĸ��","�ƾ�ĸ��","��ʯĸ��","��ˮ��ĸ��");
            for (var i = 0; i < jewels.length; i++){
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //rock refine
            var selStr = "����Ҫұ������ϡ�б�ʯ��#b";
            var items = new Array ("��ʯ","��ʯ");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //crystal refine
            var selStr = "ˮ��ĸ���⸽���ɲ�̫����Ū��...#b";
            var crystals = new Array ("����ˮ��ĸ��","�ǻ�ˮ��ĸ��","����ˮ��ĸ��","����ˮ��ĸ��","Dark Crystal");
            for (var i = 0; i < crystals.length; i++){
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4){ //material refine
            var selStr = "����Ҫ�������ֲ��ϣ�#b";
            var materials = new Array ("ʹ����֦�����ӹ�����ľ��","ʹ��ľ�������ӹ�����ľ��","������˿�� (ÿ��15��)");
            for (var i = 0; i < materials.length; i++){
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 5){ //arrow refine
            var selStr = "����Ҫ�������ּ�֧��#b";
            var arrows = new Array ("��ʸ","��ʸ","��ͭ��ʸ","��ͭ��ʸ","������ʸ","�������ʸ");
            for (var i = 0; i < arrows.length; i++){
                selStr += "\r\n#L" + i + "# " + arrows[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        if (equip)
            status++;
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 0){ //mineral refine
            var itemSet = new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006);
            var matSet = new Array(4010000,4010001,4010002,4010003,4010004,4010005,4010006);
            var matQtySet = new Array(10,10,10,10,10,10,10);
            var costSet = new Array(300,300,300,500,500,500,800);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //jewel refine
            var itemSet = new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008);
            var matSet = new Array(4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008);
            var matQtySet = new Array(10,10,10,10,10,10,10,10,10);
            var costSet = new Array (500,500,500,500,500,500,500,1000,3000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //rock refine
            var itemSet = new Array(4011007,4021009);
            var matSet = new Array(new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006), new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008));
            var matQtySet = new Array(new Array(1,1,1,1,1,1,1),new Array(1,1,1,1,1,1,1,1,1));
            var costSet = new Array(10000,15000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //crystal refine
            var itemSet = new Array (4005000,4005001,4005002,4005003,4005004);
            var matSet = new Array(4004000,4004001,4004002,4004003,4004004);
            var matQtySet = new Array (10,10,10,10,10);
            var costSet = new Array (5000,5000,5000,5000,1000000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //material refine
            var itemSet = new Array (4003001,4003001,4003000);
            var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
            var matQtySet = new Array (10,5,new Array (1,1));
            var costSet = new Array (0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "��Ҫ����#t" + item + "#��������ô�������������٣�";
		
        cm.sendGetNumber(prompt,1,1,100)
    }
    else if (status == 3 && mode == 1) {
        if (equip) {
            selectedItem = selection;
            qty = 1;
        }
        else
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
		
        if (selectedType == 5){ //arrow refine
            var itemSet = new Array(2060000,2061000,2060001,2061001,2060002,2061002);
            var matSet = new Array(new Array (4003001,4003004),new Array (4003001,4003004),new Array (4011000,4003001,4003004),new Array (4011000,4003001,4003004),
            new Array (4011001,4003001,4003005),new Array (4011001,4003001,4003005));
            var matQtySet = new Array (new Array (1,1),new Array (1,1),new Array (1,3,10),new Array (1,3,10),new Array (1,5,15),new Array (1,5,15));
            var costSet = new Array (0,0,0,0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "�������� ";
        if (qty == 1)
            prompt += "һ�� #t" + item + "#?";
        else
            prompt += qty + "�� #t" + item + "#?";
			
        prompt += " ��ô����ȷ����׼�����˶�Ӧ���ϣ����ұ������г���Ŀռ䡣#b";
		
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost * qty + " ���";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 4 && mode == 1) {
        var recvItem = item, recvQty;
                
        if (item >= 2060000 && item <= 2060002) {//bow arrows
            recvQty  = 1000 - (item - 2060000) * 100;
        }
        else if (item >= 2061000 && item <= 2061002) {//xbow arrows
            recvQty  = 1000 - (item - 2061000) * 100;
        }
        else if (item == 4003000) {//screws
            recvQty  = 15 * qty;
        }
        else {
            recvQty  = qty;
        }

        if(!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("���������Ʒ���Ƿ����㹻�ռ䡣");
        } else if (cm.getMeso() < cost * qty) {
            cm.sendOk("��Ҳ���Ļ������޷�Ϊ��������");
        } else {
            var complete = true;
            
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++) {
                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                        complete = false;
                }
            }
            else {
                if (!cm.haveItem(mats, matQty * qty))
                    complete = false;
            }
            
            if (!complete)
                cm.sendOk("ĸ���������㣬�޷����ұ����");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                }
                else
                    cm.gainItem(mats, -matQty * qty);

                if (cost > 0)
                    cm.gainMeso(-cost * qty);

                cm.gainItem(recvItem, recvQty);
                cm.sendOk("�������ˡ�����㻹��Ҫ�������������������ҡ�");
            }
        }
        
        cm.dispose();
    }
}