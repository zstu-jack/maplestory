/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* 
    9201125 - Magician Statue, Lith Harbor
    |- Warps you to 101000003 (Library)

    Version
    |- 1.0 First Version by Jayd
    |- 1.1 Edited by Ronan - check job requirements
 */

var status;
var map = 101000003;
var job = "ħ��ʦ";
var jobType = 2;
var no = "����������Ҫ��Ϊ#b"+job+"#k�Ļ����������Ұɡ�";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk(no);
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.sendOk(no);
            cm.dispose();
        }

        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            if (cm.getJob() == "BEGINNER") {
                if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                    cm.sendYesNo("�٣�#h0#�������������Ϊһλ#b"+job+"#k�Ļ����ҿ��԰��㴫�͵�#b#m"+map+"##kȥ����Ҫ���ڳ�����");
                } else {
                    cm.sendOk("If you want to be a #b"+job+"#k, train yourself further until you reach #blevel 8, " + cm.getFirstJobStatRequirement(jobType) + "#k.");
                    cm.dispose();
                }
            } else {
                cm.sendOk("�㻹����ǿ�󣡶��ѵ���ɣ�");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.warp(map, 0);
            cm.dispose();
        }
    }
}