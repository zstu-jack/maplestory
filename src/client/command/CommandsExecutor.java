/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
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
   @Author: Arthur L - Refactored command content into modules
*/
package client.command;

import client.command.commands.gm0.*;
import client.command.commands.gm1.*;
import client.command.commands.gm2.*;
import client.command.commands.gm3.*;
import client.command.commands.gm4.*;
import client.command.commands.gm5.*;
import client.command.commands.gm6.*;

import client.MapleClient;

import tools.FilePrinter;
import tools.Pair;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;

public class CommandsExecutor {

    public static CommandsExecutor instance = new CommandsExecutor();

    public static CommandsExecutor getInstance() {
        return instance;
    }

    // 普通指令
    private static final char USER_HEADING = '@';
    // GM指令
    private static final char GM_HEADING = '!';

    public static boolean isCommand(MapleClient client, String content) {
        char heading = content.charAt(0);
        if (client.getPlayer().isGM()) {
            return heading == USER_HEADING || heading == GM_HEADING;
        }
        return heading == USER_HEADING;
    }

    private final HashMap<String, Command> registeredCommands = new HashMap<>();
    private Pair<List<String>, List<String>> levelCommandsCursor;
    private final List<Pair<List<String>, List<String>>> commandsNameDesc = new ArrayList<>();

    private CommandsExecutor() {
        registerLv0Commands();
        registerLv1Commands();
        registerLv2Commands();
        registerLv3Commands();
        registerLv4Commands();
        registerLv5Commands();
        registerLv6Commands();
    }

    public List<Pair<List<String>, List<String>>> getGmCommands() {
        return commandsNameDesc;
    }

    public void handle(MapleClient client, String message) {
        if (client.tryacquireClient()) {
            try {
                handleInternal(client, message);
            } finally {
                client.releaseClient();
            }
        } else {
            client.getPlayer().dropMessage(5, "请稍后再试，上一条指令正在执行中。。。");
        }
    }

    private void handleInternal(MapleClient client, String message) {
        if (client.getPlayer().getMapId() == 300000012) {
            client.getPlayer().yellowMessage("监狱里不允许使用指令");
            return;
        }
        final String splitRegex = " ";
        String[] splitedMessage = message.substring(1).split(splitRegex, 2);
        if (splitedMessage.length < 2) {
            splitedMessage = new String[]{splitedMessage[0], ""};
        }

        client.getPlayer().setLastCommandMessage(splitedMessage[1]);    // thanks Tochi & Nulliphite for noticing string messages being marshalled lowercase
        final String commandName = splitedMessage[0].toLowerCase();
        final String[] lowercaseParams = splitedMessage[1].toLowerCase().split(splitRegex);

        final Command command = registeredCommands.get(commandName);
        if (command == null) {
            client.getPlayer().yellowMessage("指令 '" + commandName + "' 无效！输入 @commands 查看可用的指令。");
            return;
        }
        if (client.getPlayer().gmLevel() < command.getRank()) {
            client.getPlayer().yellowMessage("你没有权限使用这个指令");
            return;
        }
        String[] params;
        if (lowercaseParams.length > 0 && !lowercaseParams[0].isEmpty()) {
            params = Arrays.copyOfRange(lowercaseParams, 0, lowercaseParams.length);
        } else {
            params = new String[]{};
        }

        command.execute(client, params);
        writeLog(client, message);
    }

    private void writeLog(MapleClient client, String command) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        FilePrinter.print(FilePrinter.USED_COMMANDS, client.getPlayer().getName() + " used: " + command + " on "
                + sdf.format(Calendar.getInstance().getTime()));
    }

    private void addCommandInfo(String name, Class<? extends Command> commandClass) {
        try {
            levelCommandsCursor.getRight().add(commandClass.newInstance().getDescription());
            levelCommandsCursor.getLeft().add(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void addCommand(String[] syntaxs, Class<? extends Command> commandClass) {
        for (String syntax : syntaxs) {
            addCommand(syntax, 0, commandClass);
        }
    }

    private void addCommand(String syntax, Class<? extends Command> commandClass) {
        //for (String syntax : syntaxs){
        addCommand(syntax, 0, commandClass);
        //}
    }

    private void addCommand(String[] surtaxes, int rank, Class<? extends Command> commandClass) {
        for (String syntax : surtaxes) {
            addCommand(syntax, rank, commandClass);
        }
    }

    private void addCommand(String syntax, int rank, Class<? extends Command> commandClass) {
        if (registeredCommands.containsKey(syntax.toLowerCase())) {
            System.out.println("注册指令: " + syntax + " 失败，该指令已存在。");
            return;
        }

        String commandName = syntax.toLowerCase();
        addCommandInfo(commandName, commandClass);

        try {
            Command commandInstance = commandClass.newInstance();     // thanks Halcyon for noticing commands getting reinstanced every call
            commandInstance.setRank(rank);
            registeredCommands.put(commandName, commandInstance);
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    private void registerLv0Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());

        addCommand(new String[]{"help", "commands"}, HelpCommand.class);
        addCommand("droplimit", DropLimitCommand.class);    // 查看服务器最大掉落物数量
        addCommand("time", TimeCommand.class);              // 服务器时间
        addCommand("buyback", BuyBackCommand.class);        // 买活指令，死亡后可以立即买活 @buyback <info|now>
        addCommand("gacha", GachaCommand.class);            // ?
        addCommand("dispose", DisposeCommand.class);        // 解卡指令，客户端异常时可以解卡"
        addCommand("equiplv", EquipLvCommand.class);        // 显示装备等级
        addCommand("rates", ShowRatesCommand.class);        // 查看倍率
        addCommand("online", OnlineCommand.class);          // 查人所在位置
        addCommand("bug", ReportBugCommand.class);          // 上报bug
        addCommand("points", ReadPointsCommand.class);      // 查询奖励点数和投票点数，暂时没发现有什么用"
        addCommand("event", JoinEventCommand.class);        // 参加或离开活动
        addCommand("ranks", RanksCommand.class);            // 查看排名
        addCommand("autoadd", AutoAddCommand.class);        // 自动加点
        addCommand("toggleexp", ToggleExpCommand.class);    // 切换是否获得经验
        addCommand("mylawn", MapOwnerClaimCommand.class);   // 宣称地图所有权
        addCommand("map", MapIdCommand.class);              // 查看地图id
        addCommand("buyfame", BuyFameCommand.class);        // 购买人气：需要配置打开

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv1Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("bosshp", level, BossHpCommand.class);   // 显示BOSS血量 
        addCommand("mobhp", level, MobHpCommand.class);     // 显示怪物血量
        addCommand("whatdropsfrom", level, WhatDropsFromCommand.class);     // 这个怪物会掉落什么
        addCommand("whodrops", level, WhoDropsCommand.class);               // 什么怪物会掉落这个
        addCommand("buffme", level, BuffMeCommand.class);       // 轻功等buff
        addCommand("goto", level, GotoCommand.class);           // 切换地图

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv2Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("recharge", level, RechargeCommand.class);       // ？
        addCommand("whereami", level, WhereaMiCommand.class);       // 当前地图玩家和npc
        addCommand("hide", level, HideCommand.class);               // ---------- 隐身
        addCommand("unhide", level, UnHideCommand.class);           // ---------- 取消隐身
        addCommand("sp", level, SpCommand.class);                   // ---------- 给与SP 
        addCommand("ap", level, ApCommand.class);                   // ---------- 给与AP
        addCommand("empowerme", level, EmpowerMeCommand.class);     // ---------- 一坨buff* 
        addCommand("buffmap", level, BuffMapCommand.class);         // 一坨buff
        addCommand("buff", level, BuffCommand.class);               // 增加buff
        addCommand("bomb", level, BombCommand.class);               // 扔炸弹
        addCommand("dc", level, DcCommand.class);                   // 断线某个玩家
        addCommand("cleardrops", level, ClearDropsCommand.class);   // 清理掉落
        addCommand("clearslot", level, ClearSlotCommand.class);     // 清理物品栏
        addCommand("clearsavelocs", level, ClearSavedLocationsCommand.class);      // ？
        addCommand("warp", level, WarpCommand.class);                              // ？
        addCommand(new String[]{"warphere", "summon"}, level, SummonCommand.class);       // 召唤某个玩家
        addCommand(new String[]{"warpto", "reach", "follow"}, level, ReachCommand.class); // 飞去某个玩家的地方
        addCommand("gmshop", level, GmShopCommand.class);           // ---------- gm商店：好多东西都有  
        addCommand("heal", level, HealCommand.class);               // ---------- 恢复  
        addCommand("item", level, ItemCommand.class);               // ---------- 添加物品  
        addCommand("drop", level, ItemDropCommand.class);           // 添加掉落
        addCommand("level", level, LevelCommand.class);             // ---------- 设置等级  
        addCommand("levelpro", level, LevelProCommand.class);       // 升级
        addCommand("setslot", level, SetSlotCommand.class);         // ---------- 物品栏位
        addCommand("setstat", level, SetStatCommand.class);         // 设置状态
        addCommand("maxstat", level, MaxStatCommand.class);         // 满状态
        addCommand("maxskill", level, MaxSkillCommand.class);       // ---------- 满技能
        addCommand("resetskill", level, ResetSkillCommand.class);   // ---------- 重置技能
        addCommand("search", level, SearchCommand.class);           // 搜索npc，mob等
        addCommand("jail", level, JailCommand.class);               // 封号x分钟
        addCommand("unjail", level, UnJailCommand.class);           // 解除封号
        addCommand("job", level, JobCommand.class);                 // ---------- 切换职业 MapleJob.java
        addCommand("unbug", level, UnBugCommand.class);             // 消除错误
        addCommand("id", level, IdCommand.class);                   // handbook/
        addCommand("gachalist", GachaListCommand.class);            // 百宝箱掉落
        addCommand("loot", LootCommand.class);                      // 掉落归属于你

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv3Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("debuff", level, DebuffCommand.class);               // ---------- 给debuff
        addCommand("fly", level, FlyCommand.class);                     // ---------- 飞
        addCommand("spawn", level, SpawnCommand.class);                 // ---------- 生成怪物
        addCommand("mutemap", level, MuteMapCommand.class);             // 禁止聊天
        addCommand("checkdmg", level, CheckDmgCommand.class);           // 查看属性
        addCommand("inmap", level, InMapCommand.class);                 // 玩家列表
        addCommand("reloadevents", level, ReloadEventsCommand.class);   // 重新加载事件脚本
        addCommand("reloaddrops", level, ReloadDropsCommand.class);     // 重新加载
        addCommand("reloadportals", level, ReloadPortalsCommand.class); // 重新加载 
        addCommand("reloadmap", level, ReloadMapCommand.class);         // 重新加载
        addCommand("reloadshops", level, ReloadShopsCommand.class);     // 重新加载
        addCommand("hpmp", level, HpMpCommand.class);                   // 设置hpmp
        addCommand("maxhpmp", level, MaxHpMpCommand.class);             // ---------- 最大hpmp
        addCommand("music", level, MusicCommand.class);                 // 音乐
        addCommand("monitor", level, MonitorCommand.class);             // 监视玩家
        addCommand("monitors", level, MonitorsCommand.class);           // 正在监视的玩家列表
        addCommand("ignore", level, IgnoreCommand.class);
        addCommand("ignored", level, IgnoredCommand.class);
        addCommand("pos", level, PosCommand.class);
        addCommand("togglecoupon", level, ToggleCouponCommand.class);
        addCommand("togglewhitechat", level, ChatCommand.class);
        addCommand("fame", level, FameCommand.class);                   // 给人气
        addCommand("givenx", level, GiveNxCommand.class);               // 给点券
        addCommand("givevp", level, GiveVpCommand.class);               // 给vp
        addCommand("givems", level, GiveMesosCommand.class);            // 给金币
        addCommand("giverp", level, GiveRpCommand.class);               // 给？
        addCommand("expeds", level, ExpedsCommand.class);               // 频道的远征队
        addCommand("kill", level, KillCommand.class);                   // 杀死某个玩家
        addCommand("seed", level, SeedCommand.class);                   // ？
        addCommand("maxenergy", level, MaxEnergyCommand.class);         // ？
        addCommand("killall", level, KillAllCommand.class);             // ------------ 杀死所有怪物
        // 提示
        addCommand("notice", level, NoticeCommand.class);
        addCommand("rip", level, RipCommand.class);
        // 传送门
        addCommand("openportal", level, OpenPortalCommand.class);
        addCommand("closeportal", level, ClosePortalCommand.class);
        addCommand("pe", level, PeCommand.class);                       // ？
        // 事件
        addCommand("startevent", level, StartEventCommand.class);
        addCommand("endevent", level, EndEventCommand.class);
        addCommand("startmapevent", level, StartMapEventCommand.class);
        addCommand("stopmapevent", level, StopMapEventCommand.class);

        // 对地图其它玩家操作
        addCommand("online2", level, OnlineTwoCommand.class);
        addCommand("ban", level, BanCommand.class);
        addCommand("unban", level, UnBanCommand.class);
        addCommand("healmap", level, HealMapCommand.class);             
        addCommand("healperson", level, HealPersonCommand.class);
        addCommand("hurt", level, HurtCommand.class);
        addCommand("killmap", level, KillMapCommand.class);             // 杀死地图里的所有人

        addCommand("night", level, NightCommand.class);                 // 去除光
        addCommand("npc", level, NpcCommand.class);                     // 召唤npc
        addCommand("face", level, FaceCommand.class);                   // 外观
        addCommand("hair", level, HairCommand.class);                   // 外观
        addCommand("startquest", level, QuestStartCommand.class);       // 任务开始
        addCommand("completequest", level, QuestCompleteCommand.class); // 任务完成
        addCommand("resetquest", level, QuestResetCommand.class);       // 任务重置
        addCommand("timer", level, TimerCommand.class);
        addCommand("timermap", level, TimerMapCommand.class);
        addCommand("timerall", level, TimerAllCommand.class);
        addCommand("warpmap", level, WarpMapCommand.class);             // 地图上所有玩家切换
        addCommand("warparea", level, WarpAreaCommand.class);           // 和你相隔xx内的玩家切换
        addCommand("gotonpc", level, GotoNpcCommand.class);             // ---------- 去npc这里
        addCommand("xiguai", level, SuckMonsterCommand.class);          // ---------- 开启或关闭吸怪

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv4Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("servermessage", level, ServerMessageCommand.class);
        addCommand("proitem", level, ProItemCommand.class);
        addCommand("seteqstat", level, SetEqStatCommand.class);         //  ------- 修改【背包】装备属性，可以使自身属性变得非常高 ------ 1605631
        addCommand("exprate", level, ExpRateCommand.class);             // 经验倍率
        addCommand("mesorate", level, MesoRateCommand.class);           // 金币倍率
        addCommand("droprate", level, DropRateCommand.class);           // BOSS掉落倍率
        addCommand("bossdroprate", level, BossDropRateCommand.class);   // BOSS掉落倍率
        addCommand("questrate", level, QuestRateCommand.class);         // 任务倍率
        addCommand("travelrate", level, TravelRateCommand.class);       // 坐船倍率
        addCommand("fishrate", level, FishingRateCommand.class);        // 钓鱼倍率
        addCommand("itemvac", level, ItemVacCommand.class);             // 拣取
        addCommand("forcevac", level, ForceVacCommand.class);           // 拣取
        addCommand("zakum", level, ZakumCommand.class);                 // *扎昆*
        addCommand("horntail", level, HorntailCommand.class);           // *龙王*
        addCommand("pinkbean", level, PinkbeanCommand.class);           // *品克斌*
        addCommand("pap", level, PapCommand.class);                     // *闹钟*
        addCommand("pianus", level, PianusCommand.class);               // *鱼王*
        addCommand("cake", level, CakeCommand.class);                   // ---------- BOSS蛋糕： 爆枫叶物品
        addCommand("playernpc", level, PlayerNpcCommand.class);     
        addCommand("playernpcremove", level, PlayerNpcRemoveCommand.class);
        addCommand("pnpc", level, PnpcCommand.class);                   // ---------- 创建npc
        addCommand("pnpcremove", level, PnpcRemoveCommand.class);       // 移除npc
        addCommand("pmob", level, PmobCommand.class);                   // ---------- 创建怪物
        addCommand("pmobremove", level, PmobRemoveCommand.class);       // 移除怪物

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv5Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;                                                                          // 一些DEBUG的命令
        addCommand("debug", level, DebugCommand.class);                 
        addCommand("set", level, SetCommand.class);
        addCommand("showpackets", level, ShowPacketsCommand.class);
        addCommand("showmovelife", level, ShowMoveLifeCommand.class);
        addCommand("showsessions", level, ShowSessionsCommand.class);
        addCommand("iplist", level, IpListCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv6Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("setgmlevel", level, SetGmLevelCommand.class);       // 修改GM等级 
        addCommand("warpworld", level, WarpWorldCommand.class);
        addCommand("saveall", level, SaveAllCommand.class);             // 保存当前地图角色数据
        addCommand("dcall", level, DCAllCommand.class);                 // 断开所有玩家连接
        addCommand("mapplayers", level, MapPlayersCommand.class);       // 当前地图角色
        addCommand("getacc", level, GetAccCommand.class);               // 获取角色账号名
        addCommand("shutdown", level, ShutdownCommand.class);
        addCommand("clearquestcache", level, ClearQuestCacheCommand.class);
        addCommand("clearquest", level, ClearQuestCommand.class);
        addCommand("supplyratecoupon", level, SupplyRateCouponCommand.class);
        addCommand("spawnallpnpcs", level, SpawnAllPNpcsCommand.class);
        addCommand("eraseallpnpcs", level, EraseAllPNpcsCommand.class);
        addCommand("addchannel", level, ServerAddChannelCommand.class);
        addCommand("addworld", level, ServerAddWorldCommand.class);
        addCommand("removechannel", level, ServerRemoveChannelCommand.class);
        addCommand("removeworld", level, ServerRemoveWorldCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

}
