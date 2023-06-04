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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown & Information & xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var cost = new Array(300,400,5000,5000);
var msg = new Array("����ʥ����ˮ�����Իָ���ӡ������״̬","���ܵĽⶾ�������Իָ������쳣״̬","��ħ������������ʯͷ�����ڸ߼�����","���ٻ�����������ʯͷ�����ڸ߼�����");
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        cm.sendNext("�����ϰ��ң���Ϊ�ر����һ�������һЩ�ö�����");
        cm.dispose();
        return;
    }
    if(mode == 0 && status == 2) {
        cm.sendNext("��֪���ˣ���Щ���������ۻ����ҡ����ż�������������ֻ���������Щ���ߣ��۸�ͯ�����ۡ�");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }
    
    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++){
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (�ۼ�: "+cost[i]+" ���)#k#l";
        }
        cm.sendSimple("��л�㰲ȫ�ؽ���� #b#t4031056##k����Ȼ����Ҳ��˺ķ��˹�ȥ��800��������һ������... �����ڣ��������޺���ร�����...���ǲ���������ϡ����Ʒ��Ϊ�˸�л��ĸ������һ�������һЩħ����Ʒ����ֻ������ۡ���ѡ����Ҫ�Ļ���ɣ�"+selStr);
    }
    else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("����Ҫ���� #b#t"+item[selected]+"##k ������ "+msg[selected]+"����ɲ���������򵽵Ķ����������һ����һ�������ļ۸�ÿһ�� #b"+cost[selected]+" ���#k����Ҫ����٣�", 0, 1, 100);
    }
    else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("�����û�й�����Ը�Ļ����Ҳ���ӲҪ�����������ǡ�");
            cm.dispose();
        }
        cm.sendYesNo("ȷ����Ҫ���� #r"+amount+" ��#t"+item[selected]+" ##k ��ÿ�� #t"+item[selected]+"# ��Ҫ "+cost[selected]+" ���, �ܼ� #r"+totalcost+" ���#k��");
    } else if(status == 3) {
        if(cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("��ȷ�������˽���𣿻���Ӧ�ò鿴һ������������Ƿ����㹻�Ŀռ䡣��Щ�������ܼ��� #r"+totalcost+"#k ��ң�����ȷ��һ�½����޷���ɵ�ԭ��");
            cm.dispose();
        }
        cm.sendNext("��л�ݹˡ��������;������Ҫ�����ˣ��ͻص�������������Ȼ��ʹ��ˣ�����ħ����Ʒ��������׾ٵġ�");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}