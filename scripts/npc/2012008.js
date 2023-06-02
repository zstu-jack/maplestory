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

/* Romi
	Orbis Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("�ˣ���ð�����ӭ�������֮�ǻ�������~����Ҫ����һ��ӵ�о��¡������ļ�����ֻҪ�� #b#t5153001##k����Ϳ����������ǵķ���ӵ����������Ľ�����ɫ~��\r\n#L2#ѡ���ɫ��#i5153001##t5153001##l");
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 2)
                cm.sendStyle("ʹ�����������ҽ����е������Ԥ������Ч������ϲ�����ַ�ɫ��ѡ��һ����ϲ���ķ��ɡ�", skin);
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5153001)){
                cm.gainItem(5153001, -1);
                cm.setSkin(selection + 1);
                cm.sendOk("���ˣ�����������̾����·�ɫ�ɣ�");
            } else
                cm.sendOk("�ܱ�Ǹ�����û�л�����Ա���Ļ������޷�Ϊ�����");
        }
    }
}
