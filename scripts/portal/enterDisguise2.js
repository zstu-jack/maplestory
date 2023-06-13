/*
    This file is part of the HeavenMS MapleStory Server
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
	Map(s): 		Empress' Road : Training Forest I
	Description: 		Takes you to Tiv's Forest
*/

var jobtype = 1;

function enter(pi) {
	if(pi.isQuestStarted(20301) || pi.isQuestStarted(20302) || pi.isQuestStarted(20303) || pi.isQuestStarted(20304) || pi.isQuestStarted(20305)) {
		var map = pi.getClient().getChannelServer().getMapFactory().getMap(108010600 + (10 * jobtype));
                if(map.countPlayers() > 0) {
                        pi.message("已经有其他玩家在这片区域进行搜索了。");
                        return false;
                }
                
                if(pi.haveItem(4032101 + jobtype, 1)) {
                        pi.message("你已经成功击败变身术士，请向骑士团长报告你的胜利。");
                        return false;
                }
                
		pi.playPortalSound(); pi.warp(108010600 + (10 * jobtype), "out00");
	} else {
		pi.playPortalSound(); pi.warp(130010020, "out00");
	}
	return true;
}
