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
	Author: Traitor, XxOsirisxX, Moogra
*/

/**
 * Dojo Entrance NPC
 */
var status = -2;
var readNotice = 0;

function start() {
    cm.sendSimple("#e< 布告 >#n\r\n凡是有勇气挑战武陵道场的家伙，就到武陵道场来。 - 武公-\r\n\r\n\r\n#b#L0#挑战武陵道场#l\r\n#L1#仔细阅读布告#l");
}

function action(mode, type, selection) {
    status++;
    if(mode == 0 && type == 0)
        status -= 2;
    if (mode >= 0) {
        if (selection == 1 || readNotice == 1) {
            if (status == -1) {
                readNotice = 1;
                cm.sendNext("#e< 布告：挑战书 >#n\r\n吾乃武公，武陵道场之主。隐居武陵修炼日久，修为已臻化境。自今日起，武陵道场广纳四海英杰，勇力备具之人方可入内。\r\n凡有志于修炼者皆可挑战。若有意切磋，亦不妨登楼一试。豪弱之辨，不言自明。");
            } else if (status == 0)
                cm.sendPrev("另：不论孤众，皆可挑战。");
            else
                cm.dispose();
        } else {
            if (status == -1 && mode == 1) {
                cm.sendYesNo("(手搭在布告牌上的瞬间，一股神秘的力量笼罩了我。)\r\n\r\n你想要前往武陵道场吗？");
            } else if (status == 0) {
                if (mode == 0) {
                    cm.sendNext("#b(手从布告牌上挪开的瞬间，那股笼罩着我的神秘力量也消失了。)");
                } else {
                    cm.getPlayer().saveLocation("MIRROR");
                    cm.warp(925020000, 4);
                }
                cm.dispose();
            }
        }
    } else
        cm.dispose();
}