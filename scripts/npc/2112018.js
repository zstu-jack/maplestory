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
 * @author: Ronan
 * @npc: Romeo & Juliet
 * @func: MagatiaPQ exit
*/

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                var eim = cm.getEventInstance();
                
                if(status == 0) {
                        if(eim.getIntProperty("escortFail") == 1) {
                                cm.sendNext("拜你们所赐，我们终于得以团聚。犹泰违反了玛加提亚的法令，将会被送进监狱。再一次感谢你们。");
                        } else {
                                cm.sendNext("拜你们所赐，我们终于得以团聚。犹泰违反了玛加提亚的法令，将会被送进监狱。再一次谢谢你们。他的研究对玛加提亚而言是无价之宝，只不过是因为太过渴求力量而被蒙蔽了双眼。再一次感谢你们。");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer())) {
                                cm.warp((eim.getIntProperty("isAlcadno") == 0) ? 261000011 : 261000021);
                        } else {
                                cm.sendOk("接受奖励之前，请腾出至少一个背包空位。");
                        }
                        
                        cm.dispose();
                }
        }
}