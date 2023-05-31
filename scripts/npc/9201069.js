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
/* V. Isage
	NLC VIP Eye Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_v = Array(20000, 20001, 20003, 20004, 20005, 20006, 20008, 20012, 20031);
var fface_v = Array(21001, 21002, 21003, 21004, 21005, 21006, 21008, 21012, 21016);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("��ã���ӭ������Ҷ������ҽԺ����Ҫ���������Ȼһ����ֻҪһ�� #b#t5152034##k ����Ϳ������ܸ����������ݷ���ӵ�������������ò��\r\n#L2#�ı����ͣ�#i5152034##t5152034##l");
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mface_v.length; i++)
                        pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace()% 100));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fface_v.length; i++)
                        pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                cm.sendStyle("��������...�����һ��#b#t5152034##k�Ļ����ҿ������������Ȼһ�¡�ѡ������Ҫ��Ч���ɡ�", facenew);
            }
        }
        else if (status == 2){
            if (cm.haveItem(5152034)){
                cm.gainItem(5152034, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("���ˣ�����������̾��������Ͱɣ�");
            } else {
                cm.sendOk("�ܱ�Ǹ�����û�����ݻ�Ա���Ļ������޷�Ϊ�����");
            }
            
            cm.dispose();
        }
    }
}
