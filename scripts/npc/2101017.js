/*2101017.js
 *Cesar
 *@author Jvlaple
 */

importPackage(Packages.server.expeditions);


var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;
var exped;
var expedicao;
var expedMembers;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
            if (cm.getPlayer().getMapId() == 980010100) {
                exped = MapleExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);

            } else if (cm.getPlayer().getMapId() == 980010200) {
                exped = MapleExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = MapleExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }
            
            if (expedicao == null) {
                cm.dispose();
                return;
            }
            
            expedMembers = expedicao.getMemberList();
            if (status == 0) {
                if (cm.isLeaderExpedition(exped)) {
                    cm.sendSimple("有什么事要做？#b\r\n#L1#查看当前成员。#l\r\n#L2#请离成员。#l\r\n#L3#开始阿里安特竞技赛。#l\r\n#L4#离开竞技场。#l");
                    status = 1;
                } else {
                    var toSend = "目前竞技场内的成员有：\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                }
            } else if (status == 1) {
                if (selection == 1) {
                    var toSend = "目前竞技场内的成员有：\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                } else if (selection == 2) {
                    var size = expedMembers.size();
                    if (size == 1) {
                        cm.sendOk("目前尚无其他人加入竞技赛。");
                        cm.dispose();
                        return;
                    }
                    var text = "以下成员加入了竞技赛，可以点击名字将其移除：\r\n";
                    text += "\r\n\t\t1." + expedicao.getLeader().getName();
                    for (var i = 1; i < size; i++) {
                        text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                    }
                    cm.sendSimple(text);
                    status = 6;
                } else if (selection == 3) {
                    if (expedicao.getMembers().size() < 1) {
                        cm.sendOk("无法单人入场。");
                        cm.dispose();
                    } else {
                        if (cm.getParty() != null) {
                            cm.sendOk("没有队伍，无法入场。");
                            cm.dispose();
                            return;
                        }
                        
                        var errorMsg = cm.startAriantBattle(exped, cm.getPlayer().getMapId());
                        if (errorMsg != "") {
                            cm.sendOk(errorMsg);
                        }
                        
                        cm.dispose();
                    }
                } else if (selection == 4) {
                    cm.mapMessage(5, "队长离开了竞技场。");
                    expedicao.warpExpeditionTeam(980010000);
                    cm.endExpedition(expedicao);
                    cm.dispose();
                }
            } else if (status == 6) {
                if (selection > 0) {
                    var banned = expedMembers.get(selection - 1);
                    expedicao.ban(banned);
                    cm.sendOk("你将 " + banned.getValue() + " 驱逐出了竞技赛。");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            }
        } else if (Packages.constants.game.GameConstants.isAriantColiseumArena(cm.getPlayer().getMapId())) {
            if (cm.getPlayer().getMapId() == 980010101) {
                exped = MapleExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);
            } else if (cm.getPlayer().getMapId() == 980010201) {
                exped = MapleExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = MapleExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }
            if (status == 0) {
                var gotTheBombs = expedicao.getProperty("gotBomb" + cm.getChar().getId());
                if (gotTheBombs != null) {
                    cm.sendOk("我已经将炸弹交给你了，快去狩猎 #b沙漠毒蝎#k！");
                    cm.dispose();
                } else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
                    cm.sendOk("我已经将 (5个) #b#e炸弹#k#n 和 (50个) #b#e速成石#k#n 交给你了。\r\n用速成石捕捉沙漠毒蝎，得到 #r#e灵魂的宝石#k#n!");
                    expedicao.setProperty("gotBomb" + cm.getChar().getId(), "1");
                    cm.gainItem(2270002, 50);
                    cm.gainItem(2100067, 5);
                    cm.dispose();
                } else {
                    cm.sendOk("你的物品栏已满。");
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("你好，听说过阿里安特竞技大会吗，一款面向20~30级玩家开放的对抗活动！");
            cm.dispose();
        } 
    }
}
