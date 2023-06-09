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
/**
* @Author : iAkira, Kevintjuh93
**/
var status = 0; 
var selected = 0;

function start() {
	if (cm.getPlayer().getMapId() == 100000000) {
		cm.sendNext("������㿴������û������һ��UFO�ոշɹ�ȥ��...����������˱�����UFO��...���������������ǼѼѣ�#r�Ѽѱ�һ��UFO�������#k");
	}
}

function action(m,t,s) { 
	if (m > 0) {
		status++; 
		if (cm.getPlayer().getMapId() == 100000000) { // warper completed
			if (status == 1) {
				if (cm.getPlayer().getLevel() >= 12) 
					cm.sendYesNo("��������Ҫ��ô�죿��ȻUFOֻ��ҥ��������...����˵����������˰�ܵĻ����ͻ��п��µ����鷢��������...Ҳ��Ѽ����ھ����ھ�����һ�У������㣬������ȾȼѼѣ�\r\n #b�Ѽѿ�����Щ�Ժ�����������ģ�����#k������Ǹ����ˡ�����û�������������µ����鷢���ڼѼ����ϡ����ˣ�үү����֪����ô���������һ�����ȥ��������ȥ��үү�����ȼѼѣ�����");
				else 
					cm.sendOk("ร��������㻹���������ȼѼѵĵȼ�Ҫ������ﵽ12������ߵȼ�ʱ�ٻ����ɡ�");
          
			} else if (status == 2)
				cm.sendNext("�ǳ�лл�㡣��ȥ���¼Ѽѣ�үү����������ġ�");
			else if (status == 3) {
				cm.warp(922240200, 0); 
				cm.dispose();
			}
		}
	} else if (m < 1) {
		cm.dispose();
	}
}