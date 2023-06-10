/* 
 * This file is part of the OdinMS Maple Story Server
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
 * @Author Lerk
 * 
 * Shawn, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Guild Quest Info
 */

var status;
var selectedOption;

function start() {
    selectedOption = -1;
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
        if (mode == 1 && status == 3) {
            status = 0;
        }
        if (status == 0) {
            var prompt = "\r\n#b#L0#ʥ��������ʲô��#l\r\n#b#L1##t4001024#������ʲô��#l\r\n#b#L2#����Կ�����ʲô��#l\r\n#b#L3#��û���κ������ˡ�#l";
            if (selectedOption == -1) {
                prompt = "�����Ǽ���ͬ�ˣ���������һֱ��ͼ�ҿ��������'��ҫ֮ʯ'�����ܡ����������ʥ�����ǣ��������ϵ����ع��Ⱦͳ����ڴˡ����ǻ��ҵ����й��ǿŴ�˵�����ر�ʯ#t4001024#��������Ҳ��������ʥ�������ż�֮�С���Ҳ�Ǽ���ͬ�˻�������ٰ���������ԭ�򣬾���Ϊ������Ѱ��#t4001024#��" + prompt;
            } else {
                prompt = "����ʲô���ʵ���" + prompt;
            }
            cm.sendSimple(prompt);
        }
        else if (status == 1) {
            selectedOption = selection;
            if (selectedOption == 0) {
                cm.sendNext("ʥ��������һ��ӵ�����������Ĺ���������������Ȩ��Χ�����鼰��������ÿһ�����ء��ִ��ʯͷ����Ժ����Ѩ��������Լ������в���ȷ�����ߵĹŴ�������������ʥ������ʱ�ڡ�");
            }
            else if (selectedOption == 1) {
                cm.sendNext("#t4001024#�Ǵ�˵�еı�ʯ������ʹ����������ഺ��Ȼ����̵��ǣ��ƺ�#t4001024#��ÿһ�����˶����Ʒ��ˣ�������ܹ�����ʥ������������˥�䡣");
                status = -1;
            }
            else if (selectedOption == 2) {
                cm.sendNext("��������ǲһ��̽���߽���ʥ�������ż�����û��һ���˴����ﷵ�أ����ʹ����������������������һֱ�ڵȴ�����������ǿ������Ӧ���Ͼ���ս�ļ�������ⳡ����");
            }
            else if (selectedOption == 3) {
                cm.sendOk("���û���ˣ������ʲô�����ģ����������Ҿͺá�");
                cm.dispose();
            }
            else {
                cm.dispose();
            }
        }
        else if (status == 2) { //should only be available for options 0 and 2
            if (selectedOption == 0) {
                cm.sendNextPrev("ʥ������������ĩ��������һλ��������������������������Ȼ����һλ�����ǣ�����������ľ�����û���κ�ԭ����Խ�����������������һҹ֮����١�");
            }
            else if (selectedOption == 2) {
                cm.sendNextPrev("����Կ������ռ�Ŀ����̽��ʥ�����ǲ�Ѱ��#t4001024#���ⲻ��һ�ݿ���ʹ���������һ�е������Ŷ�Э��������Ϊ��Ҫ��");
            }
            else {
                cm.dispose();
            }
        }
    }
}