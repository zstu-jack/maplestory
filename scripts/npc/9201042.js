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
/* Mr. Sandman
	Amoria - Amoria (680000000)
	AmoriaPQ Extras (get wish tickets in AmoriaPQ bonus stage)

        Yellow Wish Ticket - Lv1 ~ 49
         Green Wish Ticket - Lv50 ~ 119
          Blue Wish Ticket - Lv120+
 */

var wishPrizes = [2000000, 2010004, 2020011, 2000004, 2000006, 2022015, 2000005, 1082174, 1002579, 1032039, 1002578, 1002580, 1002577, 1102078];
var wishPrizesQty = [10, 10, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1];
var wishPrizesCst = [10, 15, 20, 30, 30, 50, 100, 400, 450, 500, 500, 530, 550, 600];

var slctTicket;
var amntTicket;

var sel;
var advance = true;

var status;

function getTierTicket(level) {
        if(level < 50) {
                return 4031543;
        } else if(level < 120) {
                return 4031544;
        } else {
                return 4031545;
        }
}

function start() {
        slctTicket = getTierTicket(cm.getPlayer().getLevel());
        amntTicket = cm.getItemQuantity(slctTicket);
    
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
                if (mode == 1 && advance)
                        status++;
                else
                        status--;
                    
                advance = true;
    
                if(status == 0) {
                        cm.sendNext("��,�����ɺ�?��Ȼ���������۹�,�ǿ϶���˵���Һ��ֵ���Ī˹�ٰ�Ļ��.����#b������������#k,40�����ϵ�ð�ռҲ��ܲμӵĻ.\r\n\r\n��ô,������ڻ�л����#i4031543# #i4031544# #i4031545# #b����ϣ��Ʊ#k,�Ϳ�����������һ���Ʒ.");
                } else if(status == 1) {
                        var listStr = "";
                        for(var i = 0; i < wishPrizes.length; i++) {
                                listStr += "#b#L" + i + "#" + wishPrizesQty[i] + " #z" + wishPrizes[i] + "##k";
                                listStr += " - " + wishPrizesCst[i] + " ϣ��Ʊ";
                                listStr += "#l\r\n";
                        }
                    
                        cm.sendSimple("�㵱ǰӵ��#b" + amntTicket + " #i" + slctTicket + "# #t" + slctTicket + "##k.\r\n\r\n��ϣ���һ��Ľ�Ʒ��:\r\n\r\n" + listStr);
                } else if(status == 2) {
                        sel = selection;
                        
                        if(amntTicket < wishPrizesCst[selection]) {
                                cm.sendPrev("����Ҫ��#b" + wishPrizesCst[selection] + " #t" + slctTicket + "##k���һ�����!���������һ�����,���ռ��㹻��ϣ��Ʊ��������.");
                                advance = false;
                        } else {
                                cm.sendYesNo("��ѡ��#b" + wishPrizesQty[selection] + " #z" + wishPrizes[selection] + "##k,����Ҫ��#b" + wishPrizesCst[selection] + " #t" + slctTicket + "##k���һ�.����Ҫ�һ���?");
                        }
                } else {
                        if(cm.canHold(wishPrizes[sel], wishPrizesQty[sel])) {
                                cm.gainItem(wishPrizes[sel], wishPrizesQty[sel]);
                                cm.gainItem(slctTicket, -wishPrizesCst[sel]);
                                
                                cm.sendOk("��,ף�������ÿ���!");
                        } else {
                                cm.sendOk("��ȡ����ǰ,��ճ�����һ������λ��.");
                        }
                    
                        cm.dispose();
                }
        }
}