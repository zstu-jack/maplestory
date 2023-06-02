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
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

var cd_item = 4001078;
var cd_mats = new Array(4011001,4011002,4001079);
var cd_matQty = new Array(1,1,1);
var cd_cost = 25000;

function start() {
    cm.getPlayer().setCS(true);
    var selStr = "��Ҫ�͹�һ�����������������ϲ���Ļ����ҿ��԰�����������ע����������С������������㹻ǿ����������ܳ�����������...#b"
    var options = new Array("��������ʲô��","����սʿ����","��������������","������ʦ����","������������",
    "ʹ�ø���������սʿ����","ʹ�ø�������������������","ʹ�ø�����������ʦ����","ʹ�ø�����������������");
        
    if(cm.isQuestStarted(7301) || cm.isQuestStarted(7303)) options.push("���� #t4001078#");
    
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
        if (selectedType > 5 && selectedType < 11) {
            stimulator = true;
            selectedType -= 5;
        }
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("��������һ���������ض���Ʒ������������ӵ�����ҩ�����������ṩ�������������Դ��¡������п��ܲ������仯��Ҳ�п���ʹ����Ʒ�ʱ�͡����⣬��10%�ĸ�������Ʒ��ʧ������������ѡ��ʹ�á�")
            cm.dispose();
        } else if (selectedType == 1){ //warrior weapon
            var selStr = "�ܺã���׼������һ��սʿ������ע���������أ�#b";
            var weapon = new Array ("�������罣#k - �ȼ�.110 ���ֽ�#b","����ŭն#k - �ȼ�.110 ���ָ�#b","�����ش�#k - �ȼ�.110 ���ֶ���#b","�����޽�#k - �ȼ�.110 ˫�ֽ�#b","����ħ����#k - �ȼ�.110 ˫�ָ�#b","�������촸#k - �ȼ�.110 ˫�ֶ���#b",
                "�����߳�ǹ#k - �ȼ�.110 Spear#b","Ѫ����#k - �ȼ�.110 ì#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 2){ //bowman weapon
            var selStr = "�ܺã���׼������һ�ѹ�����������ע���������أ�#b";
            var weapon = new Array ("������ṭ#k - �ȼ�.110 ��#b","�ƽ������#k - �ȼ�.110 Crossbow#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 3){ //magician weapon
            var selStr = "�ܺã���׼������һ�ѷ�ʦ������ע���������أ�#b";
            var weapon = new Array ("��̫������#k - �ȼ�.108 ����#b","�ھ�������#k - �ȼ�.110 ����#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 4){ //thief weapon
            var selStr = "�ܺã���׼������һ�ѷ���������ע���������أ�#b";
            var weapon = new Array ("����������#k - �ȼ�.110 �̵�������#b","����������#k - �ȼ�.110 �̵����ˣ�#b","��ľ����ȭ#k - �ȼ�.110 ȭ��#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 5){ //pirate weapon
            var selStr = "�ܺã���׼������һ�Ѻ���������ע���������أ�#b";
            var weapon = new Array ("˺����#k - �ȼ�.110 Knuckle#b","����#k - �ȼ�.110 Gun#b");
            for (var i = 0; i < weapon.length; i++){
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
	}
        else if (selectedType == 11){ //cornian's dagger
            var selStr = "ร���׼��Ǳ����Ⱥ����֮�оȳ�Ħ�������һᾡ�����ܵذ����㡣����һ�ײ��ϣ��һ������һ���㹻�Լ������ #t4001078#��";
            cm.sendNext(selStr);
	}
    } else if (status == 2) {
        selectedItem = selection;
        
        if (selectedType == 1){ //warrior weapon
            var itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
            var matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
                new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
            var matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
            var costSet = new Array(120000,120000,120000,120000,120000,120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2){ //bowman weapon
            var itemSet = new Array(1452044,1462039);
            var matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
            var matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3){ //magician weapon
            var itemSet = new Array(1372032,1382036);
            var matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
            var matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4){ //thief weapon
            var itemSet = new Array(1332049,1332050,1472051);
            var matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
            var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
            var costSet = new Array(120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 5){ //pirate weapon
            var itemSet = new Array(1482013,1492013);
            var matSet = new Array(new Array(1482012,4000244,4000245,4005000,4005002),new Array(1492012,4000244,4000245,4005000,4005002));
            var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 11){ //cornian's dagger
            item = cd_item;
            mats = cd_mats;
            matQty = cd_matQty;
            cost = cd_cost;
        }
        
        var prompt = "����Ҫ���� #t" + item + "# �������Ļ�������Ҫ������ϡ����⣬�뱣֤���㹻�İ����ռ䡣#b";
        if(stimulator){
            stimID = getStimID(item);
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        }
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
            cm.sendOk("ȫ��ľ����Ҳ�Ҳ����ڶ����շѱ��Ҹ��������ˣ�����㸶���������ļ۸񣬾��߰ɡ�");
            cm.dispose();
            return;
        } else {
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
            cm.sendOk("û���ö�Ӧ�Ĳ����������Ļ������������������ò��ȶ����������в����������Ұɡ�");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else
                cm.gainItem(mats, -matQty);
            cm.gainMeso(-cost);
            if (stimulator) { //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("������ɡ������ƴ������������Ҫ�������ŭ��������");
                } else {
                    cm.sendOk("������̫�ã������������������˾��ҵĳ�ͻ...���������ʧ���ҷǳ���Ǹ��");
                }
            }
            else {//just give basic item
                cm.gainItem(item, 1);
                cm.sendOk("������ɡ������ƴ������������Ҫ�������ŭ��������");
            }
        }
        cm.dispose();
    }
}

function getStimID(equipID){
    var cat = Math.floor(equipID / 10000);
    switch (cat){
        case 130: //1h sword
            return 4130002;
        case 131: //1h axe
            return 4130003;
        case 132: //1h bw
            return 4130004;
        case 140: //2h sword
            return 4130005;
        case 141: //2h axe
            return 4130006;
        case 142: //2h bw
            return 4130007;
        case 143: //spear
            return 4130008;
        case 144: //polearm
            return 4130009;
        case 137: //wand
            return 4130010;
        case 138: //staff
            return 4130011;
        case 145: //bow
            return 4130012;
        case 146: //xbow
            return 4130013;
        case 148: //knuckle
            return 4130016;
        case 149: //pistol
            return 4130017;
        case 133: //dagger
            return 4130014;
        case 147: //claw
            return 4130015;
    }
    return 4130002;
}