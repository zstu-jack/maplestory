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
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("�������Ҵ����㽫ǰ��һ������Ĵ�½������ #e150���#n���ҽ�����ǰ�� #b������#k�������ǣ�һ�����뿪����ط��������Ҳ�ز����ˡ�����ô��Ϊ������ȥ��������");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 1) {
            status -= 2;
        } else if (type == 1 || (mode == -1 && type != 1)) {
            if (mode == 0) {
                cm.sendOk("emm���Ҳ��������⻹��һЩ����Ҫ��...");
            }
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801)) {
            cm.sendNext("Okay�����ڸ���150���... Hey������ʲô�����Ǵ峤¬��˹�Ľ���������Ӧ�ø����������Ǹ���������ɣ��˹�ǳ�����ΰ����ˣ���Ȼ����¬��˹���Ƽ��ţ���ô����Ϊ���зǳ��ǳ����Ǳ����Ϊһ��ΰ���ð�ռҡ���������Ҳ��������շѣ�");
        } else {
            cm.sendNext("���������ط������ȸ��� #e150���#n ...");
        }
    } else if (status == 2) {
        if (cm.haveItem(4031801)) {
            cm.sendNextPrev("��Ȼ�����Ƽ��ţ��ҾͲ�����ķ��á����ˣ�ϵ�ð�ȫ������Ϊ�������ھ�Ҫȥ�����������ܻ��е㶯������");
        } else if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("ʲô������˵���벻��Ǯ���ߣ����Ǹ����ˡ�����");
                cm.dispose();
            } else {
                cm.sendNext("�ǳ��ã� #e150#n ������յ����õģ������ų���ȥ��������");
            }
        } else {
            cm.sendOk("�����ǿ����������Ҿ����㲻��ǿ׳����������ٴﵽ7������ȥ��������");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}