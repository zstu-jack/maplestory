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
/* JM from tha Streetz
        Victoria Road: Kerning City (103000000)
        
        Refining NPC: 
        * Gloves
        * Glove Upgrade
        * Claw
        * Claw Upgrade
        * Processed Wood/Screws

        * Note: JM by default is used as a Megaphone shop. To move this shop to Frederick in the FM,
        * following MySQL command:
        * UPDATE `shops` SET `npcid`='9030000' WHERE (`shopid`='0')
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

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "悄悄告诉你...如果你有适合的材料，我可以把它们做成好东西...#b"//Pst是悄悄话的意思。
        var options = new Array("制作手套", "升级手套", "制作拳套", "升级拳套", "制作材料");
        for (var i = 0; i < options.length; i++)
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //glove refine
            var selStr = "那么，你想要制作什么样的手套?#b";
            var gloves = new Array ("工地手套（白）#k - 需要等级 Lv. 10#b", "褐短指手套#k - 需要等级 Lv. 15#b", "蓝短指手套#k - 需要等级 Lv. 15#b", "黑短指手套#k - 需要等级 Lv. 15#b", "青铜盗贼手套#k - 需要等级 Lv. 20#b", "青铜精神手套#k - 需要等级 Lv. 25#b", "钢铁暴风手套#k - 需要等级 Lv. 30#b",
                "钢铁追击手套#k - 需要等级 Lv. 35#b", "红盗贼手套#k - 需要等级 Lv. 40#b", "青月手套#k - 需要等级 Lv. 50#b", "青铜柔丝手套#k - 需要等级 Lv. 60#b");
            for (var i = 0; i < gloves.length; i++)
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //glove upgrade
            var selStr = "（卷轴）升级过的手套当然也可以作为原材料，但要知道，（卷轴）升级后的属性不会继承到新的手套上。 #b";//明晰释义
            var gloves = new Array ("锂矿盗贼手套#k - 需要等级 Lv. 20#b", "黑色盗贼手套#k - 需要等级 Lv. 20#b", "锂矿精神手套#k - 需要等级 Lv. 25#b",
                "黑精神手套#k - 需要等级 Lv. 25#b", "银暴风手套#k - 需要等级 Lv. 30#b", "黄金暴风手套#k - 需要等级 Lv. 30#b", "紫矿追击手套#k - 需要等级 Lv. 35#b", "黄金追击手套#k - 需要等级 Lv. 35#b", "黄金盗贼手套#k - 需要等级 Lv. 40#b",
                "黑盗贼手套#k - 需要等级 Lv. 40#b", "赤月手套#k - 需要等级 Lv. 50#b", "黄月手套#k - 需要等级 Lv. 50#b", "钢铁柔丝手套#k - 需要等级 Lv. 60#b", "黄金柔丝手套#k - 需要等级 Lv. 60#b");
            for (var i = 0; i < gloves.length; i++)
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //claw refine
            var selStr = "那么，你想要我制作什么样的拳套呢?#b";
            var claws = new Array ("钢铁拳套#k - 需要等级 Lv. 15#b", "青铜指虎#k - 需要等级 Lv. 20#b", "狼牙#k - 需要等级 Lv. 25#b",
                "钢铁斗拳#k - 需要等级 Lv. 30#b", "青铜守护指套#k - 需要等级 Lv. 35#b", "钢铁护腕#k - 需要等级 Lv. 40#b", "钢铁手甲#k - 需要等级 Lv. 50#b");
            for (var i = 0; i < claws.length; i++){
                selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //claw upgrade
            var selStr = "（卷轴）升级过的拳套当然也可以作为原材料，但要知道，（卷轴）升级后的属性不会继承到新的拳套上。#b";
            var claws = new Array ("锂矿拳套#k - 需要等级 Lv. 15#b", "黄金拳套#k - 需要等级 Lv. 15#b", "钢铁指虎#k - 需要等级 Lv. 20#b", "朱矿指虎#k - 需要等级 Lv. 20#b", "锂矿斗拳#k - 需要等级 Lv. 30#b", "朱矿斗拳#k - 需要等级 Lv. 30#b", "银守护拳套#k - 需要等级 Lv. 35#b", "黑守护拳套#k - 需要等级 Lv. 35#b", "赤红护腕#k - 需要等级 Lv. 40#b", "朱矿护腕#k - 需要等级 Lv. 40#b", "黑护腕#k - 需要等级 Lv. 40#b", "赤红手甲#k - 需要等级 Lv. 50#b", "蓝宝手甲#k - 需要等级 Lv. 50#b");
            for (var i = 0; i < claws.length; i++){
                selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4){ //material refine
            var selStr = "材料？我可以为你加工这几种材料...?#b";
            var materials = new Array ("使用树枝制作加工过的木材","使用木块制作加工过的木材","制作螺丝钉 (每组15个)");
            for (var i = 0; i < materials.length; i++){
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        if (equip)
            status++;
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 4){ //material refine
            var itemSet = new Array (4003001,4003001,4003000);
            var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
            var matQtySet = new Array (10,5,new Array (1,1));
            var costSet = new Array (0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
                
        var prompt = "想要制作#t" + item + "#，对吗？那么，你想制作多少？";
                
        cm.sendGetNumber(prompt,1,1,100)
    }
    else if (status == 3 && mode == 1) {
        if (equip)
        {
            selectedItem = selection;
            qty = 1;
        }
        else
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

        if (selectedType == 0){ //glove refine
            var itemSet = new Array(1082002,1082029,1082030,1082031,1082032,1082037,1082042,1082046,1082075,1082065,1082092);
            var matSet = new Array(4000021,new Array(4000021,4000018),new Array(4000021,4000015),new Array(4000021,4000020),new Array(4011000,4000021),new Array(4011000,4011001,4000021),new Array(4011001,4000021,4003000),new Array(4011001,4011000,4000021,4003000),new Array(4021000,4000014,4000021,4003000),new Array(4021005,4021008,4000030,4003000),new Array(4011007,4011000,4021007,4000030,4003000));
            var matQtySet = new Array(15,new Array(30,20),new Array(30,20),new Array(30,20),new Array(2,40),new Array(2,1,10),new Array(2,50,10),new Array(3,1,60,15),new Array(3,200,80,30),new Array(3,1,40,30),new Array(1,8,1,50,50));
            var costSet = new Array(1000,7000,7000,7000,10000,15000,25000,30000,40000,50000,70000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //glove upgrade
            var itemSet = new Array(1082033,1082034,1082038,1082039,1082043,1082044,1082047,1082045,1082076,1082074,1082067,1082066,1082093,1082094);
            var matSet = new Array(new Array(1082032,4011002),new Array(1082032,4021004),new Array(1082037,4011002),new Array(1082037,4021004),new Array(1082042,4011004),new Array(1082042,4011006),new Array(1082046,4011005),new Array(1082046,4011006),new Array(1082075,4011006),new Array(1082075,4021008),new Array(1082065,4021000),new Array(1082065,4011006,4021008),new Array(1082092,4011001,4000014),new Array(1082092,4011006,4000027));
            var matQtySet = new Array(new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,2),new Array(1,1),new Array(1,3),new Array(1,2),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,2,1),new Array(1,7,200),new Array(1,7,150));
            var costSet = new Array (5000,7000,10000,12000,15000,20000,22000,25000,40000,50000,55000,60000,70000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //claw refine
            var itemSet = new Array(1472001,1472004,1472007,1472008,1472011,1472014,1472018);
            var matSet = new Array(new Array(4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(1472000,4011001,4000021,4003001),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000030,4003000));
            var matQtySet = new Array(new Array(1,20,5),new Array(2,1,30,10),new Array(1,3,20,30),new Array(3,2,50,20),new Array(4,2,80,25),new Array(3,2,100,30),new Array(4,2,40,35));
            var costSet = new Array(2000,3000,5000,15000,30000,40000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //claw upgrade
            var itemSet = new Array (1472002,1472003,1472005,1472006,1472009,1472010,1472012,1472013,1472015,1472016,1472017,1472019,1472020);
            var matSet = new Array(new Array(1472001,4011002),new Array(1472001,4011006),new Array(1472004,4011001),new Array(1472004,4011003),new Array(1472008,4011002),new Array(1472008,4011003),new Array(1472011,4011004),new Array(1472011,4021008),new Array(1472014,4021000),new Array(1472014,4011003),new Array(1472014,4021008),new Array(1472018,4021000),new Array(1472018,4021005));
            var matQtySet = new Array (new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,3),new Array(1,3),new Array(1,4),new Array(1,1),new Array(1,5),new Array(1,5),new Array(1,2),new Array(1,6),new Array(1,6));
            var costSet = new Array (1000,2000,3000,5000,10000,15000,20000,25000,30000,30000,35000,40000,40000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
                
        var prompt = "你想制作";
        if (qty == 1)
            prompt += "一件 #t" + item + "#?";
        else
            prompt += qty + "件 #t" + item + "#?";
                        
        prompt += " 那么，请确认你准备好了对应材料，并且背包里有充足的空间。#b";
                
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost * qty + " 金币";
                
        cm.sendYesNo(prompt);
    }
    else if (status == 4 && mode == 1) {
        var complete = true;
        var recvItem = item, recvQty;
        
        if (item == 4003000)//screws
            recvQty = 15 * qty;
        else
            recvQty = qty;
        
        if(!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("空间不够。");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost * qty)
        {
            cm.sendOk("金币不足的话，我无法为你制作。");
            cm.dispose();
            return;
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty * qty))
                complete = false;
        }
                        
        if (!complete)
            cm.sendOk("别着急。没有相应的材料，我也没法制作你想要的东西。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i] * qty);
                }
            }
            else
                cm.gainItem(mats, -matQty * qty);
            if (cost > 0)
                cm.gainMeso(-cost * qty);
            
            cm.gainItem(recvItem, recvQty);
            cm.sendOk("做好了，欢迎下次光临。");
        }
        cm.dispose();
    }
}