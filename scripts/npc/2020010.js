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

//** Archer 3rd Job Instructor Rene

status = -1;
var job;
var sel;
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 3;
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
    cm.sendSimple("�����������֪��Щʲô��#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#����Ҫ������3��תְ����" : "") + "\r\n#L1#��������ս����������ʸ�");
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
                        
			if(Math.floor(cm.getJobId() / 10) == 31) cm.sendNext("You have officially become the #bRanger#k. One of the skills that you'll truly embrace is a skill called #bMortal Blow#k that allows Rangers to fire arrows from close-range. #bInferno#k allows Rangers to temporarily perform fire-based attacks on monsters, while skills like #bPuppet#k (summons a scarecrow which attracts the monsters' attention) and #bSilver Hawk#k (summons a Silver Hawk that attacks monsters) solidify the Bowman's status as a long-range attack extraordinaire.");
                        else cm.sendNext("You have officially become the #bSniper#k. One of the skills that you'll truly embrace is a skill called #bMortal Blow#k that allows Snipers to fire arrows from close-range. #bBlizzard#k allows Snipers to temporarily perform ice-based attacks on monsters, while skills like #bPuppet#k (summons a scarecrow which attracts the monsters' attention) and #bGolden Eagle#k (summons a Golden Eagle that attacks monsters) solidify the Bowman's status as a long-range attack extraordinaire.");
		} else if (status == 3) {
		    cm.sendNextPrev("���⣬��Ϊ��������5��AP�������㣩��1��SP�����ܵ㣩���������㿪��3ת����ó̡���������һλ����ǿ��Ĺ������ˡ�����Ҫ�ǵã���ʵ�����ǰ����Ȼ�и���޵�������Ҫȥ�˷�������е�ѵ��������΢����΢��ʵ���Ѿ��޷����������ߵĲ��ʱ�����������Ұɡ��һ�һֱ��������㡣");
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
	} else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0){
	    cm.sendNext("ȥ�� #b#p1012100##k���� #b#t4031057##k ���������ҡ�");
		cm.dispose();
	} else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0){
	    cm.sendNext("�� #b#p2030006##k ��̸�󣬰� #b#t4031058##k ���������ҡ�");
		cm.dispose();
	} else {
	    if (sel == undefined)
		    sel = selection;
	    if (sel == 0){
	        if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
	            if (status == 0)
	                cm.sendYesNo("��ӭ�������Ϲ��ݣ����� #b#p2020010##k�������ֳ��ϡ��һ�������յ�������ɴ��ڸ���Щ�����������ˡ����ƺ���Ҫ��3ת�ĵ�·�ϸ���һ����Ȼ��̫��Ĺ�����������ǰ����������ȴ�޷�����3ת�ı�׼����ô������Σ�����׼������3ת��������");
	            else if (status == 1){
		            cm.getPlayer().setPartyQuestItemObtained("JB3");
	                cm.sendNext("�ܺã��㼴�������������ǻ۲�����������Ϊһ�������ֵ����ʡ��һ����������ǰ�벿�ֵ���������Ҫ��ν��С����ǵ����ִ�� #b#p1012100##k ��ȥ����������ָ��������������ԡ��������󣬴��� #b#t4031057##k �������ҡ�");
	            } else if (status == 2)
	                cm.sendNextPrev("ֻ������ͨ������������֮�󣬲��ܿ�ʼ�ǻ۲��ԡ�#b#t4031057##k ��֤����ȷʵͨ���˿��ԡ����㵽������֮ǰ���һ�֪ͨ #b#p1012100##k �㼴���ִ׼����һ�С���ݲ��鲢���򵥣����Ҷ����м�������ġ�ף����ˡ�");
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