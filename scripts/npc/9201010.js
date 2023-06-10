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
/**
	Assistant Travis
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var eim = cm.getEventInstance();
    if (eim == null) {
        cm.warp(680000000, 0);
        cm.dispose();
        return;
    }

    var isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));

    switch (status) {
        case 0:
            if (cm.getMapId() == 680000300) {
                cm.sendYesNo("��ȷ��Ҫ#r��;�˳�����#kǰ��#b����С��#k��?�����Ļ�,����#r���������׶�#k.");
            } else {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }

                if (cm.haveItem(4000313) && isMarrying) {
                    if (eim.getIntProperty("weddingStage") == 3) {
                        cm.sendOk("������ȫ�����ջ�Ծ������!!!��,��#b#p9201007##k��̸,ǰ�������ɶ԰�.");
                        cm.dispose();
                    } else if (hasEngagement) {
                        if (!cm.createMarriageWishlist()) {
                            cm.sendOk("���Ѿ��ύ��Ը����...");
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��?����ʢ���ɶԵ��ʸ�����?��Ǹ,û��֤���Ļ�,�޷�������������.");
                    }
                } else {
                    if (eim.getIntProperty("weddingStage") == 3) {
                        if (!isMarrying) {
                            cm.sendYesNo("�����ǲ��ǲ��������Ǵ����?���ǵĳ�������#r���Ĭ��#k,��������#b�����ɶ�#k.��ȷ��Ҫ#r�ʹ��˳�#k�ص�#b����С��#k��?");
                        } else {
                            cm.sendOk("������ȫ�����ջ�Ծ������!!!��,��#b#p9201007##k��̸,ǰ�������ɶ԰�.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendYesNo("��ȷ��Ҫ#r��;�˳�����#kǰ��#b����С��#k��?�����Ļ�,����#r���������׶�#k.");
                    }
                }
            }
            
            
            break;
            
        case 1:
            cm.warp(680000000,0);
            cm.dispose();
            break;
    }
}
