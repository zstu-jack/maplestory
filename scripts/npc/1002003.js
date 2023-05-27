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
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("����ֻ�й¶����˲Ų���Ҫ���Ѱ�??\r\n���㿪��Ц�ģ��������������Ҫ��չ��ĺ����б���������ҵ��!);
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("�Ҳ���Ϊ��û�����ѣ���ֻ�ǲ��뻨25�����������Լ��ĺ�����!);
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("�һ��ǵ����������ǽе�...�ţ���ã�����Ҫ��չ��ĺ����б�ô������һЩǮ���ҿ��԰��㡣����Ҫ��ס����ֻ�ǰ��������ɫ��չ�˺���λŶ��");
	} else if (status == 1) {
		cm.sendYesNo("�ðɣ�һ�κ��������죡��ʵ�Ⲣ����ģ�#b250.000#k��ң��һ����5����λ����ĺ����б��С�������չ��ĺ����б��ܻ���ɣ�);
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("��!��ȷ������ #b250,000 ð�ձ�ô#k? ������Ļ�����ȷ���ǲ�����ĺ������Ѿ� #b100#k ���ˡ�������Ŷ��);
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-250000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("���ˣ����������5��������.����㻹��Ҫ������������.�Ϲ˿�Ҳ������ۣ�����ף��пն����չ��ҵ�����ѽ!");
			cm.dispose();
			}
		}
	}
}