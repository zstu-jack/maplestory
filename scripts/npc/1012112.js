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
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
 */

var status = 0;
var em = null;

function start() {
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

        if (cm.getMapId() == 100000200) {
            if (status == 0) {
                em = cm.getEventManager("HenesysPQ");
                if (em == null) {
                    cm.sendOk("PQ遇到了一个错误。请联系GM，与截图.#b#l");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<Party Quest: Primrose Hill>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nI'm Tory. Inside here is a beautiful hill where the primrose blooms. There's a tiger that lives in the hill, Growlie, and he seems to be looking for something to eat. Would you like to head over to the hill of primrose and join forces with your party members to help Growlie out?#b\r\n#L0#I want to participate in the party quest.\r\n#L1#I would like to " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "disable" : "enable") + " Party Search.\r\n#L2#I would like to hear more details.\r\n#L3#I would like to redeem an instance hat.");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("这个地方被神秘的满月光环笼罩着，一个人不能随便进入。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("如果你想尝试，请告诉 #b组队队长#k 跟我说话.#b#l");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("另一方已进入 #r月秒任务#k 在这里。请尝试另一个频道，或者等待当前的任务完成.#b#");
                            }
                        }
                        else {
                            cm.sendOk("你还不能开始这个团队任务，你的团队不在当前地图范围内，或者你的队员没有资格进入。如果遇到问题，试试“团队搜索”。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("现在团队搜索状态为: #b" + (psState ? "启动" : "禁用") + "#k. 你想更改的时候就跟我说。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<Party 任务: 樱草山>#k#n\r\n从地图底部的花朵中收集报春花种子，并将它们放在上方的平台上。报春花种子的颜色必须匹配才能生长，请尝试找到正确的组合。当所有的种子都被播种，第二部分的任务即将开始。月妙兔会出现，同时它会不断制作年糕。收集到足够的年糕，交给下方NPC，你的任务就完成了。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("所以你想用#b20个#b#t4001158##k来交换特别的帽子?");
                }
            } else {
                if (cm.hasItem(4001158, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001158, -20);
                        cm.gainItem(1002798, 20);
                        cm.sendNext("交换成功");
                    }
                } else {
                    cm.sendNext("你没有足够的 #t4001158# ，兑换失败。");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("现在问题解决了，还有另一个问题正在发生，如果您感兴趣，请查看#b拖米#k以获取信息。你现在要直接射手村吗?");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("看来背包的空间不够了。获得奖励前，请检查下背包吧。");
                }
                cm.dispose();
            }
        } else if (cm.getMapId() == 910010400) {
            if (status == 0) {
                cm.sendYesNo("现在要回射手村吗？");
            } else if (status == 1) {
                if (cm.getEventInstance() == null) {
                    cm.warp(100000200);
                } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("看来背包的空间不够了。获得奖励前，请检查下背包吧。");
                }
                cm.dispose();
            }
        }
    }
}