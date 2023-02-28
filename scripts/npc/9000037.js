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

/**
 * @author: Ronan
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
*/

var status = 0;
var state;
var em = null;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;
    
    for(var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());
    
    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if(midLevel <= 20) lobby = 0;
    else if(midLevel <= 40) lobby = 1;
    else if(midLevel <= 60) lobby = 2;
    else if(midLevel <= 80) lobby = 3;
    else if(midLevel <= 90) lobby = 4;
    else if(midLevel <= 100) lobby = 5;
    else if(midLevel <= 110) lobby = 6;
    else lobby = 7;
        
    return lobby;
}

function start() {
	status = -1;
        state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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

                if (status == 0) {
                        if(state == 3) {
                                if(cm.getEventInstance().getProperty("clear") == null) {
                                        cm.getEventInstance().clearPQ();
                                        cm.getEventInstance().setProperty("clear", "true");
                                }
                            
                                if(cm.isEventLeader()) {
                                        cm.sendOk("����Ŷ��������˾��˵ĳɾͣ�#b����������BOSS#k����ϲ���һ������ȥ��ʱ����㽱��������");
                                }
                                else {
                                        cm.sendOk("#b����������BOSS#k��ף���㣡�����ڽ����һ������������ı�����ƥ��Ľ�Ʒ��");
                                }
                        }
                        else if(state == 2) {
                                if(cm.isEventLeader()) {
                                        if(cm.getPlayer().getEventInstance().isEventTeamTogether()) {
                                                cm.sendYesNo("����Ŷ�׼���ý�����һ�׶�������������������");
                                        }
                                        else {
                                                cm.sendOk("��ȴ������Ŷ�׼���ú��ټ�����");
                                                cm.dispose();
                                                return;
                                        }
                                }
                                else {
                                        cm.sendOk("�ȴ���Ķӳ����Ҽ���ǰ�����źš���������˳����봩�����ڣ���ᱻ�ͳ�ȥ�����ҿ��Ի��Ŀǰ�Ľ�����");
                                        cm.dispose();
                                        return;
                                }
                        } else if(state == 1) {
                                cm.sendYesNo("��ȷ��Ҫ�뿪��");
                        }
                        else {
                                em = cm.getEventManager("BossRushPQ");
                                if(em == null) {
                                        cm.sendOk("���ִ���");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                                
                                cm.sendSimple("#e#b<������ս��BOSS��ս>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n����ϣ�������ս�����ǵ�����ս�� �����Ҫ��ʼ������#b�ӳ�#k���ҽ�̸#b\r\n#L0#����μӸ���\r\n#L1#���� " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ��������.\r\n#L2#�����˽����ϸ��");
                        }
                } else if (status == 1) {
                        if(state == 3) {
                                if(!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                                        cm.sendOk("�����������ı���������ÿ����Ŀ��һ���ո�");
                                        cm.dispose();
                                        return;
                                }
                                
                                cm.warp(970030000);
                                cm.dispose();
                        } else if(state == 2) {
                                var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                                cm.getPlayer().getEventInstance().restartEventTimer(restSpot * 4 * 60000);  // adds (restspot number * 4) minutes
                                cm.getPlayer().getEventInstance().warpEventTeam(970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot));
                                
                                cm.dispose();
                        } else if(state == 1) {
                                cm.warp(970030000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("����������μӣ�������սҲ��Ҫ���");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("����Ҫ�ӳ����ܽ��븱��");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        var lobby = detectTeamLobby(eli), i;
                                                        for(i = lobby; i < 8; i++) {
                                                                if(em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) break;
                                                        }
                                                        
                                                        if(i == 8) {
                                                                cm.sendOk("��ǰ�����Ŷ�����#r��ս����#k�����Ƶ����ȴ��Է��˳�.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�㻹���ܿ�ʼ����Ŷ�������Ϊ��Ķ�Աû�е��룬������Ķ�Աû����ս�ʸ�");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("���״̬Ϊ: #b" + (psState ? "����" : "����") + "#k. �������鹦�ܣ�������������͸���˵��");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<��Ӹ���: ����BOSSս>#k#n\r\n���Ը��ص�ð�ռ������������������ս���еļ��ܺ���������ð�ռ��ǲ�����ս�����߶���������У�������е���ҫ����ȡ�����㡣�����Ǹ���ð���ߵ���Ĺؿ�����ģ�����Ľ������ܻᷢ��һ��������˳�Ա�����н���������̽�ս���ʱ��á�\r\n\r\n�������֧�ֲ�ͬ�ȼ�֮�����ӣ���������и��õĻ���Ѹ��Ϊ����Ŷӽ���һ�������Ŷӣ���ô���뼶��ϵ͵�ð�ռ���ӡ�");
                                        cm.dispose();
                                }
                        }
                }
        }
}