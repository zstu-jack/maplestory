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
/* Oasis near Ariant Castle
 */

importPackage(Packages.client);

function isTigunMorphed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210005;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                if(cm.isQuestStarted(3900) && cm.getQuestProgressInt(3900) != 5) {
                        cm.sendOk("#b(你喝下了宫廷绿洲里的水，感到神清气爽。)", 2);
                        cm.setQuestProgress(3900, 5);
                } else if(cm.isQuestCompleted(3938)) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你看到一缕头发(可能是提干的)浮在水面上，就一把抓住了它。想起上回 #b奇诺#k 是怎么做的，你就依样制作了一瓶新的 #t2210005#。", 2);
                                }
                        } else {
                                cm.sendOk("你的消耗栏空间不足。", 2);
                        }
                } else if(cm.isQuestStarted(3934) || (cm.isQuestCompleted(3934) && !cm.isQuestCompleted(3935))) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你发现了一只奇怪的瓶子飘在水面上。它看起来像是用来制作守卫变身药水的瓶子，也许有了它就能自由地进入皇宫内部了。", 2);
                                }
                        } else {
                                cm.sendOk("你发现了一只奇怪的瓶子飘在水面上。但你决定无视它，因为你的消耗栏空间不足了。", 2);
                        }
                }
                
                cm.dispose();
        }
    }
}