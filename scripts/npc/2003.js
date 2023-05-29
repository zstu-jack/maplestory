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
	NPC Name: 		Robin
	Map(s): 		Maple Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status;
var sel;

function start() {
    status = -1;
    sel = -1;
    cm.sendSimple("��ӭ����������ڿ�ʼð��֮ǰ����ʲô���ʾ����ʰɡ�\r\n#b#L0#�����ƶ�������#l\r\n#L1#���Թ���ķ�����#l\r\n#L2#ʰȡ��Ʒ�ķ�����#l\r\n#L3#��������ô�죿#l\r\n#L4#ʲôʱ����תְ��#l\r\n#L5#����������������Ϣ#l\r\n#L6#��γ�Ϊһ��սʿ��#l\r\n#L7#��γ�Ϊһ�������֣�#l\r\n#L8#��γ�Ϊһ��ħ��ʦ��#l\r\n#L9#��γ�Ϊһ��������#l\r\n#L10#��γ�Ϊһ��������\r\n#L11#����������������ֵ�� (S)#l\r\n#L12#���ȷ���Ҽ�ȡ�ĵ��ߣ�#l\r\n#L13#���װ�����ߣ�#l\r\n#L14#���ȷ������װ������Ʒ��#l\r\n#L15#���ѧϰ���＼�ܣ� (K) (K)#l\r\n#L16#��ôȥ��������#l\r\n#L17#�����ʲô��#l#k");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == -1) {
            sel = selection;
        }
        if (sel == 0) {
            cm.sendNext("���ڻ������ƶ���������#b���Ҽ�#k������ƽ�ػ�б�������ߣ���#b Alt��#k������Ծ����ЩЬ�ӿ�����������ƶ��ٶȻ���Ծ������");
        } else if (sel == 1) {
            cm.sendNext("�������Թ���ķ�����ÿ�ֹ��ﶼ�й̶�������ֵ������������ħ���������������Թ����Ȼ����Щ������������ǳ��������ԡ�");
        } else if (sel == 2) {
            cm.sendNext("����ʰȡ��Ʒ�ķ��������˹����ս��Ʒ���ڵ��ڵ��ϣ���ʱ��վ����Ʒǰ��#b Z��#k��#b����0 ��#k���Ϳ��Լ�ȡ��Ʒ��");
        } else if (sel == 3) {
            cm.sendNext("��֪����������ᷢ��ʲô�������ս��������ֵ�½�Ϊ0ʱ����ͻ������顣����ȥ��λ�û����Ĺ�������˿���˵�����������������ܽ��С�");
        } else if (sel == 4) {
            cm.sendNext("��֪��ʲôʱ����תְ������~�������Լ���ÿ��ְҵ���й��е�תְ������һ��8~10����Ϳ���ѡ��ְҵ��������Ŭ��������");
        } else if (sel == 5) {
            cm.sendNext("��֪�������������������ǽвʺ絺�Ŀ��и�������Զ�ž�������Ϸ����ˣ����������ٳ������͵Ĺ����������԰�ȫ�ĵ�����������ϰ�ĺõط���");
        } else if (sel == 6) {
            cm.sendNext("�����Ϊһ�� #bսʿ#k ���ţ���ô���ȥ���������ҵ��Ǹ���Ⱥɽ֮�����ӵ� #r��ʿ����#k ���� #b��������#k ��������ĶԻ�������̵�����γ�Ϊ������սʿ��Ŷ������һ���ǳ���Ҫ�����飺����Ҫ���ٴﵽ10�����ܳ�Ϊһ��սʿ��");
        } else if (sel == 7) {
            cm.sendNext("�����Ϊһ�� #b������#k �����ȥ����������תְ���ҵ��Ǹ���Ϊ #r���ִ�#k �Ĵ��ӣ��������� #b������#k ��̸���˽��й��ڹ����ֵ�һ�С�Ŷ������һ���ǳ���Ҫ�����飺����Ҫ���ٴﵽ10�����ܳ�Ϊ�����֡�");
        } else if (sel == 8) {
            cm.sendNext("�����Ϊһ�� #bħ��ʦ#k �����ǰ�����������ִ�λ�ڶ��� #rħ������#k ����������˵�ħ��ͼ����У����������ħ��ʦ #b��˹#k ������̵�����γ�Ϊħ��ʦ��");
        } else if (sel == 9) {
            cm.sendNext("�����Ϊһ�� #b����#k �������ǰ�������������� #r��������#k ���ҵ������Ĳ����������������� #b���³#k����������Ϊһ��������Ŷ������һ���ǳ���Ҫ�����飺������Ҫ�ﵽ10�����ܳ�Ϊ������");
        } else if (sel == 10) {
            cm.sendNext("���Ϊ#b����#k����Ҫתְ�Ļ������뵽������ȥ����#rŵ����˹#k�ĺ���������Լ���#b����#������ָ�����Ϊһ��������Ŷ������һ���ǳ���Ҫ�����飺������Ҫ�ﵽ10�����ܳ�Ϊ������");
        } else if (sel == 11) {
            cm.sendNext("����֪�������߽�ɫ�����������Ȱ� #bS#k ���鿴���ܴ��ڡ�ÿ���������㽫���5�������㣨AP��������ЩAP�������ѡ�������������ô�򵥡�");
        } else if (sel == 12) {
            cm.sendNext("����֪�����������ȷ�ϼ�ȡ�ĵ��ߣ�����Z�����Լ�ȡ���ϵ���Ʒ����õ���Ʒ�������߱���������#bI#k������ȷ�ϱ��������ݡ�");
        } else if (sel == 13) {
            cm.sendNext("����װ�������𣿰� #bI#k �鿴�����������ͣ��һ��װ�����棬Ȼ��˫����װ����������㷢���Լ��޷���������Ʒ����Ľ�ɫ���ܲ����ϵȼ���״̬Ҫ���㻹����ͨ����װ������#bE#k��������Ʒ�ϵ�������װ������");
        } else if (sel == 14) {
            cm.sendNext("����ȷ������װ���ĵ����𣿰� #bE#k ����װ��������������Ϳ���ȷ���㵱ǰ��װ����Ҫ����װ������˫�����������Ļ���װ�������Żص�������");
        } else if (sel == 15) {
            cm.sendNext("תְ�������ѧϰ����ļ��ܣ�������趨��ݼ����Ա�ʹ�����ǡ����� #bK#k ���򿪼����ֲ���ȷ�������ѧϰ��ʹ�õļ��ܡ�");
        } else if (sel == 16) {
            cm.sendNext("��ôȥ�������������ǰ���ʺ絺���ߵ��ϸۣ���������ܿ���һ�Ҵ���վ�ڴ���ǰ����λɣ��˹���Ǵ�����");
        } else if (sel == 17) {
            cm.sendNext("�����ð�յ��Ļ��ҡ��ý������Թ�����ֵ��ߡ����Թ�����̵���۵��߻�������񶼿��Ի�ý�ҡ�");
        } else if (status == 1) {
            if (sel == 0) {
                cm.sendNextPrev("Ϊ�˹����������Ҫװ��������װ���󣬰� #bCtrl#k ��ʹ��������ֻҪ���������ţ��Ϳ��Ը����׵����Թ��");
            } else if (sel == 1) {
                cm.sendNextPrev("һ��������תְ���㽫��ò�ͬ����ļ��ܣ�����Խ����Ƿŵ���ݼ����Է���ʹ�á��������һ�ֹ������ܣ��㲻��Ҫ��Ctrl�����й�����ֻ�谴��ָ���Ŀ�ݼ���ť���ɡ�");
            } else if (sel == 2) {
                cm.sendNextPrev("���������ס��������ı������������û������ʰȡ�����ˡ����ԣ��������һ���㲻��Ҫ�ĵ��ߣ��Ͱ���������������Ϳ���׬ȡ��ң��ڳ������ռ䡣����תְ�Ľ��У������ռ���ܻ����ӡ�");
            } else if (sel == 3) {
                cm.sendNextPrev("������ʱ�ڣ���������ʱ�򣬲�������κζ�����Ȼ��תְ������Ͳ�ͬ�ˣ���������ʱ�����ʧȥһ���־��顣��ʱ�뾡���ܱ���������");
            } else if (sel == 4) {
                cm.sendNextPrev("Ȼ�����ȼ������Ǳ�ǿ��ΨһҪ�ء��㻹��Ҫ����ְҵ�����ض���������ֵ�����磬Ҫ��Ϊһ��սʿ������������볬��35�㣬��֪���ҵ���˼�ɣ�ȷ����������������Ƕ����ְҵ���õġ�");
            } else if (sel == 5) {
                cm.sendNextPrev("���ǣ���������Ϊһ��ǿ�����ң���ò�Ҫ�������̫�á��������޷�����תְ���ʺ絺��������һ���޴�ĵ���������������Ƕ��������öࡣ");
            } else if (sel == 8) {
                cm.sendNextPrev("Ŷ��˳��˵һ�䣬������ְҵ��ͬ��Ҫ��Ϊħ��ʦ����ֻ��Ҫ�ﵽ8������ǰתְ��ͬʱҲ�����Ÿ������⣬�Ǿ��ǳ�Ϊһ������ǿ��ķ�ʦ��Ҫ�ܶ�ʱ�䡣��ѡ����ĵ�·֮ǰҪ��ϸ˼����");
            } else if (sel == 10) {
                cm.sendNextPrev("������������������������棬���Բ鿴��Ҫ˵�������磬������սʿ��ȭ�ֵ������ԣ������ǹ����֡�ǹ�ֵ������ԣ�������ħ��ʦ�������ԣ��������Ƿ����������ԡ�����Ҫ��ϸ��˼�����ͨ�����������㣨AP�������ӽ�ɫ�����ơ�");
            } else if (sel == 15) {
                cm.sendNextPrev("Ŷ���ǵģ��뿪֮ǰ�����һ����ʾ������㲻ȷ���Լ�������Ͱ��� #bW#k ���������������ͼ�ϻ���ʾ�����ڵ�λ�á����õ�����·��");
            } else {
                start();
            }
        } else {
            start();
        }
    }
}