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

public class GiveMesosCommand extends Command {
    {
        setDescription("��ӽ��");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("����: !givems <�����> <��ѡ:�����>");
            return;
        }

        int meso = 0;
        try {
            long value = Long.parseLong(params[0]);
            if (value > Integer.MAX_VALUE) {
                meso = Integer.MAX_VALUE;
            } else if (value < Integer.MIN_VALUE) {
                meso = Integer.MIN_VALUE;
            } else {
                meso = (int) value;
            }
        } catch (NumberFormatException e) {
            if (params[0].equalsIgnoreCase("max")) {
                meso = Integer.MAX_VALUE;
            } else if (params[0].equalsIgnoreCase("mix")) {
                meso = Integer.MIN_VALUE;
            }
        }

        String recv = c.getPlayer().getName();
        if (params.length > 1) {
            recv = params[1];
        }

        MapleCharacter victim = c.getWorldServer().getPlayerStorage().getCharacterByName(recv);
        if (null == victim) {
            player.message("��� '" + recv + "' ������");
            return;
        }

        int oldMeso = victim.getMeso();
        long newMeso = (long) meso + (long) oldMeso;
        if (newMeso > Integer.MAX_VALUE) {
            meso = Integer.MAX_VALUE - oldMeso;
        } else if (newMeso < 0) {
            meso = -oldMeso;
        }

        victim.gainMeso(meso, true);
        player.message(recv.toUpperCase() + " ���յ���� " + meso);
    }
}
