/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 *
 *@author Ronan
 */

importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
var exped = MapleExpeditionType.BALROG_NORMAL;
var expedName = "Balrog";
var expedBoss = "�����";
var expedMap = "����ֵ�Ĺ��";

var list = "��ʲô��Ҫ����##b\r\n\r\n#L1#ȷ��Ŀǰ��Զ���ӳ�Ա��#l\r\n#L2#��ս����� - �볡#l\r\n#L3#ȡ��Զ���ӵǼǡ�#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("BalrogBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("���в�������ս" + expedBoss + "���ʸ�");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<Զ���ӣ�" + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n��Ҫ���һ֧Զ�����ַ�#r" + expedBoss + "#k��?\r\n#b#L1#�볡��#l\r\n\#L2#������ʱ��#l\r\n\#L3#������˽�һ��������Զ�������顣#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("�ѿ�ʼ�Ǽǽ�Ҫ�����Զ���ӳ�Ա��");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("���Ѿ��Ǽ�ΪԶ���ӳ�Ա����ȴ� #r" + expedition.getLeader().getName() + "#k ����Զ����");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if(eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("���Զ����������ս" + expedBoss + "��Ը�����¸ҵ����ó���Ը��");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("����Զ����������ս " + expedBoss + "��Ը�����¸ҵ����ó���Ը��");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("������ҵǼǳ�ΪԶ���ӳ�������ΪԶ����Ա���롣");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + " Զ����#k �Ѵ�����\r\n\r\nĿǰ�������ҶԻ�ȷ�϶�Ա������������ս��");
                } else if (res > 0) {
                    cm.sendOk("��Ǹ�������ս�����Ѵ����ޡ�");
                } else {
                    cm.sendOk("������δ֪�������Ժ����ԡ�");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("��Ȼ��������ÿ���˶�����ս " + expedBoss + "��");
                cm.dispose();
                return;
            } else {
                cm.sendSimple("��ã����� #b#n��Ӱ#n#k, �����ػ��������������Ŀǰ������ħ�ľ��Ӱ�Χ�ˡ�����Ŀǰ�Բ�֪����˭�´���Χ����������" +
                            "��� #e#b����̩��ʿ��#n#k һֱ����ǲ��Ա�������оȱ���һȥ������" +
                            "��ô��ð�ռҡ�����Ҫ����սʤ�ⲻ����״�Ŀ־���\r\n  #L1#����̩��ʿ�ţ�");
                    
                status = 10;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("Զ���������Ѵ����ޡ�");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("Ŀǰ���������˼���Զ���ӡ�");
                    cm.dispose();
                    return;
                }
                var text = "���³�Ա������Զ���ӣ����Ե�����ֽ����Ƴ���\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();
                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("��Ҫ���� " + min + " ����ɫ����Զ���ӷ��ɿ�����");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("��ս������ʼ��Զ���ӽ������ͽ���#b" + expedMap + "#k��");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " ������Զ����"));
                cm.endExpedition(expedition);
                cm.sendOk("Զ����������ʱ����Ҳ�Ǳ���ʵ�����ϲߡ�");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("��޷���ʼ�������ͼ��GM���档");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("��һ֧Զ����������ս " + expedBoss + "��");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("�㽫 " + banned.getValue() + " �������Զ���ӡ�");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        } else if (status == 10) {
            cm.sendOk("����̩��ʿ����һȺ��Ӣսʿ�������ڼල���������ת��������ų�����40��ǰ����������ʱ����ӡ�ĺ�ħ��ʦ�г�һ�վ���������");
            cm.dispose();
        }
    }
}