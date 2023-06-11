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
/* Icebyrd Slimm
	Masteria: New Leaf City (600000000)
	Handles the quiz quest. (4900)
 */

var minlevel = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestCompleted(4911)) {
                cm.sendNext("�ɵ�Ư�������Ѿ���ȷ�ش����������й���Ҷ�ǵ����⡣ף����;��죡");
                cm.dispose();
            } else if (cm.isQuestCompleted(4900) || cm.isQuestStarted(4900)) {  // thanks imbee for pointing out the quiz leak
                cm.sendNext("�٣�ע�����װ��ģ���Ҫ����һ�������ˣ�");
                cm.dispose();
            } else {
                var selStr = "��ã����ǰ�˹�ݵ¡�˹��ķ����Ҷ�ǵ��г�����л������ǰ��������Ҷ�ǡ���ô������Ϊ����Щʲô�أ�#b"
                var info = new Array("������ʲô�ط�?","���ǽ�����˭?","ʲô�Ǻ�����?","�ڲ�����װ��������?","ʲô�ǿ���������?","ʲô�ǳ������?","��Щ·�����ʲô?","����ܿ���˭?","����������˿���������Ů����,���Ĺ�ȥ��������?","���������е��µ�����ʱ�Ὺ��?","����μ���Ҷ��֪ʶ�ʴ�!");
                for (var i = 0; i < info.length; i++)
                    selStr += "\r\n#L" + i + "# " + info[i] + "#l";
                cm.sendSimple(selStr);
            }
        } else if(status == 1) {
            switch (selection) {
                case 0:
                    cm.sendNext("��һֱ��Ҫ����һ�����С�������һ����ͨ�ĳ��У�����һ���������˿��ŵĳ��С�����ǰס�ڷ������У���Ҳ������������ԭ�����Ƽƻ��Ĺ����У��������˺ܶ��ˣ�����һЩ�Ѿ�������Ϊ�����ദ�ˡ�������ǽ���һ��������������Ҷ�ǵ���ţ������������Ӽ���ʳ�˻��о��˳���������ܿ���һλ���Ի����������֣���˵��̫Բ���ˣ��������µ�ӡ��̫�á������������������ˣ�����һ��ӷ�����������������������ü��ΰ����һ���Ϊ�ģ������Ҿ������Ǿ�����������ѡ����Ȼ���Ƿ���һ������˵���������Ѿ���ʼ������������������еĹ����ˡ�����������ǵ�̽�ռң����￭���ֵܣ������ƺ�������ʲô�����ģ����Ѿ�ͬ����ҵ��Ķ����������в�����ˡ����һ��ڷ������е�ʱ���Ҿ���˵���������ֵܵĹ��¡����а�����ķ...�ðɣ���ֻ��˵�����������ԭס����ȫ���ǡ�����֮ǰ̸�������ƺ�û��ʲô���⣬������������������Ҷ��...�Ҳ���ʶ���ղ���������ô�࣡����ʲô��Ҫ�ʵ���");
                    status -= 2;
                    break;
                case 1:
                    cm.sendNext("һλ���������97�����ˡ����Ǹ�ʱ�������ߣ����������н��й��ʱ�����ż���ˡ����϶��������һȺ��������ģ���Ķ������˵�ì�ܣ�������Ҫ�Ե������Ҿ�����������Ϊ����֮���Ļر�����ͬ��Ϊ��Ҷ�ǽ���һ��ʱ�䲩��ݡ��Ҿ����������ﻹ������ԭ����Ϊ����ֹһ���ᵽ��Ҷ����δ���ᷢ����Ȥ�����顣Ҳ�����Ժ���������ֵ�...");
                    status -= 2;
                    break;
                case 2:
                    cm.sendNext("�Ǻǣ����Ž�����������ʱ����Ҳ����ͬ�������⡣��������Ծ��㣬Ҳ�������ǳ�˵�Ĵ��͵㡣վ�����ڰ���[��]���Ὣ�㴫�͵���һ��λ�á��ҽ������Щ��������ʹ�÷������������ǳ��еı������ϵͳ��");
                    status -= 2;
                    break;
                case 3:
                    cm.sendNext("�ڲ�����װ��λ�ڴ��ӵصס������ǰ��￭�·���һ������ۼ����������ƺ��Ƕ����������һƬ�������Ҫ�����۵Ļ�����Ҳ���ú���֡�����˵����Ҫ�˰�æ̽����Ƭ������Ӧ��ȥ������������ҪС�ģ�����Ļ�е֩��ɲ��ǳ��صġ�");
                    status -= 2;
                    break;
                case 4:
                    cm.sendNext("��...����������λ����Ҷ�ǵĽ���������δ������ǿ����������Ƭ�����ε��������Ҫǰ������������ս����׼��������Ҷ�������߾��ܵ����˵��Ƭ���ֵľ�ͷ��һ��ʧ��֮�ǣ�������Ŀǰ��û���ҵ��κ�������");
                    status -= 2;
                    break;
                case 5:
                    cm.sendNext("����Լ���ڴ��ӵ��ڲ�����װ�õ���̽��ʱ���ֵġ���վ������һ����������ϴ��͵��������ط������������͵�Ŀ�ĵ���ʱ�������ڲ����ܶ�Ӧ����ѭ��������ʱҲ�ÿ��ߵġ����ǲ�֪��ʲô��Ϊ�������µĹŴ��Ƽ���");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("��Ҷ�����洦�ɼ�������ζ��ǰ���������ڽ����С������ƴ����Ź�����δ��ɣ�����������̵ƾʹ������ͨ���ˡ�������������������һֱ�ڽ����������У�");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("�����ܿˡ���֪����Ⱥ������ѧ�Ŀ�С�Ӱɣ����Ǻ������Ƕ����е���������νһ������߻�������Ů����顣����˵�ľ��ǽܿ������ˣ�ֻ������û��Ů���ѡ�������������ӵ�й�һ�λ��ᣬֻ�����Ǵ���˶��ѡ�����֮�����Ϳ�ʼ�����������ڸ��Լ�����ʵ��ݡ��Ҷ�������ʵ����ؿ���ƿ�������Ǵӻ�������ġ����������ȥ�������������������������顣");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("�Һ�������ʶ�ܾ��ˣ���Ȼ����ǰ���ǲ���ʰ������ꡣ�ܳ�һ��ʱ������û�м�������������Ҳ�ܹ���⡣����Ϊ���������˷ǳ��ǳ��á���ʵ����˵��������һ��ʼ������ʱ����������������ʱ���ұ�һȺ�Ѹ��Ģ����Χ������������������ҡ���ѡ�ξ���ʱ����û��ô�����������������Ҳ��Ӧ�ػ��������У���Ϊ����ṩ�����������������Ϊ�������о�һ�㹫��Ӧ�������񣬾�ȥ�������ġ�");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("�ܿ�ͻ�ģ��ҵ����ѡ�������û�п������������еĽ�������Ҳ����Ŭ����������һ�о���ʱ�����ǻῪ����Щ����ġ���֪������ڴ���һ�죬��Ҳһ����");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("û���⡣�����ȫ����ԵĻ����һ�����ö����ġ�");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("�Ȳ����������ڲμ�֪ʶ����֮ǰ����̽��һ����ô����");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}