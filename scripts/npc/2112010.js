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
	Yulete's Office (926110203)
	Magatia NPC
 */

var status;
 
importPackage(Packages.server.life);
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function playersTooClose() {
        var npcpos = cm.getMap().getMapObject(cm.getNpcObjectId()).getPosition();
        var listchr = cm.getMap().getPlayers();
        
        for (var iterator = listchr.iterator(); iterator.hasNext();) {
            var chr = iterator.next();
            
            var chrpos = chr.getPosition();
            if(Math.sqrt( Math.pow((npcpos.getX() - chrpos.getX()), 2) + Math.pow((npcpos.getY() - chrpos.getY()), 2) ) < 310) return true;
        }
        
        return false;
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
    
                var eim = cm.getEventInstance();
                
                if(cm.getMapId() == 926110203) {
                        if(status == 0) {
                                var state = eim.getIntProperty("yuleteTalked");

                                if(state == -1) {
                                    cm.sendOk("�ˣ������������а���ˡ���ôף������ÿ��ģ��Ҿ���ʧ���ˡ�");

                                } else if (playersTooClose()) {
                                    cm.sendOk("Ŷ...���Ǻá�������̤����Ƭ����ʼ���Ҿ���#b�������ǵĶ���#k������������治���ף��ҵó���һ�����ǡ��治�ɣ���ʱ�������Ҹոպ��и�Լ�ᣬ���²��ò����뿪�ˡ������õ��ģ��ҵ�#rС�һ���#k���д����ǵġ���ô���Ҿ��ȸ����ˡ�");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else if (eim.getIntProperty("npcShocked") == 0) {
                                    cm.sendOk("��~���ǻ������൱�ƻ��������ˣ�����ν��������̤����Ƭ����ʼ���Ҿ���#b�������ǵĶ���#k������������治���ף��ҵó���һ�����ǡ��治�ɣ���ʱ�������Ҹոպ��и�Լ�ᣬ���²��ò����뿪�ˡ������õ��ģ��ҵ�#rС�һ���#k���д����ǵġ���ô���Ҿ��ȸ����ˡ�");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else {
                                    cm.sendOk("...������ʲô���ȵȡ���������ô�����������Ӧ���Ѿ�����������ͨ�������ͨ����û��ϵ������쳣����ܿ�ͻ�õ���������ҵ�������� #r��������#k�������ǣ�û�����������ˡ�����Ϊ���������������һ�С��������ǵ�ͬ�飬���ǾͿ�Ҫ�����ˡ�������ʱ�����ˡ�");

                                    eim.setIntProperty("yuleteTalked", 1);
                                }
                        }
                        
                        cm.dispose();
                } else {
                        if(status == 0) {
                                if(eim.isEventCleared()) {
                                        cm.sendOk("��...�ұ�����ˣ�����ô���ܣ���������һ�ж���Ϊ�˷�չΰ���������������û�е������ң�������˭վ���ҵ������϶�����������ʲô������˵�������������ǻ������Ϊ���ÿ�ѧΣ�վ��谭���ķ�չ���̣���������Ц�ˣ�");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("����������������������۷�֮����������������...");
                                        } else if(state == 0) {
                                                cm.sendOk("������Ⱥ�һﻹ���Ѳ�����ࡡ��ǳ��ã��������ҽ����ҵ������������������ѧǰ�ؼ����߻����ɵ������#r������#k��");
                                                eim.dropMessage(5, "��̩���������ҽ����ҵ������������������ѧǰ�ؼ����߻����ɵ�����������ϣ�");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300151);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("������Ⱥ�һﻹ���Ѳ�����ࡡ��ǳ��ã��������ҽ����ҵ������������������Ϳ������ص������ѧǰ�ؼ���...��Ⱥ���ĵ��������Э���ֹ�о����������߻����ɵ������#r�����ķ�����#k��");
                                                eim.dropMessage(5, "��̩���������ҽ����ҵ������������������Ϳ������ص������ѧǰ�ؼ���...��Ⱥ���ĵ��������Э���ֹ�о����������߻����ɵ�����������ķ����ϣ�");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300152);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 2);
                                                eim.setIntProperty("yuletePassed", -1);
                                        }
                                }
                        }
                        
                        cm.dispose();
                }
        }
}