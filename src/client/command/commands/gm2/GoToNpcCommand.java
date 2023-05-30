package client.command.commands.gm2;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import server.maps.MapleMap;

import java.awt.Point;
import java.util.Collection;

public class GoToNpcCommand extends Command {
    {
        setDescription("进入npcid对应的地图");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("输入: !gotonpc <npcid>");
            return;
        }

        try {
            MapleMap target = client.getChannelServer().getMapFactory().getMap(Integer.parseInt(params[0]));
            if (target == null) {
                player.yellowMessage("Map ID " + params[0] + " is invalid.");
                return;
            }

            Point pos = player.getPosition();

            Collection<MapleCharacter> characters = player.getMap().getAllPlayers();

            for (MapleCharacter victim : characters) {
                if (victim.getPosition().distanceSq(pos) <= 50000) {
                    victim.saveLocationOnWarp();
                    victim.changeMap(target, target.getRandomPlayerSpawnpoint());
                }
            }
        } catch (Exception ex) {
            player.yellowMessage("Map ID " + params[0] + " is invalid.");
        }
    }
}
