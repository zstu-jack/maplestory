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
/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
var status = 0;

function start() {
    cm.sendSimple("����˵������۸�����һƬ��������������#b�ƽ�̲#k��ֻҪ֧��#b1500���#k����ʹ��#b��������ȯ#k���ҾͿ�������ȥ���\\r\\n\\r\\n#L0##b��Ը�⸶ 1500��ҡ�#l\\r\\n#L1#������������ȯ��#l\\r\\n#L2#ʲô����������ȯ��#k#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1)
        if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
            if(type == 1)
                cm.sendNext("�������ﻹ��Щ����Ҫ�����𣿿����������ƣ�����кʹ����ˡ�������Ϣ������ı������⣬��������̸̸��");
            cm.dispose();
            return;
        } else
            status -= 2;
    if (selection == 0)
        status++;
    if(status == 1){
        if(selection == 1)
            cm.sendYesNo("����#b��������ȯ#k���ǾͿ�����ʱʹ����ǰ���ƽ𺣰�������ҪС�ģ��Ǹ���Ҳ���й���ġ���ô������Ҫǰ���ƽ𺣰���");
        else if (selection == 2)
            cm.sendNext("��һ���ܺ��� #b��������ȯ#k ��ʲô����������Ҳ�ѹ֡�ӵ����������ȯ�Ļ����Ϳ������ǰ���ƽ𺣰����ⶫ����������֣��Һò����ײ���һ�š���֮ǰ��С��Ū���ˡ�");
    } else if (status == 2){
        if(type != 1 && selection != 0) {
            cm.sendNextPrev("Ū�����Ժ����ʱ���о�������͸�ˡ�ϣ���������������Ʊ��ܡ���֮���ҵĹ��¾��������ˣ��������������ͺú�ʹ�á�����ʲô����Ļ��������������ʡ�");
            cm.dispose();
        } else{
            if (cm.getMeso() < 1500 && selection == 0)
                cm.sendNext("��Ľ�Ҳ��㡣");
            else if(!cm.haveItem(4031134) && selection != 0){
                cm.sendNext("���#b��������ȯ#k ���Ķ����ǲ���Ū���ˣ��ú����Ұɡ�");
            }else{
                if(selection == 0)
                    cm.gainMeso(-1500);
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
            }
            cm.dispose();
        }
    }
}