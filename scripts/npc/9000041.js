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
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

var options = ["װ��","����","����","����"];
var name;
var status;
var selectedType = 0;

function start() {
    status = -1;
    action(1, 0, 0); 
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("ѫ������ϵͳĿǰ������......");
            cm.dispose();
            return;
        }
        
        var selStr = "��ã�����#b��Ҷļ����#k������԰ѱ������κβ���Ҫ�ĵ��߳��۸��ҡ�#r����#b�����Ҫ���۵ĵ��߷���ѡ�����Ʒ��#r֮��#b��#k�κα��������Ʒ�����������������޷���ԭ��";
        for (var i = 0; i < options.length; i++)
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        cm.sendSimple(selStr);
    }

    else if (status == 1) {
	selectedType = selection;
        cm.sendGetText("Ҫ�ӱ�����#r" + options[selectedType] + "#k�����ĸ����߿�ʼ���ף�");
    }

    else if (status == 2) {
        name = cm.getText();
	var res = cm.getPlayer().sellAllItemsFromName(selectedType + 1, name);

        if(res > -1) cm.sendOk("������ɣ�����л����#r" + cm.numberWithCommas(res) + " ���#k��");
	else cm.sendOk("��ı�����#b" + options[selectedType] + "#k����û��#b'" + name + "'#k��");

        cm.dispose();
    }
}