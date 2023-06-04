package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;

public class SuctionMonsterCommand extends Command {
    {
        setDescription("������ر����֣��л���ͼ��Ч");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        player.changeSuctionMonster();
        String msg = player.isSuctionMonster() ? "�������֣��л���ͼʱ��Ч" : "�ر�����";
        player.message(msg);
    }
}
