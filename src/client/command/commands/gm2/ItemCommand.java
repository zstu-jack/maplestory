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
package client.command.commands.gm2;

import client.command.Command;
import client.MapleClient;
import client.MapleCharacter;
import client.inventory.MaplePet;
import client.inventory.manipulator.MapleInventoryManipulator;
import config.YamlConfig;
import constants.inventory.ItemConstants;
import server.MapleItemInformationProvider;

public class ItemCommand extends Command {
    {
        setDescription("添加物品");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();

        if (params.length < 1) {
            player.yellowMessage("输入: !item <物品id> <数量>");
            return;
        }

        int itemId = Integer.parseInt(params[0]);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        if (ii.getName(itemId) == null) {
            player.yellowMessage("物品id '" + params[0] + "' 不存在");
            return;
        }

        short quantity = 1;
        if (params.length >= 2) quantity = Short.parseShort(params[1]);

        if (YamlConfig.config.server.BLOCK_GENERATE_CASH_ITEM && ii.isCash(itemId)) {
            player.yellowMessage("无法创建现金类的物品");
            return;
        }

        if (ItemConstants.isPet(itemId)) {
            if (params.length >= 2) {   // thanks to istreety & TacoBell
                quantity = 1;
                long days = Math.max(1, Integer.parseInt(params[1]));
                long expiration = System.currentTimeMillis() + (days * 24 * 60 * 60 * 1000);
                int petid = MaplePet.createPet(itemId);

                MapleInventoryManipulator.addById(c, itemId, quantity, player.getName(), petid, expiration);
            } else {
                player.yellowMessage("宠物类物品输入: !item <宠物id> <有效天数>");
            }
            return;
        }

        short flag = 0;
        if (player.gmLevel() < 3) {
            flag |= ItemConstants.ACCOUNT_SHARING;
            // flag |= ItemConstants.UNTRADEABLE;  // 可以交易
        }

        MapleInventoryManipulator.addById(c, itemId, quantity, player.getName(), -1, flag, -1);
    }
}
