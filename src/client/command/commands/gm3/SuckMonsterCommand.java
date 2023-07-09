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
 * 感谢 Atoot 提供的技术和方案支持
 */
public class SuckMonsterCommand extends Command {
    {
        setDescription("开启或关闭地图吸怪");
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

        // 如果当前地图没有吸怪
        if (!currMapCombineOption.isPresent()) {
            ViewCombine combine = ViewCombine.createThreeCombine(player.getId(), map.getId(), player.getPosition());
            combineMsg.add(combine);
            suckMonster(player, map);
            return;
        }

        ViewCombine currMapCombine = currMapCombineOption.get();
        Integer playerId = currMapCombine.getFirst();
        if (playerId == player.getId()) {
            // 如果当前玩家已经开启了吸怪，关闭吸怪功能，移除所有记录的地图
            combineMsg.removeIf(combine -> {
                Integer tmpPlayerId = currMapCombine.getFirst();
                return tmpPlayerId == player.getId();
            });
            player.message("关闭吸怪");
        } else {
            player.message("当前地图已经有人使用了吸怪");
        }
    }

    private void suckMonster(MapleCharacter player, MapleMap map) {
        // 眩晕技能
        Skill skill = SkillFactory.getSkill(5201004);
        // 眩晕 100%概率 无技能 不施放
        MonsterStatusEffect effect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), skill, null, false);
        List<MapleMonster> monsterList = map.getAllMonsters();
        for (MapleMonster monster : monsterList) {
            if (monster.isBoss()) {
                continue;
            }
            monster.resetMobPosition(player.getPosition());
            // 持续时间1天
            monster.applyStatus(player, effect, false, 86400000, false);
        }
        player.message("开启吸怪");
    }
}
