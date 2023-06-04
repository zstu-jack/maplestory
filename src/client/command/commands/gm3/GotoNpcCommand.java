package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import server.maps.MapleMap;
import server.maps.MaplePortal;

public class GotoNpcCommand extends Command {
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

        player.message("正在查询npc所处位置，这个过程至少需要10s，请耐心等待...");
        MapleMap target = client.getChannelServer().getMapFactory().getMapByNpcId(params[0]);
        if (null == target) {
            player.message("输入的npc不存在，请确认后重新输入！");
            return;
        }
        MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
        player.saveLocationOnWarp();
        player.changeMap(target, targetPortal);
    }
}
