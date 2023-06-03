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

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                var mapobj = cm.getMap();
            
                if (mode == 0 && type > 0) {
                        cm.getPlayer().dropMessage(5, "���װ�ŵ����Ŷ��û��Ů�ʵıӻ�����ȻӮ�����ǣ������������ˣ�");
                        
                        mapobj.spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new Packages.java.awt.Point(850, 0));
                        mapobj.destroyNPC(1104002);
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(!cm.isQuestStarted(20407)) {
                                cm.sendOk("...��ʿ,�㿴������#bû������#k����ⳡս��, ��һ���˻�û������ս��������׼��ʱ�����޷�սʤ���ġ�������ֻ��׾�Ĵ���̸̸���ų����Ҳ���������һЩ������");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendAcceptDecline("����������Ů�ʵ��������Ѿ��������ˣ���������#b��ɫ֮��#k��ð������������һ���޴�ɹ����������أ���������������㿴�����㹻ǿ׳�����ǳ�Ϊ�����Ŷӵĺ󱸲��������ɣ�#r�����������#k�����ѣ�");
                } else if (status == 1) {
                        cm.sendOk("�٣�ų����#b�ڷ�ʦ�ľ���#k��û������֮�أ�");
                        cm.dispose();
                }
        }
}
