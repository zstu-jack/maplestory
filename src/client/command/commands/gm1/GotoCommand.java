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
package client.command.commands.gm1;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import constants.game.GameConstants;

import java.util.ArrayList;
import java.util.Collections;

import server.maps.MaplePortal;
import server.maps.FieldLimit;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMiniDungeonInfo;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.*;
import tools.FilePrinter;

public class GotoCommand extends Command {

    {
        setDescription("移动到指定地图");

        List<Entry<String, Integer>> towns = new ArrayList<>(GameConstants.GOTO_TOWNS.entrySet());
        sortGotoEntries(towns);

        try {
            // thanks shavit for noticing goto areas getting loaded from wz needlessly only for the name retrieval

            for (Map.Entry<String, Integer> e : towns) {
                GOTO_TOWNS_INFO += ("'" + e.getKey() + "' - #b" + (MapleMapFactory.loadPlaceName(e.getValue())) + "#k\r\n");
            }

            List<Entry<String, Integer>> areas = new ArrayList<>(GameConstants.GOTO_AREAS.entrySet());
            sortGotoEntries(areas);
            for (Map.Entry<String, Integer> e : areas) {
                GOTO_AREAS_INFO += ("'" + e.getKey() + "' - #b" + (MapleMapFactory.loadPlaceName(e.getValue())) + "#k\r\n");
            }
        } catch (Exception e) {
            e.printStackTrace();

            GOTO_TOWNS_INFO = "(未知)";
            GOTO_AREAS_INFO = "(未知)";
        }

    }

    public static String GOTO_TOWNS_INFO = "";
    public static String GOTO_AREAS_INFO = "";
    public static final Logger logger = Logger.getLogger(FilePrinter.class.getName());

    private static void sortGotoEntries(List<Entry<String, Integer>> listEntries) {
        Collections.sort(listEntries, new Comparator<Entry<String, Integer>>() {
            @Override
            public int compare(Entry<String, Integer> e1, Entry<String, Integer> e2) {
                return e1.getValue().compareTo(e2.getValue());
            }
        });
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            String sendStr = "输入: #b@goto <地图名/id>#k。可到达的地图:\r\n\r\n#r城镇:#k\r\n" + GOTO_TOWNS_INFO;
            if (player.isGM()) {
                sendStr += ("\r\n#r区域:#k\r\n" + GOTO_AREAS_INFO);
            }

            player.getAbstractPlayerInteraction().npcTalk(9000020, sendStr);
            return;
        }

        if (!player.isAlive()) {
            player.dropMessage(1, "死亡时不能使用该指令");
            return;
        }

        if (!player.isGM()) {
            if (player.getEventInstance() != null || MapleMiniDungeonInfo.isDungeonMap(player.getMapId()) || FieldLimit.CANNOTMIGRATE.check(player.getMap().getFieldLimit())) {
                player.dropMessage(1, "你所处的位置不能使用该指令");
                return;
            }
        }

        HashMap<String, Integer> gotomaps;
        gotomaps = new HashMap<>(GameConstants.GOTO_AREAS);     // distinct map registry for GM/users suggested thanks to Vcoc
        gotomaps.putAll(GameConstants.GOTO_TOWNS);  // thanks Halcyon (UltimateMors) for pointing out duplicates on listed entries functionality

        Boolean intMap = Character.isDigit(params[0].toCharArray()[0]);
        if (gotomaps.containsKey(params[0])) {
            player.dropMessage(1, "goto string map" + params[0]);
            MapleMap target = c.getChannelServer().getMapFactory().getMap(gotomaps.get(params[0]));
            // expedition issue with this command detected thanks to Masterrulax
            MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
            player.saveLocationOnWarp();
            player.changeMap(target, targetPortal);
        } else if (intMap && gotomaps.containsValue(Integer.valueOf(params[0]))) {
            player.dropMessage(1, "goto int map" + params[0]);
            for (Integer value : gotomaps.values()) {
                if (value.equals(Integer.valueOf(params[0]))) {
                    MapleMap target = c.getChannelServer().getMapFactory().getMap(value);
                    MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
                    player.saveLocationOnWarp();
                    player.changeMap(target, targetPortal);
                    break;
                }
            }
        } else {
            // mapid
            
            if(intMap){
                MapleMap target = c.getChannelServer().getMapFactory().getMap(Integer.valueOf(params[0]));
                if(target != null){
                    MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
                    player.saveLocationOnWarp();
                    player.changeMap(target, targetPortal);
                    return ;
                }
                player.dropMessage(1, "goto map failed: id=" + params[0]);
            }else{
                String reqMapName = params[0];
                Map<Integer, MapleMap> allMap = c.getChannelServer().getMapFactory().getMaps();
                String sendStr = "输入: #b@goto <地图名/id>#k。可到达的地图:\r\n\r\n";
                for(Map.Entry<Integer, MapleMap> entry: allMap.entrySet()) {
                    String mapName = entry.getValue().getMapName();
                    String streetName = entry.getValue().getStreetName();
                    if(mapName.contains(reqMapName) || streetName.contains(reqMapName)){
                        sendStr += "id=" + entry.getKey() + "," + streetName + ":" + mapName  + "\r\n\r\n";
                    }
                }
                player.getAbstractPlayerInteraction().npcTalk(9000020, sendStr);
            }

        }
    }
}
