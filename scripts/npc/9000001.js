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
/* Credits to: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("��ã�����#b��#k�����ڵ��ҵ�#b���#k��������Ӧ�ÿ쵽�˰�...");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("��...�Ҹ���ô�죿���Ҫ��ʼ��...�ܶ��˶�ȥ�μӻ�ˣ�����Ҳ�ÿ�����...");
        } else if (status == 2) {
            cm.sendSimple("��...��Ҫ��Ҫ����һ��ȥ���ҵĵܵܿ��ܺͱ���һ��μ��ˡ�\r\n#L0##e1.#n#b����ʲô���Ļ��#k#l\r\n#L1##e2.#n#b��Ϊ����ϸ˵������ݡ�#k#l\r\n#L2##e3.#n#b�õģ������볡�ɣ�#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("����MapleStory Global����֮��ȫ�������������������ڽ��У�GM����������ڼ�ٰ����˾�ϲ��GM�������ʱ��ע��ϵͳ��ʾ����֤�����ܲμ�һ�λ��Ӯȡ������");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("�ӵ�ж�����Ϸ���ݡ��ڲ��뵽��Ϸ��֮ǰ�˽���Ϸ�淨�Ǻ��а����ġ�ѡ��һ������Ҫ�˽����Ϸ�ɣ�#b\r\n#L0#��¥~��¥~#l\r\n#L1#��ߵ�#l\r\n#L2#ѩ����#l\r\n#L3#Ҭ�ӱ���#l\r\n#L4#OX�ʴ�#l\r\n#L5#Ѱ����Ϸ#l#k");
            } else if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001) 
						cm.divideTeams();
        
					cm.getEvent().minusLimit();
					cm.warp(cm.getEvent().getMapId(), 0);
					cm.dispose();
				} else {
					cm.sendNext("�����ǻĿǰ��δ��ʼ���ѳ���#b��ħ�ļ�#k������24Сʱ�ڲμӹ��������޷��볡�����Ժ����ԡ�");
					cm.dispose();                
            }
			}
        } else if (status == 4) {
            if (selection == 0) {
                cm.sendNext("#b[��¥~��¥~]#k�У���������Ҫʹ�����ݵִ���߲㡣�����������ڶഫ�͵�������֮��ѡ����ȷ�����ȥ����һ�㡣\r\n\r\n��Ϸ��ͼ��Ϊ���㣬ʱ������Ϊ#b6����#k����[��¥~��¥~]��С�#b�޷�������Ծ��ʹ�ÿ����ƶ����Ṧ��Ҳ����ʹ�õ��������ƶ��ٶ�#k��������д������ڽ����������ֵĵط����������������ǡ�");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[��ߵ�]��һ���ϰ���#k�����̿�ɭ��������ͬ��֮���ʱ��������Խ�����ָ������ϰ��ﵽ�յ㼴�ɻ�ʤ��\r\n\r\n������ĸ��ؿ���ʱ������Ϊ #b15����#k����[��ߵ�]��У��޷�ʹ�ÿ����ƶ����Ṧ���ܡ�");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[ѩ����]#k�У���ҽ���ΪMaple�Ӻ�Story����֧����չ����������ƴ��һ��#b��ʱ��������ѩ������ľ����Զ�����������#k������ڹ涨ʱ�������Ӷ�û�н�ѩ���Ƶ��յ㣬���Ƶý�Զ��һ�ӻ�ʤ��\r\n\r\n��Ҫʹѩ��������밴#bCtrl��#k����ѩ������Զ�̹����뼼�ܹ����ڵ�ͼ�о���ʧЧ��#bֻ�н�����ͨ�����ܹ���Ч#k��\r\n\r\n���һ����ɫ����ѩ����/�����ᱻ�ͻ���㡣���������㸽����ѩ�˿��谭�Է���ѩ��������������Ҫ���Ĳ߻�ս�ԣ������ù���ѩ����ѩ��֮��Ķ�Ա�ֹ���");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[Ҭ�ӱ���]#k�У���ҽ���ΪMaple�Ӻ�Story����֧����չ����������#b�ռ�����Ҭ�ӵĶ���#kΪʤ��ʱ������Ϊ#b5����#k�������������ƽ�֣����ʱ2����������ʤ�ߡ���������Ȼ��ƽ����������ƽ�ָ��ա�\r\n\r\n����Զ�̹����뼼�ܹ����ڵ�ͼ�о���ʧЧ��#bֻ�н�����ͨ�����ܹ���Ч#k�����û��Я��һ����ս����������ͨ�����ͼ�е�NPC�������۽�ɫӵ�������ĵȼ����������ܣ�����ɵ��˺��������κ�����\r\n\r\n��С�ĵ�ͼ�е��ϰ������塣�����ɫ�ڻ��ͼ���������������ͳ�ͼ����Ҭ�ӵ���ǰ�������һ�ι�������һ�Ӯ����öҬ�ӵķ�����ֻ����ȫ��ص�Ҭ�ӲŻ�Ʒ֣�Ҳ����˵û�д��������䣬��ͻȻ��ʧ��Ҭ�Ӳ��ᱻ�Ʒ֡���ͼ�ײ���һö�����ϴ������صĴ��͵㣬�������������");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX�ʴ�]#k�ǿ��ٱ��ð�յ�֪ʶ�Դ����Ϸ���μ���Ϸ�������Ҫ�鿴����#bM#kʱ������С��ͼ��ȷ��X��O��λ�á���Ŀ�ܹ���#r10��#k����������������ҽ����ʤ��\r\n\r\nһ��GM������Ŀ�������Ҫ��X��O��ѡ����ȷѡ�վ��̨�ס�û��ѡ����Լ��ڴﵽʱ������ʱ��Ȼ��ԥ���������Ҳ����Ϊ�����˴���𰸣�ͬ���ᱻ���ͳ�ͼ��������Ļ����[��ȷ]����֮ǰ����վ����̨���ϣ���Ҫ�����ƶ���Ϊ�˷�ֹ�κ���ʽ�����ף���OX�ʴ��ڼ佫��������������Ƶ�����졣");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[Ѱ����Ϸ]#k��#b��10������#k��Ѱ�������ڸ���ͼ�ڵ�#b�ر�ͼ#kΪĿ�����Ϸ��ÿ�����䶼�������صĲر��䣬һ���ÿ����ǣ����л����ø��ֵ��ߡ�����Ҫ����Щ�������ҵ��ر�ͼ��\r\n������Ա�#b��ͨ����#k���ƻ���һ����òر�ͼ���Ϳ���ͨ�������׵��ߵ�NPC������ħ�ļ�������NPC����Ѱ����Ϸ��ͼ������������Ҳ����������۵�#b����#k���ｻ����\r\n\r\n�ڻ�У���ͼ�������ص���ںʹ��͵㡣��ʹ�����ǵĻ���ֻҪ�ڶ�Ӧ�ص㰴#b[��[��#k���Ϳ��Դ��͵���һ�������ŵ���������Ҳ�п��ܷ������ص����ӻ����ӡ�Ҳ��Щ�����ڱ��򿪺�Ὣ�㴫�͵����ص�ͼ����Щ���ر���ֻ��ͨ�����ź���ܷ��֣�����ϸ������\r\n\r\n��Ѱ����Ϸ�У�һ�й������ܶ�����#r����#k������ֻ��ʹ����ͨ�����򿪱��䡣");
                cm.dispose();
            }
        }   
    }
}  