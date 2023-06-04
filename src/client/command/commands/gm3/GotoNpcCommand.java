package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import server.maps.MapleMap;
import server.maps.MaplePortal;

public class GotoNpcCommand extends Command {
    {
        setDescription("����npcid��Ӧ�ĵ�ͼ");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("����: !gotonpc <npcid>");
            return;
        }

        player.message("���ڲ�ѯnpc����λ�ã��������������Ҫ10s�������ĵȴ�...");
        MapleMap target = client.getChannelServer().getMapFactory().getMapByNpcId(params[0]);
        if (null == target) {
            player.message("�����npc�����ڣ���ȷ�Ϻ��������룡");
            return;
        }
        MaplePortal targetPortal = target.getRandomPlayerSpawnpoint();
        player.saveLocationOnWarp();
        player.changeMap(target, targetPortal);
    }
}
