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
/* Author: kevintjuh93
    NPC Name:         Harry
    Map(s):         
    Description:         Event Assistant
*/
var status = 0;

function start() {
    status = -1;
	cm.sendSimple("���...�������Ȱ�~��ʲô��Ҫ��æ����\r\n#L0##b��Ҫ�뿪���ͼ��#l\r\n#L1#B�������� (���� 1���)");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        }
        if (status == 0) {
            if (selection == 0) {
                cm.sendYesNo("��������뿪�Ļ�����������24Сʱ�ڶ��޷��ٴβ�����ȷ��Ҫ�뿪��");
                } else if (selection == 1) {
                if (cm.getMesos < 1 && !cm.canHold(1322005)) {
                cm.sendOk("��û���㹻�Ľ�ң��򱳰�û�п�λ��");
                cm.dispose();
                } else {
                cm.gainItem(1322005);
		cm.gainMeso(-1);
                cm.dispose();
                }
                }
        } else if (status == 1) {
		if (cm.getEvent() != null) {
		    cm.getEvent().addLimit();
		}
                cm.warp(109050001, 0);
                cm.dispose();
                }
}
        
  