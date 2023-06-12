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

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        var mapid = cm.getMapId();
                        if(mapid == 674030100) {
                                cm.sendNext("你好，我是#p9220019#.");
                                cm.dispose();
                                return;
                        } else if(mapid == 674030300) {
                                cm.sendNext("你好啊，#h0#。这里就是V的宝库。达到时间限制之前，在里面想做什么都可以。其实这里也确实有很多秘密尚待揭露。当然，你也可以通过这个传送点#r返回#k入口。");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendYesNo("确定要返回吗？现在原路返回，就这么把队友丢在这里，真的要这样做吗？");
                } else if(status == 1) {
                        cm.warp(674030100);
                        cm.dispose();
                }
        }
}