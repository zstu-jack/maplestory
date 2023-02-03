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
import server.events.gm.MapleEvent;
import server.maps.FieldLimit;

public class JoinEventCommand extends Command {
    {
        setDescription("参加或离开活动");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        if (params.length == 0) {
            MapleCharacter player = c.getPlayer();
            player.yellowMessage("输入: @event <join/leave> 加入或离开活动");
            return;
        }
        if ("join".equals(params[0])) {
            join(c);
        } else if ("leave".equals(params[0])) {
            leave(c);
        }
    }

    private void join(MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (!FieldLimit.CANNOTMIGRATE.check(player.getMap().getFieldLimit())) {
            MapleEvent event = c.getChannelServer().getEvent();
            if (null == event) {
                return;
            }
            if (event.getMapId() == player.getMapId()) {
                player.dropMessage(5, "你已经在活动中了");
                return;
            }

            if (event.getLimit() > 0) {
                player.saveLocation("EVENT");

                if (event.getMapId() == 109080000 || event.getMapId() == 109060001) {
                    player.setTeam(event.getLimit() % 2);
                }

                event.minusLimit();

                player.saveLocationOnWarp();
                player.changeMap(event.getMapId());
            } else {
                player.dropMessage(5, "已达到活动的玩家限制");
            }
        } else {
            player.dropMessage(5, "您当前所处的地图无法加入活动");
        }
    }

    private void leave(MapleClient c) {
        MapleCharacter player = c.getPlayer();
        int returnMap = player.getSavedLocation("EVENT");
        if (returnMap != -1) {
            if (player.getOla() != null) {
                player.getOla().resetTimes();
                player.setOla(null);
            }
            if (player.getFitness() != null) {
                player.getFitness().resetTimes();
                player.setFitness(null);
            }

            player.saveLocationOnWarp();
            player.changeMap(returnMap);
            if (c.getChannelServer().getEvent() != null) {
                c.getChannelServer().getEvent().addLimit();
            }
        } else {
            player.dropMessage(5, "你没有参加活动");
        }
    }
}
