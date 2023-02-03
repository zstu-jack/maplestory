package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import config.YamlConfig;

public class AutoAddCommand  extends Command {
    {
        setDescription("自动加点");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length == 0) {
            player.yellowMessage("输入 @autoadd <str/dex/int/luk> <点数>，给力量/敏捷/智力/运气进行加点");
            return;
        }
        int size;
        if (params.length > 1) {
            try {
                size = Math.min(Integer.parseInt(params[0]), player.getRemainingAp());
            } catch (NumberFormatException e) {
                player.dropMessage("请确认输入的点数是否正确");
                return;
            }
        } else {
            size = Math.min(player.getRemainingAp(), YamlConfig.config.server.MAX_AP - player.getStr());
        }
        size = Math.max(size, 0);
        boolean result = false;
        if ("str".equals(params[0])) {
            result = player.assignStr(size);
        } else if ("dex".equals(params[0])) {
            result = player.assignDex(size);
        } else if ("int".equals(params[0])) {
            result = player.assignInt(size);
        } else if ("luk".equals(params[0])) {
            result = player.assignLuk(size);
        }

        if (!result) {
            player.dropMessage("总属性不能大于 " + YamlConfig.config.server.MAX_AP + " 或小于 4");
        }
    }
}
