/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Tepei
	Showa VIP Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30260, 30280, 30340, 30710, 30780, 30800, 30810, 30820, 30920);
var fhair_v = Array(31000, 31030, 31100, 31350, 31460, 31550, 31770, 31790, 31850);
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
            cm.sendSimple("��ӭ�����Ѻͽ������ꡣ�������#b#t5150009##k �� #b#t5151009##k �����뵽������������¡�ѡ������Ҫʹ�õķ���\r\n#L1#���ķ��ͣ�#i5150009##t5150009##l\r\n#L2#���ķ�ɫ��#i5151009##t5151009##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                    }
                }
                cm.sendStyle("�ҿ��Խ����ͷ���޼���ȫ�µ����ͣ����㿴������˧����������ô�����һ���ϸ����ģ�������ġ�ѡһ����ϲ���ķ��Ͱɡ�", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("�ҿ��Խ����ͷ��Ⱦ��ȫ�µ���ɫ�����㿴������˧��������ֻ��Ҫһ��#b#t5151009##k����ô�����һ���ϸ����ģ�������ġ�ѡһ����ϲ���ķ�ɫ�ɡ�", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150009)){
                    cm.gainItem(5150009, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("���ˣ�����������̾����·��Ͱɣ�");
                } else {
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151009)){
                    cm.gainItem(5151009, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("���ˣ�����������̾����·�ɫ�ɣ�");
                } else {
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150009, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151009, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else {
                    cm.sendOk("��û���㹻�Ľ���������Ա����");
                }
            }
        }
    }
}
