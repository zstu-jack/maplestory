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
        
        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r������������������#k ��";
        if(spawnPnpcFee > 0) {
            sendStr += "ֻҪ���� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���Ҿ���Ϊ��������";
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
                cm.sendNext("��Ľ�չʮ�־��ˡ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 5 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("����ǰ�����ص��� #b#p2020013##k ����������㡣�ҿ�����Ժ����ĵ�3��תְ�ܸ���Ȥ��Ϊ�˴ﵽ���Ŀ�꣬�һ�������������һ�����ԣ������㹻������תְ���ڽ����������϶�����һ����ڣ�����������һ������ͨ������������ʱ����������ҵ�һ��������������� #b#t4031059##k ���������ҡ�");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("��� #b#t4031059##k ���������ҶԻ���");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ������� #b#t4031059##k ��ȫ�ش��˻��������������棬���Ѿ�֤������ӵ��3ת��ʵ������������Ҫ���⴮�����������ص��� #b#p2020013##k ������һ���Ĳ��ԡ�ף����ˣ�");
        } else {
            cm.sendOk("You have chosen wisely.");
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
                    cm.sendOk("��Ǹ���������Ѿ���Ա�ˡ�");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪��������ѡ����...");
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
                cm.sendNext("����ľ������㿴������ǿ�󣬵�����Ҫͨ��������֤���������ʵ������������˵Ӧ�ò������ѣ������ɡ�");
        } else if (status == 1){
            if (!cm.isQuestCompleted(2191) && !cm.isQuestCompleted(2192)){
                // Pirate works differently from the other jobs. It warps you directly in.
                actionx["2ndJobT"] = true;
                cm.sendYesNo("Would you like to take the test now?");
            } else {
                if (selection < 3) {
                    if(selection == 0) {    //brawler
                        cm.sendNext("ȭ���ó�ʹ�� #rȭ��#k.\r\n\r\n#bȭ��#k ��ʹ��ȭ������ս���Ķ�ʿ��ӵ�и�HP��������ɴ����˺���װ��#r��ǻ�#k�������һ���ԶԶ��������ɴ����˺���#r��ľαװ#k �ܰ������ܸ��Ѷȵ�ս����");
                    } else if(selection == 1) {    //gunslinger
                        cm.sendNext("Pirates that master #rGuns#k.\r\n\r\n#bGunslingers#k are faster and ranged attackers. With the #rWings#k skill, Gunslingers can hover in the air, allowing for a longer, more sustained jump than a regular jump. #rBlank Shot#k allows to deal Stun status to multiple targets nearby.");
                    }
                    
                    status -= 2;
                } else
                    cm.sendNextPrev("You have a long road ahead of you still, but being a pirate will help you get there. Just keep that in mind and you will do fine.");
            }
        } else if (status == 2){
            if (actionx["2ndJobT"]) {
                var map = 0;
				if(cm.isQuestStarted(2191))
					map = 108000502;
				else
					map = 108000501;
                if(cm.getPlayerCount(map) > 0) {
					cm.sendOk("All the training maps are currently in use. Please try again later.");
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
					
                cm.sendYesNo("So you want to make the second job advancement as the " + (job == 510 ? "#bBrawler#k" : "#bGunslinger#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your decision here, right?");
            }
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            
            if(job == 510) cm.sendNext("From here on out, you are a #bBrawler#k. Brawlers rule the world with the power of their bare fists...which means they need to train their body more than others. If you have any trouble training, I'll be more than happy to help.");
            else cm.sendNext("From here on out, you are a #bGunslinger#k. Gunslingers are notable for their long-range attacks with sniper-like accuracy and of course, using Guns as their primary weapon. You should continue training to truly master your skills. If you are having trouble training, I'll be here to help.");
            
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 510 ? "brawler" : "gunslinger") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottom left corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 510 ? "Brawlers" : "Gunslingers") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("Since he is a clone of myself, you can expect a tough battle ahead. He uses a number of special attacking skills unlike any you have ever seen, and it is your task to successfully take him one on one. There is a time limit in the secret passage, so it is crucial that you defeat him within the time limit. I wish you the best of luck, and I hope you bring the #b#t4031059##k with you.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}