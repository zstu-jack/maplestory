/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

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
/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
    Cody (Cyndicate)
-- Totally Recreated by --
    Moogra
-- And Quest Script by --
    Ronan
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/

var status;

var seagullProgress;
var seagullIdx = -1;
var seagullQuestion = ["��һ�죬��ȥ����׽��62ֻ��������͡�����·����С�����͸���10ֻ���㡣��ô�ҵ�ʱһ��ӵ�ж���ֻ�����أ�"];
var seagullAnswer = ["72"];
 
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
    
                if (status == 0) {    // missing script for skill test found thanks to Jade�?
                        if (!cm.isQuestStarted(6400)) {
                                cm.sendOk("���������ֻ�����ģ�ȥ�������˴�ɡ�");
                                cm.dispose();
                        } else {
                                seagullProgress = cm.getQuestProgressInt(6400, 1);
                            
                                if (seagullProgress == 0) {
                                        seagullIdx = Math.floor(Math.random() * seagullQuestion.length);
                                        
                                        // string visibility thanks to ProXAIMeRx & Glvelturall
                                        cm.sendNext("�ã���Ҫ�������һ�����ˡ���Ҫ��������׼���������ǳ��ѡ������Ǻ�Ÿ��Ҳ��������쳣���ѣ����Խ��");
                                } else if (seagullProgress == 1) {
                                        cm.sendNext("����~������������һ�⡣�������ĺ��ѡ��ҵ��������Э��һ��.����ʶ�����԰ɣ�");
                                } else {
                                        cm.sendNext("ŶŶŶŶ������������˾�̾������ǰ������Щ���Էǳ����ѣ��㲻̫����ͨ��...��ȷʵ�Ǻ����ǲ��ɻ�ȱ��һԱ����Ÿ�ǵĺ����ѡ��������ڽ���һ��һ�����������������һ������Ҫ���ǣ�����֮�����Σ��֮�ʻ������Ԯ�֡��������Σ��֮�У��ͺ��к�Ÿ���Ѱɡ�");
                                }
                        }
                } else if (status == 1) {
                        if (seagullProgress == 0) {
                                cm.sendGetText(seagullQuestion[seagullIdx]);
                        } else if (seagullProgress == 1) {
                                cm.sendNextPrev("�һ�����ȥŵ����˹���ϵ�һ���շ��䡣��������￴��9�����ء�������~���ǵ�Ȼ�����Ƕ��̥�ˡ���ֻ������һ��СС�����۷������������־����");
                        } else {
                                cm.sendNextPrev("��������ʹ�õ�̺ʽ��Ϯ�����Ǿͻ������������������������֮������ġ�\r\n\r\n  #s5221003#    #b#q5221003##k");
                        }
                } else if (status == 2) {
                        if (seagullIdx > -1) {
                                var answer = cm.getText();
                                if (answer == seagullAnswer[seagullIdx]) {
                                        cm.sendNext("�찡���������޷��������ж�������������ţ��ں�Ÿ������������������㹻���²�ʿѧλ�����������������������̫����...�޷�����...������������");
                                        cm.setQuestProgress(6400, 1, 1);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("�ţ��Ҽǵú�������ô�࣬�����԰ɡ�");
                                        cm.dispose();
                                }
                        } else if (seagullProgress != 2) {
                                cm.sendNextPrev("��֮��9��������ֻ��һ������ġ���Ҳ֪�����������Ի���֮��ᶨ���Ƶ�������������������������Ǹ������ĺ�������Ӧ���ܹ������ҵ����ͬ�顣��ô���һ�����ȥ�������ڵķ��䡣");
                        } else {
                                //cm.gainExp(1000000);
                                //cm.teachSkill(5221003, 0, 10, -1);
                                //cm.forceCompleteQuest(6400);

                                cm.sendNextPrev("��ͨ���������еĲ��飬���úܺã�");//��ô�ѵ�̺ʽ��Ϯ������ȡ���ˣ����������������
                                cm.dispose();
                        }
                } else if (status == 3) {
                        var em = cm.getEventManager("4jaerial");
                        if(!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("��Ƶ���Ѿ�������������ڽ�����ս����ȴ��������ս���л�������Ƶ����");
                        }
                        
                        cm.dispose();
                }
        }
}