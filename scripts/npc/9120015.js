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
	Konpei - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Fixed by Moogra
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
function start() {
    cm.sendSimple ("����ʲô��\r #L0##b�˽��й�<�������>����Ϣ#l\r\n#L1#����ǰ��<�������>#l\r\n#L2#ûʲô#l#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendNext("�ҿ�������ȥ<�������>�������ﱻһȺ�ײб����ĺڵ��ѳ��š��������У���ᷢ�ִ�ͷͷ���������е����졢ͷĿ��������������ȻǱ�����в������ѣ���������ڵĶ���ÿ��ֻ�ܽ���һ�Ρ���ͷͷ�ķ���ɲ������ʲô������ȥ����ĵط����ҽ����㲻Ҫ������ͣ��̫�ã���ȥ֮��Ѹ�ٵؽ��������顣�������Ǵ�ͷͷ���˺��Ѳ������������;�У���Ҳ������һ��ǿ���ޱȵĶ��֡���ɲ���˵Ц�ġ�");
                cm.dispose();
            } else if (selection == 1)
                cm.sendNext("ร������Ǹ��е�ʶ�ļһ��һֱ�ڴ����������˵����������Щ�ڵ��ٲ���Լ��һ�£��治֪���Ѻʹ�ᷢ��ʲô���顣����̬��֮ǰ��ϣ�������������������Ҵ��ס��5¥����Ĵ�ͷͷ������Ҫʱ�̱��־��裬��Ϊ�����ٴ����ļһ�Ҳ����ʤ����ͷͷ�������������������ܹ����ó�������һ���������������ɣ�");
            else {
                cm.sendOk("���Ǹ���æ�ˣ������ûʲô���������Զ�㡣");
                cm.dispose();
            }
        } else {
            cm.warp(801040000, "in00");
            cm.dispose();
        }
    }
}