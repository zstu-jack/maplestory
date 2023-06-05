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

var status = -1;

function start() {
	action(1, 0, 0);	
}

function action(mode, type, selection) {  
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("���������ˡ�����!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("���ǡ�������", 2);
		} else if (status == 2) {
			cm.sendNextPrev("���ħ��ʦս����Ӣ�ۡ�����һֱ�ڵ���������", 8);
		} else if (status == 3) {
			cm.sendNextPrev("�㡣��������˭������˵ʲô��", 2);
		} else if (status == 4) {
			cm.sendNextPrev("����˭������������ôʲô���ǲ������ˡ�������~~~~~�������ҵ�ͷ���ۣ�", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("�㻹����", 8);
		} else if (status == 1) {
			cm.sendNextPrev("��ʲô���ǲ������ˡ������������˭��������", 2);
		} else if (status == 2) {
			cm.sendNextPrev("�侲��û�б�Ҫ�ֻš���ʲô���ǲ������ˣ�����Ϊ��ħ��ʦ������Ĩȥ����ļ��䡣�һ�����㣬����֪����һ�С������԰����ꡣ", 8);
		} else if (status == 3) {
			cm.sendNextPrev("����������ǰ���ħ��ʦս��������ð������Ĵ�Ӣ�ۡ��������һ�̣���ħ��ʦ����������˯�˺ܳ��ܳ���ʱ�䡣���ǡ�������ʧȥ�����м��䡣", 8);
		} else if (status == 4) {
			cm.sendNextPrev("�������������Ǻ�ħ��ʦ��ס��ĵط����������������֣������ں�ħ��ʦ�����ԭ����������걻��ѩ���ǡ������ڱ���������ֵġ�", 8);
		} else if (status == 5) {
			cm.sendNextPrev("�ҵ����ֽ����գ�������������塣��������Ѿ��ȴ�Ӣ�۹����ܳ�ʱ���ˣ����������ҵ����㡣�����ڻ����ˣ�", 8);
		} else if (status == 6) {
			cm.sendNextPrev("��˵��̫���ˡ�����㲻����������Ҹոո������һ�У�û��ϵ�������ջ��һؼ���ġ�Ŀǰ��#b��Ӧ��ǰ��#k������һ�һֱ��������ߣ�ֱ���㵽�����", 8);
		} else if (status == 7) {
			cm.spawnGuide();
			cm.warp(140090100, 0);
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("�㻹����Щʲô? �һᾡ��������ϸЩ�ġ� #b#l\r\n#L0#����˭? #l #l\r\n#L1#������? #l #l\r\n#L2#����˭?#l#l\r\n#L3#�Ҹ���Щʲô��#l #l\r\n#L4#��δ򿪱�����#l #l\r\n#L5#��������ҵļ���?#l #l\r\n#L6#���ʹ����Ʒ��װ����#l #l\r\n#L7#���ʹ�ÿ����? #l #l\r\n#L8#����ƻ�����?#l #l\r\n#L9#���ʹ�����Σ�#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("����������ǰ�Ӻ�ħ��ʦ��������ð�������Ӣ��֮һ�����ں�ħ��ʦ�����䣬��ʧȥ�˼��䡣");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("���������������Ǻ�ħ��ʦ�����㣬���������ĵط�����һ������ѩ���ǵ�С�����������������졣");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("�������գ��������ĳ�Ա������Ԥ�Ե���������һֱ�ڵȴ���Ĺ�����������������򵼡�");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("���Ǳ����˷�ʱ���ˣ�ֱ�ӽ���ȥ�ɡ����ǵ�������һ������ϸ�ڡ�");
					cm.dispose();
				} else if(selection == 4) {
					cm.guideHint(14);
					cm.dispose();
				} else if(selection == 5) {
					cm.guideHint(15);
					cm.dispose();
				} else if(selection == 6) {
					cm.guideHint(16);
					cm.dispose();
				} else if(selection == 7) {
					cm.guideHint(17);
					cm.dispose();
				} else if(selection == 8) {
					cm.guideHint(18);
					cm.dispose();
				} else if(selection == 9) {
					cm.guideHint(19);
					cm.dispose();
				}									
		}
	}
}
}