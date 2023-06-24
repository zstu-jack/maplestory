package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import config.YamlConfig;

public class BuyFameCommand extends Command {
    {
        setDescription("��������");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter c = client.getPlayer();
        if (params.length < 1) {
            c.yellowMessage("ʾ���� @buyfame <��������> ����ָ������������");
            return;
        }

        int amount = 0;
        try {
            amount = Integer.parseInt(params[0]);
        } catch (NumberFormatException e) {
            c.dropMessage("��ȷ������������Ƿ���ȷ");
            return;
        }
        if (amount <= 0) {
            c.dropMessage("��������Ҫ�������������");
            return;
        }

        int fee = YamlConfig.config.server.BUYFAME_FEE * amount;
        if (fee <= 0) {
            c.dropMessage("δ���Ź�����������");
            return;
        }
        if (fee > c.getMeso()) {
            c.dropMessage("��Ҳ��㣬�ܹ���Ҫ��" + fee);
            return;
        }

        c.gainMeso(-fee);
        c.gainFame(amount);
    }
}
