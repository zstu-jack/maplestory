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
/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
*/

var status;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getPlayer().getEventInstance();
        
        if (status == 0) {
            if(!eim.isEventCleared()) {
                cm.sendSimple("...#b\r\n#L0#��Ӧ����ʲô��#l\r\n#L1#�Ҵ����˻�ʯĸ����Ƭ��#l\r\n#L2#����Ҫ�뿪��#l");
            } else {
                cm.sendNext("����������ⳡ�Ͽ����ս�����ڿ�����ȡ�����ˡ�");
            }
        }
        else if (status == 1) {
            if(!eim.isEventCleared()) {
                selectedType = selection;
                if (selection == 0) {
                    cm.sendNext("������Ҫ���������ĺ�������ʾ�����������ڡ����ⶴѨ��ĳ�������� #b\"��ʯ��ĸ��\"#k�����Ǻ��ĵ���Ҫ���ɲ��֡��ҵ��������������ҡ�\r\n\r\n���ˣ������������һ��Сæ���ⶴѨ��ʯͷ�ͱ����ﻹ���źܶ� #b�Ͽ����#k�������������30�ţ���Ҳ�����һЩ������");
                    cm.dispose();
                    return;
                }
                else if (selection == 1) {
                    if(!cm.isEventLeader()) {
                        cm.sendNext("������Ķӳ�����ʯ��ĸ�󽻸��ң�����ⳡ�Ͽ����ս��");
                        cm.dispose();
                        return;
                    }

                    if (!cm.haveItem(4001018)) { //fire ore
                        cm.sendNext("����� #b��ʯ��ĸ��#k �����ҡ�");
                        cm.dispose();
                    }
                    else {
                        gotAllDocs = cm.haveItem(4001015, 30);
                        if (!gotAllDocs) { //documents
                            cm.sendYesNo("���ǰѻ�ʯ��ĸ��������ˣ������Ļ����ҿ��Ը������Ķ�Ա��ÿ��һ�飬��Ӧ����ȫ�㹻�������������ĺ����ˡ����ܽ���֮ǰ����ȷ��ȫ�������Ա�ı����ﶼ���㹻�ĸ��ӡ�");
                        } else {
                            cm.sendYesNo("���ǰѻ�ʯ��ĸ��ͷϿ����������ˣ������Ļ����ҿ��Ը������Ķ�Ա��ÿ��һ�飬��Ӧ����ȫ�㹻�������������ĺ����ˡ����⣬��Ϊ���� #r�㹻��ķϿ����#k ���һ���Ϊ�����ṩ�ܹ� #b�ܹ���ʱ���㴫�͵��������#k ��������ߡ����ܽ���֮ǰ����ȷ��ȫ�������Ա�ı����ﶼ���㹻�ĸ��ӡ�");
                        }
                    }
                } else if (selection == 2)
                    cm.sendYesNo("ȷ����Ҫ�����뿪��������Ƕӳ���ȫ�ӽ���һ���˳��� ");
            } else {
                if(eim.getProperty("gotDocuments") == 1) {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHoldAll([2030007, 4031061], [5, 1])) {
                            cm.gainItem(2030007, 5);
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("��ȷ��ȫ�������Ա�ı����ﶼ���㹻�ĸ��ӡ�");
                        }
                    } else {
                        cm.sendOk("�����Ѿ�������Լ����Ƿݽ��������ڿ��Դ��ǱߵĴ��͵��뿪���");
                    }
                } else {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHold(4031061, 1)) {
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("��ȷ��ȫ�������Ա�ı����ﶼ���㹻�ĸ��ӡ�");
                        }
                    } else {
                        cm.sendOk("�����Ѿ�������Լ����Ƿݽ��������ڿ��Դ��ǱߵĴ��͵��뿪���");
                    }
                }
                
                cm.dispose();
            }
            
        }
        else if (status == 2) {
            if (selectedType == 1) {
                cm.gainItem(4001018, -1);
                
                if(gotAllDocs) {
                    cm.gainItem(4001015, -30);
                    
                    eim.setProperty("gotDocuments", 1);
                    eim.giveEventPlayersExp(20000);
                } else {
                    eim.giveEventPlayersExp(12000);
                }
                
                eim.clearPQ();
                cm.dispose();
            }
            else if (selectedType == 2) {
                cm.warp(211042300);
                cm.dispose();
            }
        }
    }
}