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
	Shuri the Tour Guide - Orbis (200000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version
---------------------------------------------------------------------------------------------------
**/

var pay = 2000;
var ticket = 4031134;
var msg;
var check;

var status = 0;

function start() {
    cm.sendSimple("你听说过有拥有令人流连忘返的美景的那片 #b#m110000000##k 吗？离这里 #m"+cm.getPlayer().getMapId()+"# 虽然稍稍有些遥远，不过只要支付 #b"+pay+" 金币#k或使用 #b#t"+ticket+"##k，我就可以送你去那里。\r\n\r\n#L0##b我愿意付 "+pay+" 金币。#k#l\r\n#L1##b我有 #t"+ticket+"#。#k#l\r\n#L2##b什么是 #t"+ticket+"#？#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendNext("你在这里还有些事情要处理吗？看起来你最近疲于旅行和打猎了。稍作休息后如果改变了主意，就来找我谈谈。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0)
                    msg = "要支付 #b"+pay+" 金币#k 前往 #m110000000#吗？";
                else if (selection == 1)
                    msg = "你有 #b#t"+ticket+"##k ？那样的话，你可以随时使用它免费前往 #m110000000#。";
                cm.sendYesNo(msg+"不过要小心，那附近也是有怪物的。那么，现在要前往 #m110000000# 吗？");
            } else if (selection == 2) {
                cm.sendNext("你一定很好奇 #b#t"+ticket+"##k 是什么。哈哈，这也难怪。拥有 #b#t"+ticket+"##k 的话，就可以免费前往黄金海岸。这东西珍贵又抢手，我好不容易才买到一张。但之前不小心弄丢了。");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getMeso() < pay) {
                    cm.sendOk("你的金币不足。");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("你的 #b#t"+ticket+"##k 在哪儿？是不是弄丢了？好好找找吧。");
                    cm.dispose();
                } else
                    access = true;
            }
            if (access) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3) 
            cm.sendNext("你一定很好奇 #b#t"+ticket+"##k 是什么。哈哈，这也难怪。拥有 #b#t"+ticket+"##k 的话，就可以免费前往黄金海岸。这东西珍贵又抢手，我好不容易才买到一张。但之前不小心弄丢了。");
        else if (status == 4)
            cm.sendPrev("弄丢它以后回来时，感觉真是糟透了。希望捡到它的人能妥善保管。总之，我的故事就是这样了，如果你捡到了它，就好好使用。还有什么问题的话，尽管来找我问。");
        else if (status == 5)
            cm.dispose();
        
    }
}