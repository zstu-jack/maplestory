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
/**
 *9201003.js - Mom and Dad
 *@author Jvlaple
 *@author Ronan
 */
 var numberOfLoves = 0;
 var status = -1;
 var state = 0;
 
 function hasProofOfLoves(player) {
     var count = 0;
 
     for (var i = 4031367; i <= 4031372; i++) {
         if (player.haveItem(i)) {
             count++;
         }
     }
 
     return count >= 4;
 }
 
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
             if (!cm.isQuestStarted(100400)) {
                 cm.sendOk("你来了，#h0#?有什么事吗?");
                 cm.dispose();
             } else {
                 if (cm.getQuestProgress(100400, 1) == 0) {
                     cm.sendNext("母亲，父亲，我想请求你们一件事...我想了解你们所经历的事情，你们是如何相识，相知，相恋的呢？", 2);
                 } else {
                     if (!hasProofOfLoves(cm.getPlayer())) {
                         cm.sendOk("孩子,我们要确定你是否做好准备与你所选择的人共度余生，去收集#b4个 #t4031367##k吧。");
                         cm.dispose();
                     } else {
                         cm.sendNext("#b#h0##k，你一直是我们引以为豪的家人。那么我们现在就#r祝福#k你与你的未婚妻，希望你们幸福。你现在可以去找#p9201000#了，他会为你们制作婚戒。愿你们有一场心甜意洽的旅行~~");
                         state = 1;
                     }
                 }
             }
         } else if (status == 1) {
             if (state == 0) {
                 cm.sendNextPrev("孩子，你想得可真周到。既然向我们求助了，那我们也一定会帮忙的！");
             } else {
                 cm.sendOk("母亲...父亲...非常感谢你们的鼓励！！", 2);
 
                 cm.completeQuest(100400);
                 cm.gainExp(20000 * cm.getPlayer().getExpRate());
                 for (var i = 4031367; i <= 4031372; i++) {
                     cm.removeAll(i);
                 }
 
                 cm.dispose();
             }
         } else if (status == 2) {
             cm.sendNextPrev("你们肯定已经见过#r娜娜们#k了，她们是冒险岛世界的#r爱情精灵#k。请从她们几个那里收集#b4枚 #t4031367##k回来。这次旅行将会解答你们关于爱情的困惑...");
         } else if (status == 3) {
             cm.setQuestProgress(100400, 1, 1);
             cm.dispose();
         }
     }
 }