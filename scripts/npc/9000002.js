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
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendNext("邦邦邦邦！你在#b活动#k中取得了优胜。\r\n恭喜你来到这里！");
        } else if (status == 1) {
            cm.sendNext("作为获胜的奖励，你将会获得#b恶魔文件。在这幅卷轴上记载了古代人物的秘闻。");
        } else if (status == 2) {
            cm.sendNext("废弃都市北方的#r千吉#k与玩具城的#r克林#k都可以破译恶魔文件。\r\n带着它去拜访他们，也许会获得什么不错的奖励。");
        } else if (status == 3) {
        if (cm.canHold(4031019)) {
            cm.gainItem(4031019);
            cm.warp(cm.getPlayer().getSavedLocation("EVENT"));
            cm.dispose();
        } else {
            cm.sendNext("你的其他栏好像满了。请腾出空间后再和我对话。");
        }
        } else if (status == 4) {
            cm.dispose();
        }
    }
}  
