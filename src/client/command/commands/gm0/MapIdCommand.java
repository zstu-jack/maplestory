package client.command.commands.gm0;

import client.MapleClient;
import client.command.Command;

public class MapIdCommand extends Command {
    {
        setDescription("�鿴��ͼid");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        client.getPlayer().dropMessage(5, "��ǰ��ͼ: " + client.getPlayer().getMapId());
    }
}
