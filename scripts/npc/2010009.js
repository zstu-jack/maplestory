/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
var status;
var choice;
var guildName;

var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("��ð������� #b������#k��ֻ���峤�����齨�������ˡ�");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("��ð������� #b������#k��\r\n#b#L0#���Ը����Ҽ���������ʲô��#l\r\n#L1#��Ӧ������齨�������ˣ�#l\r\n#L2#���봴���������ˡ�#l\r\n#L3#�����������м����µļ��塣#l\r\n#L4#�����ɢ�������ˡ�#l");
    }
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("�������˾���һ�����ţ��ɶ�����幹�ɵĳ�����֯�����Ҹ������Ǽ���Щ�������ˡ�");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("Ҫ��ɼ������ˣ�#b˫���峤��Ҫ���2�˶���#k ������ͬһƵ�� #b��ͬ��ϯ#k����ӳ������Ǽ�Ϊ�������˵����˳���\r\n\r\n�ʼ�� ������ #bֻ��������������#k��������ʱ�����ƣ����˳�������ʱ������ʱ���ҶԻ���֧���������� #r����#k ���˵ĳ�Ա��");
            cm.dispose();
        } else if(selection == 2) {
            if(!cm.isLeader()) {
                cm.sendNext("�����ϣ�������������ˣ�������Ķӳ����ҶԻ�����/���ᱻע��Ϊ�������˵����䡣");
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("��ļ�����ע��Ϊ�������˳�Ա���޷������µļ������ˡ�");
                cm.dispose();
                return;
            }
            
            cm.sendYesNo("��Ҫ��������������Ŀǰ��Ҫ���������� #b" + allianceCost + " ���#k.");
        } else if (selection == 3) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("��δӵ���Լ��ļ������ˣ��޷��������˳�Ա��");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("��Ҫ������������ #rһ������#k λ������Ҫ���������� #b" + increaseCost + " ���#k��");
            else {
                cm.sendNext("ֻ�����˳������������˵ļ���λ�á�");
                cm.dispose();
            }
        } else if(selection == 4) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("��δӵ���Լ��ļ������ˣ��޷���ɢ���ˡ�");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("ȷ��Ҫ��ɢ����������");
            else {
                cm.sendNext("ֻ�����˳����ܽ�ɢ���ˡ�");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            if(cm.getMeso() < allianceCost) {
                cm.sendOk("��Ľ�Ҳ��㣬�޷������������ˡ�");
                cm.dispose();
                return;
            }
            cm.sendGetText("������������˵����� (���6�����֣���12��Ӣ���ַ�)");
        } else if (choice == 3) {
            if(cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("��ļ�������Ŀǰ�Ѵﵽ�������ޡ�");
                cm.dispose();
                return;
            }
            if(cm.getMeso() < increaseCost) {
                cm.sendOk("��Ľ�Ҳ��㣬�޷�����������ˡ�");
                cm.dispose();
                return;
            }
            
            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("�������ڿ�������һ���µļ��塣");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("�޷����в����������˲����ڡ�");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("���ѽ�ɢ�������ˡ�");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("Ҫʹ�� '"+ guildName + "' ��Ϊ�������˵�������");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("�������޷�ʹ�ã�������������ơ�"); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null)
                cm.sendOk("��ȷ���������һλ�峤����ӣ�ͬһƵ������ͬ��ͼ�����˫������Ŀǰ��û��ע��Ϊ�������˳�Ա����������У��������������峤�������С�");
            else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("��ɹ������˼������ˡ�");
            }
            cm.dispose();
        }
    }
}