/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm0;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import config.YamlConfig;

public class ShowRatesCommand extends Command {
    {
        setDescription("倍率查看");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        String showMsg = "#e经验倍率#n" + "\r\n";
        showMsg += "世界经验倍率: #k" + c.getWorldServer().getExpRate() + "x#k" + "\r\n";
        showMsg += "玩家经验额外倍数: #k" + player.getRawExpRate() + "x#k" + "\r\n";
        if (player.getCouponExpRate() != 1) {
            showMsg += "Coupon EXP Rate: #k" + player.getCouponExpRate() + "x#k" + "\r\n";
        }
        showMsg += "经验倍率: #e#b" + player.getExpRate() + "x#k#n" + (player.hasNoviceExpRate() ? " - 新手倍率" : "") + "\r\n";

        showMsg += "\r\n" + "#e金币倍率#n" + "\r\n";
        showMsg += "世界金币倍率: #k" + c.getWorldServer().getMesoRate() + "x#k" + "\r\n";
        showMsg += "玩家金币额外倍数: #k" + player.getRawMesoRate() + "x#k" + "\r\n";
        if (player.getCouponMesoRate() != 1) {
            showMsg += "Coupon MESO Rate: #k" + player.getCouponMesoRate() + "x#k" + "\r\n";
        }
        showMsg += "金币倍率: #e#b" + player.getMesoRate() + "x#k#n" + "\r\n";

        showMsg += "\r\n" + "#e掉落倍率#n" + "\r\n";
        showMsg += "世界掉落倍率: #k" + c.getWorldServer().getDropRate() + "x#k" + "\r\n";
        showMsg += "玩家掉落额外倍数: #k" + player.getRawDropRate() + "x#k" + "\r\n";
        if (player.getCouponDropRate() != 1) {
            showMsg += "Coupon DROP Rate: #k" + player.getCouponDropRate() + "x#k" + "\r\n";
        }
        showMsg += "掉落倍率: #e#b" + player.getDropRate() + "x#k#n" + "\r\n";

        showMsg += "\r\n" + "#eBOSS掉落倍率#n" + "\r\n";
        showMsg += "世界BOSS掉落倍率: #k" + c.getWorldServer().getBossDropRate() + "x#k" + "\r\n";
        showMsg += "玩家BOSS掉落额外倍数: #k" + player.getRawDropRate() + "x#k" + "\r\n";
        if (player.getCouponDropRate() != 1) {
            showMsg += "Coupon DROP Rate: #k" + player.getCouponDropRate() + "x#k" + "\r\n";
        }
        showMsg += "BOSS掉落倍率: #e#b" + player.getBossDropRate() + "x#k#n" + "\r\n";

        if (YamlConfig.config.server.USE_QUEST_RATE) {
            showMsg += "\r\n" + "#e任务倍率#n" + "\r\n";
            showMsg += "任务倍率: #e#b" + c.getWorldServer().getQuestRate() + "x#k#n" + "\r\n";
        }

        showMsg += "\r\n";
        showMsg += "旅行倍率: #e#b" + c.getWorldServer().getTravelRate() + "x#k#n" + "\r\n";

        player.showHint(showMsg, 300);
    }
}
