/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */

importPackage(Packages.server.expeditions);

var status = 0;
var toBan = -1;
var choice;
var arenaType;
var arena;
var arenaName;
var type;
var map;
var exped = MapleExpeditionType.ARIANT;
var exped1 = MapleExpeditionType.ARIANT1;
var exped2 = MapleExpeditionType.ARIANT2;

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
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getPlayer().getMapId() == 980010000) {
            if (cm.getLevel() > 30) {
                cm.sendOk("你的等级高于 #r30级#k ，无法参加阿里安特竞技大会。");
                cm.dispose();
                return;
            }
            
            if (status == 0) {
                var expedicao = cm.getExpedition(exped);
                var expedicao1 = cm.getExpedition(exped1);
                var expedicao2 = cm.getExpedition(exped2);
                
                var channelMaps = cm.getClient().getChannelServer().getMapFactory();
                var startSnd = "有什么事要做？\r\n\r\n\t#e#r(选择竞技场)#n#k\r\n#b";
                var toSnd = startSnd;

                if (expedicao == null) {
                    toSnd += "#L0#竞技场 (1) (空)#l\r\n";
                } else if (channelMaps.getMap(980010101).getCharacters().isEmpty()) {
                    toSnd += "#L0#进入竞技场 (1)  房主：(" + expedicao.getLeader().getName() + ")" + " 当前成员：" + cm.getExpeditionMemberNames(exped) + "\r\n";
                }
                if (expedicao1 == null) {
                    toSnd += "#L1#竞技场 (2) (空)#l\r\n";
                } else if (channelMaps.getMap(980010201).getCharacters().isEmpty()) {
                    toSnd += "#L1#进入竞技场 (2)  房主：(" + expedicao1.getLeader().getName() + ")" + " 当前成员：" + cm.getExpeditionMemberNames(exped1) + "\r\n";
                }
                if (expedicao2 == null) {
                    toSnd += "#L2#竞技场 (3) (空)#l\r\n";
                } else if (channelMaps.getMap(980010301).getCharacters().isEmpty()) {
                    toSnd += "#L2#进入竞技场 (3)  房主：(" + expedicao2.getLeader().getName() + ")" + " 当前成员：" + cm.getExpeditionMemberNames(exped2) + "\r\n";
                }
                if (toSnd.equals(startSnd)) {
                    cm.sendOk("所有竞技场都正在使用中。请稍后再试，或更换至其它频道。");
                    cm.dispose();
                } else {
                    cm.sendSimple(toSnd);
                }
            } else if (status == 1) {
                arenaType = selection;
                expedicao = fetchArenaType();
                if (expedicao == "") {
                    cm.dispose();
                    return;
                }
                
                if (expedicao != null) {
                    enterArena(-1);
                } else {
                    cm.sendGetText("这场比赛最多可以有多少名玩家参加？ (2~5名)");
                }
            } else if (status == 2) {
                var players = parseInt(cm.getText());   // AriantPQ option limit found thanks to NarutoFury (iMrSiN)
                if (isNaN(players)) {
                    cm.sendNext("请输入允许进入的玩家数量。");
                    status = 0;
                } else if (players < 2) {
                    cm.sendNext("输入的玩家数不应少于2名。");
                    status = 0;
                } else {
                    enterArena(players);
                } 
            }
        }
    }
}

function fetchArenaType() {
    switch (arenaType) {
        case 0 :
            exped = MapleExpeditionType.ARIANT;
            expedicao = cm.getExpedition(exped);
            map = 980010100;
            break;
        case 1 :
            exped = MapleExpeditionType.ARIANT1;
            expedicao = cm.getExpedition(exped);
            map = 980010200;
            break;
        case 2 :
            exped = MapleExpeditionType.ARIANT2;
            expedicao = cm.getExpedition(exped);
            map = 980010300;
            break;
        default :
            exped = null;
            map = 0;
            expedicao = "";
    }
    
    return expedicao;
}

function enterArena(arenaPlayers) {
    expedicao = fetchArenaType();
    if (expedicao == "") {
        cm.dispose();
        return;
    } else if (expedicao == null) {
        if (arenaPlayers != -1) {
            var res = cm.createExpedition(exped, true, 0, arenaPlayers);
            if (res == 0) {
                cm.warp(map, 0);
                cm.getPlayer().dropMessage("你已成功竞技场的房主，请等待玩家加入本竞技场。");
            } else if (res > 0) {
                cm.sendOk("抱歉，你的挑战次数已达上限。");
            } else {
                cm.sendOk("发生了未知错误，请稍后重试。");
            }
        } else {
            cm.sendOk("发生了未知错误，请稍后重试。");
        }
        
        cm.dispose();
    } else {
        if (playerAlreadyInLobby(cm.getPlayer())) {
            cm.sendOk("你已经入场。");
            cm.dispose();
            return;
        }

        var playerAdd = expedicao.addMemberInt(cm.getPlayer());
        if (playerAdd == 3) {
            cm.sendOk("人数已满。");
            cm.dispose();
        } else {
            if (playerAdd == 0) {
                cm.warp(map, 0);
                cm.dispose();
            } else if (playerAdd == 2) {
                cm.sendOk("抱歉，你已被房主禁止入内。");
                cm.dispose();
            } else {
                cm.sendOk("发生了错误。");
                cm.dispose();
            }
        }
    }
}

function playerAlreadyInLobby(player) {
    return cm.getExpedition(MapleExpeditionType.ARIANT) != null && cm.getExpedition(MapleExpeditionType.ARIANT).contains(player) ||
            cm.getExpedition(MapleExpeditionType.ARIANT1) != null && cm.getExpedition(MapleExpeditionType.ARIANT1).contains(player) ||
            cm.getExpedition(MapleExpeditionType.ARIANT2) != null && cm.getExpedition(MapleExpeditionType.ARIANT2).contains(player);
}