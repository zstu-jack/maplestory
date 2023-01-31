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
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = -1;

function start() {
    cm.sendNext("����һ����Ϊ #b�ʺ��#k ��С��������ð�յ���½����ߡ�������ͨ��ð�յ���½����㡣�Һ������⸽��ֻ��һЩ��С�Ĺ��");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && status == 2) {
            status -= 2;
            start();
        } else if (mode == 0) {
            status -= 2;
        } else {
            cm.dispose();
        }
    } else {
        if (status == 1) {
            cm.sendNextPrev("��������ø�ǿ������Ҫȥһ������ #b�ϸ�#k �ĵط�������ͣ��һ��ǰ�� #b������#k �ľ޴�ֻ�������С����ȣ����Ĵ�С�����ױȡ�");
        } else if (status == 2) {
            cm.sendPrev("�ڽ������������ѡ�����ְҵ���� #b��ʿ����#k ������˵����һ��������С������ס����ʿ����ԭ����������ʲô���ĵط���");
        } else if (status == 3) {
            cm.dispose();
        }
    }
}