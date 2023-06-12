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
/* Ms. Tan
	Henesys Skin Change.
*/
var status;
var skin = Array(0, 1, 2, 3, 4);
var price = 1000000;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
                cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
    
                
                if (status == 0) {
                        cm.sendSimple("欢迎来到弓箭手村护夫中心! 是否有想要染的皮肤呢?? 就像我的健康皮肤??  如果你有 #b#t5153000##k, 就可以随意染的想到的皮肤~~~\r\n#L2#我已经有一个优惠券!#l");
                }
                else if (status == 1) {
                        if (cm.haveItem(5153000)){
                                cm.sendStyle("选一个想要的风格.", skin);
                        } else {
                                cm.sendOk("再仔细看看背包，貌似没有#b#t5153000##k..");
                                cm.dispose();
                                return;
                        }
                }
                else {
                        cm.gainItem(5153000, -1);
                        cm.setSkin(selection);
                        cm.sendOk("享受你的新皮肤吧！");
                        cm.dispose();
                }
        }
}
