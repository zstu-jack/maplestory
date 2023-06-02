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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Shuri the Tour Guide - Orbis (200000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version
---------------------------------------------------------------------------------------------------
**/

var pay = 2000;
var ticket = 4031134;
var msg;
var check;

var status = 0;

function start() {
    cm.sendSimple("����˵����ӵ������������������������Ƭ #b#m110000000##k �������� #m"+cm.getPlayer().getMapId()+"# ��Ȼ������ЩңԶ������ֻҪ֧�� #b"+pay+" ���#k��ʹ�� #b#t"+ticket+"##k���ҾͿ�������ȥ���\r\n\r\n#L0##b��Ը�⸶ "+pay+" ��ҡ�#k#l\r\n#L1##b���� #t"+ticket+"#��#k#l\r\n#L2##bʲô�� #t"+ticket+"#��#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendNext("�������ﻹ��Щ����Ҫ�����𣿿����������ƣ�����кʹ����ˡ�������Ϣ������ı������⣬��������̸̸��");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0)
                    msg = "Ҫ֧�� #b"+pay+" ���#k ǰ�� #m110000000#��";
                else if (selection == 1)
                    msg = "���� #b#t"+ticket+"##k �������Ļ����������ʱʹ�������ǰ�� #m110000000#��";
                cm.sendYesNo(msg+"����ҪС�ģ��Ǹ���Ҳ���й���ġ���ô������Ҫǰ�� #m110000000# ��");
            } else if (selection == 2) {
                cm.sendNext("��һ���ܺ��� #b#t"+ticket+"##k ��ʲô����������Ҳ�ѹ֡�ӵ�� #b#t"+ticket+"##k �Ļ����Ϳ������ǰ���ƽ𺣰����ⶫ����������֣��Һò����ײ���һ�š���֮ǰ��С��Ū���ˡ�");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getMeso() < pay) {
                    cm.sendOk("��Ľ�Ҳ��㡣");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("��� #b#t"+ticket+"##k ���Ķ����ǲ���Ū���ˣ��ú����Ұɡ�");
                    cm.dispose();
                } else
                    access = true;
            }
            if (access) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3) 
            cm.sendNext("��һ���ܺ��� #b#t"+ticket+"##k ��ʲô����������Ҳ�ѹ֡�ӵ�� #b#t"+ticket+"##k �Ļ����Ϳ������ǰ���ƽ𺣰����ⶫ����������֣��Һò����ײ���һ�š���֮ǰ��С��Ū���ˡ�");
        else if (status == 4)
            cm.sendPrev("Ū�����Ժ����ʱ���о�������͸�ˡ�ϣ���������������Ʊ��ܡ���֮���ҵĹ��¾��������ˣ��������������ͺú�ʹ�á�����ʲô����Ļ��������������ʡ�");
        else if (status == 5)
            cm.dispose();
        
    }
}