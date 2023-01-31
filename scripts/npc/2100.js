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
	NPC Name: 		Sera
	Map(s): 		Maple Road : Entrance - Mushroom Town Training Camp (0), Maple Road: Upper level of the Training Camp (1), Maple Road : Entrance - Mushroom Town Training Camp (3)
	Description: 		First NPC
*/

var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3) {
        cm.sendYesNo("��ӭ����ð�յ����硣���ѵ��Ӫ��Ŀ���ǰ�����ѧ�ߡ�����μ����ѵ��Ӫ����Щ��û�вμ���ѵ�γ̾Ϳ�ʼ�����ǵ��ó̡�����ǿ�ҽ������Ȳμ���ѵ�γ̡�");
    } else {
        cm.sendNext("��������ѵ�ƻ���ʼ�ĵ�һ��ͼ���ҡ������������㽫��ǰ�˽���ѡ���ְҵ��");
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && status == 0) {
            cm.sendYesNo("����������Ͽ�ʼ����ó���");
            return;
        } else if (mode == 0 && status == 1 && type == 0) {
            status -= 2;
            start();
            return;
        } else if (mode == 0 && status == 1 && type == 1) {
            cm.sendNext("������Ѿ����˾��������ٴκ��ҶԻ�");
        }
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3) {
        if (status == 0) {
            cm.sendNext("�õģ����Ҿ��������ѵ��Ӫ�������ӽ�Ա��ָ�ӡ�");
        } else if (status == 1 && type == 1) {
            cm.sendNext("���������ڲ��μ�ѵ���ƻ�������¿�ʼ����ó̡�Ȼ���һ�����ȥѵ������С��~");
        } else if (status == 1) {
            cm.warp(1, 0);
            cm.dispose();
        } else {
            cm.warp(40000, 0);
            cm.dispose();
        }
    } else if (status == 0) {
        cm.sendPrev("һ�����㹻Ŭ��ѵ����������ʸ���һ��ְҵ������Գ�Ϊ�����ȵĹ����֣���˹��ħ��ʦ������������սʿ�����³�ķ���������");
    } else {
        cm.dispose();
    }
}