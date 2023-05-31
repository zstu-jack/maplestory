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

/* Rinz the assistant
	Orbis Random Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_d = Array(30030, 30020, 30000, 30270, 30230);
var fhair_d = Array(31040, 31000, 31250, 31220, 31260);
var mhair_r = Array(30230, 30260, 30280, 30340, 30490, 30530, 30630, 30740);
var fhair_r = Array(31110, 31220, 31230, 31630, 31650, 31710, 31790, 31890, 31930);
var mhair_e = Array(30230, 30280, 30340, 30490, 30530, 30740);
var fhair_e = Array(31110, 31220, 31230, 31710, 31790, 31890, 31930);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("��������˹��������������֡������ӵ�� #b#t5154000##k��#b#t5150004##k��#b#t5150013##k �� #b#t5151004##k ����һ�ֵĻ����ҾͿ���Ϊ��������Ҫѡ����һ����������\r\n#L0#���ķ��ͣ�#i5154000##t5154000##l\r\n#L1#���ķ��ͣ�#i5150004##t5150004##l\r\n#L2#���ķ��ͣ�#i5150013##t5150013##l\r\n#L3#���ķ�ɫ��#i5151004##t5151004##l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                beauty = 4;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair_d.length; i++)
                        pushIfItemExists(hairnew, mhair_d[i] + parseInt(cm.getPlayer().getHair() % 10));
                else
                    for (var i = 0; i < fhair_d.length; i++)
                        pushIfItemExists(hairnew, fhair_d[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendYesNo("���ʹ��ɢ�����ͻ�Ա������ķ��ͽ���#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5154000##k ���ı���ķ�����");
            } else if (selection == 1) {
                beauty = 3;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair_r.length; i++)
                        pushIfItemExists(hairnew, mhair_r[i] + parseInt(cm.getPlayer().getHair() % 10));
                else
                    for (var i = 0; i < fhair_r.length; i++)
                        pushIfItemExists(hairnew, fhair_r[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendYesNo("���ʹ����ͨ��Ա������ķ��ͽ���#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5150004##k ���ı���ķ�����");
            } else if (selection == 2) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair_e.length; i++)
                        pushIfItemExists(hairnew, mhair_e[i] + parseInt(cm.getPlayer().getHair() % 10));
                else
                    for (var i = 0; i < fhair_e.length; i++)
                        pushIfItemExists(hairnew, fhair_e[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendYesNo("���ʹ����ͨ��Ա������ķ��ͽ���#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5150013##k ���ı���ķ�����");
            } else if (selection == 3) {
                beauty = 2;
                haircolor = Array();
                var current = (cm.getPlayer().getHair() / 10) | 0;
                for (var i = 0; i < 8; i++)
                    pushIfItemExists(haircolor, current + i);
                cm.sendYesNo("���ʹ����ͨ��Ա������ķ�ɫ����#r���#k�ı䣬�п��ܱ�Ϊȫ�·��ȷ��Ҫʹ�� #b#t5151004##k ���ı���ķ�ɫ��");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150013)){
                    cm.gainItem(5150013, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("���ˣ�����������̾����·��Ͱɣ�");
                } else
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
            } else if (beauty == 2){
                if (cm.haveItem(5151004)){
                    cm.gainItem(5151004, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("���ˣ�����������̾����·�ɫ�ɣ�");
                } else
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
            } else if (beauty == 3){
                if (cm.haveItem(5150004)){
                    cm.gainItem(5150004, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("���ˣ�����������̾����·��Ͱɣ�");
                } else
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
            } else if (beauty == 4){
                if (cm.haveItem(5154000)){
                    cm.gainItem(5154000, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("���ˣ�����������̾����·��Ͱɣ�");
                } else
                    cm.sendOk("��������û�����ǵĻ�Ա���������Ҳ���Ϊ���ṩ����");
            } else if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150013, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151004, 1);
                    cm.sendOk("лл�ݹˡ�");
                } else
                    cm.sendOk("��û���㹻�Ľ���������Ա����");
            }
        }
    }
}
