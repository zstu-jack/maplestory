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
/* Miranda
        NLC Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("嗨，你好啊！欢迎来到新叶城护肤中心~！想要像我一样拥有精致、健康的肌肤吗？只要有 #b#t5153009##k，你就可以享受我们的服务，拥有梦寐以求的健康肤色~！\r\n#L2#选择肤色：#i5153009##t5153009##l");
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 2) 
                cm.sendStyle("使用这里的特制医疗器械，可以预览术后效果。你喜欢哪种肤色？选择一款你喜欢的风格吧。", skin);
        }
        else if (status == 2){
            if (cm.haveItem(5153009)){
                cm.gainItem(5153009, -1);
                cm.setSkin(skin[selection]);
                cm.sendOk("好了，让朋友们赞叹你的新肤色吧！");
            } else {
                cm.sendOk("很抱歉，如果没有护肤会员卡的话，我无法为你服务。");
            }
            
            cm.dispose();
        }
    }
}