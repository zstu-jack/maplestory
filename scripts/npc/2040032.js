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
	Weaver - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    cm.sendYesNo("�����ǿ��Ժ���ĳ���һ��ɢ����ѵ������������������Ĵ����ߣ�����ѵ������ͨ�������һϵ���ϰ������������ͳ���֮������ܶȲ��ߵĻ�����Ҳ�п��ܻ᲻̫���������...���ԣ�������أ���Ҫѵ��һ����ĳ�����");
}

function action(mode, type, selection) {
    if (mode == -1){
    } else if (mode == 0) {
        cm.sendNext("��...���ں�æûʱ��ѵ�������ô�ȵ����п���Ҫѵ�������ʱ�򣬾������Ұɡ�");
    } else if (mode == 1) {
        if (cm.haveItem(4031128))
            cm.sendNext("��������ţ�����ĳ���һ��Խ���ϰ��������͸��ҵĵܵ����ա���ĳ���ͻ���еõ��ɳ���");
        else {
            cm.gainItem(4031128, 1);
            cm.sendOk("�õģ�������������ֱ��ȥ��������һ������֪��������д�ġ����Ժ���ĳ���һ��Խ��ÿһ���ϰ����ִ���ˣ�Ȼ����Ž������ա�����ڴ��ص�ʱ��������ĳ�����ѵ��Ӧ�þͲ���̫�ѡ�ף����ˣ�");
        }
    }
    cm.dispose();
}