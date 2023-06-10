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
 * @npc: Shuang
 * @map: Victoria Road: Excavation Site<Camp> (101030104)
 * @func: Start Guild PQ
*/

var status = 0;
var sel;
var em = null;

function findLobby(guild) {
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
                var lobby = iterator.next();
                
                if(lobby.getIntProperty("guild") == guild) {
                        if(lobby.getIntProperty("canJoin") == 1) return lobby;
                        else return null;
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
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        em = cm.getEventManager("GuildQuest");
                        if(em == null) {
                                cm.sendOk("����Կ���������һ������");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#e#b<��������ʥ�����Ǽ���Կ���>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n������·ͨ��ʥ�����ǡ���ʲô��Ҫ����#b\r\n#L0#���뿪������Կ�����#l\r\n#L1#����μӼ���Կ�����#l\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�#l");
                } else if (status == 1) {
                        sel = selection;
                        if (selection == 0) {
                                if(!cm.isGuildLeader()) {
                                        cm.sendOk("ֻ���峤/���峤�������뿪������Կ�����");
                                        cm.dispose();
                                } else {
                                        if(em.isQueueFull()) {
                                                cm.sendOk("��Ƶ���ļ���Կ������ڽ����С������ĵȴ��Ժ����ԣ����л�������Ƶ�����ԡ�");
                                                cm.dispose();
                                        } else {
                                                var qsize = em.getQueueSize();
                                                cm.sendYesNo(((qsize > 0) ? "Ŀǰ���� #r" + qsize + "#k ����������Լս��" : "") + "����Ҫ������ļ����ս��");
                                        }
                                }
                        } else if (selection == 1) {
                                if(cm.getPlayer().getGuildId() > 0) {
                                        var eim = findLobby(cm.getPlayer().getGuildId());
                                        if(eim == null) {
                                                cm.sendOk("��ļ���Ŀǰ�ڱ�Ƶ��û�н���Լս����ȷ����ļ����Ƿ��ս��������Ƶ�������˼���Կ�����");
                                        } else {
                                                if(cm.isLeader()) {
                                                        em.getEligibleParty(cm.getParty());
                                                        eim.registerParty(cm.getPlayer());
                                                } else {
                                                        eim.registerPlayer(cm.getPlayer());
                                                }
                                        }
                                } else {
                                        cm.sendOk("û�м��壬�޷��μӼ���Կ�����");
                                }
                                
                                cm.dispose();
                        } else {
                                var reqStr = "";
                                reqStr += "\r\n\r\n    �����ԱҪ��\r\n\r\n";
                                reqStr += "     - ������һ�������Ա#rС�ڵ���30��#k��\r\n";
                                reqStr += "     - ������һ�������ԱְҵΪ#r����#k��ӵ��#r������#k��#r�������Ṧ#k��\r\n";
                                reqStr += "     - ������һ�������ԱְҵΪ#rħ��ʦ#k��ӵ��#r�����Ŀ����ƶ�#k��\r\n";
                                reqStr += "     - ������һ�������ԱΪ#rԶ�̹���ְҵ#k���繭���֣��̿ͻ��ǹ�֡�\r\n";
                                reqStr += "     - ������һ�������Աӵ��#rԶ������Ծ����#k����ӵ�������������Ĵ̿ͻ�ӵ������Ь�Ļ�ǹ�֡�\r\n";
                            
                                cm.sendOk("#e#b<��������ʥ�����Ǽ���Կ���>#k#n\r\n����ļ����Ա��ɶ��飬����ش����ô�������ж��³�̰����Ž�Э��ȥ���ʥ�������ż��е���������ս���������󣬶�Ա����÷��Ľ���������Ϊ����Ӯ�ô���������֡�" + reqStr);
                                cm.dispose();
                        }
                } else if (status == 2) {
                        if (sel == 0) {
                                var entry = em.addGuildToQueue(cm.getPlayer().getGuildId(), cm.getPlayer().getId());
                                if(entry > 0) {
                                        cm.sendOk("��ļ����ѳɹ�����μӼ���Կ��������촰�����Ѿ�������һ����Ϣ��֪ͨ������м����Ա�˽⵽��������״̬��\r\n\r\n#r��Ҫ����#k����Ϊ��������Ķӳ���#r������ڵȴ�ʱ�����ǰ���ڵ�ǰƵ��#k��#b���뿪��Ƶ��#k����ȡ��������������ʸ����⣬��Ϊ�ӳ�������������κ�ʱ��ڵ��뿪�������������жϣ������Ա�ᱻ�Ƴ��Կ���������");
                                } else if(entry == 0) {
                                        cm.sendOk("��Ƶ���ļ���Կ������ڽ����С������ĵȴ��Ժ����ԣ����л�������Ƶ�����ԡ�");
                                } else {
                                        cm.sendOk("��ļ����Ѿ��ڱ�Ƶ�������˼���Կ�������ȴ������Ӧ�ĶԿ����ִΡ�");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}