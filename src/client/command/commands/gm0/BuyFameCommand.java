package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import config.YamlConfig;

public class BuyFameCommand extends Command {
    {
        setDescription("购买人气");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter c = client.getPlayer();
        if (params.length < 1) {
            c.yellowMessage("示例： @buyfame <人气点数> 购买指定的人气点数");
            return;
        }

        int amount = 0;
        try {
            amount = Integer.parseInt(params[0]);
        } catch (NumberFormatException e) {
            c.dropMessage("请确认输入的数量是否正确");
            return;
        }
        if (amount <= 0) {
            c.dropMessage("请输入需要购买的人气数量");
            return;
        }

        int fee = YamlConfig.config.server.BUYFAME_FEE * amount;
        if (fee <= 0) {
            c.dropMessage("未开放购买人气功能");
            return;
        }
        if (fee > c.getMeso()) {
            c.dropMessage("金币不足，总共需要：" + fee);
            return;
        }

        c.gainMeso(-fee);
        c.gainFame(amount);
    }
}
