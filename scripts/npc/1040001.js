/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

                if (status == 0) {
                        if (cm.isQuestStarted(2048)) {

                                cm.sendOk("克利斯拉玛是怎么知道的……好吧。让我来告诉你。#r星石#k可以从想要制作年轻药的#b萨比特拉玛#k那里用红参交换。#r冰块#k的制作方法据说掌握妖精一族的手中，你可以去问问魔法密林的#b艾温#k。至于#r上古卷轴#k，它原本是被人偶师用于制作#b黑石傀儡#k的道具……现在的冒险家喜欢称之为#b黑石头人#k。#r火焰羽毛#k出自一种传说中的生物——#b独角狮的幼崽#k，它们在现今的金银岛已经绝迹。不过据古籍所载，#b赤龙#k曾有一段时间捕食它们，如果足够幸运，狩猎#b赤龙#k时也许会获得几根。");

                        } else {
                                cm.sendOk("呼噜噜...");
                        }

                        cm.dispose();
                }
        }
}
