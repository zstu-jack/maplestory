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
/* Author: Xterminator
	NPC Name: 		Cloy
	Map(s): 		Victoria Road : Henesys Park (100000200)
	Description: 		Pet Master
 */
var status = -2;
var sel;

function start() {
    status = -2
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
            
        if(status == -1) {
            cm.sendNext("你... 是不是将我的孩子带在身边呢？通过使用生命水的魔法，我成功研发出赋予玩偶生命的魔法。　而人们将我获得生命的孩子称为 #b宠物#k。　如果持有宠物的话，任何事情都可以来问我。");
        }
        else if (status == 0)
            cm.sendSimple("对于什么问题感到有兴趣呢？#b\\r\\n#L0#请针对宠物说明。#l\\r\\n#L1#宠物要怎么养？#l\\r\\n#L2#宠物也是会死吗？#l\\r\\n#L3#请告诉宠物猫,黑色猫的命令语。#l\\r\\n#L4#请告诉宠物狗的命令语。#l\\r\\n#L5#请告诉粉红兔，白兔的命令语。#l\\r\\n#L6#请告诉小魔龙。#l\\r\\n#L7#请告诉麋鹿的命令语。#l\\r\\n#L8#请告诉黑色猪的命令语。#l\\r\\n#L9#请告诉熊猫的命令语。#l\\r\\n#L10#请告诉哈士奇的命令语。#l\\r\\n#L11#请告诉迪诺龙、妮诺龙的命令语。#l\\r\\n#L12#请告诉猴子的命令语。#l\\r\\n#L13#请告诉电子鸡的命令语。#l\\r\\n#L14#请告诉白虎的命令语。#l\\r\\n#L15#请告诉企鹅的密令语。#l\\r\\n#L16#请告诉黄金猪的命令语。#l\\r\\n#L17#请告诉机器人的命令语。#l\\r\\n#L18#请告诉迷你雪吉拉的命令语。#l\\r\\n#L19#请告诉巴洛谷的命令语。#l\\r\\n#L20#请告诉神奇宝贝的命令语。#l\\r\\n#L21#请告诉绿红蓝的命令语。#l\\r\\n#L22#请告诉黑龙的命令语。#l\\r\\n#L23#请告诉黑色鬼精灵的命令语。#l\\r\\n#L24#请告诉豪猪的命令语。#l\\r\\n#L25#请告诉雪宝的命令语。#l\\r\\n#L26#请告诉臭鼬的命令语。#l\\r\\n#L27#请告诉我转移宠物亲密度的方法。#l");
        else if (status == 1) {
            sel = selection;
            if (selection == 0) {
                status = 3;
                cm.sendNext("想对宠物有所了解嘛。很久以前，我再做出的木偶身上用了生命水，透过魔法成功的做出了魔法动物。虽然难以相信，木偶成了有生命的生命体。它们能听懂人类的话，是很乖巧可爱的家伙。");
            } else if (selection == 1) {
                status = 6;
                cm.sendNext("宠物对于特别的指令会有高兴和难过等不同的反应。给宠物下指令后，听主人的话，就会提高与主人之间的亲密度。双击宠物的话就能看到亲密度，等级，饱满度等资讯。");
            } else if (selection == 2) {
                status = 11;
                cm.sendNext("死掉啊！其实这些小家伙并不是真正活着的，所以它们会死，我也不知道对不对啊。这些小家伙是将我的魔法力量与生命水的力量灌注在木偶身体里做出来的。当然当它们活动的时候，是与其他动物没什么两样。");
            } else if (selection == 3)
                cm.sendNext("#r褐色小猫，黑色小猫#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b座#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 4)
                cm.sendNext("#r褐色小狗#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 5)
                cm.sendNext("#r粉红兔子，白色兔子#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b抱抱#k (等级 10 ~ 30)\\r\\n#b睡觉, 困了, 去睡觉#k (等级 20 ~ 30)");
            else if (selection == 6)
                cm.sendNext("#r小魔龙#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 7)
                cm.sendNext("#r麋鹿#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b圣诞快乐，圣诞快乐#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 11 ~ 30)\\r\\n#b寂寞, 孤独#k (等级 11 ~ 30)\\r\\n#b撒娇#k (等级 11 ~ 30)\\r\\n#b走#k (等级 21 ~ 30)");
            else if (selection == 8)
                cm.sendNext("#r黑色猪#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 9)
                cm.sendNext("#r熊猫#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 10)
                cm.sendNext("#r哈士奇#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 11)
                cm.sendNext("#r迪诺龙、妮诺龙#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 12)
                cm.sendNext("#r猴子#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 13)
                cm.sendNext("#r电子鸡#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 14)
                cm.sendNext("#r白虎#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 15)
                cm.sendNext("#r企鹅#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 16)
                cm.sendNext("#r黄金猪#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 17)
                cm.sendNext("#r机器人#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 18)
                cm.sendNext("#r迷你雪吉拉#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 19)
                cm.sendNext("#r巴洛谷#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 20)
                cm.sendNext("#r神奇宝贝#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 21)
                cm.sendNext("#r绿红蓝#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 22)
                cm.sendNext("#r黑龙#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 23)
                cm.sendNext("#r黑色鬼精灵#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 24)
                cm.sendNext("#r豪猪#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 25)
                cm.sendNext("#r雪宝#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 26)
                cm.sendNext("#r臭鼬#k的指令语旁边的等级意味着能够使用那条指令的宠物的等级。\\r\\n#b坐#k (等级 1 ~ 30)\\r\\n#b不要, 住手, 不行, 不可以#k (等级 1 ~ 30)\\r\\n#b笨蛋, 傻瓜, 讨厌#k (等级 1 ~ 30)\\r\\n#b爱你#k (等级 1~30)\\r\\n#b便便#k (等级 1 ~ 30)\\r\\n#b说, 说吧, 说话#k (等级 10 ~ 30)\\r\\n#b撒娇#k (等级 10 ~ 30)\\r\\n#b站, 站起来, 起来#k (等级 20 ~ 30)");
            else if (selection == 27) {
                status = 14;
                cm.sendNext("为了移动宠物能力值需要魔法卷轴，带着这本书给艾灵森林的妖精玛莉的话，就可以将你真心培育的宠物等级和亲密度移动其他宠物身上去。只给对于宠物如此关心的你而已，免费给你有点困难，所以只要支付25万枫币的话，就可以把书让给你，对了，即使有咒文书，如果没有可移动的新宠物，也是没有用的。");
            }
            if(selection > 2 && selection < 27)
                cm.dispose();
        } else if (status == 2) {
            if(sel == 0)
                cm.sendNextPrev("可是那生命水只在世界树的根部长出来一点点而已，不能赋予那些孩子太多的时间真可惜啊！不过就算变成木偶也能再赋予它生命，在一起要好好疼它哦。");
            else if (sel == 1)
                cm.sendNextPrev("多和宠物们交谈，彼此的亲密程度会上升，最终它会变得更活泼开朗。随着亲密程度的提高，宠物甚至可能会说话有点像人，所以试着努力饲养它。当然，这很需要耐心。");
            else if (sel == 2)
                cm.sendNextPrev("过了一段时间。。。没错，它们会停止移动，回到背包。在魔法效果消失，生命之水干涸后，它们会变成了一个玩偶。但这并不意味着它会永远停止，因为一旦你重新赋予生命之水，我想它应该会活过来。");
            else if (sel == 27)
                cm.sendYesNo("是否愿意花费25W金币购买？");
        } else if (status == 3) {
            if (sel == 0)
                cm.sendNextPrev("对了，小家伙对特别指令会有所反应的。会闹，也会学乖，一切都靠你发现了。小家伙们很害怕离开主人身边，要经常疼它们。别让它们孤独哦。");
            else if (sel == 1){
                cm.sendNextPrev("它们是有生命的精灵，也能感受到饥饿#b饥饿值#k表示宠物的饥饿程度。100是最大值，它越低，意味着宠物越来越饿。过了一段时间，它甚至不会听从你的指挥而发动进攻，所以要多给予它们更多的关注哦。");
                return;
            }else if (sel == 2)
                cm.sendNextPrev("虽然能让它们恢复过来，不过停止还是让人蛮伤心的。所以在它们活着的时候一定要好好爱护它们啊。可要记得按时喂它们。有一个生命，一直追随你、关注你，你不觉得这是非常快乐的事情吗？");
            else if (sel == 27){
                if (cm.getMeso() < 250000 || !cm.canHold(4160011))
                    cm.sendOk("请确认是否有足够的金币，或者其他栏是否满了。");
                else {
                    cm.gainMeso(-250000);
                    cm.gainItem(4160011, 1);
                }
                cm.dispose();
            }
        } else if (status == 4){
            if(sel != 1)
                cm.dispose();
            cm.sendNextPrev("宠物不能吃正常的人类食物。在射手村的市场里有我的徒弟售卖宠物专用的口粮。提前购买宠物口粮，在宠物们饿之前，喂食是个不错的主意。");
        } else if (status == 5)
            cm.sendNextPrev("如果长时间不喂宠物，它会回到你的背包里。当然，你可以再次把它从背包里召唤出来，记得及时喂养，否则对宠物的健康不是很好。");
        else
            cm.dispose();
    }
}