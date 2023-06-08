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
/* Yulete
	Traces of Yulete (926100500)
	Talking
 */

var status;
 
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
                        cm.sendSimple("��ʧ����...�ǣ��������̩��ĩ·����ɱ�...������Ⱥ�һ�һ���ܿ��ģ����Ҿ�ֻ���������ĵ������������á���������һ�ж���Ϊ��������ǣ��������ʣ�\r\n #Ll#�٣���ƣ���������������û����ɶ��ٲ�����ص���ʧ����������ƶ���Щ������Ϊ�˱������ľ������ڱ������������в��������ǿ����������Ļ�������������յĶ�����Ⲣ�������ĩ·��Э��Э��Ϊ���������������ƺ�һ�ж���������ġ�#l");
                } else if (status == 1){
                        cm.sendNext("...��������������Щ�����Ժ�����Ҳ��ԭ�����𣿺ðɣ������ұ������ַ�ʽȡ�õ�ǿ�������ɱ���˫�ۡ�Ҳ������˵��û������ֻ�Ƕ���ʹ��������ԶԶ��������ֹ�Լ���ʹ�������Ĺ����и���Ҳͬ����Ҫ...����б�Ǹ��Ϊ���������˱��Ǹ�⣬�һ���Э�����º������ṩһ������ȡ�õ������ѧ�ɹ���лл���ǡ�");
                } else {
                        if(!cm.isQuestCompleted(7770)) cm.completeQuest(7770);
                        
                        cm.warp(926100600);
                        cm.dispose();
                }
        }
}