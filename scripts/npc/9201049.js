/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

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
/* Ames the Wise
	Wedding exit map
	Gives Onyx Chest to anyone completing the wedding event.
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
            cm.sendOk("你好啊,在婚礼上留下开心的回忆了吗?那么现在我会带你回到#b婚礼村#k.");                        
        } else if(status == 1) {
            var eim = cm.getEventInstance();
            if(eim != null) {
                var boxId = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId")) ? 4031424 : 4031423;
                
                if(cm.canHold(boxId, 1)) {
                    cm.gainItem(boxId, 1);
                    cm.warp(680000000);
                    cm.sendOk("你刚刚收到了一份礼物.去婚礼村找#b#p9201014##k吧,她知道如何开启这个玛瑙箱子.");
                } else {
                    cm.sendOk("请空出一格其他栏来存放玛瑙箱子.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.warp(680000000);
            }
            
            cm.dispose();
        }
    }
}