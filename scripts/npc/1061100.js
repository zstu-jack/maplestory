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
-- Odin JavaScript --------------------------------------------------------------------------------
	Hotel Receptionist - Sleepywood Hotel(105040400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.3 - More Cleanup by Moogra - 12/17/09
        1.2 - Cleanup and Statement fix by Moogra
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var regcost = 499;
var vipcost = 999;
var iwantreg = 0;

function start() {
    cm.sendNext("欢迎来到林中之城旅馆。我们永远尽心为您提供最好的服务。如果您疲于狩猎，在这里休息一下如何？");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 1))
        cm.dispose();
    else {
        if (mode == 0 && status == 2) {
            cm.sendNext("我们有两种服务，请选择您想要的服务。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1) {
            cm.sendSimple("我们提供两种房间，请您挑选.\r\n#b#L0#普通桑拿房 (" + regcost + " 金币 )#l\r\n#L1#高级桑拿房 (" + vipcost + " 金币 )#l");
            iwantreg = 1;
        } else if (status == 2) {
            if (selection == 0)
                cm.sendYesNo("您选择了普通桑拿房，您的HP和MP会回复得很快，您也可以在里面购买商品，您确定要进入吗？");
            else if (selection == 1) {
                cm.sendYesNo("您选择了高级桑拿房，您的HP和MP会比一般桑拿室回复得更快，也可以在里面找到特殊的物品，您确定要进入吗？");
		iwantreg = 0;
            }
        } else if (status == 3) {
            if (iwantreg == 1) {
                if (cm.getMeso() >= regcost) {
                    cm.warp(105040401);
                    cm.gainMeso(-regcost);
                } else
                    cm.sendNext("很抱歉，看起来您似乎没有足够的金币。您至少要有 " + regcost + " 金币才能使用普通桑拿房.");
            } else {
                if (cm.getMeso() >= vipcost) {
                    cm.warp(105040402);
                    cm.gainMeso(-vipcost);
                } else
                    cm.sendNext("很抱歉，看起来您似乎没有足够的金币。您至少要有 " + vipcost + " 金币才能使用高级桑拿房.");
            }
            cm.dispose();
        }
    }
}