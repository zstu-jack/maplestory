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
//carta
function start(){
    if(cm.isQuestStarted(6301)) {
        if (cm.haveItem(4000175)) {
            cm.gainItem(4000175, -1);
            cm.warp(923000000, 0);
        } else {
            cm.sendOk("开启次元裂缝需要消耗一枚皮亚奴斯模型。击败皮亚奴斯后有概率获得该道具。");
        }
    } else {
        cm.sendOk("我是海巫女 #b卡勒塔#k。别想愚弄我，众所周知，我的爱好就是把人类变成虫子。");
    }
    
    cm.dispose();
}