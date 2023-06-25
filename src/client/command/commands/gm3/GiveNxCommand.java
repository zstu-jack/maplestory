/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

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

/*
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm3;

import client.command.Command;
import client.MapleClient;
import client.MapleCharacter;
import cn.nap.utils.common.NapComUtils;

public class GiveNxCommand extends Command {
    {
        setDescription("��ӵ�ȯ");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("����: !givenx <��ȯ��> <��ѡ:1-��ȯ;2-�ʼ�ȯ;4-����ȯ> <��ѡ:�����>");
            return;
        }

        int type = 1;
        String recv = c.getPlayer().getName();
        int value = Integer.parseInt(params[0]);
        if (params.length > 1) {
            type = Integer.parseInt(params[1]);
        }
        if (params.length > 2) {
            recv = params[2];
        }

        String[] typeArr = new String[]{null, "��ȯ", "�ʼҵ�ȯ", null, "����ȯ"};
        if (type > typeArr.length || NapComUtils.isEmpty(typeArr[type])) {
            player.message("��ȯ���� '" + type + "' ������");
            return;
        }

        MapleCharacter victim = c.getWorldServer().getPlayerStorage().getCharacterByName(recv);
        if (null == victim) {
            player.message("��� '" + recv + "' ������");
            return;
        }
        victim.getCashShop().gainCash(type, value);
        player.message(recv.toUpperCase() + " ���յ�" + typeArr[type] + " " + value + " ��");
    }

}
