/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (status == 0) {
                        if (cm.isQuestStarted(2048)) {

                                cm.sendOk("����˹��������ô֪���ġ����ðɡ������������㡣#r��ʯ#k���Դ���Ҫ��������ҩ��#b����������#k�����ú�ν�����#r����#k������������˵��������һ������У������ȥ����ħ�����ֵ�#b����#k������#r�Ϲž���#k����ԭ���Ǳ���żʦ��������#b��ʯ����#k�ĵ��ߡ������ڵ�ð�ռ�ϲ����֮Ϊ#b��ʯͷ��#k��#r������ë#k����һ�ִ�˵�е������#b����ʨ������#k���������ֽ�Ľ������Ѿ������������ݹż����أ�#b����#k����һ��ʱ�䲶ʳ���ǣ�����㹻���ˣ�����#b����#kʱҲ����ü�����");

                        } else {
                                cm.sendOk("������...");
                        }

                        cm.dispose();
                }
        }
}
