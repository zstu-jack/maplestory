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

/* Lilishu
	Mu Lung Random Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_e = Array(30030, 30150, 30240, 30370, 30420, 30550, 30600, 30640, 30700, 30710, 30720, 30750, 30810, 30830);
var fhair_e = Array(31140, 31160, 31180, 31210, 31300, 31430, 31460, 31470, 31660, 31690, 31800, 31890, 31910, 31940);
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
            cm.sendSimple("��ã�����������������֡������ӵ�� #b#t5150024##k �� #b#t5151019##k�Ļ����ҾͿ���Ϊ��������Ҫѡ����һ����������\r\n#L1#���ķ��ͣ�#i5150024##t5150024##l\r\n#L2#���ķ�ɫ��#i5151019##t5151019##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_e.length; i++) {
                        pushIfItemExists(hairnew, mhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_e.length; i++) {
                        pushIfItemExists(hairnew, fhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendYesNo("���ʹ����ͨ��Ա������ķ��ͽ���#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5150024##k ���ı���ķ�����");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()
                    /10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendYesNo("���ʹ����ͨ��Ա������ķ�ɫ����#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5151019##k ���ı���ķ�ɫ��");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150024)){
                    cm.gainItem(5150024, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("���ˣ�����������̾����·��Ͱɣ�");
                } else {
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151019)){
                    cm.gainItem(5151019, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("���ˣ�����������̾����·�ɫ�ɣ�");
                } else {
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150024, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151019, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else {
                    cm.sendOk("��û���㹻�Ľ���������Ա����");
                }
            }
        }
    }
}
