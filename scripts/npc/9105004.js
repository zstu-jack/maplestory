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
 * @Author Ronan
 * Snow Spirit
	Maplemas PQ coordinator
 */

importPackage(Packages.server.life);

var prizeTree = [[[2000002, 1002850], [20, 1]], [[2000006, 1012011], [20, 1]]];

var state;
var status;
var gift;
var pqType;
 
function start() {
        pqType = ((cm.getMapId() / 10) % 10) + 1;
        state = (cm.getMapId() % 10 > 0) ? 1 : 0;
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
    
                if(state > 0) {
                    insidePqAction(mode, type, selection);
                } else {
                    recruitPqAction(mode, type, selection);
                }
        }
}

function recruitPqAction(mode, type, selection) {
        if (status == 0) {
                em = cm.getEventManager("HolidayPQ_" + pqType);
                if(em == null) {
                        cm.sendOk("冰雪假日组队任务" + pqType + "发生了一个错误。");
                        cm.dispose();
                } else if(cm.isUsingOldPqNpcStyle()) {
                        action(1, 0, 0);
                        return;
                }

                cm.sendSimple("#e#b<组队任务：冰雪假日>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n与组队成员一起完成一次任务怎样？你会在这里遇到障碍和困难，只有出色的团队合作才能克服这一切。如果你想尝试挑战，请让你的#b队长#k来和我说话。#b\r\n#L0#我想要执行组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索。\r\n#L2#我想要听取更多相关细节。");
        } else if (status == 1) {
                if (selection == 0) {
                        if (cm.getParty() == null) {
                                cm.sendOk("处于组队状态时，才能执行组队任务。");
                                cm.dispose();
                        } else if(!cm.isLeader()) {
                                cm.sendOk("如果想执行组队任务，请让你的队长来和我对话。");
                                cm.dispose();
                        } else {
                                var eli = em.getEligibleParty(cm.getParty());
                                if(eli.size() > 0) {
                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), pqType)) {
                                                cm.sendOk("本频道已经有队伍正在执行组队任务，请等待其完成组队任务或切换至其他频道。");
                                        }
                                }
                                else {
                                        cm.sendOk("目前无法执行组队任务，原因可能是组队人数不满足要求，组队中存在不符合资格的成员，组队成员没有进入本地图之一。如果缺少组队成员，请尝试组队搜索功能。");
                                }

                                cm.dispose();
                        }
                } else if (selection == 1) {
                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                        cm.sendOk("现在组队搜索状态为: #b" + (psState ? "启用" : "禁用") + "#k。需要更改时请与我对话。");
                        cm.dispose();
                } else {
                        cm.sendOk("#e#b<组队任务：冰雪假日>#k#n\r\n\r\n组成队伍后，堆砌雪人，并保护幸福村免遭克洛斯的侵扰。入场后，与你的队伍成员收集雪之精气为雪人注入活力，并保护它长大。");
                        cm.dispose();
                }
        }
}

function insidePqAction(mode, type, selection) {
        var eim = cm.getEventInstance();
        var difficulty = eim.getIntProperty("level");
        var stg = eim.getIntProperty("statusStg1");

        var mapobj = eim.getInstanceMap(889100001 + 10 * (difficulty - 1));

        if(status == 0) {
                if(stg == -1) {
                        cm.sendNext("#b#h0##k...你可算来啦。这里是幸福村的村民们一起堆雪人的地方。但克洛斯的属下正在进攻这里。快动起来！我们的任务是在时间限制内保护雪人不被克洛斯属下的攻击。如果你消灭了克洛斯的属下，它们会掉落一种叫做雪之精气的道具。收集雪之精气把它丢在雪人附近，雪人就会成长。一旦雪人成长起来，我们的任务就完成了。有些怪物会掉落虚假的雪之精气。吸收了虚假的雪之精气时，雪人的融化速度会比平时要快。祝你们好运。 ");
                } else if(stg == 0) {
                        if(cm.getMap().getMonsterById(9400321 + 5 * difficulty) == null) {
                                cm.sendNext("拜托了，打败克洛斯的属下，让雪人长大。这样的话克洛斯就不得不亲自现身了。");
                                cm.dispose();
                        } else {
                                cm.sendNext("干得漂亮！就像我想的那样，你们成功打败了克洛斯的属下。太感谢你们了！(短暂的沉默...)但也有个坏消息，克洛斯好像并不甘心就这样结束。手下们已经把在这里发生的事情告诉了它，也就是说...他很快就会出现了。请继续战斗，再次祝你们好运。");
                        }
                } else {
                        if(!eim.isEventCleared()) {
                                cm.sendNext("请打败克洛斯，保护我们大家的圣诞节！");
                                cm.dispose();
                        } else {
                                cm.sendNext("哇！！你们打败了克洛斯！太感谢你们了，你们成功守护了圣诞节安然无恙！");
                        }
                }
        } else if(status == 1) {
                if(stg == -1) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("请让你们的队长和我交谈，来了解更多有关这次任务的细节。");
                                cm.dispose();
                                return;
                        }

                        mapobj.allowSummonState(true);
                        var snowman = MapleLifeFactory.getMonster(9400317 + (5 * difficulty));
                        mapobj.spawnMonsterOnGroundBelow(snowman, new java.awt.Point(-180, 15));
                        eim.setIntProperty("snowmanLevel", 1);
                        eim.dropMessage(5, "雪人出现了！请使出浑身解数保护它！");

                        eim.setIntProperty("statusStg1", 0);
                        cm.dispose();
                        return;
                } else if(stg == 0) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("请让你们的队长和我交谈，来了解更多有关这次任务的细节。");
                                cm.dispose();
                                return;
                        }

                        mapobj.broadcastStringMessage(5, "雪人成长到最大时，克洛斯如期而至了！");
                        eim.getEm().getIv().invokeFunction("snowmanHeal", eim);

                        var boss = MapleLifeFactory.getMonster(9400318 + difficulty);
                        mapobj.spawnMonsterOnGroundBelow(boss, new java.awt.Point(-180, 15));
                        eim.setProperty("spawnedBoss", "true");

                        eim.setIntProperty("statusStg1", 1);
                        cm.dispose();
                } else {
                        gift = cm.haveItem(4032092, 1);
                        if(gift) {
                                var optStr = generateSelectionMenu(generatePrizeString());
                                cm.sendSimple("喔~你带着#b#t4032092##k啊？那很好，我瞧瞧...这是你的圣诞节礼物。请选择一款你喜欢的：\r\n\r\n" + optStr);
                        } else if(eim.gridCheck(cm.getPlayer()) == -1) {
                                cm.sendNext("这是你的圣诞节礼物，请收好~");
                        } else {
                                cm.sendOk("圣诞节快乐！");
                                cm.dispose();
                        }
                }

        } else if(status == 2) {
                if(gift) {
                        var selItems = prizeTree[selection];
                        if(cm.canHoldAll(selItems[0], selItems[1])) {
                                cm.gainItem(4032092, -1);
                                cm.gainItem(selItems[0][0], selItems[1][0]);

                                if(selection == 1) {
                                        var rnd = (Math.random() * 9) | 0;
                                        cm.gainItem(selItems[0][1] + rnd, selItems[1][1]);
                                } else {
                                        cm.gainItem(selItems[0][1], selItems[1][1]);
                                }
                        } else {
                                cm.sendOk("请确保装备栏和消耗栏有足够的空间。");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer(), difficulty)) {
                                eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                                cm.sendOk("请确保装备栏、消耗栏和其他栏有足够的空间。");
                        }
                }

                cm.dispose();
        }
}

function generatePrizeString() {
        var strTree = [];
        
        for(var i = 0; i < prizeTree.length; i++) {
                var items = prizeTree[i][0];
                var qtys = prizeTree[i][1];

                var strSel = "";
                for(var j = 0; j < items.length; j++) {
                        strSel += ("#i" + items[j] + "# #t" + items[j] + "#" + (qtys[j] > 1 ? (" : " + qtys[j]) : ""));
                }

                strTree.push(strSel);
        }
        
        return strTree;
}

function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}