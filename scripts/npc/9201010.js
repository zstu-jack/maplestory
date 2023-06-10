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
/**
	Assistant Travis
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var eim = cm.getEventInstance();
    if (eim == null) {
        cm.warp(680000000, 0);
        cm.dispose();
        return;
    }

    var isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));

    switch (status) {
        case 0:
            if (cm.getMapId() == 680000300) {
                cm.sendYesNo("你确定要#r中途退出婚礼#k前往#b婚礼小镇#k吗?这样的话,将会#r跳过奖励阶段#k.");
            } else {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }

                if (cm.haveItem(4000313) && isMarrying) {
                    if (eim.getIntProperty("weddingStage") == 3) {
                        cm.sendOk("你们完全把气氛活跃起来了!!!快,与#b#p9201007##k交谈,前往婚礼派对吧.");
                        cm.dispose();
                    } else if (hasEngagement) {
                        if (!cm.createMarriageWishlist()) {
                            cm.sendOk("你已经提交了愿望单...");
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("嗯?开启盛大派对的资格书呢?抱歉,没有证明的话,无法继续婚礼流程.");
                    }
                } else {
                    if (eim.getIntProperty("weddingStage") == 3) {
                        if (!isMarrying) {
                            cm.sendYesNo("你们是不是不巧与他们错过了?我们的超级巨星#r配合默契#k,即将开启#b婚礼派对#k.你确定要#r就此退出#k回到#b婚礼小镇#k吗?");
                        } else {
                            cm.sendOk("你们完全把气氛活跃起来了!!!快,与#b#p9201007##k交谈,前往婚礼派对吧.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendYesNo("你确定要#r中途退出婚礼#k前往#b婚礼小镇#k吗?这样的话,将会#r跳过奖励阶段#k.");
                    }
                }
            }
            
            
            break;
            
        case 1:
            cm.warp(680000000,0);
            cm.dispose();
            break;
    }
}
