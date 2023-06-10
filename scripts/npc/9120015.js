/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Konpei - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Fixed by Moogra
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
function start() {
    cm.sendSimple ("想做什么？\r #L0##b了解有关<火狸金融>的消息#l\r\n#L1#送我前往<火狸金融>#l\r\n#L2#没什么#l#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendNext("我可以送你去<火狸金融>，但那里被一群凶残暴力的黑道把持着。深入其中，你会发现大头头，这里所有的首领、头目都听命于他。虽然潜入其中并不算难，但火狸金融的顶层每天只能进入一次。大头头的房间可不是随便什么都能来去自如的地方。我建议你不要在那里停留太久，进去之后迅速地解决你的事情。不仅仅是大头头本人很难缠，就连闯入的途中，你也会遇到一批强大无比的对手。这可不是说笑的。");
                cm.dispose();
            } else if (selection == 1)
                cm.sendNext("喔，看来是个有胆识的家伙。我一直期待你这样的人到来。如果那些黑道再不被约束一下，真不知道昭和村会发生什么事情。在事态恶化之前，希望你把他们料理掉，并且打败住在5楼顶层的大头头。你需要时刻保持警惕，因为就算再聪明的家伙也很难胜过大头头。不过，从眼神里我能够看得出，你这家伙可以做到。出发吧！");
            else {
                cm.sendOk("我是个大忙人，如果你没什么事情就离我远点。");
                cm.dispose();
            }
        } else {
            cm.warp(801040000, "in00");
            cm.dispose();
        }
    }
}