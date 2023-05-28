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
/* Brittany
	Henesys Random Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_r = Array(30060, 30140, 30200, 30210, 30310, 30610, 33040, 33100);
var fhair_r = Array(31070, 31080, 31150, 31300, 31350, 31700, 34050, 34110);
var mhair_e = Array(30030, 30140, 30200, 30210, 30310, 30610, 33040, 33100);
var fhair_e = Array(31070, 31150, 31300, 31350, 31430, 31700, 34050, 34110);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
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
            cm.sendSimple("�ˣ�����#p1012104# ������� #b#t5150000##k ���� #b#t5151000##k, �ҾͿ�����Ѱ���Ū�ÿ���ͷ���� \r\n#L0#ʹ��: #i5150000##t5150000##l\r\n#L1#ʹ��: #i5151000##t5151000##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 3;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_r.length; i++)
                        pushIfItemExists(hairnew, mhair_r[i] + parseInt(cm.getPlayer().getHair()% 10));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_r.length; i++)
                        pushIfItemExists(hairnew, fhair_r[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendYesNo("�����ʹ����ͨ��ȯ����ķ��ͻ�����仯���л�����һ�ֿ��ŵ���ʵ�����������#b#t5150000##k���ı���ķ�����");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_e.length; i++)
                        pushIfItemExists(hairnew, mhair_e[i] + parseInt(cm.getPlayer().getHair()% 10));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_e.length; i++)
                        pushIfItemExists(hairnew, fhair_e[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendYesNo("�����ʹ���������Ⱦɫȯ�����ͷ����ɫ������仯���л�����һ���µķ�ɫ��������ó�����ϲ��������#b#t5150010###k���ı���ķ�ɫ��");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    pushIfItemExists(haircolor, current + i);
                cm.sendYesNo("�����ʹ����ͨ��ȯ�����ͷ��������仯���Ƿ���Ҫʹ��#b#t5151000##k�����и��ģ�");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150010) == true){
                    cm.gainItem(5150010, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("�·��ͻ����ˣ��������!");
                } else {
                    cm.sendOk("�š���������û�����ǵ���ȯ������û�����������Ҳ��ܸ��������Բ��𡣡���");
                }
            } else if (beauty == 2){
                if (cm.haveItem(5151000) == true){
                    cm.gainItem(5151000, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("��������·�ɫ�ɣ�������ɣ�");
                } else {
                    cm.sendOk("�š���������û������ָ����Ⱦɫȯ����������û�����Ҳ��ܸ���Ⱦ�����Բ��𡣡���");
                }
            } else if (beauty == 3){
                if (cm.haveItem(5150000) == true){
                    cm.gainItem(5150000, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("�·������������ˣ�");
                } else {
                    cm.sendOk("�š���������û�����ǵ���ȯ������û�����������Ҳ��ܸ��������Բ��𡣡���");
                }
            } else if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150010, 1);
                    cm.sendOk("��������!������");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151000, 1);
                    cm.sendOk("��������!������");
                } else {
                    cm.sendOk("��û���㹻�Ľ���������Ż�ȯ��");
                }
            }
        }
    }
}
