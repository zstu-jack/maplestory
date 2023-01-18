package client.command.commands.gm0;

import client.MapleClient;
import client.command.Command;

public class MapIdCommand extends Command {
    {
        setDescription("查看地图id");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        client.getPlayer().dropMessage(5, "当前地图: " + client.getPlayer().getMapId());
    }
}
