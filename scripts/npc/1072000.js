/*
	This file is part of the OdinMS Maple Story Server
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

/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
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
    
                if(status == 0) {
                        if (cm.isQuestCompleted(100004)) {
                            cm.sendOk("�����˲���ļһ");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100003)) {
                            cm.sendNext("�õģ������������ڡ��������Ĺ��ﲢ�ռ�30�ź��飬Ȼ�������λ�������ͬ�ŶԻ���������� #bӢ��֤��#k ��Ϊͨ�����Ե�֤����ף����ˡ�");
                            status = 4;
                        } else if (cm.isQuestStarted(100003)) {
                            cm.sendNext("������������� #b��������#k ���㽻���ҵġ���ô˵������������μ�սʿ2ת���Եİɡ��õģ��һ�������Ϳ������ݡ���̫���ţ����ݲ����㸴�ӡ�");
                        } else {
                            cm.sendOk("׼���ú������ҶԻ����һ�������Ϳ������ݡ�");
                            cm.dispose();
                        }
                }
                else if (status == 1)
                        cm.sendNextPrev("�һ���㴫�ͽ�һ�����ص�ͼ���������һЩƽʱ�ѵ�һ���Ĺ�����ǿ���������ͨ�Ĺ���һ��������ȴ��ȫ��ͬ�����ǼȲ�����㾭�飬Ҳ���������ͨ��Ʒ��");
                else if (status == 2)
                        cm.sendNextPrev("���������Щ����ʱ�������м��ʵ��� #b#t4031013##k������һ�֣��ɹ������������ɵ�����ʯ���ռ�30����ת���������������ͬ�ţ���Ϳ���ͨ�����ԡ�");
                else if (status == 3)
                        cm.sendYesNo("һ����ȥ���������֮ǰ���޷��뿪���������������������ֵҲ�����...����������г�ֵ�׼��...��ô�����������볡��");
                else if (status == 4) {
                        cm.sendNext("�õģ������������ڡ��������Ĺ��ﲢ�ռ�30�ź��飬Ȼ�������λ�������ͬ�ŶԻ���������� #bӢ��֤��#k ��Ϊͨ�����Ե�֤����ף����ˡ�");
                        cm.completeQuest(100003);
                        cm.startQuest(100004);
                        cm.gainItem(4031008, -1);
                }
                else if (status == 5) {
                        cm.warp(108000300, 0);
                        cm.dispose();
                } else {
                    cm.dispose();
                }
        }
}
