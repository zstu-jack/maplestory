package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.Skill;
import client.SkillFactory;
import client.command.Command;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import cn.nap.utils.common.NapComUtils;
import server.life.MapleMonster;
import server.maps.MapleMap;
import ui.view.common.ViewCombine;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * ��л Atoot �ṩ�ļ����ͷ���֧��
 */
public class SuckMonsterCommand extends Command {
    {
        setDescription("������رյ�ͼ����");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        MapleMap map = player.getMap();
        List<ViewCombine> combineMsg = map.getSuckCombineMsg();
        if (NapComUtils.isEmpty(combineMsg)) {
            ViewCombine combine = ViewCombine.createThreeCombine(player.getId(), map.getId(), player.getPosition());
            combineMsg.add(combine);
            suckMonster(player, map);
            return;
        }

        Optional<ViewCombine> currMapCombineOption = combineMsg.stream().filter(combine -> {
            Integer mapId = combine.getSecond();
            return mapId == map.getId();
        }).findFirst();

        // �����ǰ��ͼû������
        if (!currMapCombineOption.isPresent()) {
            ViewCombine combine = ViewCombine.createThreeCombine(player.getId(), map.getId(), player.getPosition());
            combineMsg.add(combine);
            suckMonster(player, map);
            return;
        }

        ViewCombine currMapCombine = currMapCombineOption.get();
        Integer playerId = currMapCombine.getFirst();
        if (playerId == player.getId()) {
            // �����ǰ����Ѿ����������֣��ر����ֹ��ܣ��Ƴ����м�¼�ĵ�ͼ
            combineMsg.removeIf(combine -> {
                Integer tmpPlayerId = currMapCombine.getFirst();
                return tmpPlayerId == player.getId();
            });
            player.message("�ر�����");
        } else {
            player.message("��ǰ��ͼ�Ѿ�����ʹ��������");
        }
    }

    private void suckMonster(MapleCharacter player, MapleMap map) {
        // ѣ�μ���
        Skill skill = SkillFactory.getSkill(5201004);
        // ѣ�� 100%���� �޼��� ��ʩ��
        MonsterStatusEffect effect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), skill, null, false);
        List<MapleMonster> monsterList = map.getAllMonsters();
        for (MapleMonster monster : monsterList) {
            if (monster.isBoss()) {
                continue;
            }
            monster.resetMobPosition(player.getPosition());
            // ����ʱ��1��
            monster.applyStatus(player, effect, false, 86400000, false);
        }
        player.message("��������");
    }
}
