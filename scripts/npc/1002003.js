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
		cm.sendNext("��֪����...�㲻��������ô���ѹ㷺...����Ц�ġ���֮�����ı����⣬�;��������ң���ʱ�����ٺú�̸̸������㽻���˺ܶ����ѣ���֪����...�Ǻ�..");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("��֪����...�������һ������ȷʵ�кܶ����ѡ�������������Ļ�����ֻ���������ϻ�û���� 240,000 ��Ұɣ���֮�����ı����⣬�;��������ң���ʱ�����ٺú�̸̸��Ҳ����˵���������������õ��˽�Ԯ�Ļ�... �Ǻ�...");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("��ϣ����������������һ����...������ã��벻��������ĺ����б��㿴��������ӵ�кܶ���ѵļһ�...�ţ�������أ�ֻҪ��һЩǮ���Ҿ��ܰ��������������������㣬�������ֻ�����㵱ǰ��ɫ������Ч������Ӱ�쵽�˻��µ�������ɫ���Ƿ���Ҫ��չ�����б��أ�");
	} else if (status == 1) {
		cm.sendYesNo("�����ⲻ��������ʵҲû����ô��ֻҪ #b240,000 ��Ҿ������� 5 �������б��λ#k�����������ǲ����ֳ��۵ġ�һ��������������񣬺����б�������Ե����䡣���������ȷʵ��Ҫ������ѿռ䣬����������ﹺ������ô��Ϊ��Ҫ�� 240,000 ��һ���������");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("��....��ȷ�������� #b240,000 mesos#k�������Ļ����������ǲ��ǰѺ����б����䵽�����ˡ���������ٶ��ң�Ҳֻ�ܽ������б����䵽�������� #b50#k λ���Ѷ��ѡ�");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("�õģ���ĺ����б�������չ�˶����5����λ�������Լ����ơ�����㻹��Ҫ����ĺ����б�ռ䣬���������ҡ���Ȼ�������������ѵ�...��ô���ٻ���...");
			cm.dispose();
			}
		}
	}
}