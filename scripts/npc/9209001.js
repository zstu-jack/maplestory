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

status = -1;
var sel, sel2;

function start() {
    cm.sendOk("Hello, the Maple 7th Day Market is currently unavailable.");
    cm.dispose();
    return;
    
    cm.sendSimple("Hello, the Maple 7th Day Market opens today.#b\r\n#L0#Move to Maple 7th Day Market map\r\n#L1#Listen for an explanation about the Maple 7th Day Market");
}

function action(mode, type, selection) {
    status++;
    if (status == 6 && mode == 1) {
        sel2 = undefined;
        status = 0;
    }
    if (mode != 1) {
        if (mode == 0 && type == 0)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == undefined)
            sel = selection;
        if (selection == 0) {
            cm.sendNext("�õģ����ǽ����������ð�յ���ĩ���С�");
        } else
            cm.sendSimple("����ð�յ���ĩ���У���ʲô��Ҫ�˽����#b\r\n#L0#ð�յ���ĩ������������У�\r\n#L1#ð�յ���ĩ��������ʲô���\r\n#L2#��û������Ҫ���ˡ�");
    } else if(status == 1) {
        if (sel == 0) {
        	cm.getPlayer().saveLocation("EVENT");
            cm.warp(680100000 + parseInt(Math.random() * 3));
            cm.dispose();
        } else if (selection == 0) {
            cm.sendNext("ð�յ���ĩ����ֻ�������տ��š���������κ�һ�������ҵ����ң��Ϳ��Խ��뼯�С����ִ壬��Ҷ�ǣ���߳�...���п��ܳ������κγ����");
            status -= 2;
        } else if (selection == 1)
            cm.sendSimple("�������ð�յ���ĩ�����ҵ������ط��ѵ�һ����ϡ����Ʒ��#b\r\n#L0#�����������\r\n#L1#��������������");
        else {
            cm.sendNext("��û�������������𣿺õġ�����Ժ�Լ��и���Ȥ�Ļ�����ǵ������ҡ�");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel2 == undefined)
            sel2 = selection;
        if (sel2 == 0)
            cm.sendNext("�������ð�յ���ĩ�����򵽲�ͬ�������Ʒ���۸����ʱ�仯��������óñ��˵�ʱ�����֡�");
        else
            cm.sendNext("�����н�����֮�⣬�㻹������ð�յ���ĩ���������ũ��������Ů�����ﷳ˹�ַ��������������ǳ���ɼ���");
    } else if (status == 3) {
        if (sel2 == 0)
            cm.sendNextPrev("�ڼ������򵽵Ķ������������н����˰���������������һ��ǰ�ľɻ������Լǵ�Ҫ����֮ǰ����������֡�");
        else
            cm.sendNextPrev("��Ϊ�ڼ���������������������κ��ˣ�������Ҫ֧����֤����ܴ������������������ļ�����");
    } else if (status == 4) {
        if (sel2 == 0)
            cm.sendNextPrev("�������ᾭ���������Ļ��ռ۸�����Ҫ���ܻ���������Ľڵ���������۸����ÿ��������е������ǵð�ʱ�鿴��");
        else
            cm.sendNextPrev("�����ɹ��ذѼ�����������ɼ������Ұ���������˹�֣���˹�ֻ���㽱���ġ���������ĺ������������ǲ����ж���");
    } else if (status == 5) {
        if (sel2 == 0)
            cm.sendNextPrev("��������ҵͷ�Ե�ʱ���ˣ���ð�յ���ĩ�������н�����֮���������ɡ�");
        else
            cm.sendNextPrev("����Ե��������������ĳɳ������һ��Ҫ��������������������õľ���Ҳ���ø��ࡣ");
    }
}