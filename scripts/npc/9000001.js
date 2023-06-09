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
/* Credits to: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("你好，我是#b江#k。我在等我的#b珀尔#k。他现在应该快到了吧...");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("嗯...我该怎么办？活动就要开始了...很多人都去参加活动了，我们也得快点才行...");
        } else if (status == 2) {
            cm.sendSimple("嘿...你要不要和我一起去？我的弟弟可能和别人一起参加了。\r\n#L0##e1.#n#b这是什么样的活动？#k#l\r\n#L1##e2.#n#b请为我详细说明活动内容。#k#l\r\n#L2##e3.#n#b好的，我们入场吧！#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("本月MapleStory Global（枫之谷全球服）的三周年庆典正在进行！GM会在整个活动期间举办令人惊喜的GM活动，所以时刻注意系统提示，保证至少能参加一次活动来赢取奖励！");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("活动拥有多种游戏内容。在参与到游戏中之前了解游戏玩法是很有帮助的。选择一种你想要了解的游戏吧！#b\r\n#L0#上楼~上楼~#l\r\n#L1#向高地#l\r\n#L2#雪球赛#l\r\n#L3#椰子比赛#l\r\n#L4#OX问答#l\r\n#L5#寻宝游戏#l#k");
            } else if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001) 
						cm.divideTeams();
        
					cm.getEvent().minusLimit();
					cm.warp(cm.getEvent().getMapId(), 0);
					cm.dispose();
				} else {
					cm.sendNext("可能是活动目前尚未开始、已持有#b恶魔文件#k，或在24小时内参加过活动，因而无法入场。请稍后再试。");
					cm.dispose();                
            }
			}
        } else if (status == 4) {
            if (selection == 0) {
                cm.sendNext("#b[上楼~上楼~]#k中，参与者需要使用爬梯抵达最高层。向上爬，在众多传送点与梯子之中选择正确的入口去往下一层。\r\n\r\n游戏地图分为三层，时间限制为#b6分钟#k。在[上楼~上楼~]活动中。#b无法进行跳跃、使用快速移动和轻功，也不能使用道具增加移动速度#k。另外会有错误的入口将玩家送往奇怪的地方。所以请留意它们。");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[向高地]是一场障碍赛#k，和忍苦森林有异曲同工之妙。在时间限制内越过各种各样的障碍达到终点即可获胜。\r\n\r\n活动包含四个关卡，时间限制为 #b15分钟#k。在[向高地]活动中，无法使用快速移动和轻功技能。");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[雪球赛]#k中，玩家将分为Maple队和Story队两支队伍展开较量，比拼哪一队#b在时间限制内雪球滚出的距离更远、体积更大者#k。如果在规定时间内两队都没有将雪球推到终点，则推得较远的一队获胜。\r\n\r\n若要使雪球滚动，请按#bCtrl键#k攻击雪球。所有远程攻击与技能攻击在地图中均会失效，#b只有近程普通攻击能够起效#k。\r\n\r\n如果一名角色碰到雪球，他/她将会被送回起点。攻击出发点附近的雪人可阻碍对方的雪球滚动。玩家们需要精心策划战略，决定好攻击雪球与雪人之间的队员分工。");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[椰子比赛]#k中，玩家将分为Maple队和Story队两支队伍展开较量，以#b收集更多椰子的队伍#k为胜。时间限制为#b5分钟#k。如果比赛出现平局，则加时2分钟来决出胜者。若分数仍然持平，比赛将以平局告终。\r\n\r\n所有远程攻击与技能攻击在地图中均会失效，#b只有近程普通攻击能够起效#k。如果没有携带一件近战武器，可以通过活动地图中的NPC购买。无论角色拥有怎样的等级、武器或技能，所造成的伤害不会有任何区别。\r\n\r\n请小心地图中的障碍与陷阱。如果角色在活动地图中死亡，将被传送出图。在椰子掉落前进行最后一次攻击的玩家会赢得这枚椰子的分数。只有完全落地的椰子才会计分，也就是说没有从树上脱落，或突然消失的椰子不会被计分。地图底部有一枚贝壳上存在隐藏的传送点，请合理利用它。");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX问答]#k是快速辨别冒险岛知识对错的游戏。参加游戏的玩家需要查看按下#bM#k时看到的小地图来确认X和O的位置。题目总共有#r10道#k，答对所有问题的玩家将会获胜。\r\n\r\n一旦GM给出题目，玩家需要在X和O中选择正确选项并站上台阶。没有选择答案以及在达到时间限制时仍然犹豫不定的玩家也将视为给出了错误答案，同样会被传送出图。请在屏幕出现[正确]字样之前保持站立在台阶上，不要进行移动。为了防止任何形式的作弊，在OX问答期间将会禁用所有种类的频道聊天。");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[寻宝游戏]#k是#b在10分钟内#k以寻找隐藏在各地图内的#b藏宝图#k为目标的游戏。每个房间都藏有神秘的藏宝箱，一旦敲开他们，就有机会获得各种道具。你需要从这些道具中找到藏宝图。\r\n宝箱可以被#b普通攻击#k所破坏，一旦获得藏宝图，就可以通过负责交易道具的NPC交换恶魔文件。交易NPC会在寻宝游戏地图上现身，不过你也可以在明珠港的#b贝干#k那里交换。\r\n\r\n在活动中，地图里有隐藏的入口和传送点。想使用它们的话，只要在对应地点按#b[↑[键#k，就可以传送到另一处。试着到处跳跳，也有可能发现隐藏的梯子或绳子。也有些宝箱在被打开后会将你传送到隐藏地图，有些隐藏宝箱只有通过暗门后才能发现，请仔细搜索。\r\n\r\n在寻宝游戏中，一切攻击技能都将被#r禁用#k，所以只能使用普通攻击打开宝箱。");
                cm.dispose();
            }
        }   
    }
}  