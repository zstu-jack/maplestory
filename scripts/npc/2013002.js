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
 *2013002.js - Minerva the Goddess
 *@author Ronan
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;        
        if (cm.getPlayer().getMapId() == 920010100) { //Center tower
            if (status == 0)
                cm.sendYesNo("我已经解开了封锁咒语，从这里通往女神塔宝物仓库的通道开放了。你们或许可以在下面找到一些好东西...也可能你们想要现在离开。你们确定要离开吗？");
            else if (status == 1) {
                cm.warp(920011300, 0);
                cm.dispose();
            }
            
        } else if (cm.getPlayer().getMapId() == 920011100) {
            if (status == 0)
                cm.sendYesNo("你们确定要离开吗？");
            else if (status == 1) {
                cm.warp(920011300, 0);
                cm.dispose();
            }
                        
        } else if (cm.getPlayer().getMapId() == 920011300) {
            if (status == 0) 
                cm.sendNext("感谢你们，不仅修复了女神像，还把我从封印中解救了出来。愿女神的祝福与你们同在，直到永远...为了表示感谢，请务必收下这份纪念着你们勇敢之举的礼物。");
            else if (status == 1) {
                if(cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(200080101, 0);
                    cm.dispose();
                }
                else {
                    cm.sendOk("请先腾出背包空间再与我对话。");
                    cm.dispose();
                }
            }
        }
    }
}