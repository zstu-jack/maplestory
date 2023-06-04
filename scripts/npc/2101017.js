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
                    cm.sendSimple("��ʲô��Ҫ����#b\r\n#L1#�鿴��ǰ��Ա��#l\r\n#L2#�����Ա��#l\r\n#L3#��ʼ���ﰲ�ؾ�������#l\r\n#L4#�뿪��������#l");
                    status = 1;
                } else {
                    var toSend = "Ŀǰ�������ڵĳ�Ա�У�\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                }
            } else if (status == 1) {
                if (selection == 1) {
                    var toSend = "Ŀǰ�������ڵĳ�Ա�У�\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                } else if (selection == 2) {
                    var size = expedMembers.size();
                    if (size == 1) {
                        cm.sendOk("Ŀǰ���������˼��뾺������");
                        cm.dispose();
                        return;
                    }
                    var text = "���³�Ա�����˾����������Ե�����ֽ����Ƴ���\r\n";
                    text += "\r\n\t\t1." + expedicao.getLeader().getName();
                    for (var i = 1; i < size; i++) {
                        text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                    }
                    cm.sendSimple(text);
                    status = 6;
                } else if (selection == 3) {
                    if (expedicao.getMembers().size() < 1) {
                        cm.sendOk("�޷������볡��");
                        cm.dispose();
                    } else {
                        if (cm.getParty() != null) {
                            cm.sendOk("û�ж��飬�޷��볡��");
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
                    cm.mapMessage(5, "�ӳ��뿪�˾�������");
                    expedicao.warpExpeditionTeam(980010000);
                    cm.endExpedition(expedicao);
                    cm.dispose();
                }
            } else if (status == 6) {
                if (selection > 0) {
                    var banned = expedMembers.get(selection - 1);
                    expedicao.ban(banned);
                    cm.sendOk("�㽫 " + banned.getValue() + " ������˾�������");
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
                    cm.sendOk("���Ѿ���ը���������ˣ���ȥ���� #bɳĮ��Ы#k��");
                    cm.dispose();
                } else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
                    cm.sendOk("���Ѿ��� (5��) #b#eը��#k#n �� (50��) #b#e�ٳ�ʯ#k#n �������ˡ�\r\n���ٳ�ʯ��׽ɳĮ��Ы���õ� #r#e���ı�ʯ#k#n!");
                    expedicao.setProperty("gotBomb" + cm.getChar().getId(), "1");
                    cm.gainItem(2270002, 50);
                    cm.gainItem(2100067, 5);
                    cm.dispose();
                } else {
                    cm.sendOk("�����Ʒ��������");
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("��ã���˵�����ﰲ�ؾ��������һ������20~30����ҿ��ŵĶԿ����");
            cm.dispose();
        } 
    }
}
