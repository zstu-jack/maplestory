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
/* Moony
	Amoria (680000000)
	Engagement ring NPC.
 */

var status;
var state;

var item;
var mats;
var matQty;
var cost;

var options;

function hasEngagementBox(player) {
    for(var i = 2240000; i <= 2240003; i++) {
        if(player.haveItem(i)) {
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

        if(status == 0) {
            options = ["�������������ָ��", "���������ҵĽ�ָ�С�"];
            cm.sendSimple("����#p9201000#����λ#b��佳��#k����ʲô�ܰ������ģ�\r\n\r\n#b" + generateSelectionMenu(options));
        } else if(status == 1) {
            if(selection == 0) {
                if(!cm.isQuestCompleted(100400)) {
                    if(!cm.isQuestStarted(100400)) {
                        state = 0;
                        cm.sendNext("�����������ָ����ô����Ҫ�ȴ�#b#p9201003##k������#rף��#k���ҲŻ�Ϊ��������");
                    } else {
                        cm.sendOk("Ҫ�ȴ�#b#p9201003##k������ף�����ҲŻ�Ϊ�����������ָ������Ӧ�þ��ڼ�����㣬ȥ#r����ѵ����#k���������ǰɡ�");
                        cm.dispose();
                    }
                } else {
                    if(hasEngagementBox(cm.getPlayer())) {
                        cm.sendOk("��Ǹ�����Ѿ��ж����ָ���ˡ�ÿ��ֻ�ܳ���һֻ�����ָ�С�");
                        cm.dispose();
                        return;
                    }
                    if(cm.getPlayer().getGender() != 0) {
                        cm.sendOk("��Ǹ�������ָ�н����з����ʱʹ�á�");
                        cm.dispose();
                        return;
                    }

                    state = 1;
                    options = ["����", "����", "������ӡ", "������Ե"];
                    var selStr = "����,���붨��ʲô���ӵĶ����ָ�أ�\r\n\r\n#b" + generateSelectionMenu(options);
                    cm.sendSimple(selStr);
                }
            } else {
                if(hasEngagementBox(cm.getPlayer())) {
                    for(var i = 2240000; i <= 2240003; i++) {
                        cm.removeAll(i);
                    }
                    
                    cm.sendOk("��Ķ����ָ���Ѿ����ɹ����١�");
                } else {
                    cm.sendOk("��û�пɹ����ٵĶ����ָ�С�");
                }
                
                cm.dispose();
            }
        } else if(status == 2) {
            if(state == 0) {
                cm.sendOk("����ס������~��~���Ҫ�Ӻܾ�֮ǰ��ʼ˵���ˡ���֪���ģ��������������ˣ����ǵĶ����ָҲ���������ġ�����ס��#r����ѵ����#k�����������ž����λ��������׾����ҵ���");
                cm.startQuest(100400);
                cm.dispose();
            } else {
                var itemSet = new Array(2240000,2240001,2240002,2240003);
                var matSet = new Array(new Array(4011007,4021007),new Array(4021009,4021007),new Array(4011006,4021007),new Array(4011004,4021007));
                var matQtySet = new Array(new Array(1,1),new Array(1,1),new Array(1,1),new Array(1,1));
                var costSet = new Array (30000,20000,10000,5000);

                item = itemSet[selection];
                mats = matSet[selection];
                matQty = matQtySet[selection];
                cost = costSet[selection];

                var prompt = "��ô�һ�Ϊ������#b#t" + item + "##k,��ȷ���������ʽ,û��ɣ�";
                prompt += " ��ô����ȷ����׼��������Ӧ���ϣ����ұ������г���Ŀռ䡣#b";

                if (mats instanceof Array){
                    for(var i = 0; i < mats.length; i++){
                        prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
                    }
                }
                else {
                    prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
                }

                if (cost > 0)
                    prompt += "\r\n#i4031138# " + cost + " ���";

                cm.sendYesNo(prompt);
            }
        } else if(status == 3) {
            var complete = true;
            var recvItem = item, recvQty = 1, qty = 1;

            if(!cm.canHold(recvItem, recvQty)) {
                cm.sendOk("���������Ʒ���Ƿ����㹻�ռ䡣");
                cm.dispose();
                return;
            }
            else if (cm.getMeso() < cost * qty)
            {
                cm.sendOk("��Ǹ����ɲ�����ѷ����뱸���㹻�Ľ���������������ָ��");
                cm.dispose();
                return;
            }
            else
            {
                if (mats instanceof Array) {
                    for(var i = 0; complete && i < mats.length; i++)
                        if (!cm.haveItem(mats[i], matQty[i] * qty))
                            complete = false;
                }
                else if (!cm.haveItem(mats, matQty * qty))
                    complete = false;
            }

            if (!complete)
                cm.sendOk("�ţ��㻹û׼�������������ָ�Ĳ��ϰɣ���������Ͻ����ң�����");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                }
                else
                    cm.gainItem(mats, -matQty * qty);

                if (cost > 0)
                    cm.gainMeso(-cost * qty);

                cm.gainItem(recvItem, recvQty);
                cm.sendOk("����������һö���ƳɵĶ����ָ��ף�����ɹ���");
            }
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