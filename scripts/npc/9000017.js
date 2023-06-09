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
/* Coco
        Refining NPC: 
	* Chaos scroll SYNTHETIZER (rofl)
        * 
        * @author RonanLana (ronancpl)
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("ร��õ�...������Ҫ����������ʱ���ٻ���������̸�ɡ�");
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("��ã�������#b#p" + cm.getNpc() + "##k��");
            cm.dispose();
            return;
        }
        
        var selStr = "��ð��������ߣ��������ٿ�����...����Ҫ����#b��һ�ʴ�����#k�����������Ȥ�˽�һ�µĻ�����������˵��ȥ...";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "���Ǹո�ѧ���˺ϳ�ǿ���#b#t2049100##k�ķ�������Ȼ����������������...�������ģ�ֻҪ������Ͻ������ǣ���֧�� #b1,200,000���#k ��Ϊ���ǵķ���Ѿ��� #b�õ���#k������û����Ȥ��";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2049100, 7777777);
        var matSet = new Array(new Array(4031203,4001356,4000136,4000082,4001126,4080100,4000021,4003005));
        var matQtySet = new Array(new Array(100,60,40,80,10,8,200,120));
        var costSet = new Array(1200000, 7777777);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "��Ҫ����#t" + item + "#��������ô�������������٣�";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "��Ҫ����";
        if (qty == 1)
            prompt += "һ�� #t" + item + "#?";
        else
            prompt += qty + "�� #t" + item + "#?";
                        
        prompt += " ��ô����ȷ����׼��������Ӧ���ϣ����ұ������г���Ŀռ䡣#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " ���";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("�����������ǲ����������æ�ģ�����Ҳ��Ҫ��ң���������������ǣ����ǲŻ�Ϊ��ϳɡ�");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("�ں�����������֮ǰ���㻹û�м�����ı����ǲ����п�λ���԰ɣ�");
        }
        else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * qty == 1) {
                        complete = cm.haveItem(mats[i]);
                    } else {
                        complete = cm.haveItem(mats[i], matQty[i] * qty);
                    }
                }
            } else {
                complete = cm.haveItem(mats, matQty * qty);
            }
            
            if (!complete)
                cm.sendOk("û��ԭ���ϵĻ�������Ҳû����ʼ������ȥ�Ѽ����еĲ������������ǰɣ�");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendOk("��...�治�����ţ���Ȼ�ɹ��ˣ��һ������ʧ������ô����...���š��ɹ��Ǻ���Ȼ�����飬���ǵ����й��򶼺ܸ�Ч�������������������졣");
            }
        }
        cm.dispose();
    }
}