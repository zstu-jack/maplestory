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
status = -1;


var travelFrom = [777777777, 541000000];
var travelFee = [3000, 10000];

var travelMap = [800000000, 550000000];
var travelPlace = ["�Ŵ����� - �ձ�", "��¡���� - ��������"];
var travelPlaceShort = ["�Ŵ�����", "��¡����"];
var travelPlaceCountry = ["�ձ�", "��������"];
var travelAgent = ["��", "#r#p9201135##k"];

var travelDescription = ["�����������ձ��Ļ��ľ��裬�ι��������ٺò�����ѡ���ˣ������ձ��Ļ��Ĵ���¯�����Ŵ�������һ����˵���Թ������͹�����Ģ��֮���ʤ�ء�",
                        "�����ȥ���л����ĵط������ȴ����飬�������ǵľ�������е��д��㡣���⣬��¡���б�����ǵ��صľ������ģ���������������羰�ȴ��ο�ȥ���ˡ�"];

var travelDescription2 = ["��������Խ�����Ӵ��̷�Ģ��֮�����Ů��������ǿ���Ƽ���һ�����ձ���ͷ���۵���ʳ���������ա�����ȡ����ڣ�������ǰ��#b�Ŵ�����#k��һ���񻰰�ĵط���",
                        "�ִ�����ʱ����ǿ�ҽ����㲦��ʱ��ȥ�ι�һ�¸ʰ�塣Ϊʲô����һ��֪���Ǹ��������λ����⹫԰����ɭ����ɣ���֪�������������������⹫԰�ˣ�ֵ��һ�Σ����ڣ�������ǰ��#b�������ǵļ�¡����#k�ɡ�"];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1,0,0);
}

function getTravelingStatus(mapid) {
    for(var i = 0; i < travelMap.length; i++) {
        if(mapid == travelMap[i]) {
            return i;
        }
    }
    
    return -1;
}

function getTravelType(mapid) {
    for(var i = 0; i < travelFrom.length; i++) {
        if(mapid == travelFrom[i]) {
            return i;
        }
    }
    
    return 0;
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    
    if (travelStatus != -1) {
        if (status == 0) 
            cm.sendSimple("�����������������������#b\r\n#L0#�ǵģ���������úܾ��ˡ����뷵��#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#��\r\n#L1#�����һ������������̽��һ��ʱ�䡣");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("�õģ��һ����ص������ձ�֮ǰ�ĳ����ص㡣���������ٴ����У�������ҡ�");
            } else if (selection == 1) {
                cm.sendOk("�õģ������ı����⣬�ǵø����ҡ�");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) map = 104000000;
            
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("���������˵�����ζ���ճ�����ʹ�����������ζ��ô���������µ��Ļ�����ʱ�޿̲���ѧϰ��֪ʶ����ֱ���ܸ����ˣ�����ʱ����һ�������ˡ����Ƿ�Ҷ�������Ƽ������#b��������#k�������ڵ����÷��𣿴�ɲ��أ�����#b��Ҷ������#k�Ѿ������ƶ������мƻ�������ֻ��#b" + cm.numberWithCommas(travelFee[travelType]) + "���#k��");
        } else if (status == 1) {
            cm.sendSimple("����ĿǰΪ���ṩ���µ������������з���#b" + travelPlace[travelType] + "#k��" + travelAgent[travelType] + "����������Ϊ����Ϊ����������ģ�Ŀ�ĵص�����������ʱ�����Ʋ������ӡ����ڣ�����ǰ��" + travelPlaceShort[travelType] + "��#b\r\n#L0#�ǵģ�������ȥ" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            cm.sendNext("����Ҫȥ#b" + travelPlace[travelType] + "#k������ " + travelDescription[travelType]);
        } else if (status == 3) {
            if(cm.getMeso() < travelFee[travelType]){
                cm.sendNext("��û���㹻�Ľ��ȥ���С�");
                cm.dispose();
                return;
            }
            cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 4) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}