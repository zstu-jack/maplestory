/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

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
/* Amos the Wise
	Amoria (680000000)
	Wedding info.
 */

    importPackage(Packages.net.server.channel.handlers);

    var status;
    
    var rings = [1112806, 1112803, 1112807, 1112809];
    var divorceFee = 500000;
    var ringObj;
    
    function getWeddingRingItemId(player) {
        for (var i = 0; i < rings.length; i++) {
            if (player.haveItemWithId(rings[i], false)) {
                return rings[i];
            }
        }
    
        return null;
    }
    
    function hasEquippedWeddingRing(player) {
        for (var i = 0; i < rings.length; i++) {
            if (player.haveItemEquipped(rings[i])) {
                return true;
            }
        }
    
        return false;
    }
    
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
                var questionStr = ["���������?", "��������?", "����Ҫ���,Ӧ����ô��?"]
    
                if (!(!cm.getPlayer().isMarried() && getWeddingRingItemId(cm.getPlayer()))) questionStr.push("����Ҫ���...");
                else questionStr.push("��ϣ�������ҵľɻ��...");
    
                cm.sendSimple("���,��ӭ����#b�����#k,������һ���羰ʤ��,ð�ռ��ǻ���������Ѱ�Լ�����һ��,ͬʱҲ��������˵�����������ɻ�.��Ի������ʲô����������?�����Ҿͺ�.#b\r\n\r\n" + generateSelectionMenu(questionStr));
            } else if (status == 1) {
                switch (selection) {
                    case 0:
                        cm.sendOk("#b��������#k�Ƿǳ���ֱ�ӵ�.������Ҫ��#b��ָ��������,#p9201000##k�����������,��ð�յ��������ռ�#b4ö#t4031367##k.\r\n\r\n��������,��Ϳ������������ָ��.�ð�װ�õĶ����ָ����ϲ�����˱��,���ڴ����Ļ�Ӧ.������,������?");
                        cm.dispose();
                        break;
    
                    case 1:
                        cm.sendOk("#b�������#k��ʼǰ,������Ҫ����.�మ������������Ҫѡ�����ǵĻ���᳡.����С���ṩ�����ֻ᳡:#r�����#k��#r�����#k.\r\nȻ��,�����е�һ����Ҫ����һ��#b����ȯ#k,���Դ��ֽ��̳�����.֮�����������Ԥ������.˫�������������ڷַ������ѵ�#r���#k.");
                        cm.dispose();
                        break;
    
                    case 2:
                        cm.sendOk("��ϧ����,�����Ƕ�ô�ι̵İ�������,�����ܻ�����ôһ������Ѻ�.��֮,��Ȼ������Ը,��ϣ�����ķ���Ҳ�кܶ�.��ô���������������ʱ��,�һ�Ϊ�����ṩ��������,������Ҫ��ȡ#r" + divorceFee + "#k�����Ϊ������.");
                        cm.dispose();
                        break;
    
                    case 3:
                        ringObj = cm.getPlayer().getMarriageRing();
                        if (ringObj == null) {
                            var itemid = getWeddingRingItemId(cm.getPlayer());
    
                            if (itemid != null) {
                                cm.sendOk("�õģ���ľɻ���Ѿ�������.");
                                cm.gainItem(itemid, -1);
                            } else if (hasEquippedWeddingRing(cm.getPlayer())) {
                                cm.sendOk("�������������ľɻ��,�������ҽ�̸ǰ����ȡ��.");
                            } else {
                                cm.sendOk("����δ�ɻ�,�޷��������.");
                            }
    
                            cm.dispose();
                            return;
                        }
    
                        cm.sendYesNo("��ô,����Ҫ����İ��������?Ҫ˼�������������ش�,�����#b����ȡ��#k�Ĳ���,��Ļ��Ҳ����֮������.��ô,��#rȷ��Ҫ���#k����?");
                        break;
                }
            } else if (status == 2) {
                if (cm.getMeso() < divorceFee) {
                    cm.sendOk("��û���㹻�Ľ��,��Ҫ֧��#r" + divorceFee + "���#k�������.");
                    cm.dispose();
                    return;
                } else if (ringObj.equipped()) {
                    cm.sendOk("ִ�����ʱ�뽫���ȡ��,���뱳��.");
                    cm.dispose();
                    return;
                }
    
                cm.gainMeso(-divorceFee);
                RingActionHandler.breakMarriageRing(cm.getPlayer(), ringObj.getItemId());
                cm.gainItem(ringObj.getItemId(), -1);
    
                cm.sendOk("������İ��½���˻�����ϵ.");
                cm.dispose();
            }
        }
    }
    
    function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
            menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
    }