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
package client.command.commands.gm0;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import net.server.Server;
import net.server.channel.Channel;

import java.util.List;

public class OnlineCommand extends Command {
    {
        setDescription("查询在线人数，人物所在位置");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        List<Channel> channels = Server.getInstance().getChannelsFromWorld(player.getWorld());

        if (params.length == 0) {
            player.message("当前在线人数: " + channels.parallelStream().mapToInt(ch -> ch.getPlayerStorage().getAllCharacters().size()).sum());
            player.yellowMessage("输入 @online <人物姓名/人物id> 查询人物位置");
            return;
        }
        String param = params[0].trim();
        for (Channel ch : channels) {
            for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                if ((param.equals(chr.getName()) || param.equals(String.valueOf(chr.getId())))) {
                    player.message("ID: " + chr.getId() + "(" + chr.getName() + ")" + "，正处于地图: " + chr.getMap().getMapName());
                    break;
                }
            }
        }
    }
}
