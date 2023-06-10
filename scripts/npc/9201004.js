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
/* Amos the Wise
	Amoria (680000000)
	Wedding info.
 */

    importPackage(Packages.net.server.channel.handlers);

    var status;
    
    var rings = [1112806, 1112803, 1112807, 1112809];
    var divorceFee = 500000;
    var ringObj;
    
    function getWeddingRingItemId(player) {
        for (var i = 0; i < rings.length; i++) {
            if (player.haveItemWithId(rings[i], false)) {
                return rings[i];
            }
        }
    
        return null;
    }
    
    function hasEquippedWeddingRing(player) {
        for (var i = 0; i < rings.length; i++) {
            if (player.haveItemEquipped(rings[i])) {
                return true;
            }
        }
    
        return false;
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
                var questionStr = ["订婚的流程?", "结婚的流程?", "我想要离婚,应该怎么办?"]
    
                if (!(!cm.getPlayer().isMarried() && getWeddingRingItemId(cm.getPlayer()))) questionStr.push("我想要离婚...");
                else questionStr.push("我希望销毁我的旧婚戒...");
    
                cm.sendSimple("你好,欢迎来到#b婚礼村#k,这里是一处风景胜地,冒险家们会在这里找寻自己的另一半,同时也有许多幸运的情侣在这里成婚.你对婚礼村有什么问题想问吗?告诉我就好.#b\r\n\r\n" + generateSelectionMenu(questionStr));
            } else if (status == 1) {
                switch (selection) {
                    case 0:
                        cm.sendOk("#b订婚流程#k是非常简单直接的.首先需要从#b戒指制作商人,#p9201000##k那里接受任务,在冒险岛世界中收集#b4枚#t4031367##k.\r\n\r\n完成任务后,你就可以制作订婚戒指了.用包装好的订婚戒指向你喜欢的人表白,并期待她的回应.很浪漫,不是吗?");
                        cm.dispose();
                        break;
    
                    case 1:
                        cm.sendOk("#b结婚流程#k开始前,首先需要订婚.相爱的情侣首先需要选择他们的婚礼会场.婚礼小镇提供了两种会场:#r大教堂#k和#r礼拜堂#k.\r\n然后,情侣中的一人需要购买一张#b婚礼券#k,可以从现金商城买到它.之后向婚礼助手预订婚礼.双方都将会获得用于分发给亲友的#r请柬#k.");
                        cm.dispose();
                        break;
    
                    case 2:
                        cm.sendOk("可惜的是,无论是多么牢固的爱情誓言,都可能会有那么一天产生裂痕.总之,虽然非我所愿,但希望离婚的夫妻也有很多.那么当出现这种情况的时候,我会为他们提供离婚的渠道,不过需要收取#r" + divorceFee + "#k金币作为手续费.");
                        cm.dispose();
                        break;
    
                    case 3:
                        ringObj = cm.getPlayer().getMarriageRing();
                        if (ringObj == null) {
                            var itemid = getWeddingRingItemId(cm.getPlayer());
    
                            if (itemid != null) {
                                cm.sendOk("好的，你的旧婚戒已经被销毁.");
                                cm.gainItem(itemid, -1);
                            } else if (hasEquippedWeddingRing(cm.getPlayer())) {
                                cm.sendOk("如果你想销毁你的旧婚戒,请在与我交谈前将其取下.");
                            } else {
                                cm.sendOk("你尚未成婚,无法申请离婚.");
                            }
    
                            cm.dispose();
                            return;
                        }
    
                        cm.sendYesNo("那么,你想要与你的伴侣离婚吗?要思考再三后作出回答,离婚是#b不可取消#k的操作,你的婚戒也会随之被销毁.那么,你#r确定要离婚#k了吗?");
                        break;
                }
            } else if (status == 2) {
                if (cm.getMeso() < divorceFee) {
                    cm.sendOk("你没有足够的金币,需要支付#r" + divorceFee + "金币#k方可离婚.");
                    cm.dispose();
                    return;
                } else if (ringObj.equipped()) {
                    cm.sendOk("执行离婚时请将婚戒取下,放入背包.");
                    cm.dispose();
                    return;
                }
    
                cm.gainMeso(-divorceFee);
                RingActionHandler.breakMarriageRing(cm.getPlayer(), ringObj.getItemId());
                cm.gainItem(ringObj.getItemId(), -1);
    
                cm.sendOk("你与你的伴侣解除了婚姻关系.");
                cm.dispose();
            }
        }
    }
    
    function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
            menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
    }