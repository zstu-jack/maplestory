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
                    cm.sendOk("组队任务发生了错误。请联系GM并提供截图.#b#l");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队任务: 迎月花山丘>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n嗨，我是达尔利。想去迎月花山丘探险吗，那里漫山遍野开满迎月花。在这座山上有一只名叫兴儿的老虎，它似乎在寻找些吃的。你是否愿意和你的队员一起上山帮助它寻找它最爱吃的年糕呢？#b\r\n#L0#我想要进入组队任务\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "停止" : "开始") + " 组队搜索\r\n#L2#我想了解更多细节\r\n#L3#我想要兑换#t1002798#");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("这里被满月的神秘力量所笼罩，任何人都无法独自闯入。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("如果想进入组队任务，请让你的队长来和我对话。");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("本频道已经有队伍正在进行组队任务，请等待其完成组队任务或请切换至其他频道。");
                            }
                        }
                        else {
                            cm.sendOk("组队中有玩家的等级并不符合要求或有队员并不在本地图，导致无法进行组队任务。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("现在团队搜索状态为: #b" + (psState ? "启动" : "禁用") + "#k. 你想更改的时候就跟我说。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<组队任务: 月秒迎月花山丘>#k#n\r\n在进入山丘后，你会发现地图下方开满了花朵，你可以从它们身上获得迎月花种子，并将种子种在中央月亮四周的平台上，就会长出迎月花，但你要找到正确的种植平台才可以让迎月花盛开哦。当所有的种子都成功播种后，任务的第二阶段就开始了，中央的明月变为满月，月兔——月妙出现，并勤劳地为饥饿的兴儿制作年糕，在这时，你和你的队员需要一起保护月妙免遭周围怪物的进攻，让它可以顺利制作年糕。一旦你获得了足以让兴儿大饱口福的年糕数量后，与它交谈，就可以完成任务了。对了，多说一句，如果你可以多收集些年糕，我会在奖励地图给你一些额外的奖励哦。加油。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("所以你想用#b20个#b#t4001158##k来兑换#b#t1002798##k?");
                }
            } else {
                if (cm.hasItem(4001158, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001158, -20);
                        cm.gainItem(1002798, 20);
                        cm.sendNext("兑换成功");
                    }
                } else {
                    cm.sendNext("你没有足够的 #t4001158# ，兑换失败。");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("谢谢你对兴儿的帮助。在你接受兴儿的感谢并获得奖励后，我这里也有一些奖励给你。如果你感兴趣的话，可以和左边的 #b达尔米#k 聊聊。");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("请检查你的背包装备栏是否有空位。");
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
                    cm.sendOk("请检查你的背包装备栏是否有空位。");
                }
                cm.dispose();
            }
        }
    }
}