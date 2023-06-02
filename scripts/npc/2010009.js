/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
var status;
var choice;
var guildName;

var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("你好啊！我是 #b蕾那丽#k。只有族长才能组建家族联盟。");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("你好啊！我是 #b蕾那丽#k。\r\n#b#L0#可以告诉我家族联盟是什么吗？#l\r\n#L1#我应该如何组建家族联盟？#l\r\n#L2#我想创建家族联盟。#l\r\n#L3#我想在联盟中加入新的家族。#l\r\n#L4#我想解散家族联盟。#l");
    }
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("家族联盟就是一个，嗯，由多个家族构成的超大组织。而我负责管理登记这些家族联盟。");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("要组成家族联盟，#b双方族长需要组成2人队伍#k 并且在同一频道 #b共同出席#k。组队长将被登记为家族联盟的联盟长。\r\n\r\n最开始， 新联盟 #b只能容纳两个家族#k，但随着时间推移，联盟长可以在时机成熟时与我对话，支付手续费来 #r扩充#k 联盟的成员。");
            cm.dispose();
        } else if(selection == 2) {
            if(!cm.isLeader()) {
                cm.sendNext("如果你希望创建家族联盟，请让你的队长与我对话。他/她会被注册为家族联盟的领袖。");
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("你的家族已注册为家族联盟成员，无法创建新的家族联盟。");
                cm.dispose();
                return;
            }
            
            cm.sendYesNo("想要创建家族联盟吗？目前需要的手续费是 #b" + allianceCost + " 金币#k.");
        } else if (selection == 3) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("尚未拥有自己的家族联盟，无法扩充联盟成员。");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("想要在联盟中增加 #r一个家族#k 位置吗？需要的手续费是 #b" + increaseCost + " 金币#k。");
            else {
                cm.sendNext("只有联盟长才能扩充联盟的家族位置。");
                cm.dispose();
            }
        } else if(selection == 4) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("尚未拥有自己的家族联盟，无法解散联盟。");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("确定要解散家族联盟吗？");
            else {
                cm.sendNext("只有联盟长才能解散联盟。");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            if(cm.getMeso() < allianceCost) {
                cm.sendOk("你的金币不足，无法建立家族联盟。");
                cm.dispose();
                return;
            }
            cm.sendGetText("请输入家族联盟的名称 (最多6个汉字，或12个英文字符)");
        } else if (choice == 3) {
            if(cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("你的家族联盟目前已达到扩充上限。");
                cm.dispose();
                return;
            }
            if(cm.getMeso() < increaseCost) {
                cm.sendOk("你的金币不足，无法扩充家族联盟。");
                cm.dispose();
                return;
            }
            
            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("联盟现在可以增加一个新的家族。");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("无法进行操作，此联盟不存在。");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("你已解散家族联盟。");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("要使用 '"+ guildName + "' 作为家族联盟的名字吗？");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("该名称无法使用，请更换其他名称。"); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null)
                cm.sendOk("请确认你和另外一位族长已组队，同一频道的相同地图里，并且双方家族目前都没有注册为家族联盟成员。这个过程中，不能有其它家族长参与其中。");
            else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("你成功创建了家族联盟。");
            }
            cm.dispose();
        }
    }
}