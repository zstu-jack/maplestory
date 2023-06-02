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

/* Sarah
	Ludibrium : Tara and Sarah's House (220000303)

	Refining NPC:
	* Gloves - All classes, 30-50, stimulator (4130000) available on upgrades
	* Price is 90% of locations on same items
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var stimulator = false;
var stimID = 4130000;

function start() {
    cm.getPlayer().setCS(true);

    var selStr = "��ã���ӭ������߳����׵꣬��ʲô�ܰ���ģ�#b"
    var options = new Array("��������ʲô��","����սʿ����","��������������","������ʦ����","������������",
        "ʹ�ø���������սʿ����","ʹ�ø�������������������","ʹ�ø�����������ʦ����","ʹ�ø�����������������");
    for (var i = 0; i < options.length; i++){
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 1) {
        selectedType = selection;
        if (selectedType > 4)
            stimulator = true;
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("��������һ���������ض���Ʒ������������ӵ�����ҩ�����������ṩ�������������Դ��¡������п��ܲ������仯��Ҳ�п���ʹ����Ʒ�ʱ�͡����⣬��10%�ĸ�������Ʒ��ʧ������������ѡ��ʹ�á�")
            cm.dispose();
        } else if (selectedType == 1){ //warrior glove
            var selStr = "����Ҫ��������սʿ���ף�#b";
            var items = new Array ("��ͭ��������k - սʿ �ȼ�.30#b","�����������#k - սʿ �ȼ�.35#b","����ָ������#k - սʿ �ȼ�.40#b","�����Ͻ�����#k - սʿ �ȼ�.50#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 2){ //bowman glove
            var selStr = "����Ҫ�������ֹ��������ף�#b";
            var items = new Array ("�ֻ�������#k - ������ �ȼ�.30#b","��ͭ��������#k - ������ �ȼ�.35#b","����������#k - ������ �ȼ�.40#b","����־����#k - ������ �ȼ�.50#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 3){ //magician glove
            var selStr = "����Ҫ�������ַ�ʦ���ף�#b";
            var items = new Array ("���ػ�����#k - ��ʦ �ȼ�.30#b","����ʥ����#k - ��ʦ �ȼ�.35#b","�쾫������#k - ��ʦ �ȼ�.40#b","��Ԫ������#k - ��ʦ �ȼ�.50#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 4){ //thief glove
            var selStr = "����Ҫ�������ַ������ף�#b";
            var gloves = new Array ("������������#k - ���� �ȼ�.30#b","����׷������#k - ���� �ȼ�.35#b","����������#k - ���� �ȼ�.40#b","��������#k - ���� �ȼ�.50#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 5){ //warrior glove w/ Stim
            var selStr = "����Ҫ #rʹ�ø�����#k ��������սʿ���ף�#b";
            var crystals = new Array ("���ƻ�������#k - սʿ �ȼ�.30#b","�Ͽ��������#k - սʿ �ȼ�.30#b","���������#k - սʿ �ȼ�.35#b","���������#k - սʿ �ȼ�.35#b",
                "���ָ������#k - սʿ �ȼ�.40#b","��ָ������#k - սʿ �ȼ�.40#b","﮿�Ͻ�����#k - սʿ �ȼ�.50#b","�ƽ�Ͻ�����#k - սʿ �ȼ�.50#b");
            for (var i = 0; i < crystals.length; i++){
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 6){ //bowman glove w/ stim
            var selStr = "����Ҫ #rʹ�ø�����#k �������ֹ��������ף�#b";
            var crystals = new Array ("�̻�������#k - ������ �ȼ�.30#b","�ڻ�������#k - ������ �ȼ�.30#b","﮿���������#k - ������ �ȼ�.35#b","�ƽ���������#k - ������ �ȼ�.35#b","�ƽ���������#k - ������ �ȼ�.40#b","����������#k - ������ �ȼ�.40#b","����־����#k - ������ �ȼ�.50#b","����־����#k - ������ �ȼ�.50#b");
            for (var i = 0; i < crystals.length; i++){
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 7){ //magician glove w/ stim
            var selStr = "����Ҫ #rʹ�ø�����#k �������ַ�ʦ���ף�#b";
            var items = new Array ("���ػ�����#k - ��ʦ �ȼ�.30#b","���ػ�����#k - ��ʦ �ȼ�.30#b","����ʥ����#k - ��ʦ �ȼ�.35#b","����ʥ����#k - ��ʦ �ȼ�.35#b",
                "����������#k - ��ʦ �ȼ�.40#b","�ھ�������#k - ��ʦ �ȼ�.40#b","��Ԫ������#k - ��ʦ �ȼ�.50#b","��Ԫ������#k - ��ʦ �ȼ�.50#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 8){ //thief glove w/ stim
            var selStr = "����Ҫ #rʹ�ø�����#k �������ַ������ף�#b";
            var gloves = new Array ("����������#k - ���� �ȼ�.30#b","�ƽ𱩷�����#k - ���� �ȼ�.30#b","�Ͽ�׷������#k - ���� �ȼ�.35#b","�ƽ�׷������#k - ���� �ȼ�.35#b","�ƽ���������#k - ���� �ȼ�.40#b",
                "����������#k - ���� �ȼ�.40#b","��������#k - ���� �ȼ�.50#b","��������#k - ���� �ȼ�.50#b");
            for (var i = 0; i < gloves.length; i++){
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2) {
        selectedItem = selection;
        if (selectedType == 1){ //warrior glove
            var itemSet = new Array(1082007,1082008,1082023,1082009);
            var matSet = new Array(new Array(4011000,4011001,4003000),new Array(4000021,4011001,4003000),new Array(4000021,4011001,4003000),new Array(4011001,4021007,4000030,4003000));
            var matQtySet = new Array(new Array(3,2,15),new Array(30,4,15),new Array(50,5,40),new Array(3,2,30,45));
            var costSet = new Array(18000,27000,36000,45000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2){ //bowman glove
            var itemSet = new Array(1082048,1082068,1082071,1082084);
            var matSet = new Array(new Array(4000021,4011006,4021001),new Array(4011000,4011001,4000021,4003000),new Array(4011001,4021000,4021002,4000021,4003000),new Array(4011004,4011006,4021002,4000030,4003000));
            var matQtySet = new Array(new Array(50,2,1),new Array(1,3,60,15),new Array(3,1,3,80,25),new Array(3,1,2,40,35));
            var costSet = new Array(18000,27000,36000,45000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3){ //magician glove
            var itemSet = new Array(1082051,1082054,1082062,1082081);
            var matSet = new Array(new Array(4000021,4021006,4021000),new Array(4000021,4011006,4011001,4021000),new Array(4000021,4021000,4021006,4003000),new Array(4021000,4011006,4000030,4003000));
            var matQtySet = new Array(new Array(60,1,2),new Array(70,1,3,2),new Array(80,3,3,30),new Array(3,2,35,40));
            var costSet = new Array(22500,27000,36000,45000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4){ //thief glove
            var itemSet = new Array(1082042,1082046,1082075,1082065);
            var matSet = new Array(new Array(4011001,4000021,4003000),new Array(4011001,4011000,4000021,4003000),new Array(4021000,4000101,4000021,4003000),new Array(4021005,4021008,4000030,4003000));
            var matQtySet = new Array(new Array(2,50,10),new Array(3,1,60,15),new Array(3,100,80,30),new Array(3,1,40,30));
            var costSet = new Array(22500,27000,36000,45000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 5){ //warrior glove w/stim
            var itemSet = new Array(1082005,1082006,1082035,1082036,1082024,1082025,1082010,1082011);
            var matSet = new Array(new Array(1082007,4011001),new Array(1082007,4011005),new Array(1082008,4021006),new Array(1082008,4021008),new Array(1082023,4011003),new Array(1082023,4021008),
                new Array(1082009,4011002),new Array(1082009,4011006));
            var matQtySet = new Array (new Array(1,1),new Array(1,2),new Array(1,3),new Array(1,1),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,4));
            var costSet = new Array (18000,22500,27000,36000,40500,45000,49500,54000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 6){ //bowman glove w/stim
            var itemSet = new Array (1082049,1082050,1082069,1082070,1082072,1082073,1082085,1082083);
            var matSet = new Array(new Array(1082048,4021003),new Array(1082048,4021008),new Array(1082068,4011002),new Array(1082068,4011006),new Array(1082071,4011006),new Array(1082071,4021008),new Array(1082084,4011000,4021000),new Array(1082084,4011006,4021008));
            var matQtySet = new Array (new Array(1,3),new Array(1,1),new Array(1,4),new Array(1,2),new Array(1,4),new Array(1,2),new Array(1,1,5),new Array(1,2,2));
            var costSet = new Array (13500,18000,19800,22500,27000,36000,49500,54000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 7){ //magician glove w/ stim
            var itemSet = new Array(1082052,1082053,1082055,1082056,1082063,1082064,1082082,1082080);
            var matSet = new Array(new Array(1082051,4021005),new Array(1082051,4021008),new Array(1082054,4021005),new Array(1082054,4021008),new Array(1082062,4021002),new Array(1082062,4021008),
                new Array(1082081,4021002),new Array(1082081,4021008));
            var matQtySet = new Array(new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,3));
            var costSet = new Array (31500,36000,36000,40500,40500,45000,49500,54000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 8){ //thief glove w/ stim
            var itemSet = new Array(1082043,1082044,1082047,1082045,1082076,1082074,1082067,1082066);
            var matSet = new Array(new Array(1082042,4011004),new Array(1082042,4011006),new Array(1082046,4011005),new Array(1082046,4011006),new Array(1082075,4011006),new Array(1082075,4021008),new Array(1082065,4021000),new Array(1082065,4011006,4021008));
            var matQtySet = new Array(new Array(1,2),new Array(1,1),new Array(1,3),new Array(1,2),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,2,1));
            var costSet = new Array (13500,18000,19800,22500,36000,45000,49500,54000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        var prompt = "����Ҫ���� #t" + item + "# �������Ļ�������Ҫ������ϡ����⣬�뱣֤���㹻�İ����ռ䡣#b";
        if(stimulator)
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " ���";
        cm.sendYesNo(prompt);
    } else if (status == 3) {
        var complete = true;
        
        if(!cm.canHold(item, 1)) {
            cm.sendOk("���������Ʒ���Ƿ����㹻�ռ䡣");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost) {
            cm.sendOk("��Ҳ���Ļ������޷�Ϊ��������");
            cm.dispose();
            return;
        }
        else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID)) {
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
            } else
                cm.gainItem(mats, -matQty);
            cm.gainMeso(-cost);
            if (stimulator){ //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainRandomItem(newItem);
                    cm.sendOk("�������������ˡ�С��Щ���������֡�");
                } else {
                    cm.sendOk("�ף��ǲ��Ǹ������Ӷ���...�������������綫���Ѿ��������ˡ���Ǹ�������ǲ�������˿�ġ�");
                }
            } else  {
                cm.gainItem(item, 1);
                cm.sendOk("�������������ˡ�С��Щ���������֡�");
            }
        }
        cm.dispose();
    }
}