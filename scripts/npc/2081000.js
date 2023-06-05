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
var temp;
var cost;

var status = 0;

function start() {
    cm.sendSimple("...���ܰ�������ʲô��\r\n#L0##b����ħ������#k#l\r\n#L1##Ϊ��ľ��ķ�չ��������#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("�ٺú����롣�¶����ĺ�͸����ҡ�");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("�㿴�������������ˡ���ʲô��Ҫ��æ����#L0##b���빺��һЩ#t4031346#��#k#l");
        } else {
            cm.sendNext("Ϊ����ľ��ķ�չ...");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4031346##k��һ�����ĵ��ߡ��Ҳ�������������ذ��������㡣����һ��Сæ��˵����ô�����һ�� #b#t4031346##k ��ÿ�� #b30,000���#k �ļ۸������㡣�����Ը�⽻�׵Ļ�����Ҫ���ٸ��أ�",0,0,99);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("I can't sell you 0.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30000;
            cm.sendYesNo("���� #b"+temp+" ��#t4031346##k ��Ҫ���� #b"+cost+" ���#k��ȷ��Ҫ������");
        }
    } else if(status == 4) {
        if(cm.getMeso() < cost || !cm.canHold(4031346)) {
            cm.sendOk("�����Ƿ����㹻�Ľ�ҹ������ӡ����⣬ҲҪ����������ռ��Ƿ����㹻�Ŀռ�����ɹ���");
        } else {
            cm.sendOk("��ӭ�´ι��١�");
            cm.gainItem(4031346, temp);
            cm.gainMeso(-cost);
        }
        cm.dispose();
    }
}