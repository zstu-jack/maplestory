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

status = -1;
var sel;
var pickup = -1;

function start() {
    cm.sendSimple("���ǰ�����,һλ����ϡ����Ʒ���н����ˣ�����ʲô��Ҫ���׵ģ�#b\r\n#L0#����Ҫ���۵��ߡ�\r\n#L1#�����˽����ڵ��г��۸�\r\n#L2�н�������ʲô��");
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 0){
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 0 && status == 2){
            cm.sendNext("���ڲ�����������������Щʱ������������Ҫ�ǵ�������Ʒֻ�ڵ����ڿ��Գ��ۡ�");
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 2)
            status -= 2;
    }
    if(status == 0){
        if(sel == undefined)
            sel = selection;
        if (selection == 0){
            var text = "�����������������ʲô...#b";
            for(var i = 0; i < 5; i++)
                text += "\r\n#L" + i + "##t" + (3994090 + i) + "#";
            cm.sendSimple(text);
        }else if (selection == 1){
            var text = "";
            for(var i = 0; i < 5; i++)
                text += "Ŀǰ #t" + (i + 3994090) + "# ���г��۸� #r��δȷ��#k��\r\n";
            cm.sendNext(text);
            cm.dispose();
        }else
            cm.sendNext("����ð�յ���ĩ������������ȥ����������ۡ�����Ʒ�����ϡ�����걾��������Ʒ�������������ｻ��...���Ҳ��շ�˹�ֵļ����ͽ𼦵���");
    }else if(status == 1){
        if(sel == 0){
            if(cm.haveItem(3994090 + selection)){
                pickup = 3994090 + selection;
                cm.sendYesNo("Ŀǰ���г��۸���180��ҡ�����Ҫ���ڳ�����"); //Make a price changer by hour.
            }else{
                cm.sendNext("�����û��ʲôҪ���׵ģ��ͱ��˷��ҵ�ʱ����...�Һ�æ�ġ�");
                cm.dispose();
            }
        }else
            cm.sendNextPrev("ð�յ���ĩ����������ĩЪҵ���������Ҫ���ף���������һ�����������ʱ��������...");
    }else if(status == 2){
        if(sel == 0)
            cm.sendGetNumber("������۶��٣�", 0, 0, 200);
        else{
            cm.sendPrev("�ۡ��г��۸����ڱ仯���ҿɲ������ֿ��������������ء��Ժ�������������ļ۸�ÿ��Сʱ��������");
        }
    }else if(status == 3){
        if(sel == 0)
            if(selection != 1)
                cm.sendNext("����δ��ɣ�����һ�¡�");
            else{
                cm.sendNext("������ɣ��´μ���");
                cm.gainMeso(180);
                cm.gainItem(pickup, -1);
            }
        cm.dispose();
    }
}