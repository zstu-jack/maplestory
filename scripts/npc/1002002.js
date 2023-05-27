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
/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
var status = 0;

function start() {
    cm.sendSimple("����˵����̲�� #b�ƽ𺣰�#k, λ����˼�۸����� �����ڿ��Դ���ȥ���ֻҪ֧�� #b1500 ���#k������, ������� #b��̲��VIP��Ʊ#k����������Ŀ��ˣ��ҽ��������ȥŶ.\r\n\r\n#L0##b ֧��1500���.#l\r\n#L1# ����VIP��Ʊ��#l\r\n#L2# VIP��Ʊ��ʲô��#k?#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1)
        if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
            if(type == 1)
                cm.sendNext("���ǲ���������Ҫ�����ǲιۻ��Ŵ��ԣ�ȥ��Ϣһ�°ɣ��������ı������ˣ��Ǿͺ���̸̸��");
            cm.dispose();
            return;
        } else
            status -= 2;
    if (selection == 0)
        status++;
    if(status == 1){
        if(selection == 1)
            cm.sendYesNo("��#b�ƽ𺣰���VIP��Ʊ#k? �������ʱ������ȥ�ƽ𺣰���ע�⣺����ܻ�����������һЩ����õģ���������ȥ�ƽ𺣰���");
        else if (selection == 2)
            cm.sendNext("���Ȼ�� #b�ƽ𺣰���VIP��Ʊ��#k ����˼�飡��ֻҪ��ӵ�У����Ϳ������ǰ���������Ⱥ�̲������һ���ǳ���������Ʒ���������Ƕ����ò����򣬵����ҵ��ǣ�����ǰ����������ڼ䶪ʧ������");
    } else if (status == 2){
        if(type != 1 && selection != 0) {
            cm.sendNextPrev("�һ���ʱû�д�����û�����о������ġ�ϣ����������������ڰ�ȫ�ĵط������������������ҵĹ��£�˭֪���أ���Ҳ����԰����������ú����á���������κ����⣬������ʱ���ʡ�");
            cm.dispose();
        } else{
            if (cm.getMeso() < 1500 && selection == 0)
                cm.sendNext("����~���Ǯ����ò����Щ��������װ������ֻ�����������֪������˵ʲô��");
            else if(!cm.haveItem(4031134) && selection != 0){
                cm.sendNext("�ڴ����ƺ�û��#b�ƽ𺣰���VIP��Ʊ��\r\n#k ��ȥ���ң����������ʼ��������㡣");
            }else{
                if(selection == 0)
                    cm.gainMeso(-1500);
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
            }
            cm.dispose();
        }
    }
}