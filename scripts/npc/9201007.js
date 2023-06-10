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
/**
	Assistant Nancy
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720 ragezone)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
---------------------------------------------------------------------------------------------------
**/

var status;
var eim;
var hasEngage;
var hasRing;

function start() {
    eim = cm.getEventInstance();
    if(eim == null) {
        cm.warp(680000000,0);
        cm.dispose();
        return;
    }
    
    if(cm.getMapId() == 680000200) {
        if(eim.getIntProperty("weddingStage") == 0) {
            cm.sendNext("宾客们正在这边等待入场.请稍候,婚礼将在不久后开始.");
        } else {
            cm.warp(680000210, "sp");
            cm.sendNext("请入座.婚礼即将开始!");
        }
        
        cm.dispose();
    } else {
        if(cm.getPlayer().getId() != eim.getIntProperty("groomId") && cm.getPlayer().getId() != eim.getIntProperty("brideId")) {
            cm.sendNext("抱歉,我现在只与新人交谈.");
            cm.dispose();
            return;
        }

        hasEngage = false;
        for(var i = 4031357; i <= 4031364; i++) {
            if(cm.haveItem(i)) {
                hasEngage = true;
                break;
            }
        }

        var rings = [1112806, 1112803, 1112807, 1112809];
        hasRing = false;
        for (i = 0; i < rings.length; i++) {
            if (cm.getPlayer().haveItemWithId(rings[i], true)) {
                hasRing = true;
            }
        }

        status = -1;
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.sendOk("再会."); 
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    if (status == 0) {
        var hasGoldenLeaf = cm.haveItem(4000313);
        
        if (hasGoldenLeaf && hasEngage) {
            cm.sendOk("你暂时还不能离场,请与勒贝尔托4世交谈完成婚礼后再行尝试.");
            cm.dispose();
        } else if (hasGoldenLeaf && hasRing) {
            var choice = Array("前往婚礼派对", "我该做什么?");
            var msg = "我有什么能帮你的?#b";
            for (i = 0; i < choice.length; i++) {
                msg += "\r\n#L" + i + "#" + choice[i] + "#l";
            }
            cm.sendSimple(msg);
        } else {
            cm.sendNext("你似乎并没有黄金枫叶,订婚戒指或是结婚戒指中的任何一种,你在这里没什么事做,我会把你送回婚礼村.");
            selection = 20; // Random.
        }
    } else if (status == 1) {
        var cmPartner;
        try {
            cmPartner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId()).getAbstractPlayerInteraction();
        } catch(err) {
            cmPartner = null;
        }
        
        switch(selection) {
            case 0:
                if(eim.getIntProperty("isPremium") == 1) {
                    eim.warpEventTeam(680000300);
                    cm.sendOk("恭喜!请妥善保管你的结婚照片!");
                    if (cmPartner != null) cmPartner.npcTalk(cm.getNpc(), "恭喜!请妥善保管你的结婚照片!");
                } else {    // skip the party-time (premium only)
                    eim.warpEventTeam(680000500);
                    cm.sendOk("恭贺新婚!我会将你们送往出口.");
                    if (cmPartner != null) cmPartner.npcTalk(cm.getNpc(), "恭贺新婚!我会将你们送往出口.");
                }
                
                cm.dispose();
                break;
                
            case 1:
                cm.sendOk("新郎与新娘必须接受勒贝尔托4世的祝福后方可成婚.当你们做好准备,请与我交谈,前往婚礼派对会场.");
                cm.dispose();
                break;
                
            default:
                cm.warp(680000000,0);
                cm.dispose();
                break;
        }
    }
}
