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
/* Kyrin
	Pirate Job Advancement
	
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "2ndjobT" : false, "3thJobI" : false, "3thJobC" : false};
job = 510;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 5;

var advQuest = 0;
function start() {
    if (cm.isQuestStarted(6330)) {
        if (cm.getEventInstance() != null) {    // missing script for skill test found thanks to Jade�?
            advQuest = 5;                       // string visibility thanks to iPunchEm & Glvelturall
            cm.sendNext("���ò�������ȥ�����ġ�");
        } else if (cm.getQuestProgressInt(6330, 6331) == 0) {
            advQuest = 1;
            cm.sendNext("������׼���˰ɣ����������2�����ڣ���ҪŬ�������ҵĹ���...�ҿɲ������֡�ף����ˣ���Ϊ��������ʱ��������������������Ҫ��");
        } else {
            advQuest = 3;
            cm.teachSkill(5121003, 0, 10, -1);
            cm.forceCompleteQuest(6330);
            
            cm.sendNext("ף����ͨ���˲��ԡ����������һᴫ����һ���µļ��ܣ������� \"��������\".\r\n\r\n  #s5121003#    #b#q5121003##k");
        }
    } else if (cm.isQuestStarted(6370)) {
        if (cm.getEventInstance() != null) {
            advQuest = 6;
            cm.sendNext("���ò�������ȥ�����ġ�");
        } else if (cm.getQuestProgressInt(6370, 6371) == 0) {
            advQuest = 2;
            cm.sendNext("������׼���˰ɣ����������2�����ڣ���ҪŬ�������ҵĹ���...�ҿɲ������֡�ף����ˣ���Ϊ��������ʱ��������������������Ҫ��");
        } else {
            advQuest = 4;
            cm.teachSkill(5221006, 0, 10, -1);
            cm.forceCompleteQuest(6370);
            
            cm.sendNext("ף����ͨ���˲��ԡ����������һᴫ����һ���µļ��ܣ������� \"��װ\".\r\n\r\n  #s5221006#    #b#q5221006##k");
        }
    } else if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r�����������뺣���ĵ���#k ��";
        if(spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ����������뺣���ĵ��á�";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("�벻���Ϊһ��#r����#k����������ǰ��ģ����������ÿһ���˶��ܳ�Ϊ������#b��ĵȼ�������Ҫ����10��������ӵ�� " + cm.getFirstJobStatRequirement(jobType) + " ����#k�����ҿ������ǲ��������׼��");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 500) {
            actionx["2ndJob"] = true;
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendNext("����ɵúܺã��ҿ����ˡ��ҽ��������ں���֮·�ϸ���һ����");
            else
                cm.sendNext("��Ľ���֮�����˾��ȡ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 5 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("���������ˡ�����ǰ�����ص��� #b#p2020013##k ����������㡣�ҿ�����Ժ����ĵ�3��תְ�ܸ���Ȥ��Ϊ�˴ﵽ���Ŀ�꣬�һ�������������һ�����ԣ������㹻������תְ���ڽ����������϶�����һ����ڣ�����������һ������ͨ������������ʱ����������ҵ�һ��������������� #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("����� #b#t4031059##k �������ҡ�");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020013##k ������һ���Ĳ��ԡ�ף����ˣ�");
        } else {
            cm.sendOk("���ǵ�ѡ��");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }
    
    if (status == -1){
        start();
        return;
    } else {
        if (advQuest > 0) {
            if (advQuest < 3) {
                var em = cm.getEventManager(advQuest == 1 ? "4jship" : "4jsuper");
                if(!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("�Ѿ������볡���ܲ��ԣ����Ժ����ԡ�");
                }
            } else if (advQuest < 5) {
                if (advQuest == 3) {
                    cm.sendOk("������ܺ� '���˱���' ��һ������ƣ�������Զ�����ߡ��ٽ��������ڴ������ٻᡣ");
                } else {
                    cm.sendOk("������ܲ�ͬ�������ĺ������ܣ�����ȫ�����һ֧��ʹ�ú�����Գ��� 'ս��' ���������ˡ������ڵǴ��ڼ䣬��ķ����ȼ�Ҳ����ߡ�ף���Ϊ����Ļ�ǹ�֣���������");
                }
            } else {
                if (advQuest < 6) {
                    cm.setQuestProgress(6330, 6331, 2);
                } else {
                    cm.setQuestProgress(6370, 6371, 2);
                }

                cm.warp(120000101);
            }
            
            cm.dispose();
        } else if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ҡ�");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ�������ĵ����Ѿ���Ա�ˡ�");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("ѡ��ְҵ���޷��ٴθ��ġ�");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("Ŷ���㿴�������Գ�Ϊ���ǵ�һԱ����Ȼ���е�ȱ������...��ȷ��Ҫ��Ϊ������?");
            } else {
                cm.sendOk("ȥ����ѵ���ɣ���ʱ���ҿ��Ը�������γ�Ϊ #r����#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(2070000) && cm.canHoldAll([1482000, 1492000])){
                if (cm.getJobId() == 0){
                    cm.changeJobById(500);
                    cm.gainItem(1492000, 1);
                    cm.gainItem(1482000, 1);
                    cm.gainItem(2330000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("�õģ��ӽ��쿪ʼ�����Ϊ�����ǵ�һԱ�������ĺ�Ϊ�ҵ����������������ģ����ܹ��Ϻ����ӡ���ô���һᴫ����һЩ���ܡ�������");
            } else {
                cm.sendNext("����ı����ڳ���λ�ã�Ȼ���������ҶԻ���");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڱ�֮ǰǿ׳���ˣ��Ұ����ֺ���ʹ�õ������͸����ˣ�Ҳ����ı���������һ�У�����һ�¡�����֮�⣬�ҽ̸�����һЩ���ܡ�����Դ���Ļ���½ǵ� #b����#k �˵��鿴, �����ʹ�øջ�õ�SPѧϰ���ܣ�����Ҫע�⣺��һЩ������Ҫѧ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("��һ��Ҫ�����㣬һ����������ѡ�񣬽����ɱ������Ϊһ�����������ٵ�Զ���ɡ�");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendSimple("�õġ����������˾������͵���ײ��� [������Ҫѡ���ҵĶ�תְҵ]��#b\r\n#L0#�����ҽ���ʲô��ȭ�֡�\r\n#L1#�����ҽ���ʲô�ǻ�ǹ�֡�\r\n#L3#��Ҫѡ���ҵĶ�תְҵ��");
            else
                cm.sendNext("����ľ������㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ�����������˵Ӧ�ò������ѣ������ɡ�");
        } else if (status == 1){
            if (!cm.isQuestCompleted(2191) && !cm.isQuestCompleted(2192)){
                // Pirate works differently from the other jobs. It warps you directly in.
                actionx["2ndJobT"] = true;
                cm.sendYesNo("���ڿ�ʼ������");
            } else {
                if (selection < 3) {
                    if(selection == 0) {    //brawler
                        cm.sendNext("ȭ���ó�ʹ�� #rȭ��#k.\r\n\r\n#bȭ��#k ��ʹ��ȭ������ս���Ķ�ʿ��ӵ�и�HP��������ɴ����˺���װ��#r��ǻ�#k�������һ���ԶԶ��������ɴ����˺���#r��ľαװ#k �ܰ������ܸ��Ѷȵ�ս����");
                    } else if(selection == 1) {    //gunslinger
                        cm.sendNext("��ǹ�����ó�ʹ�� #r��ǹ#k�ĺ���.\r\n\r\n#b��ǹ��#k �ó�����Զ�̿��ٹ�����ʹ�� #r����Ь#k����ǹ�ֿ���Ư���ڿ��У����г����룬�����Ϳ�ʱ�����Ծ��#r�Ի����#k �ܰ�����һ����ѣ�����������ĵ��ˡ�");
                    }
                    
                    status -= 2;
                } else
                    cm.sendNextPrev("�㻹�кܳ���һ��·Ҫ�ߣ��뱧�����ģ����������ָ����ǰ����");
            }
        } else if (status == 2){
            if (actionx["2ndJobT"]) {
                var map = 0;
				if(cm.isQuestStarted(2191))
					map = 108000502;
				else
					map = 108000501;
                if(cm.getPlayerCount(map) > 0) {
					cm.sendOk("����ѵ����ͼ������ʹ�á����Ժ����ԡ�");
					cm.dispose();
				} else {
					cm.warp(map, 0);
					cm.dispose();
					return;
                }
            } else {
                if(cm.isQuestCompleted(2191) && cm.isQuestCompleted(2192))
                        job = (Math.random() < 0.5) ? 510 : 520;
                else if(cm.isQuestCompleted(2191))
                        job = 510;
                else if(cm.isQuestCompleted(2192))
                        job = 520;
					
                cm.sendYesNo("���������ѡ�� " + (job == 510 ? "#bȭ��#k" : "#b��ǹ��#k") + "��Ϊ��Ķ�תְҵ��Ҫ֪����һ����ѡ����󣬽��޷��ٴθı�ְҵ��");
            }
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            
            if(job == 510) cm.sendNext("������������һλ #bȭ��#k�ˡ�ȭ�����п�һ����ȭ������磬���ǲ��ϴ����Լ�������������һ�㡣����ѵ�����һ������ø�ǿ��");
            else cm.sendNext("������������һλ #b��ǹ��#k�ˡ�ǹ����ʹ����ǹ��Ϊ�������Ծ�׼��Զ�̹�������������������ѵ�����һ������ø�ǿ��");
            
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո���������Ϊһ�� " + (job == 510 ? "ȭ��" : "��ǹ��") + "Ӧ�����յļ��ܡ����⣬�㱳������������չ��һ�У����HP�����MPҲ�õ������ӡ�");
        else if (status == 5)
            cm.sendNextPrev("��ͬʱҲΪ��������1��� #b���ܵ�#k��������½ǵ� #b���ܲ˵�#k ���в鿴�������������������Ķ�ת���ܵȼ�������Ҫ������һ�£��㲢����ͬʱ�������м��ܵĵȼ�����Ϊ��Щ������Ҫϰ��ǰ�ü��ܺ�ſ���ѧϰ��");
        else if (status == 6)
            cm.sendNextPrev((job == 510 ? "ȭ��" : "��ǹ��") + "����ζ�Ÿ�ǿ��ʵ���������ס����Ҫ����������������������������;����һ��������ڼ�����ǿ����ս������Ŭ���������ǿ��ʱ�������ҡ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�����ҵķ���, ��������������һ�����ѵ�ս��. ����ڹ涨ʱ����սʤ������������ #b#t4031059##k ���������ҡ�");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}