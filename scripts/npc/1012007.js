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
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/

function start() {
    if (cm.haveItem(4031035))
        cm.sendNext("�ţ������Ҹ����ţ���������Ϊ�Ҿ����Լ�û����û���������ţ����������������Ҹ��Ľ��飬ѵ������ĳ��Ȼ��վ������ţ��ü��ˣ�����Ȼ��Ŭ��������һ����������������̶ܳȡ�");
    else {
        cm.sendOk("�Ҹ�������Ҫ�չ˳�����ϰ�����ǡ���Ϊ������̫Զ�ˣ����̲�ס���Ĵ��ι䡭���Ǻǣ���Ȼ�ҿ��������������侲һ�¡�.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getNoPets() == 0)
            cm.sendNextPrev("����Ĵ�����ĳ�����������Щ�ϰ����Ǹ�����ġ�û�������������ʲô�����뿪����!");
        else {
            cm.gainItem(4031035, -1);
            cm.gainCloseness(2, 0);
            cm.sendNextPrev("����ô��Ϊ���㲻���������ĳ���Խ��Խ�׽������������ʱ�䣬������ϰ�������ѵ����ĳ������Ȼ�����Ҹ���������.");
        }
        cm.dispose();
    }
}