/* 
 * This file is part of the OdinMS Maple Story Server
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

/* 
 * @Author Lerk
 * 
 * Shawn, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Guild Quest Info
 */

var status;
var selectedOption;

function start() {
    selectedOption = -1;
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
        if (mode == 1 && status == 3) {
            status = 0;
        }
        if (status == 0) {
            var prompt = "\r\n#b#L0#圣瑞尼亚是什么？#l\r\n#b#L1##t4001024#？那是什么？#l\r\n#b#L2#家族对抗赛是什么？#l\r\n#b#L3#我没有任何问题了。#l";
            if (selectedOption == -1) {
                prompt = "我们是家族同盟，长久以来一直试图揭开珍贵遗物'荣耀之石'的秘密。因而发现了圣瑞尼亚，这座古老的神秘国度就长眠于此。我们还找到了有关那颗传说的神秘宝石#t4001024#的线索，也许它就在圣瑞尼亚遗迹之中。这也是家族同盟会在这里举办家族任务的原因，就是为了最终寻获#t4001024#。" + prompt;
            } else {
                prompt = "还有什么想问的吗？" + prompt;
            }
            cm.sendSimple(prompt);
        }
        else if (status == 1) {
            selectedOption = selection;
            if (selectedOption == 0) {
                cm.sendNext("圣瑞尼亚是一个拥有文字流传的古老文明，它的治权范围曾经遍及金银岛的每一寸土地。现存的石头人寺院、地穴深处的寺庙以及其它尚不明确建造者的古代建筑都建成于圣瑞尼亚时期。");
            }
            else if (selectedOption == 1) {
                cm.sendNext("#t4001024#是传说中的宝石，它能使佩戴者永葆青春。然而讽刺的是，似乎#t4001024#的每一任主人都被推翻了，这或许能够解释圣瑞尼亚文明的衰落。");
                status = -1;
            }
            else if (selectedOption == 2) {
                cm.sendNext("我曾经派遣一批探险者进入圣瑞尼亚遗迹，但没有一个人从那里返回，这促使了我们启动家族任务。我们一直在等待像你们这样强大到足以应对严峻挑战的家族加入这场任务。");
            }
            else if (selectedOption == 3) {
                cm.sendOk("真的没有了？如果有什么不懂的，尽管来问我就好。");
                cm.dispose();
            }
            else {
                cm.dispose();
            }
        }
        else if (status == 2) { //should only be available for options 0 and 2
            if (selectedOption == 0) {
                cm.sendNextPrev("圣瑞尼亚王国的末代君主是一位名叫锡安列三世的贤王，很显然他是一位既明智，又体恤臣民的君王。没有任何原因可以解释这样的王国会在一夜之间崩毁。");
            }
            else if (selectedOption == 2) {
                cm.sendNextPrev("家族对抗赛的终极目标是探索圣瑞尼亚并寻获#t4001024#。这不是一份可以使用蛮力解决一切的任务。团队协作反而尤为重要。");
            }
            else {
                cm.dispose();
            }
        }
    }
}