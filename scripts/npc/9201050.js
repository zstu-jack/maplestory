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
                var info = new Array("������ʲô�ط�?","���ǽ�����˭?","ʲô�Ǻ�����?","�ڲ�����װ��������?","ʲô�ǿ���������?","ʲô�ǳ������?","��Щ·�����ʲô?","����ܿ���˭?","����������˿���������Ӳ��ͷ,���Ĺ�ȥ��������?","���������е��µ�����ʱ�Ὺ��?","����μ���Ҷ��֪ʶ�ʴ�!");
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
                    cm.sendNext("Well, when John found himself in the MesoGears portion of Bigger Ben, he stood on one and went to another location. However, he could only head back and forth-they don't cycle through like the Foxwit Door. Ancient tech for you.");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("Well, you'll see them just about everywhere. They're areas under construction. The Red lights mean it's not finished, but the Green lights mean it's open. Check back often, we're always building!");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("Ah, Jack. You know those guys that are too cool for school? The ones who always seem to get away with everything? AND get the girl? Well, that's Jack, but without the girl. He thinks he blew his chance, and began wearing that mask to hide his true identity. My lips are sealed about who he is, but he's from Amoria. He might tell you a bit more if you ask him.");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("I've known Lita for a while, though we've just recently rekindled our friendship. I didn't see her for quite a bit, but I understand why. She trained for a very, very long time as a Thief. Matter of fact, that's how we first met! I was besieged by a group of wayward Mushrooms, and she jumped in to help. When it was time to pick a sheriff, it was a no-brainer. She's made a promise to help others in their training and protect the city, so if you're interested in a bit of civic duty, speak with her.");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("Soon, my friend. Even though you can't see them, the city developers are hard at work. When they're ready, we'll open them. I know you're looking forward to it and so am I!");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("No problem. I'll give you something nice if you answer them correctly!");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("Eager, are we? How about you explore a bit more before I let you take the quiz?");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}