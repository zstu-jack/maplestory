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
/* Yulete
	Traces of Yulete (926100500)
	Talking
 */

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {
                        cm.sendSimple("我失败了...呵，这就是犹泰的末路，真可悲...你们这群家伙一定很开心，而我就只能在阴暗的地牢里慢慢腐烂。我所做的一切都是为了玛加提亚！！（呜咽）\r\n #Ll#嘿，伙计，振作起来！我们没有造成多少不可挽回的损失。玛加提亚制定这些禁令是为了保护它的居民免于被这样恶果的威胁——过于强大的力量被心怀不轨的人所掌握的恶果。这并不是你的末路，协助协会为你所做过的事情善后，一切都会好起来的。#l");
                } else if (status == 1){
                        cm.sendNext("...即便在我做下这些事情以后，你们也会原谅我吗？好吧，我想我被以这种方式取得的强大力量蒙蔽了双眼。也许他们说得没错，仅仅只是懂得使用力量还远远不够，防止自己在使用力量的过程中腐化也同样重要...我深感抱歉，为了向所有人表达歉意，我会与协会重新合作，提供一切我所取得的炼金科学成果。谢谢你们。");
                } else {
                        if(!cm.isQuestCompleted(7770)) cm.completeQuest(7770);
                        
                        cm.warp(926100600);
                        cm.dispose();
                }
        }
}