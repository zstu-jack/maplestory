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
/* Author: Xterminator, Moogra
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    cm.sendSimple("�������������?\r\n#L0##b�����������ط������.#l\r\n#L1#����ͨ����������Ļ����������...#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.sendNext("̫æ�ˣ����ڲ���ʱ����������˽�Ļ����������ҡ�");
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                if (cm.haveItem(4031035)) {
                    cm.sendNext("�յ��Ƿ��ţ�������ĳ��������ϰ�����Ƿ��Ž����ҵܵܵĽ������޵¡����Ÿ�������ĳ���ͻ��к����鷢����");
                    cm.dispose();
                } else
                    cm.sendYesNo("��������Ժͳ���һ��ɢ����·������Դ����������ߣ�����ѵ����ĳ��ﴩ���ϰ������㻹û�к���ĳ���̫�����ǿ��ܻ�������⣬��Ҳ��������һ��������������ô��������أ���ѵ����ĳ�����?");
            } else {
                cm.sendOk("�٣���ȷ���������Ů������������ǰ��δ����������Ҫƭ�ң���Ϊ������ԡ�����������һ���õĻ���!!");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.gainItem(4031035, 1);
            cm.sendNext("�õģ������š������ֱ��ȥ�Ļ���������֪��������ȥ�ģ����Ժ���ĳ���һ�𴩹��ϰ����������ȥ��Ȼ���ѵ��ʦ���޵�̸̸�����Ÿ�����������������ϰ���ʱ��ע����ĳ���ǾͲ����ˡ�ף�����!");
            cm.dispose();
        }
    }
}