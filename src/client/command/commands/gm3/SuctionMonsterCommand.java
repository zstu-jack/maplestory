package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;

public class SuctionMonsterCommand extends Command {
    {
        setDescription("开启或关闭吸怪，切换地图生效");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        player.changeSuctionMonster();
        String msg = player.isSuctionMonster() ? "开启吸怪，切换地图时生效" : "关闭吸怪";
        player.message(msg);
    }
}
