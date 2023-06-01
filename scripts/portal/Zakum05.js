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
/*
    Zakum Entrance
*/
 
function enter(pi) {
    if (!(pi.isQuestStarted(100200) || pi.isQuestCompleted(100200))) {
        pi.getPlayer().dropMessage(5,"需要得到长老公馆的许可才能进行挑战。");
        return false;
    }
    
    if (!pi.isQuestCompleted(100201)) {
        pi.getPlayer().dropMessage(5,"你还没有完成所有的试炼，无法尝试挑战扎昆。");
        return false;
    }
    
    if (!pi.haveItem(4001017)) {    // thanks Conrad for pointing out missing checks for token item and unused reactor
        pi.getPlayer().dropMessage(5,"拥有火焰之眼的人方可直面扎昆。");
        return false;
    }
    
    var react = pi.getMap().getReactorById(2118002);
    if (react != null && react.getState() > 0) {
        pi.getPlayer().dropMessage(5,"扎昆祭台的入口目前尚未开启。");
        return false;
    }
    
    pi.playPortalSound(); pi.warp(211042400,"west00");
    return true;
}