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
/* Wayne
	Marriage NPC
 */

    var status;
    var state;
    var eim;
    var weddingEventName = "WeddingChapel";
    var cathedralWedding = false;
    
    
    function isSuitedForWedding(player, equipped) {
        var baseid = (player.getGender() == 0) ? 1050131 : 1051150;
    
        if (equipped) {
            for (var i = 0; i < 4; i++) {
                if (player.haveItemEquipped(baseid + i)) {
                    return true;
                }
            }
        } else {
            for (var i = 0; i < 4; i++) {
                if (player.haveItemWithId(baseid + i, true)) {
                    return true;
                }
            }
        }
    
        return false;
    }
    
    function getMarriageInstance(player) {
        var em = cm.getEventManager(weddingEventName);
    
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
            var eim = iterator.next();
            if (eim.isEventLeader(player)) {
                return eim;
            }
        }
    
        return null;
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
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }
    
                if (hasEngagement) {
                    var text = "你好,迫不及待想要与未婚妻订下终身的誓言了吗?";
                    var choice = new Array("我们决定结婚.");
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
                    cm.sendSimple(text);
                } else {
                    cm.sendOk("那么,二位想在婚礼村举行婚礼吗?没错,一提到结婚,大家首先想到的就是婚礼村,不作他想.我们的教堂会为冒险家们提供冒险岛世界中最好的婚庆服务,并因此闻名于世.");
                    cm.dispose();
                }
            } else if (status == 1) {
                var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                var cserv = cm.getClient().getChannelServer();
    
                if (cserv.isWeddingReserved(wid)) {
                    if (wid == cserv.getOngoingWedding(cathedralWedding)) {
                        var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                        if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                            if (!cm.canHold(4000313)) {
                                cm.sendOk("请空出一格其他栏以获取#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!partner.canHold(4000313)) {
                                cm.sendOk("请告诉您的伴侣空出一格其他栏以获取#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(cm.getPlayer(), false)) {
                                cm.sendOk("请购买时尚的#婚礼礼服r#k,动作快!是时候变得光彩照人了~");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(partner, false)) {
                                cm.sendOk("请告诉您的伴侣购买时尚的#婚礼礼服r#k,动作快!是时候变得光彩照人了~");
                                cm.dispose();
                                return;
                            }
    
                            cm.sendOk("很好!一对新人如约打扮停当,出现在了这里,来吧!伙计们,让我们把气氛搞起来!!!");
                        } else {
                            cm.sendOk("啊...你的伴侣好像在别的地方.婚礼需要两人共同出席,否则就太不像话了.");
                            cm.dispose();
                        }
                    } else {
                        var placeTime = cserv.getWeddingReservationTimeLeft(wid);
    
                        cm.sendOk("Yo!你的婚礼将于#r" + placeTime + "#k,买件像样的衣服,别迟到了,知道吗?");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("对不起,您并没有在这个频道提前预约.");
                    cm.dispose();
                }
            } else if (status == 2) {
                var cserv = cm.getClient().getChannelServer();
                var wtype = cserv.getOngoingWeddingType(cathedralWedding);
    
                var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                    if (cserv.acceptOngoingWedding(cathedralWedding)) {
                        var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                        if (wid > 0) {
                            var em = cm.getEventManager(weddingEventName);
                            if (em.startInstance(cm.getPlayer())) {
                                eim = getMarriageInstance(cm.getPlayer());
                                if (eim != null) {
                                    eim.setIntProperty("weddingId", wid);
                                    eim.setIntProperty("groomId", cm.getPlayer().getId());
                                    eim.setIntProperty("brideId", cm.getPlayer().getPartnerId());
                                    eim.setIntProperty("isPremium", wtype ? 1 : 0);
    
                                    eim.registerPlayer(partner);
                                } else {
                                    cm.sendOk("婚礼筹备发生了未知的错误,请稍后再试.");
                                }
    
                                cm.dispose();
                            } else {
                                cm.sendOk("婚礼筹备发生了未知的错误,请稍后再试.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("婚礼筹备发生了未知的错误,请稍后再试.");
                            cm.dispose();
                        }
                    } else {    // partner already decided to start
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("啊...你的伴侣好像在别的地方.婚礼需要两人共同出席,否则就太不像话了.");
                    cm.dispose();
                }
            }
        }
    }