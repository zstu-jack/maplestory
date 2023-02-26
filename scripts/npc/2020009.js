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

status = -1;
var job;
var sel;
actionx = {"Mental": false, "Physical": false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 2;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)) {
        if (cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }

        cm.sendNext("���~");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058)) {
        actionx["Mental"] = true;
    } else if (cm.haveItem(4031057)) {
        actionx["Physical"] = true;
    }
    cm.sendSimple("����������˽�ʲô��#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#����֪����ô����3ת" : "") + "\r\n#L1#�����ȡ����������ʸ�");
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3) {
        if (mode == 0 && type == 1)
            cm.sendNext("�¶����ġ�");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]) {
        if (status == 0)
            cm.sendNext("�ǻ۲��ԵĲ������úܺã�����������ȷ�ش����������⡣�ұ���˵���Ҷ���������չ�ֵ��ǻ�ˮƽӡ����̡������ǿ�ʼ��һ��֮ǰ�����Ȱ������ݸ��ҡ�");
        else if (status == 1)
            cm.sendYesNo("�������ڣ��㽫ͨ���ұ��һ����ǿ���ð�ռҡ����ǣ���ִ�д˲���֮ǰ����ȷ������SP�ѱ�����ʹ�ã���������Ҫʹ��70��֮ǰ��õ�����SP���ܽ���3ת��Ŷ����Ȼ��2תʱ�Ѿ�ѡ�������ְҵ����3ת��������ѡ��һ���ˡ�������׼������3ת����");
        else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("���ڼ���֮ǰ��������SP��");
                    cm.dispose();
                    return;
                }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }

            if (Math.floor(cm.getJobId() / 10) == 21) cm.sendNext("������������� #b��/��ħ��ʿ#k��The new skill book features new and improved fire and poison based spells, and skills such as #bElement Amplification#k (improved element-based spells) and #bSpell Booster#k (improves the overall speed of your attacking spells) will enable you to attack the monsters quickly and effectively. Defensive spells such as #bPartial Resistance#k (allows you to become stronger against certain elemental-based attacks) and #bSeal#k (seals up the monster) will help negate the one weakness Mages possess: lack of HP.");
            else if (Math.floor(cm.getJobId() / 10) == 22) cm.sendNext("You're the #bMage of Ice and Lightning#k from here on out. The new skill book features new and improved ice and lightning based spells, and skills such as #bElement Amplification#k (improved element-based spells) and #bSpell Booster#k (improves the overall speed of your attacking spells) will enable you to attack the monsters quickly and effectively. Defensive spells such as #bPartial Resistance#k (allows you to become stronger against certain elemental-based attacks) and #bSeal#k (seals up the monster) will help negate the one weakness Mages possess: lack of HP.");
            else cm.sendNext("You're #bPriest#k from here on out. The new skill book features new and improved holy spells such as #bShining Ray#k and #bSummon Dragon#k, and skills such as #bMystic Door#k (creates a door for the exit to the nearest town) and #bHoly Symbol#k (improves the EXP gained) can be vital to the party play. Off-beat spells such as #bDoom#k (turn monsters into snails) separates Priests from other jobs as the most different of all.");
        } else if (status == 3) {
            cm.sendNextPrev("I've also given you some SP and AP, which will help you get started. You have now become a powerful, powerful warrior, indeed. Remember, though, that the real world will be awaiting your arrival with even tougher obstacles to overcome. Once you feel like you cannot train yourself to reach a higher place, then, and only then, come see me. I'll be here waiting.");
        }
    } else if (actionx["Physical"]) {
        if (status == 0)
            cm.sendNext("�������ԵĲ������úܺã���֪�������������������Ѿ�ͨ����ǰ�벿�ֵĿ��ԣ��������°벿�֡����Ȱ��������ҡ�");
        else if (status == 1) {
            if (cm.haveItem(4031057)) {
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("���ǲ��Եĺ�벿�֡�������Խ��������Ƿ��㹻�������ܹ���������ΰ�����һ���������ص���ѩԭ����һ����ѩ���ǵĺڰ����򣬳�Ϊѩԭʥ�أ����������ﶼ�޷������ѩԭʥ�ص��м䣬��һ��ܴ��ʯͷ������ʥ��ʯͷ������Ҫ�ṩһ���������Ʒ��Ϊ��Ʒ��Ȼ��ʥʯ�ᵱ����������ǻۡ�");
        } else if (status == 2)
            cm.sendNextPrev("����Ҫ��ʵ�ͼᶨ�ػش�ÿ�����⡣�������ȷ�ش����������⣬��ôʥʯ����ʽ�����㲢������ #b#t4031058##k���������û������һ����������һ����ף����ˣ�");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("ȥ�� #b#p1032001##k��Ȼ��� #b#t4031057##k ������");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("�� #b#p2030006##k ��̸�󣬰� #b#t4031058##k ������");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0) {
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
                if (status == 0)
                    cm.sendYesNo("��ã����� #b#p2020009##k��������ħ�������죬��������ҵ���������ЩԸ���������ˡ����ƺ��Ѿ�׼������ǰ������ӭ��3ת����ս�ˡ��кܶ�ħ��ʦ�������ߣ��޷��ﵽ3ת�����ı�׼�����أ���׼������3ת�Ĳ�������");
                else if (status == 1) {
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("�õģ��㽫��ħ��ʦ��������Ҫ������ܲ���: �������ǻۡ������ҽ�������Ͳ��Ե������֡����ǵ�ħ�����ֵ� #b#p1032001##k ��ȥ��������������㿼��ǰ�벿�ֵ�ϸ�ڡ���������� #b#t4031057##k �� #b#p1032001# ����");
                } else if (status == 2)
                    cm.sendNextPrev("ֻ������ͨ������������֮�󣬲��ܿ�ʼ�ǻ۲��ԡ�#b#t4031057##k ��֤����ȷʵͨ���˿��ԡ����㵽������֮ǰ���һ�֪ͨ #b#p1032001##k����������׼�����ⲻ���ף����Ҷ������������ġ�ף����ˣ�");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50) {
                cm.sendOk("������סίԱ�������� #b���֤#k���������� #r�����ķ�����#k ��һԱ�ˡ�ף����;˳����");
                if (!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            } else
                cm.sendOk("��̫���ˣ�û���ʸ��Ϊ #r����������#k ��һԱ������ #b50��#k ���������ҶԻ���");
            cm.dispose();
        }
    }
}