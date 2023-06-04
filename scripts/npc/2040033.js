/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
        Neru - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
        Xterminator
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
        1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    if (cm.haveItem(4031128)) {
        cm.sendNext("���������Ҹ����ţ�������Ҫѵ����û�����湤���˰�...��...���������Ҹ��Ľ��飬ѵ����ĳ��ﵽ���������治����Ȼ����Ŭ������������һ��ṩ��ͳ���֮������ܶȵġ�");
    } else {
        cm.sendOk("�ҵĸ�������Ҫ�ú��տ���Щ�ϰ�������...����֮�������ôԶ�����������й�һ���...�Ǻǣ���Ȼ��û�г���������֮�ڣ��Ҳ�������Ϣ�����ӡ�");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else if (cm.getPlayer().getNoPets() == 0)
        cm.sendNextPrev("��...��û�д��ų�����������Щ�ϰ���Ϊ�˳���׼���ġ�û�г���Ļ�����������ʲô����ȥ��");
    else {
        cm.gainItem(4031128, -1);
        cm.gainCloseness(4);
        cm.sendNextPrev("��ô������û�о��úͳ�������ܶ�����ˣ��������ʱ�䣬�����ٴ����������ϰ�ѵ��...��Ȼ��Ҫ�Ȼ���Ҹ���������С�");
    }
    cm.dispose();
}