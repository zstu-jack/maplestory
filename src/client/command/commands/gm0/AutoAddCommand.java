package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import config.YamlConfig;

public class AutoAddCommand  extends Command {
    {
        setDescription("�Զ��ӵ�");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length == 0) {
            player.yellowMessage("���� @autoadd <str/dex/int/luk> <����>��������/����/����/�������мӵ�");
            return;
        }
        int size;
        if (params.length > 1) {
            try {
                size = Math.min(Integer.parseInt(params[0]), player.getRemainingAp());
            } catch (NumberFormatException e) {
                player.dropMessage("��ȷ������ĵ����Ƿ���ȷ");
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
            player.dropMessage("�����Բ��ܴ��� " + YamlConfig.config.server.MAX_AP + " ��С�� 4");
        }
    }
}
