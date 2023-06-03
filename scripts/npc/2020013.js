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
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 5;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("Hi there.");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
        actionx["Mental"] = true;
    else if (cm.haveItem(4031057))
        actionx["Physical"] = true;
    cm.sendSimple("����ʲô�ܰ���ģ�#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#����Ҫ������3��תְ����" : "") + "\r\n#L1#��������ս����������ʸ�");
}

function action(mode, type, selection){
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
        if (mode == 0 && type == 1)
            cm.sendNext("�����Ǳ�����Ѱɡ�");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]){
        if (status == 0)
            cm.sendNext("�����ǻ۲����еı��ֲ���������ظ�����ÿ���������ȷ�𰸡����ò�˵������ǻ�ˮ׼ȷʵ����ӡ����̡������ǿ�ʼ��һ��֮ǰ�����Ȱ������ݸ��ҡ�");
        else if (status == 1)
            cm.sendYesNo("�󹦸�ɣ��㽫��ͨ����תְ��ΪԶ��֮ǰǿ���ð�ռҡ������ڴ�֮ǰ����ȷ������70��֮ǰ��õ�����SP�����ܵ㣩���Ѿ�������ϣ�Ȼ����ܽ��е�3��תְ�����⣬���Ѿ��ڵ�2��תְʱѡ����ְҵ��������ڵ�3��תְ���޷��ٴ�ѡ������ȷ��Ҫ���е�3��תְ��");
        else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("����תְ����ǰ�������70��ǰ��õ�����SP�����ܵ㣩��");
                    cm.dispose();
                    return;
                }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }
            
            if(Math.floor(cm.getJobId() / 10) == 51) cm.sendNext("Great! You are now a #bMarauder#k. As a Marauder, you will learn some of the most sophisticated skills related to melee-based attacks. #bEnergy Charge#k is a skill that allows you to store your power and the damage you receive into a special form of energy. Once this ball of energy is charged, you may use #bEnergy Blast#k to apply maximum damage against your enemies, and also use #bEnergy Drain#k to steal your enemy's HP to recover your own. #bTransformation#k will allow you to transform into a superhuman being with devastating melee attacks, and while transformed, you can use #bShockwave#k to cause a mini-earthquake and inflict massive damage to your enemies.");
            else cm.sendNext("Great! You have now become an #bOutlaw#k. As an Outlaw, you will become a true pistolero, a master of every known Gun attack, as well as a few other skills to help you vanquish evil. #bBurst Fire#k is a more powerful version of Double Shot, shooting more bullets and causing more damage at the same time. You also now have the ability to summon a loyal #bOctopus#k and the swooping #bGaviota#k as your trusty allies, while attacking your enemies using #bBullseye#k. You can also use element-based attacks using #bFlamethrower#k �� #bIce Splitter#k.");
        } else if (status == 3) {
            cm.sendNextPrev("���⣬��Ϊ��������5��AP�������㣩��1��SP�����ܵ㣩���������㿪��3ת����ó̡���������һλ����ǿ��ĺ����ˡ�����Ҫ�ǵã���ʵ�����ǰ����Ȼ�и���޵�������Ҫȥ�˷�������е�ѵ��������΢����΢��ʵ���Ѿ��޷����������ߵĲ��ʱ�����������Ұɡ��һ�һֱ��������㡣");
        }
    }else if (actionx["Physical"]){
        if (status == 0)
            cm.sendNext("�������������еı��ֲ�����֪�����������ġ��������Ѿ�ͨ����ǰ�벿�ֵĲ��ԣ��������Ǻ�벿�֡����Ȱ��������ҡ�");
        else if (status == 1){
            if (cm.haveItem(4031057)){
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("���ǲ��Եĺ�벿�֡�������Խ��������Ƿ�ӵ���㹻���ǻۣ��ܹ�̤������ΰ�����һ���������ص���ѩԭ�У���һ����ѩ���ǵĺڰ����򱻳�Ϊѩԭʥ�أ����������ﶼ�޷������ѩԭʥ�ص����ģ�������һ��޴��ʯͷ���Ǿ���ʥʯ������Ҫ����һ���ر�ĵ��ߣ�����ʥʯ�ᵱ����������ǻۡ�");
        } else if (status == 2)
            cm.sendNextPrev("��Ҫ��ʵ�ض��ᶨ�ػش�ÿ�����⡣�����ȷ�ش����������⣬��ôʥʯ����ʽ�Ͽ��㣬���� #b#t4031058##k�����㡣�������û������һ�������һ����ף����ˡ�");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("ȥ�� #b#p1090000##k���� #b#t4031057##k ���������ҡ�");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("�� #b#p2030006##k ��̸�󣬰� #b#t4031058##k ���������ҡ�");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0){
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0){
                if (status == 0)
                    cm.sendYesNo("��ӭ�������Ϲ��ݣ����� #b#p2020013##k���������ϡ��Ҹ��������н���ָ���ĺ���չ�ֳ���ǿ��ʵ�����㿴�����������ֿ�����������Ҫ����3ת���Եġ���Ȼ��̫��pirates�����ڴ���ҪһԾ�ִ��µĸ߶ȣ�ȴ����ˤ�úܲҡ���ô������Σ�����׼������3ת��������");
                else if (status == 1){
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("�ܺã��㼴�������������ǻ۲�����������Ϊһ��pirate�����ʡ��һ����������ǰ�벿�ֵ���������Ҫ��ν��С����ǵ�ŵ����˹�ŵ� #b#p1090000##k ��ȥ����������ָ��������������ԡ��������󣬴��� #b#t4031057##k �������ҡ� ");
                } else if (status == 2)
                    cm.sendNextPrev("ֻ������ͨ������������֮�󣬲��ܿ�ʼ�ǻ۲��ԡ�#b#t4031057##k ��֤����ȷʵͨ���˿��ԡ����㵽������֮ǰ���һ�֪ͨ #b#p1090000##k �㼴���ִ׼����һ�С���ݲ��鲢���򵥣����Ҷ����м�������ġ�ף����ˡ�");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50){
            	cm.sendOk("���������˳����ǵ� #b���#k �����ʸ��Ϊ #r�����ַ���#k ��һԱ��Ը����δ���ĵ�·������˳����");
                if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            }else
                cm.sendOk("���ʵ�����������Ϊ #r�����ַ���#k ��Ա�ı�׼�� ���ٵ��� #b50��#k ���������ҶԻ���");
            cm.dispose();
        }
    }
}