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

/*
    NPC ID: 1052013 
    NPC NAME: Computer
    @author Ronan
*/

var status;
var pqArea;
 
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
                
                if(cm.getMapId() != 193000000) {
                        var eim = cm.getEventInstance();
                    
                        if(status == 0) {
                                if(!eim.isEventCleared()) {
                                        var couponsNeeded = eim.getIntProperty("couponsNeeded");
                                    
                                        if(cm.isEventLeader()) {
                                                if(cm.haveItem(4001007, couponsNeeded)) {
                                                        cm.sendNext("你们收集到了足够多的通行证，干得漂亮！");
                                                        cm.gainItem(4001007, couponsNeeded);
                                                        eim.clearPQ();

                                                        cm.dispose();
                                                        return;
                                                } else {
                                                        cm.sendYesNo("你们需要收集 #r" + couponsNeeded + "#k 张通行证来完成本关卡。得到足够的数量后再来和我说话...或者你是想#b现在离开#k吗? 请注意，如果现在离开的话，#r你的队伍成员也会一起退出地图#k。");
                                                }
                                        } else {
                                                cm.sendYesNo("你们需要收集 #r" + couponsNeeded + "#k 张通行证来完成本关卡，让你的队长来和我说话...或者你是想#b现在离开#k吗? 请注意，如果现在离开的话，队伍将#r无法满足人数需求通过此关卡#k。");
                                        }
                                } else {
                                        if(!eim.giveEventReward(cm.getPlayer())) {
                                                cm.sendOk("请确认其它栏有足够的空间以获得奖励。");
                                                cm.dispose();
                                        } else {
                                                cm.warp(193000000);
                                                cm.dispose();
                                        }
                                }
                        } else if(status == 1) {
                                cm.warp(193000000);
                                cm.dispose();
                        }
                } else {
                        var levels = ["#m190000000#", "#m191000000#", "#m192000000#", "#m195000000#", "#m196000000#", "#m197000000#"];
                        if (status == 0) {
                                var sendStr = "奔腾路由多个容纳了多种多样的怪物的区域组成，能够作为从#p1052014#处获取经验与橡皮的理想场所，请选择你想要进入的区域:\r\n\r\n#b";
                                for(var i = 0; i < 6; i++) {
                                    sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
                                }

                                cm.sendSimple(sendStr);
                        } else if (status == 1) {
                                pqArea = selection + 1;
                            
                                em = cm.getEventManager("CafePQ_" + pqArea);
                                if(em == null) {
                                        cm.sendOk("网吧组队任务在 " + pqArea + " 发生了错误。");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        status = 1;
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：奔腾路 - " + levels[selection] + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n #p1052014# 的运行方式与众不同。并不依赖金币或百宝券运行，而是花费#r橡皮#k, 它们可以通过完成奔腾路的任务来获得。想要进入此处冒险，需要寻找队友执行组队任务。建立队伍后，请让你们的 #b队长#k 与我对话。#b\r\n#L0#我想执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "停止" : "开始") + " 组队搜索。\r\n#L2#我想了解更多细节。");
                        } else if (status == 2) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("请在组成队伍后再尝试挑战。");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("只有队长可以开启组队任务，请让队长来与我对话。");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("本频道已经有队伍正在进行组队任务，请等待其完成组队任务或切换至其他频道。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("您还无法开始这个组队任务.因为组队人数不对,或是组队成员中存在不符合资格的成员,又或者是尚有组队成员没有进入此地图.如果缺少组队成员,请尝试使用组队搜索功能.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("现在团队搜索状态为: #b" + (psState ? "开启" : "关闭") + "#k. 你想更改的时候就跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：奔腾路由>#k#n\r\n进入地图后，队员们将面对大量相应等级的怪物，从它们身上收集到所有的通行证交给我。与关卡对应地，每位成员都可以收到一枚橡皮。在自动售货机处可以使用#b相同的橡皮或是多枚不同的橡皮#k来交换更好的奖励。");
                                        cm.dispose();
                                }
                        }
                }
        }
}