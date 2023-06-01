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

function start() {
    if(cm.getQuestProgressInt(2180, 1) == 2) {
        cm.sendNext("��������ͷ��ţ����ȡ����ţ�̣�����������ţ��");
        cm.dispose();
        return;
    }
    
    if (cm.canHold(4031848) && cm.haveItem(4031847)){
        cm.sendNext("��ţ��װ����ƿ�У�Ŀǰ����1/3��");
        cm.gainItem(4031847, -1);
        cm.gainItem(4031848, 1);
        
        cm.setQuestProgress(2180, 1, 2);
    } else if(cm.canHold(4031849) && cm.haveItem(4031848)){
        cm.sendNext("��ţ��װ����ƿ�У�Ŀǰ����2/3��");
        cm.gainItem(4031848, -1);
        cm.gainItem(4031849, 1);
        
        cm.setQuestProgress(2180, 1, 2);
    } else if(cm.canHold(4031850) && cm.haveItem(4031849)){
        cm.sendNext("��ţ��װ����ƿ�У�Ŀǰƿ����װ����");
        cm.gainItem(4031849, -1);
        cm.gainItem(4031850, 1);
        
        cm.setQuestProgress(2180, 1, 2);
    } else {
        cm.sendNext("��ı�����������ȷ��������1��������ţ��ƿ��");
    }
    cm.dispose();
}