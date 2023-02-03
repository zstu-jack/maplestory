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
   @Author: Ronan
*/
package client.command.commands.gm0;

import client.command.Command;
import client.MapleCharacter;
import client.MapleClient;
import config.YamlConfig;
import server.maps.MapleMap;

public class MapOwnerClaimCommand extends Command {
    {
        setDescription("宣称地图所有权");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        if (c.tryacquireClient()) {
            try {
                MapleCharacter chr = c.getPlayer();
                if (!YamlConfig.config.server.USE_MAP_OWNERSHIP_SYSTEM) {
                    chr.dropMessage(5, "该功能不可用");
                    return;
                }
                if (null != chr.getEventInstance()) {
                    chr.dropMessage(5, "你无法获得地图所有权");
                    return;
                }

                MapleMap map = chr.getMap();
                if (map.countBosses() > 0) {
                    chr.dropMessage(5, "地图正被BOSS围攻");
                    return;
                }
                MapleMap ownedMap = chr.getOwnedMap();
                if (ownedMap != null) {
                    ownedMap.unclaimOwnership(chr);

                    if (map == ownedMap) {
                        chr.dropMessage(5, "已释放该地图所有权");
                        return;
                    }
                }
                if (map.claimOwnership(chr)) {
                    chr.dropMessage(5, "你已拥有该地图的所有权，直到你离开或者1分钟不活动后释放");
                } else {
                    chr.dropMessage(5, "该地图已被其他玩家拥有");
                }
            } finally {
                c.releaseClient();
            }
        }
    }
}
